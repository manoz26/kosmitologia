"use client";

/* ══════════════════════════════════════════════════════════════════════════
   StudyAtAGlance — «Τι θα σπουδάσεις»
   ──────────────────────────────────────────────────────────────────────────
   The programme in one glance: the two specialisations and the key numbers.
   The semester-by-semester course lists are deliberately not repeated here —
   they live on /programma (SpecializationTracks3D). Calm by design (one-shot
   reveals, no pinning). Data: src/data/courses.ts and src/data/program.ts.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { specializations } from "@/data/courses";
import { program } from "@/data/program";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import type { IconKey } from "./lib/data";

const facts = [
  { value: `${program.ects.value}`, label: "ECTS" },
  { value: `${program.semesters.value.min}`, label: `εξάμηνα (έως ${program.semesters.value.max})` },
  { value: `${program.specializations.value}`, label: "ειδικεύσεις" },
  { value: `${program.courses.value}`, label: "μαθήματα" },
];

export function StudyAtAGlance() {
  return (
    <section id="spoudes" className="relative w-full overflow-hidden py-24 md:py-28">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Σπουδές"
          labelIcon="graduation"
          title="Τι θα"
          highlight="σπουδάσεις"
          description="Ένα πρόγραμμα με κοινό κορμό και δύο ειδικεύσεις. Επιλέγεις ειδίκευση και σε κάθε εξάμηνο παρακολουθείς ένα μάθημά της."
        />

        {/* The two specialisations */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {specializations.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} direction="up">
              <div className="flex h-full gap-4 rounded-3xl glass-lachani p-6 md:p-7">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{ background: `linear-gradient(140deg, ${s.from}, ${s.to})` }}
                >
                  <Icon name={s.icon as IconKey} size={22} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ihu-green-dark">
                    Ειδίκευση {s.numeral}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-bold leading-snug text-text-primary">{s.nameGr}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.tagline}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Key numbers, once */}
        <Reveal delay={0.2} direction="up">
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {facts.map((f) => (
              <li key={f.label}>
                <span className="block font-heading text-3xl font-extrabold text-ihu-green-dark">{f.value}</span>
                <span className="mt-0.5 block text-sm text-text-secondary">{f.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25} direction="up" className="mt-10 text-center">
          <Link
            href="/programma"
            className="group inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
          >
            Δες το πρόγραμμα αναλυτικά
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default StudyAtAGlance;
