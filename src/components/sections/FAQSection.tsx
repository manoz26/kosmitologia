"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper
      id="faq"
      variant="gradient"
      title="Συχνές Ερωτήσεις"
      subtitle="FAQ"
    >
      <div className="max-w-3xl mx-auto space-y-3">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "glass-card rounded-2xl overflow-hidden transition-all duration-300",
                isOpen && "ring-1 ring-lavender/15 glass-card-elevated"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center gap-3 p-5 text-left"
                aria-expanded={isOpen}
              >
                <div className={cn(
                  "flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors",
                  isOpen
                    ? "bg-lavender text-white"
                    : "bg-lavender-50 text-lavender"
                )}>
                  {i + 1}
                </div>
                <span className="flex-1 font-medium text-sm sm:text-[15px] text-text-primary">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-4 w-4 text-text-muted" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-5 pb-5 pl-16">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Help prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <div className="inline-flex items-center gap-2 text-sm text-text-muted">
          <HelpCircle className="h-4 w-4" />
          <span>
            Δεν βρήκατε αυτό που ψάχνετε;{" "}
            <a href="/epikoinonia" className="text-lavender font-medium hover:underline">
              Επικοινωνήστε μαζί μας
            </a>
          </span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
