"use client";

/* ══════════════════════════════════════════════════════════════════════════
   WhyChooseSection — scroll-driven cards that "stand up"
   ──────────────────────────────────────────────────────────────────────────
   Six reasons, each on a card that starts lying back on the table (hinged at
   its bottom edge, rotateX ≈ -82°) and rises to vertical as the section
   scrolls into view. A per-card stagger turns it into a domino-like wave —
   a motion distinct from the faculty cover-flow and the careers platform.
   Pointer tilt is retained on the standing card for a tactile finish.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { reasons, type Reason } from "./lib/data";
import { Icon, SectionHeading } from "./lib/primitives";
import { useReduced } from "./lib/hooks";

function StandingCard({
  reason,
  index,
  total,
  progress,
}: {
  reason: Reason;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // staggered hinge window per card
  const start = (index / total) * 0.55;
  const end = start + 0.45;
  const rotateX = useTransform(progress, [start, end], [-82, 0], { clamp: true });
  const y = useTransform(progress, [start, end], [60, 0], { clamp: true });
  const z = useTransform(progress, [start, end], [-160, 0], { clamp: true });
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.22)], [0, 1], { clamp: true });

  return (
    <motion.div
      style={{ rotateX, y, z, opacity, transformOrigin: "50% 100%" }}
      className="group relative h-full [transform-style:preserve-3d] will-change-transform"
    >
      <div className="relative h-full overflow-hidden rounded-3xl glass-lachani p-7 transition-shadow duration-300 group-hover:shadow-[0_30px_70px_-30px_rgba(95,113,42,0.6)]">
        <div
          className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: "radial-gradient(circle, rgba(216,236,128,0.9), transparent 70%)" }}
          aria-hidden
        />
        <div className="flex items-start justify-between">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg"
            style={{ transform: "translateZ(46px)" }}
          >
            <Icon name={reason.icon} size={26} />
          </span>
          <span
            className="font-heading text-5xl font-black text-ihu-green-dark/10"
            style={{ transform: "translateZ(20px)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3
          className="mt-5 font-heading text-xl font-bold text-text-primary"
          style={{ transform: "translateZ(30px)" }}
        >
          {reason.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{reason.description}</p>
      </div>
    </motion.div>
  );
}

export function WhyChooseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 0.55"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  return (
    <section id="why" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Γιατί εμάς"
          labelIcon="star"
          title="Έξι λόγοι να επιλέξετε"
          highlight="το ΠΜΣ Κοσμητολογίας"
          description="Από την εργαστηριακή πρακτική μέχρι το διεπιστημονικό σώμα ΔΕΠ — ένα πρόγραμμα σχεδιασμένο για πραγματική επαγγελματική εξέλιξη."
        />

        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 gap-5 [perspective:1300px] [perspective-origin:50%_30%] sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason, i) =>
            reduced ? (
              <div key={reason.title} className="group relative h-full">
                <div className="relative h-full overflow-hidden rounded-3xl glass-lachani p-7">
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                      <Icon name={reason.icon} size={26} />
                    </span>
                    <span className="font-heading text-5xl font-black text-ihu-green-dark/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-text-primary">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{reason.description}</p>
                </div>
              </div>
            ) : (
              <StandingCard
                key={reason.title}
                reason={reason}
                index={i}
                total={reasons.length}
                progress={smooth}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
