"use client";

/* ══════════════════════════════════════════════════════════════════════════
   BeforeAfterSkin
   ──────────────────────────────────────────────────────────────────────────
   An interactive "science with results" section. On the left, a draggable
   before / after skin swatch (fully drawn in SVG — no stock photos) lets the
   visitor reveal the anti-ageing result; live ενυδάτωση / ελαστικότητα meters
   track the slider. On the right, facts about the School reveal one by one as
   the visitor scrolls. On desktop the swatch is sticky so it stays in view
   while the story scrolls past. Transparent — floats over <ScrollBackdrop/>.
   ══════════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronsLeftRight } from "lucide-react";

import {
  SectionHeading,
  GlassPanel,
  Reveal,
  IconBadge,
  MiniStat,
} from "./lib/primitives";
import { useInViewOnce, useReduced } from "./lib/hooks";
import type { IconKey } from "./lib/data";

/* ── Content: what the visitor learns about the School while scrolling ── */
const schoolFacts: { icon: IconKey; title: string; text: string }[] = [
  {
    icon: "building",
    title: "Το Τμήμα & το Ίδρυμα",
    text: "Τμήμα Επιστημών Διατροφής & Διαιτολογίας του Διεθνούς Πανεπιστημίου της Ελλάδος — Αλεξάνδρεια Πανεπιστημιούπολη, Σίνδος Θεσσαλονίκης.",
  },
  {
    icon: "map-pin",
    title: "1.600 στρέμματα campus",
    text: "Υπερσύγχρονες ιδιόκτητες εγκαταστάσεις — το ιδανικό περιβάλλον για την ακαδημαϊκή και ερευνητική ανάπτυξη των φοιτητών.",
  },
  {
    icon: "microscope",
    title: "Σύγχρονα εργαστήρια",
    text: "Εξοπλισμός ενόργανης ανάλυσης & αξιολόγησης — από τη φασματοσκοπία και τη χρωματογραφία μέχρι τις in vivo μετρήσεις δέρματος.",
  },
  {
    icon: "scan-face",
    title: "Επιστήμη με μετρήσιμο αποτέλεσμα",
    text: "Δεν μένουμε στους ισχυρισμούς: πιστοποιούμε την αποτελεσματικότητα με κλινική & ενόργανη αξιολόγηση — ακριβώς όπως δείχνουν οι δείκτες δίπλα.",
  },
];

/* ── Small helpers ── */
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
        <linearGradient id="ba-before" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6C6A9" />
          <stop offset="1" stopColor="#C79E80" />
        </linearGradient>
        <filter id="ba-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="400" height="300" fill="url(#ba-before)" />
      {/* dull, sallow overlay */}
      <rect width="400" height="300" fill="#6b6256" opacity="0.16" />
      {/* fine lines & wrinkles */}
      <g stroke="#8a6a52" strokeWidth="1.6" fill="none" opacity="0.35" strokeLinecap="round">
        <path d="M36 68 q60 -14 122 -2" />
        <path d="M50 96 q64 -12 128 0" />
        <path d="M234 118 q52 -10 112 -2" />
        <path d="M58 208 q82 16 152 6" />
        <path d="M210 234 q70 12 132 0" />
      </g>
      {/* age / sun spots */}
      <g fill="#9a6a48" opacity="0.32" filter="url(#ba-soft)">
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
        <linearGradient id="ba-after" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F9E7D5" />
          <stop offset="1" stopColor="#ECC9AE" />
        </linearGradient>
        <radialGradient id="ba-glow" cx="0.5" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ba-after)" />
      <rect width="400" height="300" fill="url(#ba-glow)" />
      {/* soft λαχανί sheen */}
      <path d="M-40 120 L200 -24 L262 18 L22 162 Z" fill="#B9D84A" opacity="0.14" />
      {/* sparkles */}
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
    <div className="rounded-xl bg-white/78 px-2.5 py-1.5 shadow-sm ring-1 ring-white/60 backdrop-blur-sm">
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

export function BeforeAfterSkin() {
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
    <section id="sxoli" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container px-4">
        <SectionHeading
          label="Η Σχολή & η Επιστήμη"
          labelIcon="sparkles"
          title="Η διαφορά που κάνει η"
          highlight="γνώση"
          description="Στο ΠΜΣ Κοσμητολογία δεν σταματάμε στη θεωρία. Συνδυάζουμε τη μοριακή έρευνα με την κλινική & ενόργανη αξιολόγηση — και το αποδεικνύουμε με μετρήσιμα αποτελέσματα."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── Left: draggable before/after swatch (sticky on desktop) ── */}
          <div ref={wrapRef} className="lg:sticky lg:top-24">
            <GlassPanel className="p-2.5">
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
                className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl outline-none ring-1 ring-white/50 focus-visible:ring-2 focus-visible:ring-ihu-green"
              >
                {/* before (full) */}
                <SkinBefore />
                {/* after (revealed from the divider rightwards) */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
                >
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
            </GlassPanel>
            <p className="mt-3 text-center text-xs font-medium text-text-secondary">
              Σύρετε τη μπάρα — δείτε το αποτέλεσμα της αντιγήρανσης
            </p>
          </div>

          {/* ── Right: the story about the School, revealed on scroll ── */}
          <div className="space-y-5">
            {schoolFacts.map((f, i) => (
              <Reveal key={f.title} direction="up" delay={i * 0.05}>
                <GlassPanel className="flex items-start gap-4 p-5">
                  <IconBadge icon={f.icon} />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-text-primary">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {f.text}
                    </p>
                  </div>
                </GlassPanel>
              </Reveal>
            ))}

            <Reveal direction="up">
              <GlassPanel className="p-5">
                <div className="grid grid-cols-3 gap-2">
                  <MiniStat value="3" label="Εξάμηνα" />
                  <MiniStat value="90" label="ECTS" />
                  <MiniStat value="40" label="Φοιτητές / έτος" />
                </div>
              </GlassPanel>
            </Reveal>

            <Reveal direction="up">
              <Link
                href="/sxetika"
                className="group inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg shadow-ihu-green-dark/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Περισσότερα για τη Σχολή
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterSkin;
