"use client";

/* ══════════════════════════════════════════════════════════════════════════
   StudentLifecycle3D — "Η διαδρομή σου, εξάμηνο-εξάμηνο"
   ──────────────────────────────────────────────────────────────────────────
   The student journey across the three semesters as a scroll-linked vertical
   timeline. A glowing rail fills with scroll while each phase card slides in
   with its milestones and a gradient seal.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { lifecycle } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { GlowOrb } from "./lib/decorations";

export function StudentLifecycle3D() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 65%", "end 70%"] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 110, damping: 28, restDelta: 0.001 });

  return (
    <section id="lifecycle" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="right-[-8%] top-32" size={360} color="rgba(216,236,128,0.4)" />
      <GlowOrb className="left-[-6%] bottom-20" size={320} color="rgba(135,157,66,0.35)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Η διαδρομή σου"
          labelIcon="graduation"
          title="Τρία εξάμηνα,"
          highlight="μία εξέλιξη"
          description="Από τα θεμέλια του κορμού μέχρι τη διπλωματική σας εργασία — δείτε πώς εξελίσσεστε σε κάθε εξάμηνο."
        />

        <div ref={railRef} className="relative mx-auto mt-16 max-w-3xl">
          {/* rail */}
          <div className="absolute left-[31px] top-2 bottom-2 w-1 rounded-full bg-ihu-green-dark/12 md:left-1/2 md:-translate-x-1/2" aria-hidden />
          <motion.div
            className="absolute left-[31px] top-2 w-1 origin-top rounded-full bg-gradient-to-b from-ihu-green-light to-ihu-green-dark md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: fill, height: "calc(100% - 1rem)" }}
            aria-hidden
          />

          <ol className="space-y-10">
            {lifecycle.map((phase, i) => {
              const isRight = i % 2 === 1;
              return (
                <Reveal as="li" key={phase.semester} delay={i * 0.06} direction={isRight ? "right" : "left"} className="relative md:grid md:grid-cols-2 md:gap-8">
                  {/* node */}
                  <div className="absolute left-0 top-0 z-10 md:left-1/2 md:-translate-x-1/2">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl ring-4 ring-[#cfe07f]/40"
                      style={{ background: `linear-gradient(140deg, ${phase.from}, ${phase.to})` }}
                    >
                      <Icon name={phase.icon} size={28} />
                    </span>
                  </div>

                  {/* card */}
                  <div className={isRight ? "md:col-start-2 md:pl-4" : "md:col-start-1 md:row-start-1 md:text-right md:pr-4"}>
                    <div className="ml-24 rounded-3xl glass-lachani p-6 md:ml-0">
                      <div className={`flex items-center gap-2 ${isRight ? "" : "md:justify-end"}`}>
                        <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white" style={{ background: phase.accent }}>
                          {phase.semester}
                        </span>
                        <span className="rounded-full bg-white/55 px-2.5 py-0.5 text-[11px] font-bold text-ihu-green-dark">{phase.ects}</span>
                      </div>
                      <h3 className="mt-3 font-heading text-xl font-bold text-text-primary">{phase.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{phase.summary}</p>
                      <ul className={`mt-4 flex flex-wrap gap-2 ${isRight ? "" : "md:justify-end"}`}>
                        {phase.milestones.map((m) => (
                          <li key={m} className="rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-ihu-green-dark ring-1 ring-ihu-green-dark/10">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default StudentLifecycle3D;
