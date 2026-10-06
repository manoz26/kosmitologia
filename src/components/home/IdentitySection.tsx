"use client";

/* ══════════════════════════════════════════════════════════════════════════
   IdentitySection — "Το Τμήμα και το Ίδρυμα"
   ──────────────────────────────────────────────────────────────────────────
   Intro copy on the left, a 2×2 grid of pointer-reactive 3D tilt cards on the
   right surfacing the key institutional facts. Floats transparently on the
   λαχανί backdrop with a couple of parallaxing cosmetic props for depth.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { identityHighlights } from "./lib/data";
import { Icon, Reveal, SectionHeading, TiltCard } from "./lib/primitives";
import { Leaf3D, Molecule3D } from "./lib/cosmetic3d";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function IdentitySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Function-based — range-based scroll transforms desync via WAAPI (see CinematicScrollHero).
  const propY = useTransform(scrollYProgress, (p) => 60 - 120 * clamp01(p));
  const propY2 = useTransform(scrollYProgress, (p) => -40 + 120 * clamp01(p));

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full overflow-hidden py-24 md:py-32"
    >
      {/* decorative props */}
      <motion.div style={{ y: propY }} className="pointer-events-none absolute -left-6 top-24 opacity-70">
        <Leaf3D size={120} />
      </motion.div>
      <motion.div style={{ y: propY2 }} className="pointer-events-none absolute right-4 bottom-12 opacity-50">
        <Molecule3D size={140} />
      </motion.div>

      <div className="section-container relative z-10 grid grid-cols-1 items-start gap-12 px-4 lg:grid-cols-12 lg:gap-10">
        {/* Left — copy (5 of 12 columns) */}
        <div className="lg:col-span-5">
          <SectionHeading align="left" label="Το Ίδρυμα" labelIcon="building" title="Το Τμήμα και το" highlight="Ίδρυμα" />
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Το Τμήμα Επιστημών Διατροφής και Διαιτολογίας του ΔΙΠΑΕ λειτουργεί
              στις εγκαταστάσεις της Αλεξάνδρειας Πανεπιστημιούπολης στη Σίνδο
              Θεσσαλονίκης.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-4 leading-relaxed text-text-secondary">
              Είναι ένα από τα τέσσερα τμήματα ανώτατης εκπαίδευσης στη Διατροφή
              και Διαιτολογία στην Ελλάδα, και από το 2019 φιλοξενεί και το
              γνωστικό αντικείμενο της Αισθητικής & Κοσμητολογίας. Πάνω σε αυτή τη
              διπλή βάση, διατροφή και επιστήμη του δέρματος, στηρίζεται το ΠΜΣ.
            </p>
          </Reveal>
        </div>

        {/* Right — tilt cards, starting a column in from the copy */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:pt-12 [perspective:1400px]">
          {identityHighlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
              <TiltCard
                max={12}
                className={i % 2 === 1 ? "sm:mt-8" : undefined}
                innerClassName="glass-lachani rounded-3xl p-6"
              >
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-50 blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(216,236,128,0.9), transparent 70%)" }}
                  aria-hidden
                />
                <div
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{
                    background: "linear-gradient(140deg,#879D42,#5F712A)",
                    transform: "translateZ(40px)",
                  }}
                >
                  <Icon name={item.icon} size={22} />
                </div>
                <h3
                  className="relative mt-5 font-heading text-lg font-bold text-text-primary"
                  style={{ transform: "translateZ(28px)" }}
                >
                  {item.title}
                </h3>
                <p className="relative mt-0.5 text-sm font-semibold text-ihu-green-dark" style={{ transform: "translateZ(20px)" }}>
                  {item.value}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IdentitySection;
