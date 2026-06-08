"use client";

import { motion } from "framer-motion";
import { FlaskConical, Stethoscope, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const specializations = [
  {
    id: "spec-1",
    title: "Παρασκευή & Αξιολόγηση Καλλυντικών Προϊόντων",
    subtitle: "ΚΑΤΕΥΘΥΝΣΗ Α'",
    description: "Εστίαση στον σχεδιασμό, ανάπτυξη, παρασκευή και ποιοτικό έλεγχο καινοτόμων καλλυντικών με σύγχρονες μεθόδους ανάλυσης. Προετοιμασία στελεχών για την παραγωγή προϊόντων υψηλής προστιθέμενης αξίας.",
    icon: FlaskConical,
    theme: "mint",
    bg: "bg-mint-50",
    text: "text-mint-dark",
    gradient: "from-mint-100 to-transparent",
    features: ["Σχεδιασμός Προϊόντων", "Ποιοτικός Έλεγχος", "Σύγχρονη Ανάλυση", "Καινοτόμα Καλλυντικά"],
  },
  {
    id: "spec-2",
    title: "Εφαρμογές της Κοσμητολογίας στη Δερματολογία",
    subtitle: "ΚΑΤΕΥΘΥΝΣΗ Β'",
    description: "Εξειδίκευση στην εφαρμογή κοσμητολογικών τεχνικών για την αντιμετώπιση δερματολογικών παθήσεων. Σύζευξη επιστήμης και κλινικής αισθητικής για την προαγωγή της υγείας του δέρματος.",
    icon: Stethoscope,
    theme: "lavender",
    bg: "bg-lavender-50",
    text: "text-lavender",
    gradient: "from-lavender-100 to-transparent",
    features: ["Δερματολογικές Παθήσεις", "Κλινική Αισθητική", "Εξατομικευμένα Πρωτόκολλα", "Παθοφυσιολογία"],
  }
];

export function SpecializationsBento() {
  return (
    <section className="relative pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-black text-text-primary mb-4"
          >
            Εξειδικευμένες Κατευθύνσεις
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Επιλέξτε τον τομέα που ταιριάζει στα επαγγελματικά σας σχέδια.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {specializations.map((spec, idx) => {
            const Icon = spec.icon;
            
            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={cn(
                  "group relative bg-white rounded-[2.5rem] p-10 md:p-12 overflow-hidden border border-border-soft hover:shadow-2xl transition-all duration-500",
                  idx === 1 ? "lg:mt-12" : "" // Subtle staggered layout
                )}
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${spec.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full ${spec.bg} ${spec.text} text-xs font-bold tracking-widest mb-8`}>
                    {spec.subtitle}
                  </div>
                  
                  <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary mb-6 leading-tight">
                    {spec.title}
                  </h3>
                  
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10">
                    {spec.description}
                  </p>

                  <div className="space-y-4">
                    {spec.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${spec.bg} ring-2 ring-white shadow-sm`} />
                        <span className="font-medium text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Icon */}
                <div className={`absolute -right-8 -bottom-8 w-64 h-64 ${spec.text} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-12`}>
                  <Icon className="w-full h-full" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
