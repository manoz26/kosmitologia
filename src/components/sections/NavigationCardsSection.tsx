"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ChevronRight } from "lucide-react";

const cards = [
  {
    title: "Το Πρόγραμμα Σπουδών",
    description: "Αναλυτικές πληροφορίες για τα μαθήματα και τις κατευθύνσεις.",
    href: "/programma",
    type: "students" as const,
    label: "Φωτογραφία: Φοιτητές που κάνουν πειράματα"
  },
  {
    title: "Η Σχολή & Το Τμήμα",
    description: "Ιστορικό, εγκαταστάσεις και το όραμα της Κοσμητείας.",
    href: "/sxetika",
    type: "classroom" as const,
    label: "Φωτογραφία: Αίθουσες Διδασκαλίας / Αμφιθέατρα"
  },
  {
    title: "Διδακτικό Προσωπικό",
    description: "Γνωρίστε τους καθηγητές και το έργο τους.",
    href: "/didaskotes",
    type: "professor" as const,
    label: "Φωτογραφία: Καθηγητές που διδάσκουν"
  },
  {
    title: "Εργαστήρια & Εξοπλισμός",
    description: "Σύγχρονα εργαστήρια και όργανα αιχμής.",
    href: "/ergastiria",
    type: "equipment" as const,
    label: "Φωτογραφία: Όργανα Εργαστηριακά"
  },
  {
    title: "Διαδικασία Εισαγωγής",
    description: "Όλα όσα χρειάζεστε για την εγγραφή σας στο πρόγραμμα.",
    href: "/eisagogi",
    type: "campus" as const,
    label: "Φωτογραφία: Γραμματεία / Αμφιθέατρα"
  },
  {
    title: "Επαγγελματικές Προοπτικές",
    description: "Οι δρόμοι που ανοίγονται μετά την αποφοίτηση.",
    href: "/karieres",
    type: "lab" as const,
    label: "Φωτογραφία: Εργαστήρια / Καριέρα"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function NavigationCardsSection() {
  return (
    <section className="py-24 section-container bg-surface relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Εξερευνήστε το Πρόγραμμα
          </h2>
          <p className="text-text-secondary text-lg">
            Περιηγηθείτε στις εγκαταστάσεις, γνωρίστε τους ανθρώπους μας και ανακαλύψτε τις προοπτικές που προσφέρει η Επιστήμη της Κοσμητολογίας.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {cards.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Link href={card.href} className="group block h-full">
                <div className="glass-card rounded-2xl p-4 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-lavender/20 hover:-translate-y-1">
                  
                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <PlaceholderImage 
                      type={card.type} 
                      label={card.label} 
                      aspectRatio="square"
                      className="group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-heading text-xl font-bold text-text-primary mb-2 flex items-center justify-between">
                      {card.title}
                      <ChevronRight className="w-5 h-5 text-lavender opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {card.description}
                    </p>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
