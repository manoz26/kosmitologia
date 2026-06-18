"use client";

/* ══════════════════════════════════════════════════════════════════════════
   HeroLachani3D
   ──────────────────────────────────────────────────────────────────────────
   The opening act. A full-height, transparent hero that floats on the λαχανί
   backdrop. A pointer-reactive 3D scene of cosmetic props (serum bottle, jar,
   droplet, leaf, molecule, orbit rings) parallaxes against the headline, while
   scroll progress lifts and dissolves the content as you move into the page.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, MousePointer2 } from "lucide-react";

import { Typewriter } from "@/components/ui/typewriter";
import { cn } from "@/lib/utils";
import { heroRotatingWords, heroFacts } from "./lib/data";
import { Icon, GradientText } from "./lib/primitives";
import {
  SerumBottle,
  CreamJar,
  Droplet3D,
  Leaf3D,
  Molecule3D,
  OrbitRing,
} from "./lib/cosmetic3d";
import { usePointerField, useReduced, useViewport } from "./lib/hooks";

/* A single parallax depth layer reacting to the global pointer field. */
function DepthLayer({
  pointer,
  depth,
  className,
  children,
}: {
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number; // px of travel
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(pointer.x, [-1, 1], [-depth, depth]);
  const y = useTransform(pointer.y, [-1, 1], [-depth, depth]);
  return (
    <motion.div style={{ x, y }} className={cn("absolute", className)} aria-hidden>
      {children}
    </motion.div>
  );
}

export function HeroLachani3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { isMobile } = useViewport();
  const pointer = usePointerField(reduced || isMobile);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Lift + fade the hero content as it scrolls away.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.15]);
  const sceneRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 10]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Subtle scene tilt following the pointer.
  const sceneRotX = useTransform(pointer.y, [-1, 1], [8, -8]);
  const sceneRotY = useTransform(pointer.x, [-1, 1], [-10, 10]);

  return (
    <section
      ref={containerRef}
      aria-label="ΠΜΣ Κοσμητολογία — Εισαγωγή"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="section-container relative z-10 grid w-full grid-cols-1 items-center gap-10 px-4 pt-28 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pt-24"
      >
        {/* ── Left: copy ── */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-4 py-2 text-sm font-semibold text-ihu-green-dark shadow-sm backdrop-blur-md ring-glass"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-lh-pulse-ring rounded-full bg-ihu-green" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ihu-green" />
            </span>
            Νέος Κύκλος Σπουδών 2025–2026
            <Sparkles size={15} className="text-ihu-green" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Η επιστήμη πίσω
            <br />
            από την{" "}
            <GradientText className="animate-lh-shimmer-text">ομορφιά</GradientText>
            <br />
            <span className="text-text-primary/90">σπουδάζουμε το</span>
            <br className="hidden sm:block" />{" "}
            <span className="inline-block min-h-[1.1em] align-top">
              <Typewriter
                text={heroRotatingWords}
                speed={70}
                waitTime={1900}
                deleteSpeed={38}
                className="text-gradient-fresh"
                cursorChar="_"
                cursorClassName="ml-1 text-ihu-green"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg lg:mx-0"
          >
            Μεταπτυχιακό Πρόγραμμα Σπουδών στην Κοσμητολογία από το Διεθνές
            Πανεπιστήμιο της Ελλάδος. Εξειδίκευση στην παρασκευή, τον έλεγχο και
            την εφαρμογή καινοτόμων καλλυντικών — από το συστατικό μέχρι το ράφι.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start sm:justify-center"
          >
            <Link
              href="/eggrafes"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ihu-green-dark px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-ihu-green-dark/30 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Αιτήσεις Εισαγωγής
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/programma"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ihu-green-dark/25 bg-white/60 px-7 py-3.5 text-sm font-bold text-ihu-green-dark shadow-sm backdrop-blur-md transition-all hover:bg-white/80 sm:w-auto"
            >
              Το Πρόγραμμα Σπουδών
            </Link>
          </motion.div>

          {/* Quick facts */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {heroFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-white/55 bg-white/45 px-3 py-3 text-center shadow-sm backdrop-blur-md ring-glass"
              >
                <div className="flex items-center justify-center gap-1.5 text-ihu-green-dark">
                  <Icon name={fact.icon} size={15} />
                  <span className="font-heading text-2xl font-extrabold leading-none">
                    {fact.value}
                  </span>
                </div>
                <dt className="mt-1.5 text-[11px] font-medium leading-tight text-text-secondary">
                  {fact.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Right: 3D scene ── */}
        <motion.div
          style={{ scale: sceneScale, rotate: sceneRotate }}
          className="relative mx-auto hidden h-[34rem] w-full max-w-lg lg:block"
        >
          <motion.div
            style={{
              rotateX: sceneRotX,
              rotateY: sceneRotY,
              transformStyle: "preserve-3d",
              transformPerspective: 1400,
            }}
            className="relative h-full w-full [transform-style:preserve-3d]"
          >
            {/* Central halo */}
            <div
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-halo-pulse"
              style={{ background: "radial-gradient(circle, rgba(216,236,128,0.85), transparent 65%)" }}
              aria-hidden
            />

            {/* Orbit rings */}
            <OrbitRing
              size={460}
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              dash="2 12"
              duration={42}
              color="rgba(95,113,42,0.35)"
            />
            <OrbitRing
              size={360}
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              dash="6 10"
              duration={30}
              reverse
              color="rgba(95,113,42,0.45)"
            />

            {/* Hero bottle — closest layer */}
            <DepthLayer pointer={pointer} depth={26} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div style={{ transform: "translateZ(80px)" }}>
                <SerumBottle size={190} />
              </div>
            </DepthLayer>

            {/* Jar */}
            <DepthLayer pointer={pointer} depth={20} className="left-[8%] top-[8%]">
              <div style={{ transform: "translateZ(40px)" }}>
                <CreamJar size={120} />
              </div>
            </DepthLayer>

            {/* Leaf */}
            <DepthLayer pointer={pointer} depth={32} className="right-[4%] top-[14%]">
              <div style={{ transform: "translateZ(60px)" }}>
                <Leaf3D size={104} />
              </div>
            </DepthLayer>

            {/* Droplet */}
            <DepthLayer pointer={pointer} depth={38} className="right-[10%] bottom-[12%]">
              <div style={{ transform: "translateZ(90px)" }}>
                <Droplet3D size={76} />
              </div>
            </DepthLayer>

            {/* Molecule */}
            <DepthLayer pointer={pointer} depth={14} className="left-[6%] bottom-[10%]">
              <div style={{ transform: "translateZ(24px)" }}>
                <Molecule3D size={120} />
              </div>
            </DepthLayer>

            {/* Floating glass info chip */}
            <DepthLayer pointer={pointer} depth={44} className="left-[2%] top-1/2">
              <div
                style={{ transform: "translateZ(110px)" }}
                className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-3 py-2 shadow-lg backdrop-blur-md"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ihu-green/15 text-ihu-green-dark">
                  <Icon name="flask-round" size={16} />
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ihu-green-dark">
                    Εργαστήριο
                  </p>
                  <p className="text-xs font-bold text-text-primary">Παρασκευή & Έλεγχος</p>
                </div>
              </div>
            </DepthLayer>

            <DepthLayer pointer={pointer} depth={50} className="right-[0%] bottom-[30%]">
              <div
                style={{ transform: "translateZ(120px)" }}
                className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-3 py-2 shadow-lg backdrop-blur-md"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ihu-green/15 text-ihu-green-dark">
                  <Icon name="scan-face" size={16} />
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ihu-green-dark">
                    Δερματολογία
                  </p>
                  <p className="text-xs font-bold text-text-primary">In vivo αξιολόγηση</p>
                </div>
              </div>
            </DepthLayer>
          </motion.div>
        </motion.div>

        {/* Mobile compact scene */}
        <div className="relative mx-auto -mt-2 flex h-56 w-full max-w-xs items-center justify-center lg:hidden">
          <div
            className="absolute h-40 w-40 rounded-full blur-3xl animate-halo-pulse"
            style={{ background: "radial-gradient(circle, rgba(216,236,128,0.8), transparent 65%)" }}
            aria-hidden
          />
          <OrbitRing size={220} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" duration={36} />
          <SerumBottle size={132} />
          <Leaf3D size={66} className="absolute right-4 top-2" />
          <Droplet3D size={48} className="absolute bottom-2 left-6" />
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center"
      >
        <span className="mb-1.5 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-ihu-green-dark/70">
          <MousePointer2 size={12} /> Κυλήστε
        </span>
        <ChevronDown size={20} className="mx-auto animate-scroll-hint text-ihu-green-dark/70" />
      </motion.div>
    </section>
  );
}

export default HeroLachani3D;
