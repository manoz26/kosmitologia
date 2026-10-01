"use client";

/* ══════════════════════════════════════════════════════════════════════════
   FacultyStrip — «Ποιοι διδάσκουν»
   ──────────────────────────────────────────────────────────────────────────
   A quiet strip of eight teachers: the Συντονιστική Επιτροπή (study guide
   σ.1) plus one teacher from each partner institution, so the breadth of the
   faculty reads at a glance. Initials stand in for portraits until the client
   sends photos (docs/protasi-anadiamorfosis.md, Αλλαγή 5). No ranks are shown —
   the study guide and faculty.ts disagree on them (see program.ts).
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <section id="didaskontes" className="relative w-full overflow-hidden py-24 md:py-28">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Διδάσκοντες"
          labelIcon="users"
          title="Ποιοι"
          highlight="διδάσκουν"
          description={`${faculty.length} διδάσκοντες από ${facultyInstitutionsText()}.`}
        />

        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p, i) => (
            <Reveal key={p.name} as="li" delay={(i % 4) * 0.06} direction="up">
              <div className="flex h-full items-center gap-4 rounded-2xl glass-lachani p-4">
                <span
                  aria-hidden
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark font-heading text-lg font-bold text-white shadow-md"
                >
                  {initialsOf(p.name)}
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold leading-snug text-text-primary">{p.name}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{p.institution}</p>
                  {p.role && (
                    <p className="mt-1 text-[11px] font-semibold text-ihu-green-dark">{p.role}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2} direction="up" className="mt-10 text-center">
          <Link
            href="/programma#didaskontes"
            className="group inline-flex items-center gap-2 rounded-full border border-ihu-green-dark/25 bg-white/60 px-6 py-3 text-sm font-bold text-ihu-green-dark backdrop-blur-md transition-all hover:gap-3 hover:bg-white/80"
          >
            Όλοι οι διδάσκοντες (+{othersCount})
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default FacultyStrip;
