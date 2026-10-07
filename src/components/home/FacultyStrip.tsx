"use client";

/* ══════════════════════════════════════════════════════════════════════════
   FacultyStrip — «Διδάσκοντες»
   ──────────────────────────────────────────────────────────────────────────
   A quiet strip of eight teachers: the Συντονιστική Επιτροπή (study guide
   σ.1) plus one teacher from each partner institution, so the breadth of the
   faculty reads at a glance. Initials stand in for portraits until the client
   sends photos (docs/protasi-anadiamorfosis.md, Αλλαγή 5). No ranks are shown —
   the study guide and faculty.ts disagree on them (see program.ts).

   Unlike the zig-zag sections around it, the strip is a compact block in the
   middle of the page — four small cards a row (client, 07/10/2026: "smaller,
   not stuck to one side"). The full list is on /sxetika#didaskontes.
   ══════════════════════════════════════════════════════════════════════════ */

import { faculty, facultyInstitutionsText, initialsOf } from "@/data/faculty";
import { committee } from "@/data/program";
import { Reveal, SectionHeading } from "./lib/primitives";

interface Person {
  name: string;
  institution: string;
  role?: string;
}

/* faculty.ts stores "Επώνυμο Όνομα"; the strip reads "Όνομα Επώνυμο". */
function displayName(surnameFirst: string) {
  const [surname, ...rest] = surnameFirst.split(" ");
  return [...rest, surname].join(" ");
}

const committeePeople: Person[] = committee.map((m) => ({
  name: m.name,
  role: m.role === "Μέλος" ? "Συντονιστική Επιτροπή" : `${m.role} ΠΜΣ`,
  institution: faculty.find((f) => f.email === m.email)?.institution ?? "ΔιΠΑΕ",
}));

/* One teacher from each partner institution (first in alphabetical order). */
const partnerPeople: Person[] = ["ΑΠΘ", "ΠΑΔΑ", "UNIC"].flatMap((inst) => {
  const f = faculty.find((p) => p.institution === inst);
  return f ? [{ name: displayName(f.name), institution: f.institution }] : [];
});

const people = [...committeePeople, ...partnerPeople];
const othersCount = faculty.length - people.length;

export function FacultyStrip() {
  return (
    <section id="didaskontes" className="relative w-full overflow-hidden py-20 md:py-24">
      {/* Centred, narrower than the page row */}
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            align="left"
            label="Ακαδημαϊκό προσωπικό"
            labelIcon="users"
            title={null}
            highlight="Διδάσκοντες"
            description={`${faculty.length} διδάσκοντες από ${facultyInstitutionsText()}.`}
            action={{ href: "/sxetika#didaskontes", label: `Όλοι οι διδάσκοντες (+${othersCount})` }}
          />

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
            {people.map((p, i) => (
              <Reveal key={p.name} as="li" delay={(i % 4) * 0.06} direction="up">
                <div className="flex h-full items-center gap-3 rounded-2xl glass-lachani p-3.5">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ihu-green to-ihu-green-dark font-heading text-sm font-bold text-white shadow-md"
                  >
                    {initialsOf(p.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-bold leading-snug text-text-primary">{p.name}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{p.institution}</p>
                    {p.role && (
                      <p className="mt-0.5 text-[11px] font-semibold text-ihu-green-dark">{p.role}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default FacultyStrip;
