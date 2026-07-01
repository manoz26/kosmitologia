"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CareerStatBand — «η καριέρα με αριθμούς»
   ──────────────────────────────────────────────────────────────────────────
   A compact opener band of animated counters on glass-λαχανί tiles, framed by
   soft glow orbs. Mirrors the StatsConstellation language but carries the
   career-specific figures from @/data/careers.
   ══════════════════════════════════════════════════════════════════════════ */

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { careerStats } from "@/data/careers";
import { Icon, Reveal, SectionHeading } from "@/components/home/lib/primitives";
import { GlowOrb } from "@/components/home/lib/decorations";

export function CareerStatBand() {
  return (
    <section id="career-stats" className="relative w-full overflow-hidden py-20 md:py-28">
      <GlowOrb className="left-[-6%] top-10" size={320} color="rgba(216,236,128,0.4)" />
      <GlowOrb className="right-[-8%] bottom-0" size={300} color="rgba(135,157,66,0.32)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Με μια ματιά"
          labelIcon="gauge"
          title="Η καριέρα σας,"
          highlight="σε αριθμούς"
          description="Ένα μεταπτυχιακό που ανοίγει συγκεκριμένες, μετρήσιμες πόρτες στην αγορά εργασίας της κοσμητολογίας."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {careerStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} direction="scale">
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
    </section>
  );
}

export default CareerStatBand;
