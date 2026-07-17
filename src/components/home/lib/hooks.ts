"use client";

/* ══════════════════════════════════════════════════════════════════════════
   home/lib/hooks — shared client hooks for the λαχανί homepage
   ──────────────────────────────────────────────────────────────────────────
   Small, dependency-free (besides framer-motion) hooks reused across every
   3D / scroll-driven section. Keeping them centralised avoids subtle SSR /
   hydration bugs and keeps each section component focused on its visuals.
   ══════════════════════════════════════════════════════════════════════════ */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";

/* Layout effect that is safe to import in SSR'd client components. */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ────────────────────────────────────────────
   Breakpoints
   ──────────────────────────────────────────── */

export interface Viewport {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
}

const DEFAULT_VIEWPORT: Viewport = {
  width: 1280,
  height: 800,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isWide: false,
};

/** Tracks the live viewport and exposes convenient breakpoints.
    Measures synchronously before first paint — never inside rAF, so the
    first client frame already uses the real viewport (rAF can be throttled
    to a standstill in hidden tabs, and a guessed first frame flashes). */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);

  useIsoLayoutEffect(() => {
    const compute = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : {
              width,
              height,
              isMobile: width < 640,
              isTablet: width >= 640 && width < 1024,
              isDesktop: width >= 1024,
              isWide: width >= 1440,
            },
      );
    };
    compute();
    window.addEventListener("resize", compute, { passive: true });
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, []);

  return viewport;
}

/* ────────────────────────────────────────────
   Box size — live content-box of an element
   ──────────────────────────────────────────────
   Measurement used by the pinned 3D sections to fit their scene into
   whatever space the layout actually gives them, instead of trusting
   breakpoint guesses. The first measure happens synchronously before
   paint, so the very first client frame is already correctly fitted.
   Layout metrics (clientWidth/Height minus padding) rather than
   getBoundingClientRect: they ignore transforms — the fit scale a caller
   applies from these numbers must not feed back into them — and they
   stay readable when rendering callbacks are throttled (hidden tabs).
   Returns {0,0} until mounted (and on the server), so callers must keep
   a sensible fallback for SSR markup.
   ──────────────────────────────────────────── */

export interface BoxSize {
  w: number;
  h: number;
}

export function useBoxSize<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T | null>,
  BoxSize,
] {
  const ref = useRef<T>(null);
  const [box, setBox] = useState<BoxSize>({ w: 0, h: 0 });

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const w = Math.round(
        el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
      );
      const h = Math.round(
        el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom),
      );
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    /* ResizeObserver catches layout-driven size changes; the resize
       listener is the belt-and-braces path for environments where RO
       delivery is suspended along with rendering. */
    const obs = new ResizeObserver(measure);
    obs.observe(el);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return [ref, box];
}

/* ────────────────────────────────────────────
   Mounted flag — guards browser-only renders
   ──────────────────────────────────────────── */

/* useSyncExternalStore instead of the classic setState-in-effect pattern:
   same hydration-safe behaviour (false on the server render, true right
   after), without the extra cascading re-render the lint rule flags. */
const noopSubscribe = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/* ────────────────────────────────────────────
   Reduced motion (re-export for ergonomics)
   ──────────────────────────────────────────── */

export function useReduced(): boolean {
  return !!useReducedMotion();
}

/* ────────────────────────────────────────────
   Pointer-driven 3D tilt
   ──────────────────────────────────────────────
   Returns spring-smoothed rotateX / rotateY / glare position values plus
   handlers to spread on the target element. The card rotates toward the
   pointer; leaving resets it to rest.
   ──────────────────────────────────────────── */

export interface TiltOptions {
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** Spring config for the smoothing. */
  spring?: SpringOptions;
  /** Disable entirely (reduced motion / touch). */
  disabled?: boolean;
  /** Scale applied while hovering. */
  hoverScale?: number;
}

export interface TiltState {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  glareX: MotionValue<number>;
  glareY: MotionValue<number>;
  glareOpacity: MotionValue<number>;
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const DEFAULT_TILT_SPRING: SpringOptions = {
  stiffness: 150,
  damping: 18,
  mass: 0.4,
};

export function useTilt(options: TiltOptions = {}): TiltState {
  const {
    max = 12,
    spring = DEFAULT_TILT_SPRING,
    disabled = false,
    hoverScale = 1.03,
  } = options;

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const scaleRaw = useMotionValue(1);
  const glareXRaw = useMotionValue(50);
  const glareYRaw = useMotionValue(50);
  const glareORaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, spring);
  const rotateY = useSpring(rotateYRaw, spring);
  const scale = useSpring(scaleRaw, { stiffness: 200, damping: 20 });
  const glareX = useSpring(glareXRaw, spring);
  const glareY = useSpring(glareYRaw, spring);
  const glareOpacity = useSpring(glareORaw, { stiffness: 120, damping: 20 });

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (disabled) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      rotateYRaw.set((px - 0.5) * 2 * max);
      rotateXRaw.set(-(py - 0.5) * 2 * max);
      glareXRaw.set(px * 100);
      glareYRaw.set(py * 100);
    },
    [disabled, max, rotateXRaw, rotateYRaw, glareXRaw, glareYRaw],
  );

  const onPointerEnter = useCallback(() => {
    if (disabled) return;
    scaleRaw.set(hoverScale);
    glareORaw.set(0.35);
  }, [disabled, hoverScale, scaleRaw, glareORaw]);

  const onPointerLeave = useCallback(() => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    scaleRaw.set(1);
    glareORaw.set(0);
    glareXRaw.set(50);
    glareYRaw.set(50);
  }, [rotateXRaw, rotateYRaw, scaleRaw, glareORaw, glareXRaw, glareYRaw]);

  return {
    rotateX,
    rotateY,
    scale,
    glareX,
    glareY,
    glareOpacity,
    onPointerMove,
    onPointerEnter,
    onPointerLeave,
  };
}

/* ────────────────────────────────────────────
   Global pointer position (normalised -1..1)
   ──────────────────────────────────────────────
   Used for hero parallax where layers react to the pointer across the whole
   viewport rather than a single card.
   ──────────────────────────────────────────── */

export interface PointerField {
  x: MotionValue<number>; // -1 .. 1
  y: MotionValue<number>; // -1 .. 1
}

export function usePointerField(disabled = false): PointerField {
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(yRaw, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      xRaw.set(nx);
      yRaw.set(ny);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [disabled, xRaw, yRaw]);

  return { x, y };
}

/* ────────────────────────────────────────────
   Deterministic pseudo-random generator
   ──────────────────────────────────────────────
   A seeded RNG so SSR markup matches the client exactly (no hydration drift
   for particle fields and decorative scatter).
   ──────────────────────────────────────────── */

export function makeRng(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ────────────────────────────────────────────
   Scatter — memoised deterministic particle set
   ──────────────────────────────────────────── */

export interface ScatterPoint {
  id: number;
  left: number;
  top: number;
  size: number;
  depth: number;
  delay: number;
  duration: number;
  hue: number;
}

export function useScatter(count: number, seed = 11): ScatterPoint[] {
  return useMemo(() => {
    const rand = makeRng(seed);
    const out: ScatterPoint[] = [];
    for (let i = 0; i < count; i++) {
      out.push({
        id: i,
        left: Number((rand() * 100).toFixed(3)),
        top: Number((rand() * 100).toFixed(3)),
        size: Number((4 + rand() * 26).toFixed(3)),
        depth: Number(rand().toFixed(3)),
        delay: Number((rand() * 6).toFixed(3)),
        duration: Number((5 + rand() * 7).toFixed(3)),
        hue: Number((rand() * 60).toFixed(3)),
      });
    }
    return out;
  }, [count, seed]);
}

/* ────────────────────────────────────────────
   In-view once — lightweight IntersectionObserver
   ──────────────────────────────────────────── */

export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "-12% 0px",
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView];
}

/* ────────────────────────────────────────────
   Interval tick (for auto-advancing carousels)
   ──────────────────────────────────────────── */

export function useTick(active: boolean, ms: number): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [active, ms]);
  return tick;
}
