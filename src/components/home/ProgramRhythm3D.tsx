"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ProgramRhythm3D — "Πώς λειτουργεί"
   ──────────────────────────────────────────────────────────────────────────
   How the programme is taught: the learning formats (in-person teaching and
   lab practice). The Fri–Sun "weekly rhythm" cards and the distance-learning
   format were removed on 2026-10-01 — that schedule is not in the study
   guide.
   ══════════════════════════════════════════════════════════════════════════ */

import { learningFormats } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { GlowOrb } from "./lib/decorations";

export function ProgramRhythm3D() {
  return (
    <section id="rhythm" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="left-[-6%] top-24" size={340} color="rgba(216,236,128,0.4)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Πώς λειτουργεί"
          labelIcon="clock"
          title="Θεωρία και"
          highlight="εργαστήριο"
          description="Διά ζώσης μαθήματα και πρακτική άσκηση στα εργαστήρια του Τμήματος."
        />

        {/* learning formats */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {learningFormats.map((format, i) => (
            <Reveal key={format.title} delay={i * 0.08} direction="up">
              <div className="flex h-full items-start gap-4 rounded-3xl glass-lachani-deep p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/55 text-ihu-green-dark ring-1 ring-ihu-green-dark/10">
                  <Icon name={format.icon} size={22} />
                </span>
                <div>
                  <h4 className="font-heading text-base font-bold text-text-primary">{format.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{format.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramRhythm3D;
