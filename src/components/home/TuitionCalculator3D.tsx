"use client";

/* ══════════════════════════════════════════════════════════════════════════
   TuitionCalculator3D — "Υπολογίστε τα δίδακτρα"
   ──────────────────────────────────────────────────────────────────────────
   A small interactive calculator: toggle the exemption eligibility and choose
   the number of instalments to see the resulting amount. Purely informational
   (no submission), with an animated euro readout.
   ══════════════════════════════════════════════════════════════════════════ */

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgePercent, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./lib/primitives";

const BASE = 2400;

function euro(n: number) {
  return n.toLocaleString("el-GR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

export function TuitionCalculator3D() {
  const [exempt, setExempt] = useState(false);
  const [installments, setInstallments] = useState<1 | 2 | 3>(3);

  const total = exempt ? 0 : BASE;
  const perInstallment = useMemo(() => Math.round(total / installments), [total, installments]);

  return (
    <section id="tuition" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Δίδακτρα"
          labelIcon="euro"
          title="Υπολογίστε τα"
          highlight="δίδακτρά σας"
          description="Τα συνολικά δίδακτρα είναι €2.400 για όλο το πρόγραμμα, με δυνατότητα πλήρους απαλλαγής έως 30% των φοιτητών (Ν. 4957/2022)."
        />

        <Reveal direction="scale">
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] [perspective:1500px]">
            {/* controls */}
            <div className="rounded-[2rem] glass-lachani p-7 md:p-8">
              {/* exemption toggle */}
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/45 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow">
                    <BadgePercent size={20} />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-text-primary">Δικαιούχος απαλλαγής</p>
                    <p className="text-xs text-text-secondary">Πλήρης απαλλαγή διδάκτρων</p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={exempt}
                  onClick={() => setExempt((v) => !v)}
                  className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300", exempt ? "bg-ihu-green-dark" : "bg-ihu-green-dark/20")}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={cn("absolute top-0.5 h-6 w-6 rounded-full bg-white shadow", exempt ? "right-0.5" : "left-0.5")}
                  />
                </button>
              </div>

              {/* installments */}
              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold text-text-primary">Δόσεις</p>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((n) => {
                    const active = installments === n;
                    return (
                      <button
                        key={n}
                        onClick={() => setInstallments(n as 1 | 2 | 3)}
                        disabled={exempt}
                        className={cn(
                          "rounded-xl py-3 text-sm font-bold transition-all duration-300",
                          exempt && "cursor-not-allowed opacity-40",
                          active && !exempt ? "bg-ihu-green-dark text-white shadow-lg" : "bg-white/55 text-ihu-green-dark hover:bg-white/80",
                        )}
                      >
                        {n} {n === 1 ? "δόση" : "δόσεις"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-text-secondary">
                * Ενδεικτικός υπολογισμός. Η απαλλαγή αφορά έως το 30% των εγγεγραμμένων φοιτητών βάσει εισοδηματικών κριτηρίων.
              </p>
            </div>

            {/* result */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] glass-lachani-deep p-8 text-center md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-halo-pulse"
                style={{ background: "radial-gradient(circle, rgba(216,236,128,0.9), transparent 65%)" }}
              />
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                <Wallet size={22} />
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-ihu-green-dark">Συνολικά δίδακτρα</p>
              <div className="relative mt-1 h-16">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={total}
                    initial={{ opacity: 0, y: 18, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -18, rotateX: 40 }}
                    transition={{ duration: 0.4 }}
                    className="font-heading text-5xl font-black text-ihu-green-dark md:text-6xl"
                  >
                    {total === 0 ? "€0" : euro(total)}
                  </motion.p>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                {exempt ? (
                  <motion.p key="ex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm font-semibold text-ihu-green">
                    Πλήρης απαλλαγή διδάκτρων 🎉
                  </motion.p>
                ) : (
                  <motion.p key="inst" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-text-secondary">
                    {installments} × <span className="font-bold text-ihu-green-dark">{euro(perInstallment)}</span> ανά δόση
                  </motion.p>
                )}
              </AnimatePresence>

              <Link
                href="/eggrafes"
                className="group mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
              >
                Δείτε τις λεπτομέρειες
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default TuitionCalculator3D;
