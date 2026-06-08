"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Building, ShieldCheck, Microscope } from "lucide-react";

const objectives = [
  {
    icon: Lightbulb,
    title: "Προωθημένες Γνώσεις",
    desc: "Παροχή προηγμένων γνώσεων σε επιστημονικά πεδία που καλύπτουν τις σύγχρονες ανάγκες στην επιστήμη της Κοσμητολογίας.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    bg: "bg-gradient-to-br from-lavender-50 to-white",
    iconBg: "bg-lavender-100",
    iconColor: "text-lavender",
    delay: 0.1,
  },
  {
    icon: ShieldCheck,
    title: "Δημόσια Υγεία",
    desc: "Εφαρμογή της κοσμητολογικής επιστήμης στην ιδιωτική και δημόσια υγεία, με γνώμονα την ασφάλεια.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bg: "bg-gradient-to-br from-mint-50 to-white",
    iconBg: "bg-mint-100",
    iconColor: "text-mint-dark",
    delay: 0.2,
  },
  {
    icon: Microscope,
    title: "Έρευνα & Καινοτομία",
    desc: "Ανάπτυξη και προώθηση της έρευνας σε όλα τα πεδία της Κοσμητολογίας.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    bg: "bg-gradient-to-br from-peach-50 to-white",
    iconBg: "bg-peach-100",
    iconColor: "text-peach-dark",
    delay: 0.3,
  },
  {
    icon: Building,
    title: "Στελέχωση Αγοράς",
    desc: "Άρτια εκπαιδευμένα στελέχη για βιομηχανίες και εργαστήρια ποιοτικού ελέγχου.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bg: "bg-gradient-to-br from-primary-50 to-white",
    iconBg: "bg-primary-100",
    iconColor: "text-primary",
    delay: 0.4,
  },
  {
    icon: Users,
    title: "Ελεύθεροι Επαγγελματίες",
    desc: "Ενδυνάμωση αποφοίτων για επιτυχημένη πορεία ως εξειδικευμένοι επιστήμονες στον ιδιωτικό τομέα.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    bg: "bg-gradient-to-br from-surface to-white",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    delay: 0.5,
  },
];

export function ProgramObjectivesSection() {
  return (
    <section className="relative pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted mb-4"
          >
            Η ΑΠΟΣΤΟΛΗ ΤΟΥ ΠΡΟΓΡΑΜΜΑΤΟΣ ΜΕΤΑΠΤΥΧΙΑΚΩΝ ΣΠΟΥΔΩΝ
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-black text-text-primary"
          >
            Αναλυτικοί Στόχοι
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: obj.delay }}
                className={`group relative overflow-hidden rounded-[2rem] border border-border-soft ${obj.bg} p-8 flex flex-col justify-between ${obj.colSpan} ${obj.rowSpan} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Large Background Icon */}
                <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                  <Icon className={`w-48 h-48 ${obj.iconColor}`} />
                </div>
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${obj.iconBg} flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${obj.iconColor}`} />
                  </div>
                </div>
                
                <div className="relative z-10 mt-auto">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-text-primary mb-3">
                    {obj.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                    {obj.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
