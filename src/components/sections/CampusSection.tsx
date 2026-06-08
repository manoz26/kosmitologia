"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Library, Trees, Microscope } from "lucide-react";
import Image from "next/image";

const facilities = [
  { icon: Trees, title: "1.600 Στρέμματα", desc: "Μια τεράστια, καταπράσινη έκταση, η μεγαλύτερη του ΔΙ.ΠΑ.Ε." },
  { icon: Building2, title: "35.000 τ.μ. Κτίρια", desc: "Υπερσύγχρονες εγκαταστάσεις διδασκαλίας." },
  { icon: Microscope, title: "Ερευνητικά Εργαστήρια", desc: "Άρτια εξοπλισμένα για τις ανάγκες της Κοσμητολογίας." },
  { icon: Library, title: "Βιβλιοθήκη", desc: "Κεντρική βιβλιοθήκη με αναγνωστήρια." },
];

export function CampusSection() {
  return (
    <section className="relative pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Visual Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 border-8 border-white"
          >
            <Image
              src="/images/lab.png" // Placeholder until a real campus image is used
              alt="Πανεπιστημιούπολη Σίνδου"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Elegant inner shadow / gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Σίνδος, Θεσσαλονίκη
              </div>
              <h3 className="font-heading text-3xl font-bold drop-shadow-md">Αλεξάνδρεια Πανεπιστημιούπολη</h3>
            </div>
          </motion.div>

          {/* Text Area */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-black text-text-primary mb-6">
                Κόμβος Γνώσης & Έρευνας
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                Το Τμήμα λειτουργεί στις υπερσύγχρονες εγκαταστάσεις της Αλεξάνδρειας Πανεπιστημιούπολης. Πρόκειται για ένα από τα μεγαλύτερα campus της χώρας, παρέχοντας ιδανικό περιβάλλον για μελέτη.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {facilities.map((fac, idx) => {
                  const Icon = fac.icon;
                  return (
                    <div key={idx} className="flex flex-col gap-3 group">
                      <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary mb-1">{fac.title}</h4>
                        <p className="text-sm text-text-secondary">{fac.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
