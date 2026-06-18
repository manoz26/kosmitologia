"use client";

/* ══════════════════════════════════════════════════════════════════════════
   IngredientShowcase3D
   ──────────────────────────────────────────────────────────────────────────
   The active ingredients of cosmetology presented as a glossy orbital cluster.
   A central featured orb morphs to the selected ingredient while the others
   orbit around it; a glass panel reveals the INCI name, benefit and a fact.
   Auto-advances, pauses on hover, fully clickable.
   ══════════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ingredients } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { IngredientOrb, OrbitRing } from "./lib/cosmetic3d";
import { Aurora, ParticleField } from "./lib/decorations";
import { useReduced } from "./lib/hooks";

const N = ingredients.length;
const RADIUS = 150;

export function IngredientShowcase3D() {
  const reduced = useReduced();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const select = useCallback((i: number) => setActive(((i % N) + N) % N), []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % N), 3800);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const current = ingredients[active];

  return (
    <section id="ingredients" className="relative w-full overflow-hidden py-24 md:py-32">
      <Aurora tintA="rgba(216,236,128,0.4)" tintB="rgba(135,157,66,0.32)" />
      <ParticleField count={14} seed={31} glow="rgba(165,186,95,0.5)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Δραστικά συστατικά"
          labelIcon="droplets"
          title="Η χημεία πίσω"
          highlight="από κάθε σταγόνα"
          description="Από το υαλουρονικό οξύ μέχρι τα πεπτίδια — γνωρίστε τα δραστικά συστατικά που μελετάμε, σχεδιάζουμε και αξιολογούμε."
        />

        <div
          className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Orbital cluster */}
          <div className="relative mx-auto flex h-[24rem] w-full max-w-md items-center justify-center sm:h-[26rem]">
            <OrbitRing size={360} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" duration={48} dash="2 12" />
            <OrbitRing size={300} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" duration={36} reverse />

            {/* central halo */}
            <motion.div
              key={current.id + "-halo"}
              className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ background: `radial-gradient(circle, ${current.from}cc, transparent 65%)` }}
              aria-hidden
            />

            {/* featured orb */}
            <div className="relative z-10">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                  transition={{ type: "spring", stiffness: 120, damping: 16 }}
                  className="relative"
                >
                  <IngredientOrb size={160} from={current.from} to={current.to} />
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/30 text-white ring-1 ring-white/40 backdrop-blur-md">
                    <Icon name={current.icon} size={28} />
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* orbiting selectors */}
            {ingredients.map((ing, i) => {
              const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              const isActive = i === active;
              return (
                <button
                  key={ing.id}
                  onClick={() => select(i)}
                  aria-label={ing.name}
                  className="absolute left-1/2 top-1/2 z-20 transition-transform"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isActive ? 1.25 : 1})` }}
                >
                  <span
                    className={cn(
                      "block rounded-full ring-2 transition-all duration-300",
                      isActive ? "ring-white" : "ring-white/40 hover:ring-white/70",
                    )}
                    style={{ boxShadow: isActive ? `0 0 18px ${ing.from}` : "0 6px 14px -6px rgba(95,113,42,0.5)" }}
                  >
                    <IngredientOrb size={isActive ? 40 : 34} from={ing.from} to={ing.to} float={false} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Info panel */}
          <Reveal direction="right">
            <div className="relative min-h-[18rem] overflow-hidden rounded-[2rem] glass-lachani-deep p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${current.from}, ${current.to})` }}
                    >
                      <Icon name={current.icon} size={24} />
                    </span>
                    <span className="rounded-full bg-white/55 px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ color: current.accent }}>
                      {current.benefit}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-2xl font-extrabold text-text-primary md:text-3xl">{current.name}</h3>
                  <p className="mt-1 font-mono text-sm text-ihu-green-dark/70">{current.inci}</p>

                  <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">{current.description}</p>

                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/45 p-4 ring-1 ring-ihu-green-dark/10">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ihu-green/15 text-ihu-green-dark">
                      <Icon name="lightbulb" size={18} />
                    </span>
                    <p className="text-sm font-semibold text-text-primary">{current.fact}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* progress dots */}
              <div className="mt-7 flex flex-wrap gap-2">
                {ingredients.map((ing, i) => (
                  <button
                    key={ing.id}
                    onClick={() => select(i)}
                    aria-label={ing.name}
                    className={cn("h-2 rounded-full transition-all duration-300", i === active ? "w-6 bg-ihu-green-dark" : "w-2 bg-ihu-green-dark/25 hover:bg-ihu-green-dark/50")}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default IngredientShowcase3D;
