"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  FileText,
  Euro,
  ClipboardCheck,
  UserCheck,
  Award,
  CheckCircle2,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: React.ReactNode;
}

const admissionItems: AccordionItem[] = [
  {
    id: "who",
    icon: UserCheck,
    title: "Ποιοι μπορούν να υποβάλουν αίτηση;",
    content: (
      <div className="space-y-3">
        <p className="text-text-secondary text-sm leading-relaxed">
          Γίνονται δεκτοί πτυχιούχοι Ανωτάτων Εκπαιδευτικών Ιδρυμάτων{" "}
          <strong className="text-text-primary">όλων των επιστημονικών κλάδων</strong>,
          τόσο ελληνικών ιδρυμάτων όσο και αναγνωρισμένων αλλοδαπών ιδρυμάτων (με αναγνώριση ΔΟΑΤΑΠ).
        </p>
        <p className="text-text-secondary text-sm leading-relaxed">
          Αν το προπτυχιακό υπόβαθρο κριθεί ανεπαρκές, μπορεί να ζητηθεί
          παρακολούθηση συμπληρωματικών μαθημάτων.
        </p>
      </div>
    ),
  },
  {
    id: "documents",
    icon: FileText,
    title: "Απαιτούμενα Δικαιολογητικά",
    content: (
      <ol className="space-y-2.5">
        {[
          "Συμπληρωμένη και υπογεγραμμένη αίτηση",
          "Αντίγραφο πτυχίου (ή βεβαίωση περάτωσης σπουδών)",
          "Αναλυτική βαθμολογία",
          "Βιογραφικό σημείωμα (CV)",
          "Πιστοποιητικά γλωσσομάθειας (Αγγλικά + λοιπές γλώσσες)",
          "Αντίγραφο ταυτότητας ή διαβατηρίου",
          "Δύο (2) συστατικές επιστολές",
          "Αποδεικτικά επαγγελματικής/ερευνητικής εμπειρίας (εφόσον υπάρχουν)",
          "Επιστημονικές δημοσιεύσεις ή διακρίσεις (εφόσον υπάρχουν)",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-lavender-50 flex items-center justify-center text-[10px] font-bold text-lavender-dark mt-0.5">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "criteria",
    icon: ClipboardCheck,
    title: "Κριτήρια Επιλογής",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-text-secondary">
          Η επιλογή γίνεται <strong className="text-text-primary">χωρίς γραπτές εξετάσεις</strong>,
          με αξιολόγηση φακέλου υποψηφιότητας:
        </p>
        <div className="space-y-3">
          {[
            { label: "Συνάφεια πτυχίου", pct: 10, color: "bg-lavender" },
            { label: "Βαθμός πτυχίου (GPA)", pct: 20, color: "bg-mint" },
            { label: "Βαθμοί σε σχετικά μαθήματα", pct: 10, color: "bg-peach" },
            { label: "Εμπειρία & Συστατικές", pct: 60, color: "bg-lavender-light" },
          ].map((c) => (
            <div key={c.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-text-secondary">{c.label}</span>
                <span className="font-heading font-bold text-text-primary">{c.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-lavender-50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn("h-full rounded-full", c.color)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "fees",
    icon: Euro,
    title: "Δίδακτρα & Απαλλαγές",
    content: (
      <div className="space-y-4">
        <div className="glass rounded-2xl p-5 text-center">
          <div className="font-heading text-4xl font-bold text-lavender-dark mb-1">
            €2.400
          </div>
          <p className="text-sm text-text-muted">
            Συνολικά δίδακτρα για ολόκληρο το πρόγραμμα
          </p>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-mint-50/50">
          <CheckCircle2 className="h-5 w-5 text-mint flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">
              Δυνατότητα Απαλλαγής
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Έως 30% των εγγεγραμμένων φοιτητών δύνανται να απαλλαγούν
              από τα τέλη φοίτησης, κατ&apos; εφαρμογή του Ν. 4957/2022.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

function AccordionItemComponent({ item, isOpen, onToggle }: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      "glass-card rounded-2xl overflow-hidden transition-all duration-300",
      isOpen && "glass-card-elevated ring-1 ring-lavender/20"
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <div className={cn(
          "flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
          isOpen ? "bg-lavender text-white" : "bg-lavender-50 text-lavender"
        )}>
          <item.icon className="h-5 w-5" />
        </div>
        <span className="flex-1 font-heading font-semibold text-text-primary text-sm sm:text-base">
          {item.title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="h-5 w-5 text-text-muted" />
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
            <div className="px-5 pb-5 pl-19">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AdmissionSection() {
  const [openId, setOpenId] = useState<string | null>("who");

  return (
    <SectionWrapper
      id="admission"
      variant="gradient"
      title="Εισαγωγή στο ΠΜΣ"
      subtitle="Αιτήσεις & Δικαιολογητικά"
    >
      <div className="max-w-3xl mx-auto space-y-3">
        {admissionItems.map((item) => (
          <AccordionItemComponent
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-3 glass-card-elevated rounded-2xl px-6 py-4">
          <Award className="h-5 w-5 text-lavender" />
          <p className="text-sm text-text-secondary">
            Οι αιτήσεις υποβάλλονται{" "}
            <strong className="text-text-primary">ηλεκτρονικά</strong>.{" "}
            <span className="text-lavender font-medium">
              Τα πρωτότυπα ζητούνται σε μεταγενέστερο στάδιο.
            </span>
          </p>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
