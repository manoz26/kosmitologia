"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ApplySteps — «Πώς κάνω αίτηση» + τα τελευταία νέα
   ──────────────────────────────────────────────────────────────────────────
   The home page's closing section: the admission process in three steps
   (study guide σ.7–8), the two numbers a candidate weighs (tuition, places),
   the way in, and a short list of the latest announcements. Everything comes
   from src/data/program.ts / home/lib/data.ts — no hand-typed facts here.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import {
  admissions, formatDateLong, formatEuro, officialDocuments, program, requiredDocuments,
} from "@/data/program";
import { newsItems } from "./lib/data";
import { Reveal, SectionHeading } from "./lib/primitives";

const supportingDocs = requiredDocuments.filter((d) => !d.optional && d.id !== "aitisi").length;
const form = officialDocuments.find((d) => d.format === "DOCX")!;

const steps = [
  {
    title: "Ετοιμάζεις τον φάκελο",
    text: `Το έντυπο αίτησης και ${supportingDocs} δικαιολογητικά: πτυχίο, αναλυτική βαθμολογία, βιογραφικό, πιστοποιητικό Αγγλικών, ταυτότητα και δύο συστατικές επιστολές.`,
  },
  {
    title: "Υποβάλλεις την αίτηση",
    text: `Στη Γραμματεία του ΠΜΣ, από ${formatDateLong(admissions.opens)} έως ${formatDateLong(admissions.closes)}.`,
  },
  {
    title: "Αξιολόγηση & συνέντευξη",
    text: "Μοριοδότηση του φακέλου και προσωπική συνέντευξη το πρώτο δεκαπενθήμερο του Σεπτεμβρίου. Χωρίς γραπτές εξετάσεις.",
  },
];

export function ApplySteps() {
  return (
    <section id="aitisi" className="relative w-full overflow-hidden py-24 md:py-28">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Εισαγωγή"
          labelIcon="calendar"
          title="Πώς κάνω"
          highlight="αίτηση"
          description="Δεκτοί γίνονται πτυχιούχοι ΑΕΙ όλων των επιστημονικών κλάδων, και όσοι εκκρεμεί μόνο η ορκωμοσία τους."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* The three steps */}
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 0.08} direction="up">
                <div className="flex gap-4 rounded-3xl glass-lachani p-5 md:p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ihu-green-dark font-heading text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-text-primary">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Numbers + the way in */}
          <Reveal delay={0.12} direction="up">
            <div className="flex h-full flex-col rounded-3xl glass-lachani-deep p-6 md:p-7">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs text-text-secondary">Δίδακτρα (συνολικά)</dt>
                  <dd className="mt-1 font-heading text-3xl font-extrabold text-ihu-green-dark">
                    {formatEuro(program.tuition.value)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-text-secondary">Θέσεις</dt>
                  <dd className="mt-1 font-heading text-3xl font-extrabold text-ihu-green-dark">
                    {program.intake.value}
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-col gap-3 pt-7">
                <Link
                  href="/eggrafes"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
                >
                  Κάνε αίτηση
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={form.href}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ihu-green-dark/25 bg-white/60 px-6 py-3 text-sm font-bold text-ihu-green-dark transition-colors hover:bg-white/80"
                >
                  <Download size={16} />
                  Έντυπο αίτησης ({form.format})
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Latest news — a short list; the full page is /nea */}
        <div id="nea" className="mx-auto mt-16 max-w-5xl">
          <Reveal direction="up">
            <div className="flex items-end justify-between gap-4 border-b border-ihu-green-dark/15 pb-3">
              <h3 className="font-heading text-lg font-bold text-text-primary">Ανακοινώσεις</h3>
              <Link
                href="/nea"
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-ihu-green-dark"
              >
                Όλα τα νέα
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
          <ul>
            {newsItems.slice(0, 3).map((n, i) => (
              <Reveal key={n.title} as="li" delay={i * 0.06} direction="up">
                <div className="flex flex-col gap-1 border-b border-ihu-green-dark/10 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="shrink-0 text-xs font-semibold text-ihu-green-dark sm:w-40">
                    {n.tag} · {n.date}
                  </span>
                  <span className="text-sm font-medium leading-snug text-text-primary">{n.title}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ApplySteps;
