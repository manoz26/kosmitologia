"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /light/sxetika — Η Σχολή & το Τμήμα (calm draft)
   ──────────────────────────────────────────────────────────────────────────
   Signature moment: a scroll-driven vertical timeline of the department's
   history. Every date is taken from the study guide («Πληροφορίες για το
   Τμήμα»). Everything else is a still fade-in.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { specializations } from "@/data/courses";
import {
  CONTAINER,
  FadeIn,
  IconChip,
  Kicker,
  SectionHead,
  MoreLink,
  PrimaryLink,
} from "@/components/home-light/light-kit";

/* Verified institution facts — study guide, «Πληροφορίες για το Ίδρυμα». */
const institutionFacts: { icon: string; value: string; label: string }[] = [
  { icon: "map-pin", value: "Σίνδος", label: "Αλεξάνδρεια Πανεπιστημιούπολη, 17 χλμ. δυτικά της Θεσσαλονίκης" },
  { icon: "globe", value: "1.600", label: "στρέμματα ιδιόκτητων εγκαταστάσεων · 35.000 τ.μ. κτίρια" },
  { icon: "users", value: "~20.000", label: "φοιτητές στην Πανεπιστημιούπολη του ΔΙΠΑΕ" },
  { icon: "building", value: "9 / 30", label: "σχολές & τμήματα — μέλος της Σχολής Επιστημών Υγείας" },
];

/* The department's stated aims — study guide, «Πληροφορίες για το Τμήμα». */
const departmentAims: string[] = [
  "Ανάπτυξη κατάλληλου θεωρητικού υπόβαθρου σπουδών",
  "Υψηλού επιπέδου εργαστηριακή & πρακτική άσκηση",
  "Χρήση σύγχρονων τεχνολογιών στην εκπαίδευση",
  "Δεξιότητες ανταγωνιστικές σε εθνικό & διεθνές περιβάλλον",
  "Διεξαγωγή επιστημονικής έρευνας",
  "Συνεργασίες με άλλα ΑΕΙ & φορείς του κλάδου",
];

/* The coordinating committee — study guide, «Συντονιστική Επιτροπή». */
const committee: { name: string; role: string; note?: string }[] = [
  { name: "Αθανάσιος Παπαδόπουλος", role: "Καθηγητής", note: "Διευθυντής ΠΜΣ" },
  { name: "Ιορδάνης Παπαδόπουλος", role: "Αν. Καθηγητής", note: "Αν. Διευθυντής" },
  { name: "Μαρία Χασαπίδου", role: "Καθηγήτρια", note: "Μέλος" },
  { name: "Ελισάβετ Βαρδάκα", role: "Καθηγήτρια", note: "Μέλος" },
  { name: "Άννα Γιαννακουδάκη", role: "Λέκτορας", note: "Μέλος" },
];

/* Milestones — every year is from the study guide's department history. */
const milestones: { year: string; title: string; text: string }[] = [
  {
    year: "1985",
    title: "Ίδρυση του Τμήματος",
    text: "Ιδρύεται ως «Τμήμα Διατροφής του Ανθρώπου» (Π.Δ. 561) και δέχεται τους πρώτους προπτυχιακούς φοιτητές τον Σεπτέμβριο.",
  },
  {
    year: "2003",
    title: "Μετονομασία",
    text: "Γίνεται «Τμήμα Διατροφής και Διαιτολογίας»· ο τίτλος των πτυχιούχων αλλάζει σε «Διατροφολόγος – Διαιτολόγος».",
  },
  {
    year: "2004",
    title: "Πρώτο μεταπτυχιακό",
    text: "Εισάγονται οι πρώτοι μεταπτυχιακοί φοιτητές, σε συνεργασία με το Τμήμα Χημείας του Πανεπιστημίου Ιωαννίνων.",
  },
  {
    year: "2019",
    title: "Ένταξη της Κοσμητολογίας",
    text: "Με τον Ν. 4610 εντάσσεται στο Τμήμα το «Τμήμα Αισθητικής και Κοσμητολογίας» του ΑΤΕΙΘ, στο πλαίσιο του ΔΙΠΑΕ.",
  },
  {
    year: "2021–22",
    title: "Έναρξη του ΠΜΣ «Κοσμητολογία»",
    text: "Το Πρόγραμμα Μεταπτυχιακών Σπουδών ξεκινά τη λειτουργία του με την έναρξη του Χειμερινού Εξαμήνου.",
  },
];

/* ── Signature: the scroll-filled history timeline ── */
function HistoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  /* Function-based transform on purpose — range-based scroll transforms get
     turned into native WAAPI animations that we've seen desync here. */
  const fill = useTransform(scrollYProgress, (p) => `${Math.min(100, Math.max(0, p * 100))}%`);

  return (
    <div ref={ref} className="relative mt-12 pl-2">
      {/* rail */}
      <div className="absolute bottom-2 left-[13px] top-2 w-[2px] bg-slate-200 md:left-[15px]" />
      <motion.div
        style={{ height: fill }}
        className="absolute left-[13px] top-2 w-[2px] origin-top bg-ihu-green-dark md:left-[15px]"
      />

      <div className="space-y-10">
        {milestones.map((m, i) => (
          <FadeIn key={m.year} delay={i * 0.04}>
            <div className="relative flex gap-6 pl-10 md:pl-12">
              <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-white text-ihu-green-dark ring-2 ring-ihu-green-dark md:h-9 md:w-9">
                <span className="h-2.5 w-2.5 rounded-full bg-ihu-green-dark" />
              </span>
              <div>
                <p className="font-heading text-lg font-extrabold tracking-tight text-ihu-green-dark">
                  {m.year}
                </p>
                <h3 className="mt-0.5 font-heading text-base font-bold text-text-primary">
                  {m.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-secondary">
                  {m.text}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export function SxetikaLight() {
  return (
    <>
      {/* Institution facts strip */}
      <section className="border-b border-slate-200/70 bg-[#FAFBFE]">
        <div className={cn(CONTAINER, "grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4")}>
          {institutionFacts.map((f, i) => (
            <FadeIn key={f.value} delay={i * 0.06}>
              <div className="flex items-start gap-4">
                <IconChip name={f.icon} />
                <div>
                  <p className="font-heading text-xl font-extrabold tracking-tight text-text-primary">
                    {f.value}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{f.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* The department — story + aims + committee */}
      <section className="py-20 md:py-24">
        <div className={cn(CONTAINER, "grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16")}>
          <div>
            <SectionHead
              kicker="Το Τμήμα"
              title="Επιστημών Διατροφής & Διαιτολογίας"
              description="Το ΠΜΣ «Κοσμητολογία» λειτουργεί στο Τμήμα Επιστημών Διατροφής & Διαιτολογίας του Διεθνούς Πανεπιστημίου της Ελλάδος — ένα από τα τέσσερα ομοειδή τμήματα ανώτατης εκπαίδευσης στην Ελλάδα, με ιστορία από το 1985."
            />
            <FadeIn className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                Στόχοι του Τμήματος
              </p>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {departmentAims.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check size={15} className="mt-0.5 shrink-0 text-ihu-green-dark" />
                    {a}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Committee card */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 md:p-7">
              <Kicker>Συντονιστική Επιτροπή</Kicker>
              <div className="mt-5 space-y-4">
                {committee.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-bold text-text-primary">{c.name}</p>
                      <p className="text-xs text-text-secondary">{c.role}</p>
                    </div>
                    {c.note && (
                      <span className="shrink-0 rounded-full bg-lachani-mist px-2.5 py-1 text-[10px] font-bold text-ihu-green-dark">
                        {c.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Signature: history timeline */}
      <section className="border-t border-slate-200/70 bg-[#F4F7ED] py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Η διαδρομή"
            title="Από το 1985 στο σήμερα"
            description="Τα ορόσημα που οδήγησαν στη δημιουργία του ΠΜΣ «Κοσμητολογία»."
          />
          <HistoryTimeline />
        </div>
      </section>

      {/* Two specialisations */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Οι δύο ειδικεύσεις"
            title="Ένα πρόγραμμα, δύο διαδρομές"
            description="Οι δύο ειδικεύσεις μοιράζονται κοινό κορμό και διαφέρουν σε ένα μάθημα ανά εξάμηνο. Το δίπλωμα απονέμεται σε μία από τις δύο."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {specializations.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-lachani-mist font-heading text-sm font-extrabold text-ihu-green-dark">
                      {s.numeral}
                    </span>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">
                      Ειδίκευση {s.numeral}
                    </p>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-text-primary">
                    {s.nameGr}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.tagline}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrimaryLink href="/light/programma">Δείτε το πρόγραμμα σπουδών</PrimaryLink>
            <MoreLink href="/light/didaskotes">Οι διδάσκοντες</MoreLink>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

export default SxetikaLight;
