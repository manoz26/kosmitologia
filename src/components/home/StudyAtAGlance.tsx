"use client";

/* ══════════════════════════════════════════════════════════════════════════
   StudyAtAGlance — «Πρόγραμμα σπουδών»
   ──────────────────────────────────────────────────────────────────────────
   The programme in one glance: the key numbers as a ruled ledger on the left
   (4 of 12 columns) and the two specialisations on the right. The
   semester-by-semester course lists are deliberately not repeated here —
   they live on /programma (SpecializationTracks3D). Calm by design (one-shot
   reveals, no pinning). Data: src/data/courses.ts and src/data/program.ts.
   ══════════════════════════════════════════════════════════════════════════ */

import { specializations } from "@/data/courses";
import { program } from "@/data/program";
import { ArrowLink, Icon, Reveal, SectionHeading } from "./lib/primitives";
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
          title="Πρόγραμμα"
          highlight="σπουδών"
          description="Κοινός κορμός και δύο ειδικεύσεις: οι φοιτητές επιλέγουν ειδίκευση και παρακολουθούν ένα μάθημά της σε κάθε διδακτικό εξάμηνο."
          action={{ href: "/programma", label: "Αναλυτικό πρόγραμμα σπουδών" }}
        />

        <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-12 lg:gap-6">
          {/* Left: the key numbers, once, as a ruled ledger */}
          <Reveal direction="up" className="lg:col-span-4">
            <dl className="h-full edge-top bg-white/60 px-6 py-2 backdrop-blur-sm">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-4 border-b border-ihu-green-dark/12 py-4 last:border-b-0"
                >
                  <dt className="text-sm text-text-secondary">{f.label}</dt>
                  <dd className="font-heading text-3xl font-extrabold tabular-nums text-ihu-green-dark">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Right: the two specialisations */}
          <div className="grid gap-5 md:grid-cols-2 lg:col-span-8 lg:gap-6">
            {specializations.map((s, i) => (
              <Reveal key={s.id} delay={0.06 + i * 0.08} direction="up" className="h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl glass-lachani p-6 md:p-7">
                  <span
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ background: `linear-gradient(140deg, ${s.from}, ${s.to})` }}
                  >
                    <Icon name={s.icon as IconKey} size={22} />
                  </span>
                  <p className="relative mt-6 text-sm font-semibold text-ihu-green-dark">Ειδίκευση {s.numeral}</p>
                  <h3 className="relative mt-1 font-heading text-xl font-bold leading-snug text-text-primary">{s.nameGr}</h3>
                  <p className="relative mt-1 text-xs italic text-text-secondary">{s.nameEn}</p>
                  <p className="relative mt-4 text-sm leading-relaxed text-text-secondary">{s.tagline}</p>
                  <div className="relative mt-auto pt-6">
                    <ArrowLink href="/programma#specializations">Τα μαθήματα της ειδίκευσης</ArrowLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudyAtAGlance;
