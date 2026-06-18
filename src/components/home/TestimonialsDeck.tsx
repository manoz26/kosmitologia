"use client";

/* ══════════════════════════════════════════════════════════════════════════
   TestimonialsDeck
   ──────────────────────────────────────────────────────────────────────────
   A 3D coverflow deck of alumni voices. The active quote sits front-and-centre
   while neighbours fan back in Z, rotated to the sides. Auto-advances (pausing
   on hover), with dots + arrows for manual control.
   ══════════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { testimonials } from "./lib/data";
import { Reveal, SectionHeading } from "./lib/primitives";
import { useReduced } from "./lib/hooks";

const N = testimonials.length;

function delta(i: number, active: number) {
  let d = (((i - active) % N) + N) % N;
  if (d > N / 2) d -= N;
  return d;
}

export function TestimonialsDeck() {
  const reduced = useReduced();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % N), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + N) % N), []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % N), 5200);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  return (
    <section id="testimonials" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Απόφοιτοι"
          labelIcon="quote"
          title="Φωνές από την"
          highlight="κοινότητά μας"
          description="Τι λένε όσοι ολοκλήρωσαν το ΠΜΣ και εργάζονται σήμερα στον κλάδο της κοσμητολογίας."
        />

        <Reveal direction="scale">
          <div
            className="relative mx-auto mt-16 h-[24rem] max-w-3xl [perspective:1600px] sm:h-[22rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {testimonials.map((t, i) => {
              const d = delta(i, active);
              const abs = Math.abs(d);
              const isActive = d === 0;
              const hidden = abs > 1;
              return (
                <motion.div
                  key={t.name}
                  className="absolute left-1/2 top-1/2 w-[88%] max-w-xl sm:w-[78%]"
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${d * 38}%)`,
                    y: "-50%",
                    rotateY: d * -26,
                    scale: isActive ? 1 : 0.86,
                    opacity: hidden ? 0 : isActive ? 1 : 0.5,
                    z: isActive ? 0 : -160,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                  style={{ transformStyle: "preserve-3d", zIndex: isActive ? 30 : 10 - abs, pointerEvents: isActive ? "auto" : "none" }}
                >
                  <div className="relative overflow-hidden rounded-[1.8rem] glass-lachani-deep p-8 md:p-10">
                    <div
                      className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-60 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${t.accent}66, transparent 70%)` }}
                      aria-hidden
                    />
                    <Quote size={40} className="text-ihu-green/40" />
                    <p className="relative mt-4 text-lg font-medium leading-relaxed text-text-primary md:text-xl">
                      “{t.quote}”
                    </p>
                    <div className="mt-7 flex items-center gap-4">
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-2xl font-heading text-lg font-black text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${t.accent}, #5F712A)` }}
                      >
                        {t.initials}
                      </span>
                      <div>
                        <p className="font-heading font-bold text-text-primary">{t.name}</p>
                        <p className="text-sm text-text-secondary">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Προηγούμενο"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ihu-green-dark/20 bg-white/60 text-ihu-green-dark backdrop-blur-md transition-all hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                aria-label={`Μαρτυρία ${i + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === active ? "w-7 bg-ihu-green-dark" : "w-2.5 bg-ihu-green-dark/25 hover:bg-ihu-green-dark/50",
                )}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Επόμενο"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ihu-green-dark/20 bg-white/60 text-ihu-green-dark backdrop-blur-md transition-all hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsDeck;
