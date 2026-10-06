"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ApplySteps — «Διαδικασία αίτησης»
   ──────────────────────────────────────────────────────────────────────────
   The home page's closing section: the admission process in three steps
   (study guide σ.7–8), the two numbers a candidate weighs (tuition, places)
   and the way in. Everything comes from src/data/program.ts — no hand-typed
   facts here. The dates live only in the Secretariat's announcement, shown
   once at the top of the page (LatestAnnouncements), so they aren't repeated;
   the news list moved up there too (06/10/2026).
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { formatEuro, officialDocuments, program, requiredDocuments } from "@/data/program";
import { Reveal, SectionHeading } from "./lib/primitives";

const supportingDocs = requiredDocuments.filter((d) => !d.optional && d.id !== "aitisi").length;
const form = officialDocuments.find((d) => d.format === "DOCX")!;

const steps = [
  {
    title: "Προετοιμασία φακέλου",
    text: `Το έντυπο αίτησης και ${supportingDocs} δικαιολογητικά: πτυχίο, αναλυτική βαθμολογία, βιογραφικό, πιστοποιητικό Αγγλικών, ταυτότητα και δύο συστατικές επιστολές.`,
  },
  {
    title: "Υποβολή αίτησης",
    text: "Στη Γραμματεία του ΠΜΣ, μέσα στις ημερομηνίες που ανακοινώνει η Γραμματεία για κάθε κύκλο.",
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
          title="Διαδικασία"
          highlight="αίτησης"
          description="Δεκτοί γίνονται πτυχιούχοι ΑΕΙ όλων των επιστημονικών κλάδων, και όσοι εκκρεμεί μόνο η ορκωμοσία τους."
        />

        <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-12 lg:items-start">
          {/* The three steps */}
          <ol className="space-y-4 lg:col-span-7">
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
          <Reveal delay={0.12} direction="up" className="lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col edge-top glass-lachani-deep p-6 md:p-7">
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
              <div className="mt-7 flex flex-col gap-3 border-t border-ihu-green-dark/12 pt-7">
                <Link
                  href="/eggrafes"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
                >
                  Υποβολή αίτησης
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

      </div>
    </section>
  );
}

export default ApplySteps;
