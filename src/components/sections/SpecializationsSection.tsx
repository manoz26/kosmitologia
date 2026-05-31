"use client";

import { motion } from "framer-motion";
import { Beaker, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const specializations = [
  {
    id: "spec-1",
    title: "Παρασκευή & Αξιολόγηση Καλλυντικών Προϊόντων",
    subtitle: "Κατεύθυνση Α'",
    description: "Εστίαση στον σχεδιασμό, ανάπτυξη, παρασκευή και ποιοτικό έλεγχο καινοτόμων καλλυντικών με σύγχρονες μεθόδους ανάλυσης. Προετοιμασία στελεχών για την παραγωγή προϊόντων υψηλής προστιθέμενης αξίας.",
    icon: Beaker,
    bgGradient: "from-mint-light to-mint",
    textColor: "text-mint-dark",
    shadowColor: "shadow-mint/20",
    features: ["Σχεδιασμός Προϊόντων", "Ποιοτικός Έλεγχος", "Σύγχρονη Ανάλυση"]
  },
  {
    id: "spec-2",
    title: "Εφαρμογές της Κοσμητολογίας στη Δερματολογία",
    subtitle: "Κατεύθυνση Β'",
    description: "Εξειδίκευση στην εφαρμογή κοσμητολογικών τεχνικών για την αντιμετώπιση δερματολογικών παθήσεων. Σύζευξη επιστήμης και κλινικής αισθητικής για την προαγωγή της υγείας του δέρματος.",
    icon: Sparkles,
    bgGradient: "from-peach-light to-peach",
    textColor: "text-peach-dark",
    shadowColor: "shadow-peach/20",
    features: ["Δερματολογικές Παθήσεις", "Κλινική Αισθητική", "Εξατομικευμένα Πρωτόκολλα"]
  }
];

export function SpecializationsSection() {
  return (
    <SectionWrapper
      id="specializations"
      variant="plain"
      title="Οι 2 Ειδικεύσεις του Προγράμματος"
      subtitle="Επιλέξτε την κατεύθυνση που ταιριάζει στους επαγγελματικούς σας στόχους"
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {specializations.map((spec, idx) => (
          <motion.div
            key={spec.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className={`group relative rounded-[2rem] overflow-hidden glass-card shadow-xl ${spec.shadowColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
          >
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br ${spec.bgGradient} rounded-full blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
            
            <div className="relative p-8 lg:p-10 z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <span className={`px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider ${spec.textColor} shadow-sm border border-white/50`}>
                  {spec.subtitle}
                </span>
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${spec.bgGradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <spec.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              <h3 className="font-heading text-2xl font-bold text-text-primary mb-4 leading-tight group-hover:text-lavender-dark transition-colors">
                {spec.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed mb-8 flex-grow">
                {spec.description}
              </p>

              <div className="space-y-3 mt-auto">
                {spec.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${spec.bgGradient}`} />
                    <span className="text-sm font-medium text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
