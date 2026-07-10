"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CareerPaths3D — scroll-driven "rising platform" of 3D flip cards
   ──────────────────────────────────────────────────────────────────────────
   Career destinations live on a 3D platform that is tilted away from the
   viewer. As the section scrolls up into view the whole platform *rises and
   levels out* (rotateX → 0) while each card lifts from depth with a stagger —
   a motion deliberately different from the horizontal cover-flow used for the
   faculty. Each card keeps its signature hover/focus flip to reveal concrete
   roles and hiring sectors. Live data from @/data/careers, re-tinted to λαχανί.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Rotate3d } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { careerPaths, type CareerPath } from "@/data/careers";
import { Icon, SectionHeading } from "./lib/primitives";
import { useReduced } from "./lib/hooks";
import type { IconKey } from "./lib/data";

const CAREER_ICON: Record<string, IconKey> = {
  "flask-conical": "flask",
  factory: "factory",
  "heart-handshake": "heart-handshake",
  rocket: "rocket",
  "graduation-cap": "graduation",
};

/* Re-tint every theme to a λαχανί shade so nothing clashes with the canvas. */
const THEME: Record<CareerPath["colorTheme"], { from: string; to: string; accent: string }> = {
  blue: { from: "#5E9A4E", to: "#9FCB4C", accent: "#5E9A4E" },
  green: { from: "#7E9636", to: "#B9D84A", accent: "#879D42" },
  emerald: { from: "#3E7A4E", to: "#7FC79A", accent: "#3E9466" },
  indigo: { from: "#6E7C1E", to: "#C8E25E", accent: "#9DAE2E" },
  slate: { from: "#5F712A", to: "#A5BA5F", accent: "#5F712A" },
};

function FlipCard({ path }: { path: CareerPath }) {
  const theme = THEME[path.colorTheme];
  const iconKey = CAREER_ICON[path.icon] ?? "rocket";
  return (
    <div className="group h-[23rem] [perspective:1600px]">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.6rem] glass-lachani p-7 [backface-visibility:hidden]">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{ background: `linear-gradient(140deg, ${theme.from}, ${theme.to})` }}
          >
            <Icon name={iconKey} size={30} />
          </div>
          <h3 className="mt-5 font-heading text-xl font-bold text-text-primary">{path.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{path.shortDescription}</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide" style={{ color: theme.accent }}>
            <Rotate3d size={14} /> Περάστε για ρόλους
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.6rem] p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ background: `linear-gradient(150deg, ${theme.from}, ${theme.to})` }}
        >
          <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/15 blur-md animate-lh-sheen" />
          <h3 className="font-heading text-lg font-bold">{path.title}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">Ενδεικτικοί ρόλοι</p>
          <ul className="mt-2 space-y-1.5">
            {path.roles.map((role) => (
              <li key={role} className="flex items-center gap-2 text-sm font-medium">
                <span className="h-1.5 w-1.5 rotate-45 bg-white/80" /> {role}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/70">Τομείς απασχόλησης</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {path.opportunities.map((opp) => (
              <span key={opp} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium ring-1 ring-white/25">
                {opp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Per-card lift: each tile rises out of depth with a stagger ── */
function CardRiser({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const start = (index / total) * 0.4;
  const end = start + 0.55;
  const z = useTransform(progress, [start, end], [-260, 0], { clamp: true });
  const y = useTransform(progress, [start, end], [70, 0], { clamp: true });
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.3)], [0, 1], { clamp: true });
  return (
    <motion.div style={{ z, y, opacity }} className="[transform-style:preserve-3d] will-change-transform">
      {children}
    </motion.div>
  );
}

export function CareerPaths3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  // the whole platform tilts up from a raked angle to flat
  const rotateX = useTransform(smooth, [0, 1], reduced ? [0, 0] : [32, 0]);
  const platformY = useTransform(smooth, [0, 1], reduced ? [0, 0] : [60, 0]);
  const platformOpacity = useTransform(smooth, [0, 0.4], [reduced ? 1 : 0.2, 1]);

  return (
    <section id="careers" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Καριέρα"
          labelIcon="trending"
          title="Πέντε μονοπάτια"
          highlight="σταδιοδρομίας"
          description="Το προφίλ των αποφοίτων μας αντιστοιχεί σε σύγχρονα, άρτια εκπαιδευμένα στελέχη — έτοιμα για τον ιδιωτικό και τον δημόσιο τομέα."
        />

        {/* the raked 3D platform */}
        <div ref={ref} className="mt-16 [perspective:1500px] [perspective-origin:50%_0%]">
          <motion.div
            style={{ rotateX, y: platformY, opacity: platformOpacity, transformOrigin: "50% 15%" }}
            className="grid grid-cols-1 gap-6 [transform-style:preserve-3d] sm:grid-cols-2 lg:grid-cols-3"
          >
            {careerPaths.map((path, i) => (
              <CardRiser key={path.id} progress={smooth} index={i} total={careerPaths.length + 1}>
                <FlipCard path={path} />
              </CardRiser>
            ))}

            {/* CTA tile to balance the 5-card grid */}
            <CardRiser progress={smooth} index={careerPaths.length} total={careerPaths.length + 1}>
              <div className="flex h-[23rem] flex-col justify-center rounded-[1.6rem] glass-lachani-deep p-8 text-center">
                <h3 className="font-heading text-2xl font-extrabold text-text-primary">
                  Δείτε όλες τις προοπτικές
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Αναλυτικές δεξιότητες, τομείς και ρόλοι για κάθε επαγγελματικό
                  μονοπάτι των αποφοίτων.
                </p>
                <Link
                  href="/karieres"
                  className="group mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
                >
                  Καριέρα & Απόφοιτοι
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </CardRiser>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CareerPaths3D;
