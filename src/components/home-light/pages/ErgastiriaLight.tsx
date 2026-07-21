"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /light/ergastiria — Εργαστήρια & Υποδομές (calm draft)
   ──────────────────────────────────────────────────────────────────────────
   Verified-only: the three lab domains map to the programme's own courses
   (παρασκευή, ενόργανη ανάλυση, αξιολόγηση δέρματος), and the analysis pipeline
   is the exact method list from COSM1009 «Ποιοτικός Έλεγχος — Μέθοδοι Ενόργανης
   Ανάλυσης». Uses the project's own lab photo, not stock imagery.

   Signature moment: a scroll-filled vertical pipeline of the analytical
   workflow. Everything else is a still fade-in.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  CONTAINER,
  FadeIn,
  LightIcon,
  SectionHead,
  MoreLink,
  PrimaryLink,
} from "@/components/home-light/light-kit";

/* The three lab domains — each tied to a real course of the programme. */
const domains: { icon: string; title: string; text: string; tags: string[] }[] = [
  {
    icon: "flask",
    title: "Παρασκευή Καλλυντικών",
    text: "Σχεδιασμός και παρασκευή σκευασμάτων — από τα δραστικά συστατικά και τα έκδοχα μέχρι την τελική καλλυντικοτεχνική μορφή.",
    tags: ["Γαλακτώματα", "Έκδοχα", "GMP"],
  },
  {
    icon: "microscope",
    title: "Ενόργανη Ανάλυση",
    text: "Ποιοτικός και ποσοτικός έλεγχος πρώτων υλών και προϊόντων με σύγχρονες φασματοσκοπικές και χρωματογραφικές τεχνικές.",
    tags: ["HPLC", "Φασματοσκοπία", "XRD"],
  },
  {
    icon: "scan-face",
    title: "Αξιολόγηση Δέρματος",
    text: "Μελέτη της ανατομίας, της φυσιολογίας και του μικροβιώματος του δέρματος, και της δράσης των κοσμητολογικών προϊόντων σε αυτό.",
    tags: ["Μικροβίωμα", "In vivo", "Διαπερατότητα"],
  },
];

/* The instrumental-analysis workflow — verbatim scope of COSM1009. */
const pipeline: { title: string; text: string; tags: string[] }[] = [
  {
    title: "Προκατεργασία δείγματος",
    text: "Μέθοδοι διαχωρισμού για την προετοιμασία των δειγμάτων πριν την ανάλυση.",
    tags: ["Εκχύλιση", "Απόσταξη", "Κρυστάλλωση"],
  },
  {
    title: "Φυσικοχημικά μεγέθη",
    text: "Ταχεία ανίχνευση προσμίξεων και ελέγχου καθαρότητας των πρώτων υλών.",
    tags: ["Σημείο τήξης", "Δείκτης διάθλασης", "Ιξώδες"],
  },
  {
    title: "Φασματοσκοπία",
    text: "Ταυτοποίηση δομής και προσδιορισμός ενώσεων και μετάλλων στα καλλυντικά.",
    tags: ["UV-Vis", "IR / NIR", "MS", "NMR"],
  },
  {
    title: "Χρωματογραφία",
    text: "Διαχωρισμός και ποσοτικός προσδιορισμός συστατικών σε σύνθετα μείγματα.",
    tags: ["TLC", "HPLC", "Αέρια (GC)"],
  },
  {
    title: "Περίθλαση ακτίνων Χ",
    text: "Χαρακτηρισμός κρυσταλλικής δομής υλικών που χρησιμοποιούνται στα καλλυντικά.",
    tags: ["XRD"],
  },
];

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full bg-lachani-mist px-2.5 py-0.5 text-[11px] font-semibold text-ihu-green-dark"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ── Signature: scroll-filled analysis pipeline ── */
function AnalysisPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
  /* Function-based on purpose (avoids WAAPI scroll desync). */
  const fill = useTransform(scrollYProgress, (p) => `${Math.min(100, Math.max(0, p * 100))}%`);

  return (
    <div ref={ref} className="relative mt-12 pl-2">
      <div className="absolute bottom-3 left-[15px] top-3 w-[2px] bg-slate-200" />
      <motion.div
        style={{ height: fill }}
        className="absolute left-[15px] top-3 w-[2px] origin-top bg-ihu-green-dark"
      />
      <div className="space-y-8">
        {pipeline.map((step, i) => (
          <FadeIn key={step.title} delay={i * 0.04}>
            <div className="relative flex gap-6 pl-12">
              <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-ihu-green-dark font-heading text-xs font-extrabold text-white ring-4 ring-[#FAFBFE]">
                {i + 1}
              </span>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <h3 className="font-heading text-base font-bold text-text-primary">{step.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-secondary">
                  {step.text}
                </p>
                <TagRow tags={step.tags} />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export function ErgastiriaLight() {
  return (
    <>
      {/* Intro + real lab photo */}
      <section className="py-20 md:py-24">
        <div className={cn(CONTAINER, "grid items-center gap-12 lg:grid-cols-2 lg:gap-16")}>
          <div>
            <SectionHead
              kicker="Χώροι έρευνας & ανάπτυξης"
              title="Όπου η θεωρία γίνεται πράξη"
              description="Το πρόγραμμα στηρίζεται σε πραγματική εργαστηριακή εργασία: παρασκευή σκευασμάτων, ενόργανη ανάλυση και αξιολόγηση του δέρματος. Η μεγαλύτερη εργαστηριακή φόρτιση βρίσκεται στη διπλωματική/πρακτική του Γ' εξαμήνου."
            />
            <FadeIn className="mt-8">
              <PrimaryLink href="/light/programma">Δείτε τα εργαστηριακά μαθήματα</PrimaryLink>
            </FadeIn>
          </div>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-slate-200">
              <Image
                src="/images/lab-wide.webp"
                alt="Εργαστήριο του ΠΜΣ Κοσμητολογία"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Three lab domains */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Οι εγκαταστάσεις"
            title="Τρεις τομείς, μία ροή εργασίας"
            description="Από τη φόρμουλα στο ράφι: κάθε τομέας αντιστοιχεί σε μαθήματα του προγράμματος."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {domains.map((d, i) => (
              <FadeIn key={d.title} delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
                    <LightIcon name={d.icon} size={20} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-text-primary">
                    {d.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{d.text}</p>
                  <TagRow tags={d.tags} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Signature: analysis pipeline */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Ενόργανη ανάλυση"
            title="Η διαδρομή του ποιοτικού ελέγχου"
            description="Το εύρος των μεθόδων του μαθήματος «Ποιοτικός Έλεγχος Καλλυντικών — Μέθοδοι Ενόργανης Ανάλυσης», βήμα προς βήμα."
          />
          <AnalysisPipeline />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className={cn(CONTAINER, "flex flex-wrap items-center gap-x-6 gap-y-3")}>
          <PrimaryLink href="/light/eggrafes">Κάντε αίτηση</PrimaryLink>
          <MoreLink href="/light/karieres">Επαγγελματικές προοπτικές</MoreLink>
        </div>
      </section>
    </>
  );
}

export default ErgastiriaLight;
