"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CinematicScrollHero
   ──────────────────────────────────────────────────────────────────────────
   The full-screen cinematic opener of `/`. A tall (250vh) container pins the
   viewport; as the visitor scrolls, <ScrollFilm/> scrubs through the lab
   footage — 120 pre-extracted WebP frames eased onto a canvas (see
   ui/scroll-film.tsx for the engine and why it beats <video>.currentTime).

   The visitor lands on the crisp 2.8K poster (the footage's first frame);
   the film only moves once they scroll. The copy lifts & fades on the way
   in, and the dark footage melts into the λαχανί page below. Reduced-motion
   visitors get the static poster. The CTAs live on <HeroLachani3D/> right
   below, so this opener stays purely atmospheric.

   All scroll-linked styles are function-based on purpose: framer-motion
   turns range-based scroll transforms into native scroll-linked WAAPI
   animations, which we saw desync from the actual scroll position here.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown, MousePointer2, Sparkles } from "lucide-react";

import { ScrollFilm, HERO_FILM, useHeroFilm } from "@/components/ui/scroll-film";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Shared overlay copy — atmospheric, no CTAs (the 3D hero below owns those). */
function HeroCopy() {
  return (
    <>
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white backdrop-blur-md">
        <Sparkles size={15} className="text-[#cfe38a]" />
        <span className="text-xs font-semibold uppercase tracking-[0.22em]">
          ΠΜΣ Κοσμητολογία · ΔΙΠΑΕ
        </span>
      </div>
      <h1 className="mx-auto max-w-4xl font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:text-7xl">
        Η επιστήμη
        <br />
        της <span className="text-[#cfe38a]">κοσμητολογίας</span>.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base text-white/85 drop-shadow-md md:text-lg">
        Από τη φύση, στο εργαστήριο, στο δέρμα.
      </p>
    </>
  );
}

export function CinematicScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const film = useHeroFilm();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01((p - 0.08) / 0.12));
  const copyY = useTransform(scrollYProgress, (p) => -90 * clamp01(p / 0.2));
  const cueOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01(p / 0.06));
  const blendOpacity = useTransform(scrollYProgress, (p) => clamp01((p - 0.78) / 0.22));

  /* ── Reduced motion: static poster, normal height, no scrub ── */
  if (reduced) {
    return (
      <section className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_FILM.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="section-container absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <HeroCopy />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#EEF3DE]" />
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-[#0a0a0a]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Poster-first scroll-scrubbed footage */}
        <ScrollFilm progress={scrollYProgress} {...film} />

        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        {/* Copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="section-container absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
        >
          <HeroCopy />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
        >
          <span className="mb-1.5 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
            <MousePointer2 size={12} /> Κυλήστε
          </span>
          <ChevronDown size={20} className="mx-auto animate-bounce text-white/80" />
        </motion.div>

        {/* Blend the dark footage into the λαχανί page below at the very end */}
        <motion.div
          style={{ opacity: blendOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#EEF3DE]"
          aria-hidden
        />
      </div>
    </div>
  );
}

export default CinematicScrollHero;
