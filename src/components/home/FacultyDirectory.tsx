"use client";

/* ══════════════════════════════════════════════════════════════════════════
   FacultyDirectory — «Διδάσκοντες» on /programma
   ──────────────────────────────────────────────────────────────────────────
   Replaces the old /didaskotes page (CommitteeSection + FacultySection) with
   one compact block: the Συντονιστική Επιτροπή as a row of names with their
   role (study guide σ.1), then every teacher as a small glass card with
   institution and email. Initials stand in for portraits until the client
   sends photos (Αλλαγή 5). Data: src/data/faculty.ts, src/data/program.ts.
   ══════════════════════════════════════════════════════════════════════════ */

import { Mail } from "lucide-react";

import { faculty, facultyInstitutionsText } from "@/data/faculty";
import { committee } from "@/data/program";
import { Reveal, SectionHeading } from "./lib/primitives";

export function FacultyDirectory() {
  return (
    <section id="didaskontes" className="relative w-full overflow-hidden py-24 md:py-28">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Διδάσκοντες"
          labelIcon="users"
          title="Ποιοι"
          highlight="διδάσκουν"
          description={`${faculty.length} διδάσκοντες από ${facultyInstitutionsText()}.`}
        />

        {/* Συντονιστική Επιτροπή */}
        <Reveal direction="up">
          <div className="mx-auto mt-12 max-w-5xl rounded-3xl glass-lachani-deep p-6 md:p-7">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ihu-green-dark">
              Συντονιστική Επιτροπή
            </h3>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {committee.map((m) => (
                <li key={m.email} className="flex items-baseline justify-between gap-3 border-b border-ihu-green-dark/10 pb-2 sm:block sm:border-0 sm:pb-0">
                  <span className="font-heading text-sm font-bold text-text-primary">{m.name}</span>
                  <span className="text-xs text-text-secondary sm:block">{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Everyone */}
        <ul className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((f, i) => (
            <Reveal key={f.email} as="li" delay={(i % 3) * 0.05} direction="up">
              <div className="flex h-full items-start gap-3 rounded-2xl glass-lachani p-4">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ihu-green to-ihu-green-dark font-heading text-sm font-bold text-white"
                >
                  {f.initials}
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold leading-snug text-text-primary">{f.name}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {f.role} · {f.institution}
                  </p>
                  <a
                    href={`mailto:${f.email}`}
                    className="mt-1.5 inline-flex max-w-full items-center gap-1.5 text-xs font-medium text-ihu-green-dark hover:underline"
                  >
                    <Mail size={12} className="shrink-0" />
                    <span className="truncate">{f.email}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FacultyDirectory;
