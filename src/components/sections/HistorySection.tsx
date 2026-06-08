"use client";

import { motion } from "framer-motion";
import { Milestone, Flag, Star, GraduationCap } from "lucide-react";

const timelineEvents = [
  {
    year: "1985",
    title: "Ίδρυση του Τμήματος",
    description: "Ίδρυση ως «Τμήμα Διατροφής του Ανθρώπου» και υποδοχή των πρώτων προπτυχιακών φοιτητών. Σταθμός για την επιστήμη της Διατροφής στην Ελλάδα.",
    icon: Flag,
    color: "bg-lavender text-white",
  },
  {
    year: "2004",
    title: "Έναρξη Μεταπτυχιακών",
    description: "Η εισαγωγή των πρώτων μεταπτυχιακών φοιτητών σηματοδότησε την εξέλιξη και την καταξίωση του Τμήματος στο χώρο της Ανώτατης Εκπαίδευσης.",
    icon: GraduationCap,
    color: "bg-mint text-white",
  },
  {
    year: "2019",
    title: "Συνένωση & Διεύρυνση",
    description: "Δημιουργία του ενιαίου Τμήματος Επιστημών Διατροφής και Διαιτολογίας του ΔΙ.ΠΑ.Ε., με την ένταξη του Τμήματος «Αισθητικής και Κοσμητολογίας».",
    icon: Milestone,
    color: "bg-peach text-white",
  },
  {
    year: "2021",
    title: "ΠΜΣ Κοσμητολογία",
    description: "Έναρξη του εξειδικευμένου Προγράμματος Μεταπτυχιακών Σπουδών στην Κοσμητολογία, καλύπτοντας τις σύγχρονες ανάγκες της αγοράς.",
    icon: Star,
    color: "bg-primary text-white",
  },
];

export function HistorySection() {
  return (
    <section className="relative pt-12 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-black text-text-primary mb-4"
          >
            Ιστορική Αναδρομή
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary"
          >
            Η πορεία και η εξέλιξη του Τμήματος μέσα στο χρόνο.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lavender via-mint to-transparent -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {timelineEvents.map((event, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = event.icon;
              
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "md:flex-row-reverse" : ""}`}>
                  
                  {/* Timeline Node */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="absolute left-8 md:left-1/2 w-16 h-16 bg-white rounded-full border-[6px] border-white shadow-md flex items-center justify-center -translate-x-1/2 z-10"
                  >
                    <div className={`w-full h-full rounded-full ${event.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? "md:text-right" : "md:text-left"}`}
                  >
                    <span className="inline-block mb-2 font-heading font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-lavender to-mint opacity-80">
                      {event.year}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">
                      {event.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-border-soft md:border-transparent md:bg-transparent md:p-0 md:backdrop-blur-none">
                      {event.description}
                    </p>
                  </motion.div>
                  
                  {/* Empty Spacer */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
