"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ScrollFilm
   ──────────────────────────────────────────────────────────────────────────
   Apple-style scroll-scrubbed footage on a <canvas>, shared by the openers of
   `/` (CinematicScrollHero) and `/light` (HeroLight). Frames-on-canvas instead
   of <video>.currentTime because MP4 seeking is not frame-accurate, stutters
   on most browsers and is effectively broken on iOS Safari.

   Why this scrubs smoothly where the old 50-frame version stepped:

   • Scroll only sets a TARGET frame. A rAF loop eases the shown frame toward
     it (exponential smoothing, ~90ms time constant), so a wheel click or a
     fast flick GLIDES through the footage instead of jump-cutting.
   • The eased position is FRACTIONAL and the canvas paints both neighbouring
     frames — the upper one at the fractional alpha — so motion dissolves
     continuously between frames instead of stepping on whole-frame
     boundaries. Reads as gentle motion blur, like real footage.
   • 120 WebP frames (every 2nd frame of the 10s/24fps footage, ~34KB each).
   • Frames preload progressively — coarse passes first (every 8th, 4th, 2nd,
     then the rest) and pre-decode via img.decode(). Until the exact frame
     arrives, the nearest loaded neighbour is drawn, so scrubbing right after
     page load never blanks or freezes.
   • The footage is 720p; the poster (its first frame exported at 2.8K from
     lab.png, cropped to the same 16:9) sits ON TOP of the canvas at rest and
     fades over the first ~3% of scroll. Visitors land on the crisp photo —
     the soft footage only ever shows in motion.

   The poster fade is a function-based transform on purpose: range-based
   scroll transforms become native WAAPI scroll animations, which desync from
   the real scroll position on these pages.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* The hero footage manifest — assets generated in /public/hero-film. */
export const HERO_FILM = {
  frameCount: 120,
  frameSrc: (i: number) => `/hero-film/f_${i.toString().padStart(3, "0")}.webp`,
  poster: "/hero-film/poster.webp",
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Map scroll progress → fractional frame; the footage completes at `endAt`
   and holds its last frame while the parent blends into the page below. */
const frameFor = (p: number, frameCount: number, endAt: number) =>
  clamp01(p / endAt) * (frameCount - 1);

type EngineState = {
  images: (HTMLImageElement | undefined)[];
  loaded: boolean[];
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
  /** Progress fraction at which the footage reaches its final frame. */
  endAt?: number;
};

export function ScrollFilm({
  progress,
  frameCount,
  frameSrc,
  poster,
  endAt = 0.85,
}: ScrollFilmProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  const engine = useRef<EngineState>({
    images: [],
    loaded: [],
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
    s.images = new Array(frameCount);
    s.loaded = new Array(frameCount).fill(false);
    s.target = s.current = frameFor(progress.get(), frameCount, endAt);
    s.drawnKey = "";
    s.hasFrame = false;

    const coverDraw = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const r = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * r;
      const h = img.naturalHeight * r;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    /* Until the first frame decodes, mirror the poster onto the canvas so a
       scroll during the poster's fade never reveals a black backdrop. */
    const drawPoster = () => {
      const el = posterRef.current;
      if (!s.hasFrame && el && el.naturalWidth > 0) coverDraw(el);
    };

    const nearestLoaded = (i: number) => {
      if (s.loaded[i]) return i;
      for (let d = 1; d < frameCount; d++) {
        if (i - d >= 0 && s.loaded[i - d]) return i - d;
        if (i + d < frameCount && s.loaded[i + d]) return i + d;
      }
      return -1;
    };

    /* Paint the fractional position as a dissolve between its two
       neighbouring frames: base frame at full alpha, next frame at the
       fractional alpha. Adjacent frames are 1/12s of footage apart, so the
       blend reads as an in-between frame — the scrub never visibly steps.
       While the exact neighbours are still downloading, fall back to the
       nearest loaded frame (progressive preload fills the gaps quickly). */
    const render = () => {
      const pos = Math.min(frameCount - 1, Math.max(0, s.current));
      let lo = Math.floor(pos);
      let hi = Math.min(frameCount - 1, lo + 1);
      let alpha = pos - lo;
      if (!s.loaded[lo] || !s.loaded[hi]) {
        const near = nearestLoaded(Math.round(pos));
        if (near < 0) return;
        lo = hi = near;
        alpha = 0;
      }
      const key = `${lo}:${hi}:${alpha.toFixed(2)}`;
      if (key === s.drawnKey) return;
      const base = s.images[lo];
      if (!base) return;
      coverDraw(base);
      if (hi !== lo && alpha > 0) {
        const over = s.images[hi];
        if (over) {
          ctx.globalAlpha = alpha;
          coverDraw(over);
          ctx.globalAlpha = 1;
        }
      }
      s.drawnKey = key;
      s.hasFrame = true;
    };

    const tick = (t: number) => {
      const dt = s.lastT ? Math.min(64, t - s.lastT) : 16.7;
      s.lastT = t;
      /* Snap only once the remaining distance is invisible (<2% of a blend
         step) — a coarser snap would land as a tiny visible alpha jump now
         that sub-frame positions actually paint differently. */
      if (Math.abs(s.target - s.current) < 0.02) s.current = s.target;
      else s.current += (s.target - s.current) * (1 - Math.exp(-dt / 90));
      render();
      if (s.current === s.target) {
        s.running = false;
        s.lastT = 0;
        return;
      }
      s.raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (s.dead || s.running) return;
      s.running = true;
      s.lastT = 0;
      s.raf = requestAnimationFrame(tick);
    };
    s.kick = kick;

    /* ── Progressive preload: 0 & last first, then coarse→fine passes ── */
    const order: number[] = [];
    {
      const seen = new Set<number>();
      const push = (i: number) => {
        if (i >= 0 && i < frameCount && !seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      };
      push(0);
      push(frameCount - 1);
      for (const stride of [8, 4, 2, 1])
        for (let i = 0; i < frameCount; i += stride) push(i);
    }
    let cursor = 0;
    let inflight = 0;
    const CONCURRENCY = 6;
    const pump = () => {
      if (s.dead) return;
      while (inflight < CONCURRENCY && cursor < order.length) {
        const i = order[cursor++];
        const img = new Image();
        img.decoding = "async";
        s.images[i] = img;
        inflight++;
        const done = (ok: boolean) => {
          inflight--;
          if (s.dead) return;
          if (ok) {
            s.loaded[i] = true;
            kick(); // a closer frame than the one on screen may have arrived
          }
          pump();
        };
        img.src = frameSrc(i);
        img
          .decode()
          .then(() => done(true))
          .catch(() => done(img.complete && img.naturalWidth > 0));
      }
    };
    pump();

    /* ── Canvas buffer sized to the element × DPR (capped for sanity) ── */
    const resize = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
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
      ro.disconnect();
      s.images = [];
      s.loaded = [];
    };
  }, [frameCount, frameSrc, endAt, progress]);

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
