"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

const normalizeGreek = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export function FaqWidget() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqItems.filter((item) => {
    const query = normalizeGreek(searchQuery);
    return (
      normalizeGreek(item.question).includes(query) ||
      normalizeGreek(item.answer).includes(query)
    );
  });

  return (
    <div className="w-full max-w-5xl mx-auto mt-20 mb-10">
      <div className="relative rounded-md overflow-hidden border border-border-soft shadow-sm bg-white border border-border-soft/50 shadow-md bg-white/40 backdrop-blur-xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lavender/10 rounded-full hidden -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mint/10 rounded-full hidden translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-lavender/10 text-lavender font-semibold text-xs uppercase tracking-wider mb-4 border border-lavender/20">
                <MessageCircleQuestion className="w-4 h-4" />
                <span>Συχνές Ερωτήσεις</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
                Έχετε απορίες; <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender to-peach-warm">
                  Έχουμε τις απαντήσεις.
                </span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Βρείτε άμεσα απαντήσεις στις πιο συνηθισμένες ερωτήσεις σχετικά με το Πρόγραμμα Μεταπτυχιακών Σπουδών.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72 flex-shrink-0 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-lavender transition-colors">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Αναζήτηση..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/70 border border-border-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lavender/30 focus:border-lavender transition-all placeholder:text-text-muted shadow-sm"
              />
            </div>
          </div>

          {/* FAQ List */}
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item, index) => {
                  const actualIndex = faqItems.indexOf(item);
                  const isOpen = openIndex === actualIndex;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={actualIndex}
                      className="h-max"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : actualIndex)}
                        className={cn(
                          "w-full text-left p-5 rounded-2xl transition-all duration-300 border",
                          isOpen
                            ? "bg-white shadow-md border-lavender/30 scale-[1.02]"
                            : "bg-white/50 border-border-soft/50 hover:bg-white hover:border-border-soft hover:shadow-sm"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={cn(
                            "font-semibold text-[15px] leading-snug transition-colors pr-2",
                            isOpen ? "text-lavender" : "text-text-primary"
                          )}>
                            {item.question}
                          </h3>
                          <div className={cn(
                            "flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-colors mt-0.5",
                            isOpen
                              ? "bg-lavender text-white border-lavender"
                              : "bg-surface text-text-muted border-border-soft"
                          )}>
                            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 mt-4 border-t border-border-soft/50">
                                <p className="text-sm text-text-secondary leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-12 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface mb-4">
                    <Search className="w-6 h-6 text-text-muted" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">Δεν βρέθηκαν αποτελέσματα</h3>
                  <p className="text-sm text-text-secondary">
                    Δοκιμάστε διαφορετικούς όρους αναζήτησης ή επικοινωνήστε απευθείας μαζί μας.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Footer of widget */}
          <div className="mt-10 pt-6 border-t border-border-soft/50 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-text-muted">
              <HelpCircle className="h-4 w-4" />
              <span>
                Έχετε κάποια άλλη ερώτηση;{" "}
                <a href="#contact" className="text-lavender font-medium hover:underline decoration-lavender/30 underline-offset-4">
                  Χρησιμοποιήστε τη φόρμα επικοινωνίας.
                </a>
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
