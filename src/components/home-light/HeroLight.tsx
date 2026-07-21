"use client";

/* ══════════════════════════════════════════════════════════════════════════
   HeroLight — the ONLY opener of the light homepage (/light)
   ──────────────────────────────────────────────────────────────────────────
   Same scroll-scrubbed lab footage as <CinematicScrollHero/> — the shared
   <ScrollFilm/> engine eases 120 pre-extracted WebP frames onto a canvas
   (see ui/scroll-film.tsx for the smoothing/preload details) — with two
   differences that keep this page calmer:

     • The headline AND the CTAs live here — no second hero follows below.
     • The dark footage blends into the white page instead of the λαχανί
       canvas, because the light page has a static, quiet background.

   The visitor lands on the crisp 2.8K poster (the footage's first frame);
   the film only moves once they scroll. Reduced-motion visitors get the
   static poster.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { ScrollFilm, HERO_FILM, useHeroFilm, useStaticFilm } from "@/components/ui/scroll-film";

/* Must match the light page background so the footage melts into the page. */
const PAGE_BG = "#FAFBFE";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Headline + CTAs. This hero owns the calls to action — nothing repeats below. */
function HeroCopy() {
  return (
    <>
      <div className="mb-6 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-md">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
          ΠΜΣ Κοσμητολογία · ΔΙΠΑΕ
        </span>
      </div>
      <h1 className="mx-auto max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:text-6xl">
        Η επιστήμη της <span className="text-[#cfe38a]">κοσμητολογίας</span>.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-white/85 drop-shadow-md md:text-lg">
        Από τη φύση, στο εργαστήριο, στο δέρμα. Μεταπτυχιακές σπουδές στον
        σχεδιασμό, τον έλεγχο και την αξιολόγηση καλλυντικών.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/light/eggrafes"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#3d4a17] shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Αιτήσεις Εισαγωγής
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/light/programma"
          className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          Το Πρόγραμμα Σπουδών
        </Link>
      </div>
    </>
  );
}

export function HeroLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const staticFilm = useStaticFilm();
  const film = useHeroFilm();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* All transforms below are function-based on purpose: framer-motion turns
     range-based scroll transforms into native scroll-linked WAAPI animations,
     which we saw desync from the actual scroll position on this page.
     Function transforms always apply through inline styles — predictable. */
  const copyOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01((p - 0.08) / 0.12));
  const copyY = useTransform(scrollYProgress, (p) => -90 * clamp01(p / 0.2));
  /* The CTAs are links — once the copy has faded out it must stop catching
     clicks meant for the page behind it. */
  const copyPointer = useTransform(copyOpacity, (v) => (v < 0.05 ? "none" : "auto"));
  const cueOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01(p / 0.06));
  const blendOpacity = useTransform(scrollYProgress, (p) => clamp01((p - 0.78) / 0.22));

  /* ── Touch device or reduced motion: static poster, normal height, no
     scrub. The crash guard — phones never mount the frame canvas, so the
     ~210MB of decoded footage that reloaded the tab on scroll is gone. ── */
  if (staticFilm) {
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
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent"
          style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${PAGE_BG})` }}
        />
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

        {/* Copy + CTAs */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY, pointerEvents: copyPointer }}
          className="section-container absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
        >
          <HeroCopy />
        </motion.div>

        {/* Scroll cue — a single quiet chevron */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        >
          <ChevronDown size={22} className="animate-bounce text-white/80" />
        </motion.div>

        {/* Blend the dark footage into the white page below at the very end */}
        <motion.div
          style={{
            opacity: blendOpacity,
            backgroundImage: `linear-gradient(to bottom, transparent, ${PAGE_BG})`,
          }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          aria-hidden
        />
      </div>
    </div>
  );
}

export default HeroLight;
