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
import { faqItems } from "@/data/faq";
import { Reveal, SectionHeading } from "./lib/primitives";

function FaqRow({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl glass-lachani transition-colors", open && "ring-1 ring-ihu-green/30")}>
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
  const mid = Math.ceil(faqItems.length / 2);
  const columns = [faqItems.slice(0, mid), faqItems.slice(mid)];

  return (
    <section id="faq" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Συχνές ερωτήσεις"
          labelIcon="lightbulb"
          title="Ό,τι χρειάζεται"
          highlight="να ξέρετε"
          description="Από τη διάρκεια και τα δίδακτρα μέχρι τα δικαιολογητικά και τη διαδικασία επιλογής."
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((item, i) => {
                const globalIndex = colIdx * mid + i;
                return (
                  <Reveal key={item.question} delay={i * 0.05} direction={colIdx === 0 ? "left" : "right"}>
                    <FaqRow
                      question={item.question}
                      answer={item.answer}
                      open={open === globalIndex}
                      onToggle={() => setOpen((cur) => (cur === globalIndex ? null : globalIndex))}
                    />
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 rounded-3xl glass-lachani-deep p-7 text-center sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
              <HelpCircle size={24} />
            </span>
            <div className="flex-1">
              <p className="font-heading font-bold text-text-primary">Έχετε άλλη ερώτηση;</p>
              <p className="text-sm text-text-secondary">Η Γραμματεία του ΠΜΣ είναι στη διάθεσή σας.</p>
            </div>
            <Link
              href="/epikoinonia"
              className="inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
            >
              <Mail size={16} /> Επικοινωνία
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FaqSection;
