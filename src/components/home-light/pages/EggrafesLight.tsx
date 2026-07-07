"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /light/eggrafes — Εγγραφές & Αιτήσεις (calm draft)
   ──────────────────────────────────────────────────────────────────────────
   Verified-only: every date, number, criterion and document is from the study
   guide («Γενική Περιγραφή» + «Υποβολή Αιτήσεων» + «Αξιολόγηση»). Tuition is
   NOT stated in the guide, so no figure appears here.

   Signature moment: a horizontal, scroll-filled stepper of the admission
   process (desktop). Everything else is a still fade-in.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { Check, Download } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  CONTAINER,
  FadeIn,
  LightIcon,
  SectionHead,
  MoreLink,
} from "@/components/home-light/light-kit";

const facts: { value: string; label: string }[] = [
  { value: "40", label: "εισακτέοι ανά έτος (+2 υπότροφοι)" },
  { value: "10/6 – 10/7", label: "περίοδος υποβολής αιτήσεων" },
  { value: "Όλοι", label: "οι επιστημονικοί κλάδοι γίνονται δεκτοί" },
  { value: "Χωρίς", label: "γραπτές εξετάσεις — μόνο μοριοδότηση φακέλου" },
];

const steps: { icon: string; title: string; text: string }[] = [
  {
    icon: "calendar",
    title: "Πρόσκληση",
    text: "Η Συντονιστική Επιτροπή δημοσιεύει την πρόσκληση την άνοιξη· αιτήσεις 10 Ιουνίου – 10 Ιουλίου.",
  },
  {
    icon: "book",
    title: "Φάκελος",
    text: "Συγκέντρωση δικαιολογητικών: πτυχίο, βαθμολογία, βιογραφικό, αγγλικά και δύο συστατικές.",
  },
  {
    icon: "search",
    title: "Υποβολή",
    text: "Κατάθεση στη Γραμματεία του ΠΜΣ — δίνεται και η δυνατότητα ηλεκτρονικής αποστολής.",
  },
  {
    icon: "scale",
    title: "Αξιολόγηση",
    text: "Το πρώτο δεκαπενθήμερο Σεπτεμβρίου: μοριοδότηση φακέλου και συνέντευξη, χωρίς γραπτές εξετάσεις.",
  },
  {
    icon: "graduation",
    title: "Εγγραφή",
    text: "Οι επιτυχόντες ενημερώνονται, απαντούν εντός 10 ημερών και εγγράφονται στο πρόγραμμα.",
  },
];

/* The dossier — study guide, «Τα απαραίτητα δικαιολογητικά». */
const dossier: string[] = [
  "Έντυπη αίτηση",
  "Επικυρωμένο αντίγραφο πτυχίου (ή βεβαίωση περάτωσης σπουδών)",
  "Βεβαίωση ισοτιμίας ΔΟΑΤΑΠ (για πτυχία εξωτερικού)",
  "Πιστοποιητικό αναλυτικής βαθμολογίας",
  "Πλήρες βιογραφικό σημείωμα",
  "Πιστοποιητικό αγγλικών (Lower / TOEFL 550 ή αντίστοιχο)",
  "Επιστημονικές δημοσιεύσεις ή διακρίσεις (εάν υπάρχουν)",
  "Αποδεικτικά επαγγελματικής / ερευνητικής εμπειρίας (εάν υπάρχουν)",
  "Δύο συστατικές επιστολές",
];

/* The eight scoring criteria of the selection algorithm. */
const criteria: string[] = [
  "Συνάφεια γνωστικού αντικειμένου πτυχίου",
  "Γενικός βαθμός πτυχίου",
  "Βαθμολογία σε συναφή μαθήματα",
  "Επίδοση στη διπλωματική εργασία",
  "Συναφής ερευνητική δραστηριότητα",
  "Συναφής επαγγελματική εμπειρία",
  "Γνώση επιπλέον ξένης γλώσσας",
  "Προσωπική συνέντευξη",
];

/* ── Signature: horizontal scroll-filled stepper ── */
function ProcessStepper() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const fill = useTransform(scrollYProgress, (p) => `${Math.min(100, Math.max(0, p * 100))}%`);

  return (
    <div ref={ref} className="relative mt-12">
      {/* horizontal rail (desktop) */}
      <div className="absolute left-8 right-8 top-4 hidden h-[2px] bg-slate-200 md:block" />
      <motion.div
        style={{ width: fill }}
        className="absolute left-8 top-4 hidden h-[2px] bg-ihu-green-dark md:block"
      />
      <div className="grid gap-8 md:grid-cols-5">
        {steps.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.05}>
            <div className="relative pl-12 md:pl-0 md:text-center">
              <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-ihu-green-dark font-heading text-xs font-extrabold text-white ring-4 ring-[#FAFBFE] md:static md:mx-auto md:mb-5 md:h-9 md:w-9">
                {i + 1}
              </span>
              <h3 className="font-heading text-sm font-bold text-text-primary">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-text-secondary md:mx-auto md:max-w-[22ch]">
                {s.text}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export function EggrafesLight() {
  return (
    <>
      {/* Facts strip */}
      <section className="border-b border-slate-200/70 bg-[#FAFBFE]">
        <div className={cn(CONTAINER, "grid grid-cols-2 gap-8 py-14 lg:grid-cols-4")}>
          {facts.map((f, i) => (
            <FadeIn key={f.label} delay={i * 0.06} className="text-center">
              <p className="font-heading text-3xl font-extrabold tracking-tight text-ihu-green-dark md:text-4xl">
                {f.value}
              </p>
              <p className="mx-auto mt-1.5 max-w-[20ch] text-sm font-medium text-text-secondary">
                {f.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Signature: process stepper */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            center
            kicker="Η διαδικασία"
            title="Από την αίτηση στην εγγραφή"
            description="Δεκτοί γίνονται πτυχιούχοι ΑΕΙ όλων των κλάδων, από την Ελλάδα ή αναγνωρισμένα ιδρύματα του εξωτερικού — καθώς και όσοι εκκρεμεί μόνο η ορκωμοσία τους."
          />
          <ProcessStepper />
        </div>
      </section>

      {/* Dossier + application download */}
      <section className="border-t border-slate-200/70 bg-[#F4F7ED] py-20 md:py-24">
        <div className={cn(CONTAINER, "grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16")}>
          <div>
            <SectionHead kicker="Δικαιολογητικά" title="Ο φάκελος υποψηφιότητας" />
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {dossier.map((d) => (
                <FadeIn key={d}>
                  <li className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check size={15} className="mt-0.5 shrink-0 text-ihu-green-dark" />
                    {d}
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 md:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
                <LightIcon name="book" size={20} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-text-primary">
                Έντυπο Αίτησης
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Κατεβάστε το αρχείο της αίτησης, συμπληρώστε το και επισυνάψτε το στα δικαιολογητικά
                σας.
              </p>
              <a
                href="/aitisi.docx"
                download="aitisi.docx"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <Download size={16} />
                Λήψη .docx
              </a>
              <p className="mt-4 text-xs leading-relaxed text-text-muted">
                Αίτηση μπορούν να υποβάλουν και όσοι έχουν περατώσει επιτυχώς τα μαθήματά τους και
                εκκρεμεί μόνο η ορκωμοσία.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Evaluation criteria */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Αξιολόγηση"
            title="Πώς μοριοδοτείται ο φάκελος"
            description="Η επιλογή γίνεται με εξειδικευμένο αλγόριθμο που ποσοτικοποιεί τα παρακάτω κριτήρια — χωρίς γραπτές εξετάσεις."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {criteria.map((c, i) => (
              <FadeIn key={c} delay={(i % 4) * 0.05}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                  <span className="font-heading text-sm font-extrabold text-ihu-green-dark/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium leading-snug text-text-secondary">{c}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10">
            <MoreLink href="/light/epikoinonia">Επικοινωνία με τη Γραμματεία</MoreLink>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

export default EggrafesLight;
