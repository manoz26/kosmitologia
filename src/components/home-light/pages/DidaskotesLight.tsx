"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /light/didaskotes — Διδάσκοντες (calm draft)
   ──────────────────────────────────────────────────────────────────────────
   Verified-only: the teaching roster is derived straight from the course
   outlines in courses.ts (each course's «ΔΙΔΑΣΚΟΝΤΕΣ»), and the coordinating
   committee from the study guide. No external / unverified faculty list.

   Signature moment: click an instructor to reveal exactly which courses they
   teach — a still, interactive disclosure (no looping motion).
   ══════════════════════════════════════════════════════════════════════════ */

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
import {
  CONTAINER,
  FadeIn,
  Kicker,
  SectionHead,
  MoreLink,
  PrimaryLink,
} from "@/components/home-light/light-kit";

/* Verified — study guide, «Συντονιστική Επιτροπή». */
const committee: { name: string; role: string; tag: string }[] = [
  { name: "Αθανάσιος Παπαδόπουλος", role: "Καθηγητής", tag: "Διευθυντής ΠΜΣ" },
  { name: "Ιορδάνης Παπαδόπουλος", role: "Αν. Καθηγητής", tag: "Αν. Διευθυντής" },
  { name: "Μαρία Χασαπίδου", role: "Καθηγήτρια", tag: "Μέλος" },
  { name: "Ελισάβετ Βαρδάκα", role: "Καθηγήτρια", tag: "Μέλος" },
  { name: "Άννα Γιαννακουδάκη", role: "Λέκτορας", tag: "Μέλος" },
];

interface Instructor {
  name: string;
  role?: string;
  courses: { code: string; name: string }[];
}

/* Aggregate unique instructors from every course outline. */
function useInstructors(): Instructor[] {
  return useMemo(() => {
    const map = new Map<string, Instructor>();
    for (const c of courses) {
      for (const raw of c.professors ?? []) {
        const m = raw.match(/^(.*?)\s*\((.*)\)\s*$/);
        const name = (m ? m[1] : raw).trim();
        const role = m ? m[2].trim() : undefined;
        const existing = map.get(name);
        if (existing) {
          if (role && !existing.role) existing.role = role;
          existing.courses.push({ code: c.code, name: c.nameGr });
        } else {
          map.set(name, { name, role, courses: [{ code: c.code, name: c.nameGr }] });
        }
      }
    }
    return [...map.values()].sort((a, b) => b.courses.length - a.courses.length);
  }, []);
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function InstructorCard({ ins }: { ins: Instructor }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3.5 p-4 text-left"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lachani-mist font-heading text-sm font-bold text-ihu-green-dark">
          {initialsOf(ins.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-text-primary">{ins.name}</span>
          <span className="block truncate text-xs text-text-secondary">
            {ins.role ?? "Διδάσκων/ουσα"} · {ins.courses.length}{" "}
            {ins.courses.length === 1 ? "μάθημα" : "μαθήματα"}
          </span>
        </span>
        <ChevronDown
          size={17}
          className={cn(
            "shrink-0 text-text-muted transition-transform",
            open && "rotate-180 text-ihu-green-dark",
          )}
        />
      </button>
      {open && (
        <ul className="space-y-1.5 border-t border-slate-100 px-4 pb-4 pt-3">
          {ins.courses.map((c) => (
            <li key={c.code} className="flex gap-2 text-xs leading-snug text-text-secondary">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ihu-green-dark" />
              {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DidaskotesLight() {
  const instructors = useInstructors();

  return (
    <>
      {/* Coordinating committee */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Η ομάδα"
            title="Συντονιστική Επιτροπή"
            description="Η επιτροπή που διευθύνει και εποπτεύει το Πρόγραμμα Μεταπτυχιακών Σπουδών."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {committee.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.05}>
                <div className="flex h-full items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lachani-mist font-heading text-sm font-bold text-ihu-green-dark">
                    {initialsOf(m.name)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{m.name}</p>
                    <p className="text-xs text-text-secondary">{m.role}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-lachani-mist px-2 py-0.5 text-[10px] font-bold text-ihu-green-dark">
                      {m.tag}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching staff — signature disclosure */}
      <section className="border-t border-slate-200/70 bg-[#F4F7ED] py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              kicker="Διδακτικό σώμα"
              title="Οι διδάσκοντες των μαθημάτων"
              description="Το σώμα διδασκόντων όπως προκύπτει από τα επίσημα περιγράμματα. Πατήστε ένα όνομα για να δείτε τα μαθήματα που διδάσκει."
            />
            <FadeIn>
              <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ihu-green-dark ring-1 ring-slate-200">
                {instructors.length} διδάσκοντες
              </span>
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {instructors.map((ins, i) => (
              <FadeIn key={ins.name} delay={(i % 3) * 0.05}>
                <InstructorCard ins={ins} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className={cn(CONTAINER, "flex flex-wrap items-center gap-x-6 gap-y-3")}>
          <PrimaryLink href="/light/programma">Δείτε τα μαθήματα</PrimaryLink>
          <MoreLink href="/light/ergastiria">Εργαστήρια & υποδομές</MoreLink>
        </div>
      </section>
    </>
  );
}

export default DidaskotesLight;
