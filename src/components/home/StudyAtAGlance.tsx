"use client";

/* ══════════════════════════════════════════════════════════════════════════
   StudyAtAGlance — «Τι θα σπουδάσεις»
   ──────────────────────────────────────────────────────────────────────────
   The whole programme on one screen: the two specialisations, then the three
   semesters with their shared courses and the one course per semester where
   the specialisations fork. Calm by design (one-shot reveals, no pinning) —
   the deep, interactive view lives on /programma (SpecializationTracks3D).
   Data: src/data/courses.ts (study guide) and src/data/program.ts.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { curriculum, semesters, specializations } from "@/data/courses";
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

        {/* The three semesters */}
        <div className="mx-auto mt-5 grid max-w-5xl gap-5 lg:grid-cols-3">
          {curriculum.map((row, i) => {
            const sem = semesters.find((s) => s.id === row.semester)!;
            const ects = row.shared.reduce((n, c) => n + c.ects, 0) + (row.fork?.preparation.ects ?? 0);
            return (
              <Reveal key={row.semester} delay={0.1 + i * 0.08} direction="up">
                <div className="h-full rounded-3xl bg-white/60 p-6 ring-1 ring-ihu-green-dark/10">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-heading text-base font-bold text-text-primary">{sem.label}</h3>
                    <span className="text-xs font-bold tabular-nums text-ihu-green-dark">{ects} ECTS</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {row.shared.map((c) => (
                      <li key={c.code} className="text-sm leading-snug text-text-secondary">
                        {c.nameGr}
                      </li>
                    ))}
                  </ul>
                  {row.fork && (
                    <div className="mt-4 rounded-2xl bg-lachani-mist/70 p-3.5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ihu-green-dark">
                        Ανάλογα με την ειδίκευση
                      </p>
                      <p className="mt-1.5 text-sm leading-snug text-text-primary">
                        <span className="font-bold text-ihu-green-dark">Ι</span> {row.fork.preparation.nameGr}
                      </p>
                      <p className="mt-1 text-sm leading-snug text-text-primary">
                        <span className="font-bold text-ihu-green-dark">ΙΙ</span> {row.fork.dermatology.nameGr}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
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
