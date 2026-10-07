"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ScrollFilm
   ──────────────────────────────────────────────────────────────────────────
   Apple-style scroll-scrubbed footage on a <canvas>, shared by the openers of
   `/` (CinematicScrollHero) and `/light` (HeroLight). Frames-on-canvas instead
   of <video>.currentTime because MP4 seeking is not frame-accurate, stutters
   on most browsers and is effectively broken on iOS Safari.

   How it stays smooth:

   • Scroll only sets a TARGET frame. A rAF loop eases the shown frame toward
     it (exponential smoothing, ~90ms time constant), so a wheel click or a
     fast flick GLIDES through the footage instead of jump-cutting.
   • The eased position is FRACTIONAL and the canvas paints both neighbouring
     frames — the upper one at the fractional alpha — so motion dissolves
     continuously between frames instead of stepping on whole-frame
     boundaries.
   • The canvas never paints more pixels than the footage has. Its backing
     store is capped so the cover-fitted 720p frame lands at ≤1:1 and the
     compositor (GPU) does the final stretch to the viewport. The previous
     version drew two frames per tick into a DPR-sized buffer (up to
     2732×1600 with high-quality resampling) — the main source of the
     stutter on HiDPI laptops.
   • Frames are drawn from pre-decoded ImageBitmaps. Compressed frames
     (~35KB each, ~4MB total) are all fetched up front, but only a window of
     frames around the scroll position is decoded (off the main thread) and
     kept in memory. A plain <img> can have its decoded pixels evicted by the
     browser, and the next drawImage then decodes synchronously in the middle
     of a scroll frame — a visible hitch. Bitmaps can't be evicted.
   • Fetch order is dense for the opening frames (what the visitor sees
     first) and coarse→fine for the rest, so even a fast flick right after
     load finds a nearby frame instead of freezing.
   • The footage is 720p; the poster (its first frame exported at 2.8K,
     cropped to the same 16:9) sits ON TOP of the canvas at rest and fades
     over the first ~3% of scroll. Visitors land on the crisp photo — the
     soft footage only ever shows in motion.

   The poster fade is a function-based transform on purpose: range-based
   scroll transforms become native WAAPI scroll animations, which desync from
   the real scroll position on these pages.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { isSlowConnection, isTouchDevice } from "@/lib/perf";
import { useReduced } from "@/components/home/lib/hooks";

/* The hero footage manifest — assets generated in /public/hero-film. */
export const HERO_FILM = {
  frameCount: 120,
  frameSrc: (i: number) => `/hero-film/f_${i.toString().padStart(3, "0")}.webp`,
  poster: "/hero-film/poster.webp",
  /** Native size of every frame — the canvas never paints above it. */
  frameWidth: 1280,
  frameHeight: 720,
};

type FilmManifest = typeof HERO_FILM;

/* Data-saver/2G connections get every 4th frame (~1MB — the visitor asked to
   save data), small screens every 2nd (~2MB), and every computer the full 120
   (~4MB) regardless of age — the client wants the desktop experience
   untouched. The dissolve blending bridges the wider gaps, so thinner films
   still scrub smoothly — they just have less true motion between blends. */
function filmStride(): number {
  if (isSlowConnection()) return 4;
  /* pointer:coarse keeps narrow desktop windows on the full film. */
  return window.matchMedia("(max-width: 820px) and (pointer: coarse)").matches ? 2 : 1;
}

/* Device-appropriate variant of HERO_FILM. The stride is resolved once on the
   client (lazy initializer — never during SSR, where it stays at 1; the frames
   only ever load client-side so no hydration mismatch is possible). */
export function useHeroFilm(): FilmManifest {
  const [stride] = useState(() => (typeof window === "undefined" ? 1 : filmStride()));
  return useMemo(() => {
    if (stride === 1) return HERO_FILM;
    return {
      ...HERO_FILM,
      frameCount: Math.ceil(HERO_FILM.frameCount / stride),
      frameSrc: (i: number) => HERO_FILM.frameSrc(Math.min(i * stride, HERO_FILM.frameCount - 1)),
    };
  }, [stride]);
}

/* True when the frame-scrub must be swapped for a static poster instead of the
   canvas: any TOUCH device (phones/tablets — where holding decoded 720p
   frames resident pushes WebKit past its per-tab budget and reloads the page
   on scroll) or a reduced-motion request. Resolves after mount (client-only
   matchMedia via isTouchDevice, read through useSyncExternalStore whose
   server snapshot is "not touch", and the hydration-safe useReduced — not
   framer's useReducedMotion, which already answers during hydration), so
   SSR and hydration stay identical to desktop and no mismatch is possible.
   Computers (fine pointer, motion allowed) keep the full 120-frame canvas
   scrub. */
const COARSE_QUERY = "(pointer: coarse)";
const subscribeCoarse = (onChange: () => void) => {
  const mq = window.matchMedia(COARSE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export function useStaticFilm(): boolean {
  const reduced = useReduced();
  const coarse = useSyncExternalStore(subscribeCoarse, isTouchDevice, () => false);
  return reduced || coarse;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Map scroll progress → fractional frame; the footage completes at `endAt`
   and holds its last frame while the parent blends into the page below. */
const frameFor = (p: number, frameCount: number, endAt: number) =>
  clamp01(p / endAt) * (frameCount - 1);

/* Decoded frames kept around the scroll position (~3.7MB each at 720p). */
const DECODE_WINDOW = 18; // frames on each side of the target
const MAX_DECODED = DECODE_WINDOW * 2 + 1;
const FETCH_CONCURRENCY = 8;
const DECODE_CONCURRENCY = 3;

type Frame = { image: CanvasImageSource; release: () => void };

/* Off-main-thread decode where supported; <img>.decode() elsewhere. */
async function decodeFrame(blob: Blob): Promise<Frame> {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(blob);
    return { image: bitmap, release: () => bitmap.close() };
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return { image: img, release: () => {} };
  } finally {
    URL.revokeObjectURL(url);
  }
}

type EngineState = {
  target: number;
  current: number;
  /** `${lo}:${hi}:${alpha}` of the last blend painted — skip repaints. */
  drawnKey: string;
  /** True once any footage frame has hit the canvas (stops poster mirroring). */
  hasFrame: boolean;
  raf: number;
  running: boolean;
  lastT: number;
  dead: boolean;
  kick?: () => void;
};

type ScrollFilmProps = {
  /** 0→1 scroll progress of the tall hero container. */
  progress: MotionValue<number>;
  frameCount: number;
  frameSrc: (i: number) => string;
  /** Crisp still shown at rest — must share the footage's aspect ratio. */
  poster: string;
  frameWidth?: number;
  frameHeight?: number;
  /** Progress fraction at which the footage reaches its final frame. */
  endAt?: number;
};

export function ScrollFilm({
  progress,
  frameCount,
  frameSrc,
  poster,
  frameWidth = HERO_FILM.frameWidth,
  frameHeight = HERO_FILM.frameHeight,
  endAt = 0.85,
}: ScrollFilmProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  const engine = useRef<EngineState>({
    target: 0,
    current: 0,
    drawnKey: "",
    hasFrame: false,
    raf: 0,
    running: false,
    lastT: 0,
    dead: false,
  });

  useMotionValueEvent(progress, "change", (p) => {
    const s = engine.current;
    s.target = frameFor(p, frameCount, endAt);
    s.kick?.();
  });

  useEffect(() => {
    const s = engine.current;
    const canvas = canvasRef.current;
    const root = rootRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !root || !ctx) return;

    s.dead = false;
    s.target = s.current = frameFor(progress.get(), frameCount, endAt);
    s.drawnKey = "";
    s.hasFrame = false;

    const blobs: (Blob | undefined)[] = new Array(frameCount);
    const decoded = new Map<number, Frame>();
    const decoding = new Set<number>();
    const aborter = new AbortController();

    const coverDraw = (img: CanvasImageSource, iw: number, ih: number) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const r = Math.max(cw / iw, ch / ih);
      const w = iw * r;
      const h = ih * r;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    /* Until the first frame decodes, mirror the poster onto the canvas so a
       scroll during the poster's fade never reveals a black backdrop. */
    const drawPoster = () => {
      const el = posterRef.current;
      if (s.hasFrame || !el || el.naturalWidth === 0) return;
      ctx.imageSmoothingQuality = "high";
      coverDraw(el, el.naturalWidth, el.naturalHeight);
      ctx.imageSmoothingQuality = "low";
    };

    const nearestDecoded = (i: number) => {
      let best = -1;
      let bestD = Infinity;
      for (const k of decoded.keys()) {
        const d = Math.abs(k - i);
        if (d < bestD) {
          bestD = d;
          best = k;
        }
      }
      return best;
    };

    /* Paint the fractional position as a dissolve between its two
       neighbouring frames: base frame at full alpha, next frame at the
       fractional alpha. Adjacent frames are 1/12s of footage apart, so the
       blend reads as an in-between frame — the scrub never visibly steps.
       While the exact neighbours are still decoding, hold the nearest
       decoded frame instead. */
    const render = () => {
      const pos = Math.min(frameCount - 1, Math.max(0, s.current));
      let lo = Math.floor(pos);
      let hi = Math.min(frameCount - 1, lo + 1);
      let alpha = pos - lo;
      if (!decoded.has(lo) || (alpha > 0 && !decoded.has(hi))) {
        const near = nearestDecoded(Math.round(pos));
        if (near < 0) return;
        lo = hi = near;
        alpha = 0;
      }
      const key = `${lo}:${hi}:${alpha.toFixed(2)}`;
      if (key === s.drawnKey) return;
      coverDraw(decoded.get(lo)!.image, frameWidth, frameHeight);
      if (hi !== lo && alpha > 0) {
        ctx.globalAlpha = alpha;
        coverDraw(decoded.get(hi)!.image, frameWidth, frameHeight);
        ctx.globalAlpha = 1;
      }
      s.drawnKey = key;
      s.hasFrame = true;
    };

    const tick = (t: number) => {
      const dt = s.lastT ? Math.min(64, t - s.lastT) : 16.7;
      s.lastT = t;
      /* Snap only once the remaining distance is invisible (<2% of a blend
         step) — a coarser snap would land as a tiny visible alpha jump. */
      if (Math.abs(s.target - s.current) < 0.02) s.current = s.target;
      else s.current += (s.target - s.current) * (1 - Math.exp(-dt / 90));
      render();
      pumpDecode();
      if (s.current === s.target) {
        s.running = false;
        s.lastT = 0;
        return;
      }
      s.raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (s.dead) return;
      pumpDecode();
      if (s.running) return;
      s.running = true;
      s.lastT = 0;
      s.raf = requestAnimationFrame(tick);
    };
    s.kick = kick;

    /* ── Decode the fetched frames closest to the target; evict the rest ── */
    function pumpDecode() {
      if (s.dead) return;
      const centre = Math.round(s.target);
      for (let d = 0; d <= DECODE_WINDOW && decoding.size < DECODE_CONCURRENCY; d++) {
        for (const i of d === 0 ? [centre] : [centre + d, centre - d]) {
          if (decoding.size >= DECODE_CONCURRENCY) break;
          if (i < 0 || i >= frameCount) continue;
          const blob = blobs[i];
          if (!blob || decoded.has(i) || decoding.has(i)) continue;
          decoding.add(i);
          decodeFrame(blob)
            .then((frame) => {
              decoding.delete(i);
              if (s.dead) return frame.release();
              decoded.set(i, frame);
              evict();
              kick(); // a closer frame than the one on screen may have arrived
            })
            .catch(() => {
              decoding.delete(i);
            });
        }
      }
    }

    function evict() {
      if (decoded.size <= MAX_DECODED) return;
      const centre = s.target;
      const byDistance = [...decoded.keys()].sort(
        (a, b) => Math.abs(b - centre) - Math.abs(a - centre),
      );
      for (const k of byDistance) {
        if (decoded.size <= MAX_DECODED) break;
        decoded.get(k)!.release();
        decoded.delete(k);
      }
      s.drawnKey = "";
    }

    /* ── Fetch every compressed frame: opening frames densely first, then
       coarse→fine passes across the whole film ── */
    const order: number[] = [];
    {
      const seen = new Set<number>();
      const push = (i: number) => {
        if (i >= 0 && i < frameCount && !seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      };
      for (let i = 0; i < 6; i++) push(i);
      push(frameCount - 1);
      for (const stride of [8, 4, 2, 1])
        for (let i = 0; i < frameCount; i += stride) push(i);
    }
    let cursor = 0;
    let inflight = 0;
    const pumpFetch = () => {
      while (!s.dead && inflight < FETCH_CONCURRENCY && cursor < order.length) {
        const i = order[cursor++];
        inflight++;
        fetch(frameSrc(i), { signal: aborter.signal })
          .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
          .then((blob) => {
            blobs[i] = blob;
            if (Math.abs(i - s.target) <= DECODE_WINDOW) pumpDecode();
          })
          .catch(() => {})
          .finally(() => {
            inflight--;
            pumpFetch();
          });
      }
    };
    pumpFetch();

    /* ── Canvas buffer: viewport-sized, but never above the footage's own
       resolution (cover-fit at ≤1:1) — the GPU stretches the rest. ── */
    const resize = () => {
      /* Layout size, not getBoundingClientRect — the hero scales this frame
         with a transform and the buffer must not follow that. */
      const w = Math.max(1, root.clientWidth);
      const h = Math.max(1, root.clientHeight);
      const dpr = window.devicePixelRatio || 1;
      const scale = Math.min(dpr, frameWidth / w, frameHeight / h);
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "low";
      s.drawnKey = "";
      s.hasFrame = false;
      drawPoster();
      kick();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    const posterEl = posterRef.current;
    if (posterEl) {
      if (posterEl.complete && posterEl.naturalWidth > 0) drawPoster();
      else posterEl.decode().then(drawPoster).catch(() => {});
    }

    return () => {
      s.dead = true;
      s.running = false;
      s.kick = undefined;
      cancelAnimationFrame(s.raf);
      aborter.abort();
      ro.disconnect();
      for (const f of decoded.values()) f.release();
      decoded.clear();
    };
  }, [frameCount, frameSrc, frameWidth, frameHeight, endAt, progress]);

  /* Crisp poster over the canvas at rest; gone by ~3% scroll, back on return. */
  const posterOpacity = useTransform(progress, (p) =>
    1 - clamp01((p - 0.004) / 0.03),
  );

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden bg-[#0a0a0a]"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <motion.img
        ref={posterRef}
        src={poster}
        alt=""
        style={{ opacity: posterOpacity }}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

export default ScrollFilm;
