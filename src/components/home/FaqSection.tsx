"use client";

/* ══════════════════════════════════════════════════════════════════════════
   FaqSection
   ──────────────────────────────────────────────────────────────────────────
   Frequently asked questions as a glass accordion with smooth height/opacity
   reveals and a rotating plus/minus affordance. Live data from @/data/faq.
   ══════════════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, HelpCircle, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { useHashTarget } from "@/lib/use-hash-target";
import { faqItems } from "@/data/faq";
import { Reveal, SectionHeading } from "./lib/primitives";

function FaqRow({
  id,
  question,
  answer,
  open,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div id={id} className={cn("overflow-hidden rounded-2xl glass-lachani transition-colors", open && "ring-1 ring-ihu-green/30")}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-[15px] font-bold text-text-primary">{question}</span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow transition-transform duration-300",
            open ? "rotate-45 bg-ihu-green-dark" : "bg-ihu-green",
          )}
        >
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  /* A link to #faq-<n> opens that answer (the site search links here). */
  useHashTarget("faq-", (n) => {
    const i = Number(n);
    if (Number.isInteger(i) && i >= 0 && i < faqItems.length) setOpen(i);
  });

  return (
    <section id="faq" className="relative w-full overflow-hidden py-24 md:py-32">
      {/* The heading and the way to the Secretariat hold the left four
          columns (sticky on desktop); the questions run down the right eight. */}
      <div className="section-container relative z-10 grid gap-10 px-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              label="Συχνές ερωτήσεις"
              labelIcon="lightbulb"
              title="Ό,τι χρειάζεται"
              highlight="να ξέρετε"
              description="Από τη διάρκεια και τα δίδακτρα μέχρι τα δικαιολογητικά και τη διαδικασία επιλογής."
            />

            <Reveal delay={0.1}>
              <div className="mt-8 edge-top glass-lachani-deep p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                    <HelpCircle size={20} />
                  </span>
                  <p className="font-heading font-bold text-text-primary">Έχετε άλλη ερώτηση;</p>
                </div>
                <p className="mt-3 text-sm text-text-secondary">Η Γραμματεία του ΠΜΣ είναι στη διάθεσή σας.</p>
                <Link
                  href="/epikoinonia"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
                >
                  <Mail size={16} /> Επικοινωνία
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-8">
          {faqItems.map((item, i) => (
            <Reveal key={item.question} delay={Math.min(i, 6) * 0.04} direction="up">
              <FaqRow
                id={`faq-${i}`}
                question={item.question}
                answer={item.answer}
                open={open === i}
                onToggle={() => setOpen((cur) => (cur === i ? null : i))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
