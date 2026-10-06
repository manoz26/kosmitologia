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
   visitors get the static poster. It is the page's only hero, so it carries
   the single <h1> and the two CTAs (Αλλαγή 2 of the redesign).

   All scroll-linked styles are function-based on purpose: framer-motion
   turns range-based scroll transforms into native scroll-linked WAAPI
   animations, which we saw desync from the actual scroll position here.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, GraduationCap, MousePointer2 } from "lucide-react";

import { ScrollFilm, HERO_FILM, useHeroFilm, useStaticFilm } from "@/components/ui/scroll-film";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Shared overlay copy: headline + the two ways in. */
function HeroCopy() {
  return (
    <>
      {/* The programme named in full — «ΠΜΣ» alone didn't say it to every
          visitor (client feedback 06/10/2026). */}
      <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/12 px-5 py-2.5 text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <GraduationCap size={18} className="shrink-0 text-[#cfe38a]" />
        <span className="text-sm font-semibold tracking-[0.03em] md:text-base">
          Μεταπτυχιακό Πρόγραμμα Σπουδών
          <span className="hidden text-white/70 sm:inline"> · ΔΙΠΑΕ</span>
        </span>
      </div>
      {/* 2.35rem on phones: «κοσμητολογίας.» is one long word and 3rem ran
          off a 375px screen. */}
      <h1 className="mx-auto max-w-4xl font-heading text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-5xl md:text-7xl">
        Η επιστήμη
        <br />
        της <span className="text-[#cfe38a]">κοσμητολογίας</span>.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base text-white/85 drop-shadow-md md:text-lg">
        Από τη φύση, στο εργαστήριο, στο δέρμα.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/eggrafes"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#cfe38a] px-7 py-3.5 text-sm font-bold text-ihu-green-dark shadow-lg transition-all hover:gap-3 hover:bg-white sm:w-auto"
        >
          Υποβολή αίτησης
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/programma"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:w-auto"
        >
          Πρόγραμμα σπουδών
        </Link>
      </div>
    </>
  );
}

export function CinematicScrollHero() {
  /* Both branches attach it: useScroll throws (in dev) on a target ref that
     never gets an element, which the static branch used to leave empty. */
  const containerRef = useRef<HTMLElement>(null);
  const staticFilm = useStaticFilm();
  const film = useHeroFilm();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01((p - 0.08) / 0.12));
  const copyY = useTransform(scrollYProgress, (p) => -90 * clamp01(p / 0.2));
  /* Once the copy has faded, its links must not catch clicks. */
  const copyPointer = useTransform(copyOpacity, (o) => (o < 0.15 ? "none" : "auto"));
  const cueOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01(p / 0.06));
  const blendOpacity = useTransform(scrollYProgress, (p) => clamp01((p - 0.78) / 0.22));

  /* ── Touch device or reduced motion: static poster, normal height, no
     scrub. This is the crash guard — phones never mount the frame canvas, so
     the ~210MB of decoded footage that made WebKit reload the tab is gone. ── */
  if (staticFilm) {
    return (
      <section ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a]">
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
    <section ref={containerRef} className="relative h-[250vh] w-full bg-[#0a0a0a]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Poster-first scroll-scrubbed footage */}
        <ScrollFilm progress={scrollYProgress} {...film} />

        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        {/* Copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY, pointerEvents: copyPointer }}
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
            <MousePointer2 size={12} /> Κύλιση
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
    </section>
  );
}

export default CinematicScrollHero;
