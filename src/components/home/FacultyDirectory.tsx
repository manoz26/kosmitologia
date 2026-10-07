"use client";

/* ══════════════════════════════════════════════════════════════════════════
   FacultyDirectory — «Διδάσκοντες» on /sxetika
   ──────────────────────────────────────────────────────────────────────────
   Replaces the old /didaskotes page (CommitteeSection + FacultySection) with
   one compact block: the Συντονιστική Επιτροπή as a row of names with their
   role (study guide σ.1), then every teacher as a small glass card with
   institution and email. Initials stand in for portraits until the client
   sends photos (Αλλαγή 5). Data: src/data/faculty.ts, src/data/program.ts.

   It sits right under the milestones on /sxetika (moved from /programma on
   07/10/2026, client's choice) and spans the same full row as they do. It
   also took over their «19 διδάσκοντες · 5 φορείς» strip: the numbers now
   lead the list they count.
   ══════════════════════════════════════════════════════════════════════════ */

import { Mail } from "lucide-react";

import { faculty, facultyAnchor, facultyInstitutionsText } from "@/data/faculty";
import { committee } from "@/data/program";
import { Reveal, SectionHeading } from "./lib/primitives";

const institutions = new Set(faculty.map((f) => f.institution)).size;

export function FacultyDirectory() {
  return (
    <section id="didaskontes" className="relative w-full overflow-hidden pb-20 pt-6 md:pb-24 md:pt-8">
      <div className="section-container relative z-10">
        <SectionHeading
          label="Ακαδημαϊκό προσωπικό"
          labelIcon="users"
          title={null}
          highlight="Διδάσκοντες"
          description={`Η Συντονιστική Επιτροπή και όσοι διδάσκουν στο πρόγραμμα, από ${facultyInstitutionsText()}.`}
        />

        {/* The numbers, then the Συντονιστική Επιτροπή — one square-cut panel */}
        <Reveal direction="up">
          <div className="mt-10 grid edge-top glass-lachani-deep md:mt-12 lg:grid-cols-12">
            <dl className="flex items-center gap-x-10 gap-y-4 border-b border-ihu-green-dark/10 p-6 md:p-7 lg:col-span-4 lg:border-b-0 lg:border-r xl:col-span-3">
              {[
                { value: faculty.length, label: "Διδάσκοντες" },
                { value: institutions, label: "Φορείς διδασκόντων" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm font-medium text-text-secondary">{s.label}</dt>
                  <dd className="font-heading text-4xl font-extrabold leading-none tabular-nums text-ihu-green-dark md:text-5xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="p-6 md:p-7 lg:col-span-8 xl:col-span-9">
              <h3 className="text-sm font-bold text-ihu-green-dark">Συντονιστική Επιτροπή</h3>
              {/* names at their natural width, wrapping as whole names */}
              <ul className="mt-4 grid gap-y-3 sm:flex sm:flex-wrap sm:gap-x-10">
                {committee.map((m) => (
                  <li key={m.email} className="flex items-baseline justify-between gap-3 border-b border-ihu-green-dark/10 pb-2 sm:block sm:border-0 sm:pb-0">
                    <span className="whitespace-nowrap font-heading text-sm font-bold text-text-primary">{m.name}</span>
                    <span className="text-xs text-text-secondary sm:block">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Everyone */}
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {faculty.map((f, i) => (
            <Reveal key={f.email} as="li" delay={(i % 4) * 0.05} direction="up">
              {/* The id is where the site search lands for this teacher. */}
              <div id={facultyAnchor(f)} className="flex h-full scroll-mt-28 items-start gap-3 rounded-2xl glass-lachani p-4">
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
