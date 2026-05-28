"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/80 to-surface" />
      </div>

      {/* Decorative blobs */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full blob-lavender pointer-events-none"
      />
      <motion.div
        animate={{ y: [10, -15, 10], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[5%] w-96 h-96 rounded-full blob-mint pointer-events-none"
      />
      <motion.div
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[20%] w-64 h-64 rounded-full blob-peach pointer-events-none"
      />

      {/* Floating glass shapes */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[15%] w-16 h-16 rounded-2xl glass opacity-40 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [15, -15, 15], rotate: [45, 225, 405] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[30%] left-[10%] w-12 h-12 rounded-xl glass opacity-30 pointer-events-none hidden lg:block"
      />

      {/* Content */}
      <div className="relative z-10 section-container px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-lavender-dark mb-8">
              <span className="h-2 w-2 rounded-full bg-mint animate-pulse-soft" />
              Διεθνές Πανεπιστήμιο της Ελλάδος
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
          >
            <span className="text-text-primary">ΠΜΣ</span>
            <br />
            <span className="text-gradient">Κοσμητολογία</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Μεταπτυχιακό Πρόγραμμα Σπουδών στην{" "}
            <span className="font-semibold text-text-primary">
              Επιστήμη της Κοσμητολογίας
            </span>{" "}
            — Σχεδιασμός, ανάπτυξη και αξιολόγηση καινοτόμων καλλυντικών
            προϊόντων.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/eisagogi"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lavender via-lavender-dark to-lavender px-8 py-4 text-base font-bold text-white shadow-xl shadow-lavender/25 hover:shadow-lavender/40 hover:scale-105 active:scale-100 transition-all duration-300 bg-[length:200%_auto] animate-gradient"
            >
              Ξεκινήστε την Αίτηση
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/programma"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-text-primary glass hover:bg-white/80 transition-all duration-200"
            >
              Πρόγραμμα Σπουδών
            </Link>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[
              { value: "90", label: "ECTS", suffix: "" },
              { value: "3", label: "Εξάμηνα", suffix: "" },
              { value: "2.400", label: "Δίδακτρα", suffix: "€" },
              { value: "2", label: "Κατευθύνσεις", suffix: "" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-4 text-center"
              >
                <div className="font-heading text-2xl font-bold text-lavender-dark">
                  {stat.suffix === "€" ? `${stat.value}${stat.suffix}` : stat.value}
                </div>
                <div className="text-xs font-medium text-text-muted uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-muted uppercase tracking-widest font-medium">
            Κύλισε
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5 text-lavender" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
