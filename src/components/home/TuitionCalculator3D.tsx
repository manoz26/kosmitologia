"use client";

/* ══════════════════════════════════════════════════════════════════════════
   TuitionCalculator3D — "Υπολογίστε τα δίδακτρα"
   ──────────────────────────────────────────────────────────────────────────
   A small interactive calculator: choose the number of instalments to see
   the amount per instalment. Purely informational (no submission), with an
   animated euro readout. (The "up to 30% exemption" toggle was removed on
   2026-10-01 — the claim is not in the study guide.)
   ══════════════════════════════════════════════════════════════════════════ */

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatEuro, program } from "@/data/program";
import { Reveal, SectionHeading } from "./lib/primitives";

const BASE = program.tuition.value;

function euro(n: number) {
  return n.toLocaleString("el-GR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

export function TuitionCalculator3D() {
  const [installments, setInstallments] = useState<1 | 2 | 3>(3);

  const total = BASE;
  const perInstallment = useMemo(() => Math.round(total / installments), [total, installments]);

  return (
    <section id="tuition" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Δίδακτρα"
          labelIcon="euro"
          title="Υπολογίστε τα"
          highlight="δίδακτρά σας"
          description={`Τα συνολικά δίδακτρα είναι ${formatEuro(BASE)} για όλο το πρόγραμμα.`}
        />

        <Reveal direction="scale">
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] [perspective:1500px]">
            {/* controls */}
            <div className="rounded-3xl glass-lachani p-7 md:p-8">
              {/* installments */}
              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary">Δόσεις</p>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((n) => {
                    const active = installments === n;
                    return (
                      <button
                        key={n}
                        onClick={() => setInstallments(n as 1 | 2 | 3)}
                        className={cn(
                          "rounded-xl py-3 text-sm font-bold transition-all duration-300",
                          active ? "bg-ihu-green-dark text-white shadow-lg" : "bg-white/55 text-ihu-green-dark hover:bg-white/80",
                        )}
                      >
                        {n} {n === 1 ? "δόση" : "δόσεις"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-text-secondary">
                * Ενδεικτικός υπολογισμός.
              </p>
            </div>

            {/* result */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl glass-lachani-deep p-8 text-center md:p-10">
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
                    {euro(total)}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="mt-3 text-sm text-text-secondary">
                {installments} × <span className="font-bold text-ihu-green-dark">{euro(perInstallment)}</span> ανά δόση
              </p>

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
