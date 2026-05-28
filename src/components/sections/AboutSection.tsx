"use client";

import { motion } from "framer-motion";
import { Target, Beaker, BookOpen, Handshake, Sparkles } from "lucide-react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";

const objectives = [
  { icon: Beaker, text: "Σχεδιασμός & ανάπτυξη καινοτόμων καλλυντικών" },
  { icon: Handshake, text: "Διεπιστημονική συνεργασία επαγγελματιών υγείας" },
  { icon: Target, text: "Προαγωγή έρευνας στην κοσμητολογία" },
  { icon: Sparkles, text: "Επαγγελματική αριστεία σε δημόσιο & ιδιωτικό τομέα" },
];

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      variant="gradient"
      title="Σχετικά με το Πρόγραμμα"
      subtitle="ΠΜΣ Κοσμητολογία"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Το Πρόγραμμα Μεταπτυχιακών Σπουδών <strong className="text-text-primary">«Κοσμητολογία»</strong> του
            Τμήματος Επιστημών Διατροφής & Διαιτολογίας της Σχολής Επιστημών
            Υγείας του ΔιΠΑΕ, παρέχει υψηλού επιπέδου επιστημονική
            εξειδίκευση στον τομέα της Κοσμητολογίας.
          </p>
          <p className="text-text-secondary leading-relaxed mb-8">
            Με <strong className="text-text-primary">90 ECTS</strong> σε{" "}
            <strong className="text-text-primary">3 εξάμηνα</strong> και μαθήματα
            Παρασκευή-Σάββατο-Κυριακή, το πρόγραμμα είναι σχεδιασμένο για
            εργαζόμενους επαγγελματίες που θέλουν να ανελιχθούν.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex items-start gap-3 group"
              >
                <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-lavender-50 flex items-center justify-center group-hover:bg-lavender group-hover:text-white transition-colors">
                  <obj.icon className="h-4.5 w-4.5 text-lavender group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-text-secondary leading-snug pt-1.5">
                  {obj.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] glass-card-elevated">
            <Image
              src="/images/lab.png"
              alt="Εργαστήριο Κοσμητολογίας ΔιΠΑΕ"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/20 to-transparent" />
          </div>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-4 -left-4 glass-card-elevated rounded-2xl px-5 py-3 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-mint to-mint-light flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-text-primary text-sm">ΦΕΚ 3886/Β</div>
                <div className="text-xs text-text-muted">20-08-2021</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Specialization Tracks */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard variant="colored" delay={0.1}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br from-mint to-mint-light flex items-center justify-center shadow-lg shadow-mint/20">
              <Beaker className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                Κατεύθυνση Α΄
              </h3>
              <p className="font-medium text-lavender-dark text-sm mb-2">
                Παρασκευή & Αξιολόγηση Καλλυντικών Προϊόντων
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Εστίαση στον σχεδιασμό, ανάπτυξη, παρασκευή και ποιοτικό
                έλεγχο καινοτόμων καλλυντικών με σύγχρονες μεθόδους ανάλυσης.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard variant="colored" delay={0.2}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br from-peach to-peach-light flex items-center justify-center shadow-lg shadow-peach/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                Κατεύθυνση Β΄
              </h3>
              <p className="font-medium text-lavender-dark text-sm mb-2">
                Εφαρμογές Κοσμητολογίας στη Δερματολογία
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Εφαρμογή κοσμητολογικών τεχνικών σε δερματολογία,
                εξατομικευμένα πρωτόκολλα και κλινική αισθητική.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
