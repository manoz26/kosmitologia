"use client";

import { motion } from "framer-motion";
import { Beaker, BookOpen, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

export function AboutHeroSection() {
  return (
    <section className="relative w-full max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden bg-white border border-border-soft shadow-xl shadow-black/5">
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-lavender via-mint to-peach" />

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left Content */}
        <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center relative">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#94a3b8_1px,_transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender-50 text-lavender-dark text-xs font-bold uppercase tracking-widest mb-8 border border-lavender/20">
              <span className="w-2 h-2 rounded-full bg-lavender animate-pulse" />
              Γνωστικο Αντικειμενο
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary leading-[1.1] mb-6">
              Η Επιστήμη της <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender-dark to-primary">
                Κοσμητολογίας
              </span>
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              Το Πρόγραμμα Μεταπτυχιακών Σπουδών εστιάζει στην Κοσμητολογία και στα οφέλη αυτής στην οικονομία και την κοινωνία. Το προφίλ των αποφοίτων είναι αυτό των σύγχρονων και άρτια εκπαιδευμένων στελεχών.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Stat 1 */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-mint-50 flex items-center justify-center text-mint-dark group-hover:bg-mint group-hover:text-white transition-colors duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">Διαρκεια</div>
                  <div className="font-heading font-bold text-text-primary text-lg">3-5 Εξάμηνα</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-peach-50 flex items-center justify-center text-peach-dark group-hover:bg-peach group-hover:text-white transition-colors duration-300">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">Φορτος</div>
                  <div className="font-heading font-bold text-text-primary text-lg">90 ECTS</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Visuals */}
        <div className="relative min-h-[400px] lg:min-h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/lab.png"
              alt="Εργαστήριο Κοσμητολογίας"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Elegant overlay to blend the image */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:w-1/3" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

            {/* Floating Glass Element */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 right-8 left-8 md:left-auto md:w-80 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lavender-light to-lavender flex items-center justify-center text-white shadow-inner shrink-0">
                  <Beaker className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-primary mb-1">Σύγχρονα Εργαστήρια</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Άρτια εκπαιδευμένα στελέχη με υψηλό επίπεδο εφαρμογής επιστημονικών γνώσεων.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
