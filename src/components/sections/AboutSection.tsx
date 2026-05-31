"use client";

import { motion } from "framer-motion";
import { Target, Beaker, Handshake, Sparkles, Clock, BookOpen } from "lucide-react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const objectives = [
  { icon: Beaker, text: "Εκπαίδευση ικανών στελεχών για παραγωγή & σχεδιασμό καινοτόμων προϊόντων υψηλής προστιθέμενης αξίας." },
  { icon: Handshake, text: "Εφαρμογή της κοσμητολογικής επιστήμης στην ιδιωτική και δημόσια υγεία." },
  { icon: Target, text: "Ανάπτυξη και προώθηση της έρευνας σε όλα τα πεδία της Κοσμητολογίας." },
  { icon: Sparkles, text: "Υψηλό επίπεδο δεξιοτήτων για ελεύθερους επαγγελματίες και στελέχη επιχειρήσεων." },
];

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      variant="gradient"
      title="Σχετικά με το Πρόγραμμα"
      subtitle="Αναλυτικοί Στόχοι του ΠΜΣ Κοσμητολογία"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Το κύριο γνωστικό αντικείμενο του ΠΜΣ αποτελεί η <strong className="text-text-primary">Κοσμητολογία</strong> και
            τα οφέλη αυτής στην οικονομία και την κοινωνία. Το προφίλ των αποφοίτων είναι αυτό των
            σύγχρονων και άρτια εκπαιδευμένων στελεχών με υψηλό επίπεδο εφαρμογής επιστημονικών γνώσεων.
          </p>

          <div className="flex items-start gap-4 p-4 mb-8 bg-lavender-50/50 border border-lavender-100 rounded-2xl">
            <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-lavender flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-text-primary mb-1">Διάρκεια Φοίτησης</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Η ελάχιστη χρονική διάρκεια για την απονομή του ΠΜΣ, ορίζεται σε <strong className="text-text-primary">τρία (3) διδακτικά εξάμηνα</strong>. 
                Ο μέγιστος χρόνος φοίτησης δεν μπορεί να υπερβεί τα <strong className="text-text-primary">πέντε (5)</strong>.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex items-start gap-3 group"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-white shadow-sm border border-lavender-100 flex items-center justify-center group-hover:bg-lavender group-hover:border-lavender transition-all duration-300">
                  <obj.icon className="h-5 w-5 text-lavender group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-text-secondary leading-snug pt-1 group-hover:text-text-primary transition-colors">
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
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] glass-card-elevated shadow-xl">
            <Image
              src="/images/lab.png"
              alt="Εργαστήριο Κοσμητολογίας ΔιΠΑΕ"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/40 via-transparent to-transparent mix-blend-multiply" />
          </div>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-6 -left-4 glass-card-elevated rounded-2xl px-5 py-4 shadow-lg bg-white/95 backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center shadow-md">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-text-primary text-base">90 ECTS</div>
                <div className="text-xs text-text-secondary font-medium uppercase tracking-wider">Πιστωτικές Μονάδες</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
