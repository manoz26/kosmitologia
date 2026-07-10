"use client";

/* ══════════════════════════════════════════════════════════════════════════
   FacultyHighlight3D — scroll-driven 3D coverflow of featured professors
   ──────────────────────────────────────────────────────────────────────────
   The four featured mentors sit on a curved 3D stage. As the section travels
   through the viewport, a "focus" value sweeps across the deck (driven purely
   by scroll): the centred card faces the viewer at full size while its
   neighbours rotate away on the Y-axis, recede in Z, blur and dim — a classic
   cover-flow that the visitor *scrubs* with the scroll wheel.

   Reduced-motion / small screens fall back to a calm vertical reveal stack so
   nothing depends on the 3D transforms.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { featuredProfessors, type FeaturedProfessor } from "./lib/data";
import { Reveal, SectionLabel, GradientText } from "./lib/primitives";
import { useReduced, useViewport } from "./lib/hooks";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* ── The inner visual of a single mentor card (shared by both layouts) ── */
function MentorFace({ prof }: { prof: FeaturedProfessor }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.8rem] glass-lachani-deep p-7 text-center [backface-visibility:hidden]">
      {/* coloured crown */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-90"
        style={{ background: `linear-gradient(180deg, ${prof.from}66, transparent)` }}
      />
      {/* drifting sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-y-4 -left-1/3 w-1/2 -skew-x-12 bg-white/25 blur-md animate-lh-sheen"
      />

      <div
        className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[1.6rem] font-heading text-3xl font-black text-white shadow-xl"
        style={{
          background: `linear-gradient(140deg, ${prof.from}, ${prof.to})`,
          transform: "translateZ(60px)",
        }}
      >
        {prof.initials}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[1.6rem] ring-1 ring-white/40"
        />
      </div>

      <h3
        className="relative mt-6 font-heading text-lg font-bold text-text-primary"
        style={{ transform: "translateZ(40px)" }}
      >
        {prof.name}
      </h3>
      <p className="mt-1 text-xs font-semibold text-ihu-green-dark">{prof.role}</p>
      <span className="mx-auto mt-3 inline-block rounded-full bg-white/55 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ihu-green-dark ring-1 ring-ihu-green-dark/10">
        {prof.institution}
      </span>
      <p className="mt-5 border-t border-ihu-green-dark/10 pt-5 text-sm leading-relaxed text-text-secondary">
        {prof.expertise}
      </p>
    </div>
  );
}

/* ── One card positioned on the cover-flow according to its distance to focus ── */
function CoverflowCard({
  prof,
  index,
  focus,
}: {
  prof: FeaturedProfessor;
  index: number;
  focus: MotionValue<number>;
}) {
  const delta = useTransform(focus, (f) => f - index); // 0 when centred
  const x = useTransform(delta, (d) => -d * 330);
  const rotateY = useTransform(delta, (d) => clamp(d * 42, -64, 64));
  const z = useTransform(delta, (d) => -Math.abs(d) * 260);
  const scale = useTransform(delta, (d) => Math.max(0.7, 1 - Math.abs(d) * 0.14));
  const opacity = useTransform(delta, (d) => clamp(1 - Math.abs(d) * 0.42, 0, 1));
  const zIndex = useTransform(delta, (d) => Math.round(60 - Math.abs(d) * 12));
  const filter = useTransform(delta, (d) => `blur(${Math.min(7, Math.abs(d) * 3.4)}px)`);

  return (
    <motion.div
      style={{ x, rotateY, z, scale, opacity, zIndex, filter }}
      className="absolute left-1/2 top-1/2 -ml-[165px] -mt-[210px] h-[420px] w-[330px] [transform-style:preserve-3d] will-change-transform"
    >
      <MentorFace prof={prof} />
    </motion.div>
  );
}

/* ── The scroll-scrubbed 3D deck ── */
function Coverflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const n = featuredProfessors.length;
  // focus sweeps 0 → n-1 across the central part of the section's transit
  const focus = useTransform(smooth, [0.14, 0.86], [0, n - 1], { clamp: true });

  // a live progress bar under the deck
  const barScale = useTransform(focus, [0, n - 1], [1 / n, 1]);

  return (
    <div ref={ref} className="relative mt-16">
      {/* the stage */}
      <div className="relative mx-auto h-[440px] w-full max-w-5xl [perspective:1900px] [perspective-origin:50%_42%]">
        {/* soft ground shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[78%] h-12 w-[60%] -translate-x-1/2 rounded-[50%] bg-ihu-green-dark/25 blur-2xl"
        />
        {featuredProfessors.map((prof, i) => (
          <CoverflowCard key={prof.name} prof={prof} index={i} focus={focus} />
        ))}
      </div>

      {/* scrub progress + hint */}
      <div className="mx-auto mt-6 flex max-w-xs flex-col items-center gap-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ihu-green-dark/10">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-ihu-green-light to-ihu-green-dark"
            style={{ scaleX: barScale }}
          />
        </div>
        <p className="text-xs font-medium text-ihu-green-dark/70">
          Κυλήστε για να γνωρίσετε το σώμα ΔΕΠ
        </p>
      </div>
    </div>
  );
}

/* ── Calm fallback for reduced-motion / small screens ── */
function FallbackGrid() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredProfessors.map((prof, i) => (
        <Reveal key={prof.name} delay={i * 0.08} direction="up" className="h-[420px]">
          <MentorFace prof={prof} />
        </Reveal>
      ))}
    </div>
  );
}

export function FacultyHighlight3D() {
  const reduced = useReduced();
  const { isMobile } = useViewport();
  const useFlow = !reduced && !isMobile;

  return (
    <section id="mentors" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal direction="up">
            <SectionLabel icon="users">Μέντορες</SectionLabel>
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-text-primary md:text-5xl">
              Μάθετε από <GradientText>τους καλύτερους</GradientText>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              Καθηγητές με διεθνή ερευνητική και επαγγελματική εμπειρία, που συνδυάζουν
              χημεία, δερματολογία και βιομηχανία.
            </p>
          </Reveal>
        </div>

        {useFlow ? <Coverflow /> : <FallbackGrid />}

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <Link
              href="/didaskotes"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-ihu-green-dark/30 bg-white/50 px-7 py-3.5 text-sm font-bold text-ihu-green-dark backdrop-blur-md transition-all hover:bg-ihu-green-dark hover:text-white"
            >
              Δείτε όλο το σώμα ΔΕΠ
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FacultyHighlight3D;
