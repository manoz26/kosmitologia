"use client";

/* ══════════════════════════════════════════════════════════════════════════
   JourneyRing3D
   ──────────────────────────────────────────────────────────────────────────
   The flagship scroll-driven 3D section. A pinned stage rotates a ring of five
   cards — the five stages a cosmetic product travels through inside the
   programme — synchronised with a glass detail panel, progress rail, molecular
   orbits, depth particles and a soft floor. Native CSS 3D + framer-motion only,
   re-themed to the λαχανί palette and rendered transparently over the page
   backdrop.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Atom } from "lucide-react";

import { cn } from "@/lib/utils";
import { journeyStages, type JourneyStage } from "./lib/data";
import { Icon, GradientText } from "./lib/primitives";
import { useViewport, useReduced, useScatter, type Viewport } from "./lib/hooks";

const STAGE_COUNT = journeyStages.length;
const ANGLE_STEP = 360 / STAGE_COUNT;
const VH_PER_STAGE = 62;

/* ────────────────────────────────────────────
   Geometry helpers
   ──────────────────────────────────────────── */

interface RingGeometry {
  radius: number;
  cardWidth: number;
  cardHeight: number;
}

function useRingGeometry(viewport: Viewport): RingGeometry {
  return useMemo(() => {
    if (viewport.isMobile) return { radius: 150, cardWidth: 158, cardHeight: 216 };
    if (viewport.isTablet) return { radius: 244, cardWidth: 202, cardHeight: 276 };
    return { radius: 316, cardWidth: 250, cardHeight: 340 };
  }, [viewport.isMobile, viewport.isTablet]);
}

function circularDelta(index: number, active: number, count: number): number {
  let delta = (((index - active) % count) + count) % count;
  if (delta > count / 2) delta -= count;
  return delta;
}

/* ────────────────────────────────────────────
   Local depth particles
   ──────────────────────────────────────────── */

function JourneyParticles({
  progress,
  glow,
  reduced,
}: {
  progress: MotionValue<number>;
  glow: string;
  reduced: boolean;
}) {
  const particles = useScatter(reduced ? 10 : 24, 99);
  const nearY = useTransform(progress, [0, 1], [70, -110]);
  const farY = useTransform(progress, [0, 1], [25, -40]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => {
        const isNear = p.depth > 0.5;
        return (
          <motion.span
            key={p.id}
            className={cn(!reduced && "animate-drift-a")}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              y: isNear ? nearY : farY,
              opacity: 0.12 + p.depth * 0.4,
              filter: `blur(${(1 - p.depth) * 3}px)`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${glow} 70%, transparent 75%)`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   Molecule orbits
   ──────────────────────────────────────────── */

function MoleculeOrbits({ accent }: { accent: string }) {
  const dots = (n: number, r: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return {
        x: Number((50 + r * Math.cos(a)).toFixed(3)),
        y: Number((50 + r * Math.sin(a)).toFixed(3)),
      };
    });

  const rings = [
    { r: 46, dash: "5 10", op: 0.3, n: 3, spin: "animate-orbit-spin" },
    { r: 38, dash: "2 12", op: 0.22, n: 5, spin: "animate-orbit-spin-rev" },
    { r: 30, dash: "9 6", op: 0.16, n: 2, spin: "animate-orbit-spin" },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2">
      {rings.map((ring, idx) => (
        <div key={idx} className={cn("absolute inset-0", ring.spin)} style={idx === 2 ? { animationDuration: "70s" } : undefined}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ opacity: ring.op }}>
            <circle cx="50" cy="50" r={ring.r} fill="none" stroke={accent} strokeWidth="0.4" strokeDasharray={ring.dash} />
            {dots(ring.n, ring.r).map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="1.1" fill={accent}>
                <animate attributeName="r" values="0.8;1.6;0.8" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Stage card
   ──────────────────────────────────────────── */

function StageCard({
  stage,
  index,
  activeIndex,
  geometry,
}: {
  stage: JourneyStage;
  index: number;
  activeIndex: number;
  geometry: RingGeometry;
}) {
  const delta = circularDelta(index, activeIndex, STAGE_COUNT);
  const absDelta = Math.abs(delta);
  const isActive = absDelta === 0;
  const targetOpacity = absDelta === 0 ? 1 : absDelta === 1 ? 0.55 : 0.2;
  const targetScale = absDelta === 0 ? 1 : absDelta === 1 ? 0.92 : 0.8;
  const targetBlur = absDelta === 0 ? 0 : absDelta === 1 ? 1.2 : 3;

  return (
    <div
      className="absolute left-1/2 top-1/2 backface-hidden"
      style={{
        width: geometry.cardWidth,
        height: geometry.cardHeight,
        marginLeft: -geometry.cardWidth / 2,
        marginTop: -geometry.cardHeight / 2,
        transform: `rotateY(${index * ANGLE_STEP}deg) translateZ(${geometry.radius}px)`,
      }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[1.6rem] border border-white/30 shadow-2xl"
        animate={{ opacity: targetOpacity, scale: targetScale, filter: `blur(${targetBlur}px)` }}
        transition={{ type: "spring", stiffness: 120, damping: 24 }}
        style={{
          background: `linear-gradient(155deg, ${stage.from} 0%, ${stage.to} 100%)`,
          boxShadow: isActive
            ? `0 30px 60px -20px ${stage.glow}, inset 0 0 0 1px rgba(255,255,255,0.3)`
            : "0 20px 40px -24px rgba(63,79,24,0.6)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/15" />
        <div className="absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-white/15 blur-md" style={{ opacity: isActive ? 0.7 : 0.3 }} />
        <span className="absolute -right-2 -top-6 select-none font-heading text-[7rem] font-black leading-none text-white/10">
          {stage.index}
        </span>
        <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md">
              <Icon name={stage.icon} size={24} />
            </div>
            <span className="rounded-full bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md">
              {stage.index} / 0{STAGE_COUNT}
            </span>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold leading-tight text-white drop-shadow md:text-xl">
              {stage.title}
            </h3>
            <p className="mt-1 text-xs text-white/80 md:text-sm">{stage.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {stage.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white/90 ring-1 ring-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        {isActive && (
          <motion.div
            layoutId="journey-active-ring"
            className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-2 ring-white/60"
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Rotating ring
   ──────────────────────────────────────────── */

function StageRing3D({
  activeIndex,
  glow,
  accent,
  geometry,
  reduced,
}: {
  activeIndex: number;
  glow: string;
  accent: string;
  geometry: RingGeometry;
  reduced: boolean;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <MoleculeOrbits accent={accent} />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-halo-pulse transition-[background] duration-700"
        style={{ background: glow }}
      />
      <div className="relative" style={{ width: geometry.cardWidth, height: geometry.cardHeight, perspective: 1600 }}>
        <motion.div
          className="preserve-3d relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: -activeIndex * ANGLE_STEP }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 18 }}
        >
          {journeyStages.map((stage, i) => (
            <StageCard key={stage.id} stage={stage} index={i} activeIndex={activeIndex} geometry={geometry} />
          ))}
        </motion.div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-2 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[100%] blur-xl transition-[background] duration-700"
        style={{ background: glow, opacity: 0.4 }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────
   Detail panel
   ──────────────────────────────────────────── */

const panelVariants: Variants = {
  enter: { opacity: 0, y: 28, rotateX: -8 },
  center: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -28, rotateX: 8, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
};

function StageDetailPanel({ stage }: { stage: JourneyStage }) {
  return (
    <div className="relative min-h-[20rem]" style={{ perspective: 1200 }}>
      <AnimatePresence mode="wait">
        <motion.div key={stage.id} variants={panelVariants} initial="enter" animate="center" exit="exit" style={{ transformStyle: "preserve-3d" }}>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${stage.from}, ${stage.to})` }}>
              <Icon name={stage.icon} size={22} />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: stage.accent }}>
              {stage.kicker}
            </span>
          </div>
          <h3 className="font-heading text-2xl font-extrabold leading-tight text-text-primary md:text-4xl">
            {stage.title}
          </h3>
          <div className="mt-3 h-1 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${stage.from}, ${stage.to})` }} />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            {stage.description}
          </p>
          <ul className="mt-6 space-y-3">
            {stage.points.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/70 ring-1 ring-ihu-green-dark/15" style={{ color: stage.accent }}>
                  <Icon name={point.icon} size={16} />
                </span>
                <span className="text-sm leading-relaxed text-text-primary/90 md:text-base">{point.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────
   Progress rail
   ──────────────────────────────────────────── */

function ProgressRail({
  activeIndex,
  progress,
  onSelect,
}: {
  activeIndex: number;
  progress: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const fillScale = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-44 w-1 rounded-full bg-ihu-green-dark/15">
        <motion.div
          className="absolute left-0 top-0 w-full origin-top rounded-full bg-gradient-to-b from-ihu-green-light to-ihu-green-dark"
          style={{ scaleY: fillScale, height: "100%" }}
        />
        {journeyStages.map((stage, i) => {
          const top = (i / (STAGE_COUNT - 1)) * 100;
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <button
              key={stage.id}
              onClick={() => onSelect(i)}
              className="absolute -left-1.5 -translate-y-1/2 focus:outline-none"
              style={{ top: `${top}%` }}
              aria-label={`Μετάβαση στο ${stage.title}`}
            >
              <span
                className={cn(
                  "block rounded-full border-2 transition-all duration-300",
                  isActive ? "h-4 w-4 border-ihu-green-dark" : isPast ? "h-3 w-3 border-ihu-green-dark/70" : "h-3 w-3 border-ihu-green-dark/30",
                )}
                style={{
                  background: isActive ? stage.accent : isPast ? "rgba(95,113,42,0.7)" : "transparent",
                  boxShadow: isActive ? `0 0 14px ${stage.glow}` : "none",
                }}
              />
            </button>
          );
        })}
      </div>
      <div className="hidden flex-col justify-between sm:flex" style={{ height: "11rem" }}>
        {journeyStages.map((stage, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={stage.id}
              onClick={() => onSelect(i)}
              className={cn("text-left text-xs font-medium transition-all duration-300", isActive ? "text-text-primary" : "text-text-secondary/50 hover:text-text-secondary")}
            >
              <span className="block font-heading tabular-nums">{stage.index}</span>
              <span className="block max-w-[9rem] truncate text-[10px] uppercase tracking-wider">{stage.subtitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Big animated counter
   ──────────────────────────────────────────── */

function StageCounter({ activeIndex, accent }: { activeIndex: number; accent: string }) {
  const stage = journeyStages[activeIndex];
  return (
    <div className="pointer-events-none flex items-end gap-2">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={stage.id}
          initial={{ opacity: 0, y: 24, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -24, rotateX: 40 }}
          transition={{ duration: 0.4 }}
          className="font-heading text-6xl font-black leading-none md:text-7xl"
          style={{ color: accent }}
        >
          {stage.index}
        </motion.span>
      </AnimatePresence>
      <span className="mb-2 font-heading text-2xl font-bold text-ihu-green-dark/30">/ 0{STAGE_COUNT}</span>
    </div>
  );
}

/* ────────────────────────────────────────────
   Heading & misc
   ──────────────────────────────────────────── */

function Heading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-ihu-green-dark/15 bg-white/55 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ihu-green-dark backdrop-blur-md">
        <Atom size={14} /> Το ταξίδι ενός καλλυντικού
      </span>
      <h2 className="mt-6 font-heading text-3xl font-extrabold leading-tight text-text-primary md:text-5xl">
        Από το <GradientText>συστατικό</GradientText> στο <GradientText variant="fresh">προϊόν</GradientText>
      </h2>
      <p className="mt-4 text-base text-text-secondary md:text-lg">
        Κάθε στάδιο του προγράμματος αντιστοιχεί σε ένα βήμα της πραγματικής
        διαδρομής ενός καλλυντικού. Κυλήστε για να το ζήσετε σε τρεις διαστάσεις.
      </p>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.06], [1, 0]);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-center">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-ihu-green-dark/60">Κυλήστε</span>
      <ChevronDown size={18} className="mx-auto animate-scroll-hint text-ihu-green-dark/70" />
    </motion.div>
  );
}

function JourneyCta({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.82, 0.95], [0, 1]);
  const y = useTransform(progress, [0.82, 0.95], [30, 0]);
  return (
    <motion.div style={{ opacity, y }} className="flex flex-col items-center gap-3 sm:flex-row">
      <Link href="/programma" className="group inline-flex items-center justify-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3">
        Δείτε όλο το Πρόγραμμα Σπουδών
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
      <Link href="/eggrafes" className="inline-flex items-center justify-center gap-2 rounded-full border border-ihu-green-dark/25 bg-white/50 px-6 py-3 text-sm font-bold text-ihu-green-dark backdrop-blur-md transition-all hover:bg-white/70">
        Αιτήσεις Εισαγωγής
        <ArrowUpRight size={16} />
      </Link>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Main
   ──────────────────────────────────────────── */

export function JourneyRing3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewport = useViewport();
  const geometry = useRingGeometry(viewport);
  const reduced = useReduced();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(0.9999, Math.max(0, latest));
    const next = Math.round(clamped * (STAGE_COUNT - 1));
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const activeStage = journeyStages[activeIndex];

  const handleSelect = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = top + (index / (STAGE_COUNT - 1)) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={containerRef}
      id="journey"
      aria-label="Το ταξίδι ενός καλλυντικού — διαδραστική παρουσίαση"
      className="relative w-full text-text-primary"
      style={{ height: `${STAGE_COUNT * VH_PER_STAGE}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <JourneyParticles progress={smoothProgress} glow={activeStage.glow} reduced={reduced} />

        {/* light floor grid */}
        <div
          aria-hidden
          className="home-grid-soft pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-25"
          style={{ maskImage: "linear-gradient(to top, black, transparent)", WebkitMaskImage: "linear-gradient(to top, black, transparent)" }}
        />

        <div className="section-container relative z-30 flex h-full flex-col px-4 py-8 md:px-8">
          <div className="shrink-0 pt-10 md:pt-14">
            <Heading />
          </div>

          <div className="grid flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <div className="mb-6 hidden lg:block">
                <StageCounter activeIndex={activeIndex} accent={activeStage.accent} />
              </div>
              <div className="glass-lachani rounded-3xl p-6 md:p-7">
                <StageDetailPanel stage={activeStage} />
              </div>
              <div className="mt-8 flex flex-col gap-8">
                <ProgressRail activeIndex={activeIndex} progress={smoothProgress} onSelect={handleSelect} />
                <JourneyCta progress={smoothProgress} />
              </div>
            </div>

            <div className="order-1 flex h-[42vh] items-center justify-center lg:order-2 lg:h-full">
              <StageRing3D activeIndex={activeIndex} glow={activeStage.glow} accent={activeStage.accent} geometry={geometry} reduced={reduced} />
            </div>
          </div>
        </div>

        <ScrollHint progress={smoothProgress} />
      </div>
    </section>
  );
}

export default JourneyRing3D;
