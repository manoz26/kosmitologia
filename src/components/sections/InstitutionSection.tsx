"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";

const institutionFeatures = [
  {
    icon: Building2,
    title: "Διεθνές Πανεπιστήμιο της Ελλάδος (ΔΙΠΑΕ)",
    description: "Ένα από τα μεγαλύτερα και πιο δυναμικά Πανεπιστήμια της χώρας, προσφέροντας υπερσύγχρονες εγκαταστάσεις 1.600 στρεμμάτων."
  },
  {
    icon: GraduationCap,
    title: "Τμήμα Επιστημών Διατροφής & Διαιτολογίας",
    description: "Με μακρά ιστορία και υψηλό κύρος, στελεχωμένο από καταξιωμένους επιστήμονες που δεσμεύονται στην παροχή ανώτατης ποιότητας εκπαίδευσης."
  },
  {
    icon: MapPin,
    title: "Αλεξάνδρεια Πανεπιστημιούπολη, Σίνδος",
    description: "Μόλις 17 χλμ δυτικά από το κέντρο της Θεσσαλονίκης, με εύκολη πρόσβαση, βιβλιοθήκη, άρτια εξοπλισμένα εργαστήρια και άνετους χώρους."
  }
];

export function InstitutionSection() {
  return (
    <SectionWrapper
      id="institution"
      variant="gradient"
      title="Το Ίδρυμα & Το Τμήμα"
      subtitle="Σύγχρονες Εγκαταστάσεις, Υψηλό Επίπεδο Σπουδών"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <div className="space-y-6">
            {institutionFeatures.map((feature, idx) => (
              <GlassCard key={idx} variant="colored" delay={idx * 0.1}>
                <div className="flex items-start gap-5 p-3">
                  <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br from-mint-light to-mint flex items-center justify-center text-white shadow-lg shadow-mint/20 transform hover:scale-105 transition-transform">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-primary text-lg mb-2">{feature.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Visual / Image area */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] glass-card-elevated shadow-2xl group">
            {/* Using a solid gradient or if a campus image exists. I'll use a beautiful gradient that matches the theme and an abstract pattern since we don't have a specific campus image uploaded here */}
            <div className="absolute inset-0 bg-gradient-to-br from-lavender-dark via-lavender to-mint opacity-90 z-0"></div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px] z-0"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 text-white">
              <Building2 className="w-24 h-24 mb-6 opacity-80 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-3xl font-heading font-bold mb-4 drop-shadow-md">ΔΙ.ΠΑ.Ε.</h3>
              <p className="text-white/90 text-lg max-w-sm drop-shadow-md">
                Αλεξάνδρεια Πανεπιστημιούπολη<br/>
                Κόμβος Γνώσης & Έρευνας
              </p>
            </div>
          </div>
          
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-6 -left-6 glass-card-elevated rounded-2xl p-5 shadow-xl max-w-[220px] bg-white/90 backdrop-blur-lg z-20"
          >
             <div className="flex items-center gap-3 mb-2">
               <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-peach to-peach-dark flex items-center justify-center">
                 <MapPin className="h-5 w-5 text-white" />
               </div>
               <span className="font-heading font-bold text-text-primary text-sm">Σίνδος, Θεσσαλονίκη</span>
             </div>
             <p className="text-xs text-text-secondary leading-relaxed">
               Πλήρως εξοπλισμένα εργαστήρια, βιβλιοθήκη και σύγχρονες υποδομές.
             </p>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
