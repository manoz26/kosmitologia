"use client";

/* ══════════════════════════════════════════════════════════════════════════
   BeforeAfterLight — the calm variant of <BeforeAfterSkin/>'s swatch
   ──────────────────────────────────────────────────────────────────────────
   Same draggable before/after skin comparison (SVG only, no stock photos) and
   live ενυδάτωση / ελαστικότητα meters, but presented as a quiet white card:
   no glass, no glow, no sticky column. Interactive-but-still is the point —
   it adds life to the light page without adding motion.
   ══════════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

import { useInViewOnce, useReduced } from "@/components/home/lib/hooks";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/* ── The dull "before" skin, drawn entirely in SVG ── */
function SkinBefore() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="bal-before" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6C6A9" />
          <stop offset="1" stopColor="#C79E80" />
        </linearGradient>
        <filter id="bal-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="400" height="300" fill="url(#bal-before)" />
      <rect width="400" height="300" fill="#6b6256" opacity="0.16" />
      <g stroke="#8a6a52" strokeWidth="1.6" fill="none" opacity="0.35" strokeLinecap="round">
        <path d="M36 68 q60 -14 122 -2" />
        <path d="M50 96 q64 -12 128 0" />
        <path d="M234 118 q52 -10 112 -2" />
        <path d="M58 208 q82 16 152 6" />
        <path d="M210 234 q70 12 132 0" />
      </g>
      <g fill="#9a6a48" opacity="0.32" filter="url(#bal-soft)">
        <ellipse cx="120" cy="150" rx="10" ry="7" />
        <ellipse cx="300" cy="82" rx="8" ry="6" />
        <ellipse cx="332" cy="212" rx="11" ry="8" />
        <ellipse cx="92" cy="250" rx="7" ry="5" />
        <ellipse cx="200" cy="196" rx="6" ry="5" />
      </g>
    </svg>
  );
}

/* ── The radiant "after" skin ── */
function SkinAfter() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="bal-after" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F9E7D5" />
          <stop offset="1" stopColor="#ECC9AE" />
        </linearGradient>
        <radialGradient id="bal-glow" cx="0.5" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bal-after)" />
      <rect width="400" height="300" fill="url(#bal-glow)" />
      <path d="M-40 120 L200 -24 L262 18 L22 162 Z" fill="#B9D84A" opacity="0.14" />
      <g fill="#ffffff">
        <path d="M312 68 l3.2 8.4 l8.4 3.2 l-8.4 3.2 l-3.2 8.4 l-3.2 -8.4 l-8.4 -3.2 l8.4 -3.2 z" opacity="0.92" />
        <path d="M118 210 l2.4 6.4 l6.4 2.4 l-6.4 2.4 l-2.4 6.4 l-2.4 -6.4 l-6.4 -2.4 l6.4 -2.4 z" opacity="0.8" />
        <path d="M250 175 l1.8 4.8 l4.8 1.8 l-4.8 1.8 l-1.8 4.8 l-1.8 -4.8 l-4.8 -1.8 l4.8 -1.8 z" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ── Live meter overlaid on the swatch ── */
function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/80 px-2.5 py-1.5 shadow-sm ring-1 ring-white/60 backdrop-blur-sm">
      <div className="flex items-center justify-between text-[10px] font-semibold text-ihu-green-dark">
        <span>{label}</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ihu-green-dark/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ihu-green to-ihu-green-dark"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function BeforeAfterLight() {
  // Divider position from the left (%). Left = "πριν", right = "μετά".
  const [pos, setPos] = useState(60);
  const [hint, setHint] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const userMoved = useRef(false);
  const [wrapRef, inView] = useInViewOnce<HTMLDivElement>();
  const reduced = useReduced();

  const setFromClientX = useCallback((clientX: number) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100, 4, 96));
  }, []);

  const markMoved = useCallback(() => {
    userMoved.current = true;
    setHint(false);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      markMoved();
      dragging.current = true;
      setFromClientX(e.clientX);
    },
    [markMoved, setFromClientX],
  );

  // Global move/up so the drag keeps working outside the swatch bounds.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  // One-time "drag me" sweep once the swatch scrolls into view.
  useEffect(() => {
    if (!inView || reduced || userMoved.current) return;
    let raf = 0;
    const start = performance.now();
    const dur = 2600;
    const keys = [60, 74, 30, 60];
    const step = (now: number) => {
      if (userMoved.current) return;
      const t = Math.min((now - start) / dur, 1);
      const n = keys.length - 1;
      const s = t * n;
      const i = Math.min(Math.floor(s), n - 1);
      setPos(keys[i] + (keys[i + 1] - keys[i]) * easeInOut(s - i));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      markMoved();
      setPos((p) => clamp(p + (e.key === "ArrowLeft" ? -4 : 4), 4, 96));
    }
  };

  // Amount of "μετά" revealed → drives the live meters.
  const after = (100 - pos) / 100;
  const hydration = Math.round(lerp(41, 92, after));
  const elasticity = Math.round(lerp(38, 86, after));

  return (
    <div ref={wrapRef}>
      <div className="rounded-3xl bg-white p-2.5 shadow-sm ring-1 ring-slate-200">
        <div
          ref={panelRef}
          role="slider"
          tabIndex={0}
          aria-label="Σύγκριση δέρματος: πριν και μετά"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(after * 100)}
          aria-valuetext={`Αποτέλεσμα ${Math.round(after * 100)}%`}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
          style={{ touchAction: "pan-y" }}
          className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ihu-green"
        >
          {/* before (full) */}
          <SkinBefore />
          {/* after (revealed from the divider rightwards) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <SkinAfter />
          </div>

          {/* corner labels */}
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            Πριν
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ihu-green-dark/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            Μετά
          </span>

          {/* live meters */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 grid grid-cols-2 gap-2">
            <MetricBar label="Ενυδάτωση" value={hydration} />
            <MetricBar label="Ελαστικότητα" value={elasticity} />
          </div>

          {/* divider + grabber */}
          <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/85 shadow-[0_0_10px_rgba(0,0,0,0.25)]" />
            <div className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ihu-green-dark shadow-lg ring-1 ring-ihu-green-dark/10">
              {hint && !reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />
              )}
              <ChevronsLeftRight size={18} />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-medium text-text-secondary">
        Σύρετε τη μπάρα — δείτε το αποτέλεσμα της αντιγήρανσης
      </p>
    </div>
  );
}

export default BeforeAfterLight;
