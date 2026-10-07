"use client";

/* ══════════════════════════════════════════════════════════════════════════
   StudyAtAGlance — «Πρόγραμμα σπουδών»
   ──────────────────────────────────────────────────────────────────────────
   The programme in one glance, as a <ZigZag/> section hugging the RIGHT of
   the screen (the announcements above hug the left): the two
   specialisations and, under them, the key numbers as one square-cut strip.
   A lab photo fills the left third (src/data/photos.ts → homeLab;
   placeholder until it is set). The semester-by-semester course lists are
   deliberately not repeated here — they live on /programma
   (SpecializationTracks3D). Data: src/data/courses.ts, src/data/program.ts.
   ══════════════════════════════════════════════════════════════════════════ */

import { specializations } from "@/data/courses";
import { program } from "@/data/program";
import { AsidePhoto } from "@/components/ui/PhotoSlot";
import { cn } from "@/lib/utils";
import { ArrowLink, Icon, Reveal, SectionHeading } from "./lib/primitives";
import { ZigZag } from "./lib/ZigZag";
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
      <ZigZag side="right" aside={<AsidePhoto photo="homeLab" />}>
        <SectionHeading
          label="Σπουδές"
          labelIcon="graduation"
          title="Πρόγραμμα"
          highlight="σπουδών"
          description="Κοινός κορμός και δύο ειδικεύσεις: οι φοιτητές επιλέγουν ειδίκευση και παρακολουθούν ένα μάθημά της σε κάθε διδακτικό εξάμηνο."
          action={{ href: "/programma", label: "Αναλυτικό πρόγραμμα σπουδών" }}
        />

        {/* The two specialisations */}
        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:gap-6">
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

        {/* The key numbers, once, as one square-cut strip */}
        <Reveal direction="up" delay={0.16}>
          <dl className="mt-6 grid grid-cols-2 edge-top bg-white/60 backdrop-blur-sm sm:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={cn(
                  "border-ihu-green-dark/12 px-5 py-4",
                  i % 2 === 1 && "border-l",
                  i === 2 && "sm:border-l",
                  i < 2 && "border-b sm:border-b-0",
                )}
              >
                <dd className="font-heading text-3xl font-extrabold tabular-nums text-ihu-green-dark">{f.value}</dd>
                <dt className="mt-0.5 text-sm text-text-secondary">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </ZigZag>
    </section>
  );
}

export default StudyAtAGlance;
