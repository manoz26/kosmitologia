"use client";

/* ══════════════════════════════════════════════════════════════════════════
   StatsConstellation
   ──────────────────────────────────────────────────────────────────────────
   Programme facts as a glowing "constellation": animated counters on glass
   tiles, orbited by decorative molecule nodes and connected by a faint
   parallaxing grid. Scroll parallax gives the cluster gentle depth.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { programStats } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { OrbitRing, Molecule3D } from "./lib/cosmetic3d";
import { useReduced } from "./lib/hooks";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function StatsConstellation() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Function-based — range-based scroll transforms desync via WAAPI (see CinematicScrollHero).
  const orbA = useTransform(scrollYProgress, (p) => 40 - 80 * clamp01(p));
  const orbB = useTransform(scrollYProgress, (p) => -30 + 80 * clamp01(p));

  return (
    <section ref={ref} id="stats" className="relative w-full overflow-hidden py-24 md:py-32">
      {/* decorative orbits */}
      <OrbitRing size={520} className="-left-40 top-10 opacity-30" duration={60} dash="2 14" />
      <OrbitRing size={420} className="-right-32 bottom-0 opacity-30" duration={48} reverse />
      <motion.div style={{ y: orbA }} className="pointer-events-none absolute right-[8%] top-16 opacity-60">
        <Molecule3D size={120} />
      </motion.div>
      <motion.div style={{ y: orbB }} className="pointer-events-none absolute left-[6%] bottom-16 opacity-50">
        <Molecule3D size={90} />
      </motion.div>

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Με αριθμούς"
          labelIcon="gauge"
          title="Ένα πρόγραμμα"
          highlight="που μετριέται"
          description="Συμπαγές, εστιασμένο και πλήρως δομημένο — οι βασικοί αριθμοί του ΠΜΣ Κοσμητολογίας με μια ματιά."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {programStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07} direction="scale">
              <div className="group relative h-full overflow-hidden rounded-3xl glass-lachani p-6 text-center transition-transform duration-300 hover:-translate-y-1.5 md:p-8">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: "radial-gradient(circle, rgba(216,236,128,0.9), transparent 70%)" }}
                  aria-hidden
                />
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                  <Icon name={stat.icon} size={22} />
                </div>
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                  className="mt-4 block text-4xl text-text-primary md:text-5xl"
                />
                <p className="mt-1 font-heading text-sm font-bold text-ihu-green-dark">{stat.label}</p>
                <p className="mt-1 text-xs text-text-secondary">{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* faint connecting grid */}
      {!reduced && (
        <div
          aria-hidden
          className="home-grid-soft pointer-events-none absolute inset-0 -z-[1] opacity-20"
          style={{ maskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)", WebkitMaskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)" }}
        />
      )}
    </section>
  );
}

export default StatsConstellation;
