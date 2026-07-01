"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CareerAscent3D — «Η ανάβαση: από τον φοιτητή στο στέλεχος»
   ──────────────────────────────────────────────────────────────────────────
   The path from first day to professional standing, told as a scroll-linked
   vertical ascent. A glowing rail fills as you scroll while each stage card
   lifts out of depth (translateZ + rise) with its gradient step-seal and tags.
   Live data from @/data/careers.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { careerAscent, type AscentStep } from "@/data/careers";
import { Icon, SectionHeading } from "@/components/home/lib/primitives";
import { GlowOrb } from "@/components/home/lib/decorations";
import { useReduced } from "@/components/home/lib/hooks";

function AscentCard({
  step,
  index,
  total,
  progress,
  reduced,
}: {
  step: AscentStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = (index / total) * 0.7;
  const end = start + 0.4;
  const z = useTransform(progress, [start, end], reduced ? [0, 0] : [-220, 0], { clamp: true });
  const y = useTransform(progress, [start, end], reduced ? [0, 0] : [60, 0], { clamp: true });
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.25)], [reduced ? 1 : 0.15, 1], { clamp: true });

  return (
    <motion.li
      style={{ z, y, opacity }}
      className="relative grid grid-cols-[4rem_1fr] gap-5 [transform-style:preserve-3d] will-change-transform md:grid-cols-[5rem_1fr] md:gap-7"
    >
      {/* step seal on the rail */}
      <div className="relative z-10 flex justify-center">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-2xl font-heading text-xl font-black text-white shadow-xl ring-4 ring-[#cfe07f]/40 md:h-[4.5rem] md:w-[4.5rem]"
          style={{ background: `linear-gradient(140deg, ${step.from}, ${step.to})` }}
        >
          {step.index}
        </span>
      </div>

      {/* card */}
      <div className="rounded-3xl glass-lachani p-6 md:p-7">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow"
            style={{ background: `linear-gradient(140deg, ${step.from}, ${step.to})` }}
          >
            <Icon name={step.icon} size={20} />
          </span>
          <h3 className="font-heading text-xl font-bold text-text-primary">{step.title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">{step.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-ihu-green-dark ring-1 ring-ihu-green-dark/10"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export function CareerAscent3D() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReduced();

  // rail fill tracks the list scrolling through the viewport
  const { scrollYProgress: railScroll } = useScroll({ target: railRef, offset: ["start 70%", "end 70%"] });
  const fill = useSpring(useTransform(railScroll, [0, 1], [0, 1]), {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  // a separate, wider window drives the per-card 3D lift
  const { scrollYProgress: liftScroll } = useScroll({ target: railRef, offset: ["start end", "end center"] });
  const lift = useSpring(liftScroll, { stiffness: 80, damping: 26, restDelta: 0.001 });

  return (
    <section id="ascent" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="right-[-6%] top-24" size={360} color="rgba(216,236,128,0.38)" />
      <GlowOrb className="left-[-8%] bottom-16" size={320} color="rgba(135,157,66,0.32)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Η πορεία σας"
          labelIcon="trending"
          title="Από τον φοιτητή"
          highlight="στο στέλεχος"
          description="Από την πρώτη μέρα στο ΠΜΣ μέχρι την επαγγελματική σας καταξίωση, η δομή του προγράμματος είναι σχεδιασμένη να σας ανεβάζει βήμα-βήμα."
        />

        <div ref={railRef} className="relative mx-auto mt-16 max-w-3xl [perspective:1500px] [perspective-origin:50%_0%]">
          {/* rail track */}
          <div
            className="absolute top-2 bottom-2 left-[31px] w-1 rounded-full bg-ihu-green-dark/12 md:left-[39px]"
            aria-hidden
          />
          <motion.div
            className="absolute top-2 left-[31px] w-1 origin-top rounded-full bg-gradient-to-b from-ihu-green-light to-ihu-green-dark md:left-[39px]"
            style={{ scaleY: fill, height: "calc(100% - 1rem)" }}
            aria-hidden
          />

          <ol className="space-y-8 [transform-style:preserve-3d]">
            {careerAscent.map((step, i) => (
              <AscentCard
                key={step.index}
                step={step}
                index={i}
                total={careerAscent.length}
                progress={lift}
                reduced={reduced}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default CareerAscent3D;
