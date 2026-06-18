"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ProgramOverview3D — "Το ΠΜΣ με μια ματιά" (scroll-assembled spec panel)
   ──────────────────────────────────────────────────────────────────────────
   The eight key facts start scattered deep in 3D space — offset, rotated and
   transparent — and *assemble* into a clean grid as the section scrolls to the
   centre of the viewport (each tile on its own staggered window). An
   accreditation / quality band settles in afterwards. Same data as before,
   now choreographed by scroll rather than a static pointer tilt.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { programFacts, accreditations, type ProgramFact } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { ParticleField } from "./lib/decorations";
import { useReduced } from "./lib/hooks";

/* Deterministic "scattered" origin for a tile, so SSR and client agree. */
function scatterFor(i: number) {
  const side = i % 2 === 0 ? -1 : 1;
  return {
    x: side * (170 + ((i * 29) % 110)),
    y: 70 + ((i * 41) % 70),
    z: -(280 + ((i * 57) % 260)),
    rotateY: side * (30 + ((i * 11) % 22)),
    rotateX: 20 - ((i * 7) % 16),
  };
}

function SpecCard({
  fact,
  index,
  progress,
}: {
  fact: ProgramFact;
  index: number;
  progress: MotionValue<number>;
}) {
  const s = scatterFor(index);
  const start = (index % 8) * 0.05;
  const end = start + 0.55;
  const x = useTransform(progress, [start, end], [s.x, 0], { clamp: true });
  const y = useTransform(progress, [start, end], [s.y, 0], { clamp: true });
  const z = useTransform(progress, [start, end], [s.z, 0], { clamp: true });
  const rotateY = useTransform(progress, [start, end], [s.rotateY, 0], { clamp: true });
  const rotateX = useTransform(progress, [start, end], [s.rotateX, 0], { clamp: true });
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.28)], [0, 1], { clamp: true });

  return (
    <motion.div
      style={{ x, y, z, rotateX, rotateY, opacity }}
      className="group relative h-full [transform-style:preserve-3d] will-change-transform"
    >
      <div className="relative h-full overflow-hidden rounded-3xl glass-lachani p-6 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg"
            style={{ transform: "translateZ(40px)" }}
          >
            <Icon name={fact.icon} size={20} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-ihu-green-dark/60">
            {fact.label}
          </span>
        </div>
        <p
          className="mt-4 font-heading text-2xl font-extrabold leading-none text-text-primary"
          style={{ transform: "translateZ(26px)" }}
        >
          {fact.value}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-text-secondary">{fact.note}</p>
      </div>
    </motion.div>
  );
}

export function ProgramOverview3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  return (
    <section id="overview" className="relative w-full overflow-hidden py-24 md:py-32">
      <ParticleField count={12} seed={88} glow="rgba(165,186,95,0.4)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Με μια ματιά"
          labelIcon="layers"
          title="Το ΠΜΣ"
          highlight="με μια ματιά"
          description="Όλα τα βασικά χαρακτηριστικά του προγράμματος σε μία οθόνη — διάρκεια, πιστωτικές μονάδες, δίδακτρα και μορφή φοίτησης."
        />

        <div
          ref={ref}
          className="mt-16 grid grid-cols-2 gap-4 [perspective:1500px] [perspective-origin:50%_40%] [transform-style:preserve-3d] md:grid-cols-4"
        >
          {programFacts.map((fact, i) =>
            reduced ? (
              <Reveal key={fact.label} delay={(i % 4) * 0.06} direction="up" className="h-full">
                <div className="relative h-full overflow-hidden rounded-3xl glass-lachani p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                      <Icon name={fact.icon} size={20} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-ihu-green-dark/60">
                      {fact.label}
                    </span>
                  </div>
                  <p className="mt-4 font-heading text-2xl font-extrabold leading-none text-text-primary">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">{fact.note}</p>
                </div>
              </Reveal>
            ) : (
              <SpecCard key={fact.label} fact={fact} index={i} progress={smooth} />
            ),
          )}
        </div>

        {/* Accreditation band */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-3 rounded-[2rem] glass-lachani-deep p-5 sm:grid-cols-4 md:gap-5 md:p-7">
            {accreditations.map((a) => (
              <div key={a.title} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/55 text-ihu-green-dark ring-1 ring-ihu-green-dark/10">
                  <Icon name={a.icon} size={20} />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-extrabold text-text-primary">{a.title}</p>
                  <p className="truncate text-[11px] text-text-secondary">{a.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ProgramOverview3D;
