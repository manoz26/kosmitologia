"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CosmeticJourney3D
   ──────────────────────────────────────────────────────────────────────────
   A scroll-driven, fully CSS/3D flagship section for the homepage.

   As the visitor scrolls through the section, a pinned 3D stage rotates a ring
   ("coverflow") of cards that represent the five stages a cosmetic product
   travels through inside the programme — from raw ingredient research all the
   way to an innovative product on the market. A synchronised detail panel,
   progress rail, molecular orbits, depth particles and a parallax scene tie the
   experience together.

   No external 3D library is used: everything is built with native CSS 3D
   transforms (perspective / preserve-3d / translateZ) and driven by
   framer-motion's scroll hooks. This keeps the bundle light and the motion
   buttery, while matching the site's blue/green ΔΙΠΑΕ palette.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  Sprout,
  FlaskConical,
  Microscope,
  HeartPulse,
  Rocket,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Atom,
  Droplets,
  Dna,
  ShieldCheck,
  Gauge,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/* ══════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════ */

interface JourneyPoint {
  icon: LucideIcon;
  text: string;
}

interface JourneyStage {
  id: string;
  /** Two digit label, e.g. "01" */
  index: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  points: JourneyPoint[];
  tags: string[];
  icon: LucideIcon;
  /** Gradient stops for the card face. */
  from: string;
  to: string;
  /** rgba glow used for halos, shadows and particles when this stage is active. */
  glow: string;
  /** Solid accent used for small UI accents (dots, underlines). */
  accent: string;
}

interface Viewport {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface RingGeometry {
  radius: number;
  cardWidth: number;
  cardHeight: number;
}

/* ══════════════════════════════════════════
   CONTENT — the five stages of the journey
   ══════════════════════════════════════════ */

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "research",
    index: "01",
    kicker: "Στάδιο 01 · Πρώτες ύλες",
    title: "Έρευνα & Πρώτες Ύλες",
    subtitle: "Από τη φύση στο εργαστήριο",
    description:
      "Κάθε καλλυντικό ξεκινά από τη βαθιά γνώση των συστατικών του. Μελετάμε δραστικά συστατικά φυσικής προέλευσης, την προέλευση και τη βιοδραστικότητά τους, και τον τρόπο που αλληλεπιδρούν με το δέρμα.",
    points: [
      { icon: Sprout, text: "Δραστικά συστατικά & εκχυλίσματα φυσικής προέλευσης" },
      { icon: Dna, text: "Βιοδιαθεσιμότητα & μηχανισμοί δράσης στο δέρμα" },
      { icon: ShieldCheck, text: "Βιωσιμότητα & υπεύθυνη προμήθεια πρώτων υλών" },
    ],
    tags: ["Φυτικά εκχυλίσματα", "Πεπτίδια", "Αντιοξειδωτικά"],
    icon: Sprout,
    from: "#5F712A",
    to: "#A5BA5F",
    glow: "rgba(135, 157, 66, 0.55)",
    accent: "#879D42",
  },
  {
    id: "formulation",
    index: "02",
    kicker: "Στάδιο 02 · Σύνθεση",
    title: "Σχεδιασμός & Παρασκευή",
    subtitle: "Η χημεία της σύνθεσης",
    description:
      "Μετατρέπουμε τα συστατικά σε σταθερά, λειτουργικά σκευάσματα. Γαλακτώματα, gels και ορότες σχεδιάζονται με ακρίβεια ώστε να συνδυάζουν αποτελεσματικότητα, σταθερότητα και αισθητηριακή εμπειρία.",
    points: [
      { icon: Droplets, text: "Γαλακτώματα, ορότες & καινοτόμα συστήματα μεταφοράς" },
      { icon: Gauge, text: "Σταθερότητα, ρεολογία & συστήματα συντήρησης" },
      { icon: Sparkles, text: "Αισθητηριακός σχεδιασμός υφής & αρώματος" },
    ],
    tags: ["Γαλακτώματα", "Ρεολογία", "Encapsulation"],
    icon: FlaskConical,
    from: "#2A427F",
    to: "#4A62A0",
    glow: "rgba(74, 98, 160, 0.55)",
    accent: "#4A62A0",
  },
  {
    id: "analysis",
    index: "03",
    kicker: "Στάδιο 03 · Έλεγχος",
    title: "Ενόργανη Ανάλυση & Ποιοτικός Έλεγχος",
    subtitle: "Η απόδειξη πίσω από τον ισχυρισμό",
    description:
      "Κάθε σκεύασμα περνά από αυστηρό ενόργανο έλεγχο. Με σύγχρονες αναλυτικές τεχνικές πιστοποιούμε την ταυτότητα, την καθαρότητα και τη σταθερότητα, μετατρέποντας τα δεδομένα σε εγγύηση ποιότητας.",
    points: [
      { icon: Microscope, text: "Φασματοσκοπία & χρωματογραφικές τεχνικές" },
      { icon: Gauge, text: "Έλεγχος pH, ιξώδους & μικροβιακού φορτίου" },
      { icon: CheckCircle2, text: "Μελέτες σταθερότητας & διάρκειας ζωής" },
    ],
    tags: ["HPLC", "Φασματοσκοπία", "Quality Control"],
    icon: Microscope,
    from: "#1A4F63",
    to: "#3A8FA5",
    glow: "rgba(58, 143, 165, 0.55)",
    accent: "#3A8FA5",
  },
  {
    id: "clinical",
    index: "04",
    kicker: "Στάδιο 04 · Αξιολόγηση",
    title: "Κλινική & Δερματολογική Αξιολόγηση",
    subtitle: "Στο επίκεντρο, το δέρμα",
    description:
      "Συνδέουμε την κοσμητολογία με τη δερματολογία. Μελετάμε τη φυσιολογία και το μικροβίωμα του δέρματος, την παθοφυσιολογία της γήρανσης και τεκμηριώνουμε in vivo την αποτελεσματικότητα και την ασφάλεια.",
    points: [
      { icon: HeartPulse, text: "Φυσιολογία & μικροβίωμα του δέρματος" },
      { icon: Dna, text: "Παθοφυσιολογία & μηχανισμοί αντιγήρανσης" },
      { icon: Gauge, text: "Μετρήσεις ενυδάτωσης, ελαστικότητας & in vivo δοκιμές" },
    ],
    tags: ["Μικροβίωμα", "Αντιγήρανση", "In vivo"],
    icon: HeartPulse,
    from: "#7A2E52",
    to: "#C0588B",
    glow: "rgba(192, 88, 139, 0.5)",
    accent: "#C0588B",
  },
  {
    id: "market",
    index: "05",
    kicker: "Στάδιο 05 · Αγορά",
    title: "Καινοτομία & Αγορά",
    subtitle: "Από το concept στο ράφι",
    description:
      "Το τελικό προϊόν συναντά την αγορά. Συνδυάζουμε νομοθεσία, ασφάλεια, branding και επιχειρηματικότητα, ώστε οι απόφοιτοι να δημιουργούν καινοτόμα, ασφαλή και ανταγωνιστικά προϊόντα υψηλής προστιθέμενης αξίας.",
    points: [
      { icon: ShieldCheck, text: "Ευρωπαϊκή νομοθεσία & φάκελος ασφάλειας προϊόντος" },
      { icon: Rocket, text: "Branding, marketing & επιχειρηματικότητα" },
      { icon: Sparkles, text: "Καινοτομία υψηλής προστιθέμενης αξίας" },
    ],
    tags: ["Νομοθεσία", "Branding", "Startup"],
    icon: Rocket,
    from: "#8A5A12",
    to: "#D9A441",
    glow: "rgba(217, 164, 65, 0.5)",
    accent: "#D9A441",
  },
];

const STAGE_COUNT = JOURNEY_STAGES.length;
const ANGLE_STEP = 360 / STAGE_COUNT;
/** Scroll height (in vh) allotted to each stage. Lower = shorter/snappier scroll. */
const VH_PER_STAGE = 60;

/** Key programme facts shown in the closing recap band. */
interface ProgramStat {
  value: number;
  suffix?: string;
  label: string;
  sub: string;
}

const PROGRAM_STATS: ProgramStat[] = [
  { value: 3, label: "Εξάμηνα", sub: "Ελάχιστη διάρκεια σπουδών" },
  { value: 90, suffix: " ECTS", label: "Πιστωτικές μονάδες", sub: "Πλήρες πρόγραμμα" },
  { value: 2, label: "Κατευθύνσεις", sub: "Εξειδικευμένη γνώση" },
  { value: 40, label: "Φοιτητές / έτος", sub: "Μικρά, εστιασμένα τμήματα" },
];

/* ══════════════════════════════════════════
   GEOMETRY / RESPONSIVE HELPERS
   ══════════════════════════════════════════ */

/** Tracks the current viewport and exposes a few convenient breakpoints. */
function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    width: 1280,
    height: 800,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({
        width,
        height,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return viewport;
}

/** Derives the 3D ring geometry from the current viewport. */
function useRingGeometry(viewport: Viewport): RingGeometry {
  return useMemo(() => {
    if (viewport.isMobile) {
      return { radius: 150, cardWidth: 156, cardHeight: 214 };
    }
    if (viewport.isTablet) {
      return { radius: 240, cardWidth: 200, cardHeight: 272 };
    }
    return { radius: 310, cardWidth: 248, cardHeight: 336 };
  }, [viewport.isMobile, viewport.isTablet]);
}

/** Shortest signed distance (in stage steps) between two indices on the ring. */
function circularDelta(index: number, active: number, count: number): number {
  let delta = ((index - active) % count + count) % count;
  if (delta > count / 2) delta -= count;
  return delta;
}

/* ══════════════════════════════════════════
   SCENE BACKGROUND — parallax depth layers
   ══════════════════════════════════════════ */

interface SceneBackgroundProps {
  progress: MotionValue<number>;
  activeGlow: string;
}

function SceneBackground({ progress, activeGlow }: SceneBackgroundProps) {
  // Two mesh blobs drift in opposite directions as the user scrolls.
  const blobAY = useTransform(progress, [0, 1], [-40, 60]);
  const blobAX = useTransform(progress, [0, 1], [-30, 40]);
  const blobBY = useTransform(progress, [0, 1], [50, -70]);
  const blobBX = useTransform(progress, [0, 1], [20, -50]);
  const auroraOpacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.4]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base vertical gradient — deep ΔΙΠΑΕ blue night */}
      <div className="absolute inset-0 bg-gradient-to-b from-ihu-blue-dark via-ihu-blue to-[#10203f]" />

      {/* Radial vignette to focus the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Drifting green mesh blob */}
      <motion.div
        aria-hidden
        className="absolute -left-40 top-10 h-[44rem] w-[44rem] rounded-full blur-3xl"
        style={{
          x: blobAX,
          y: blobAY,
          background:
            "radial-gradient(circle, rgba(135,157,66,0.30) 0%, transparent 62%)",
        }}
      />

      {/* Drifting blue mesh blob */}
      <motion.div
        aria-hidden
        className="absolute -right-40 bottom-0 h-[48rem] w-[48rem] rounded-full blur-3xl"
        style={{
          x: blobBX,
          y: blobBY,
          background:
            "radial-gradient(circle, rgba(74,98,160,0.38) 0%, transparent 60%)",
        }}
      />

      {/* Active-stage aurora — tinted by the current stage glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl transition-[background] duration-700"
        style={{
          opacity: auroraOpacity,
          background: `radial-gradient(circle, ${activeGlow} 0%, transparent 60%)`,
        }}
      />

      {/* Faint starfield dots */}
      <Starfield />
    </div>
  );
}

/** A deterministic, lightweight starfield rendered once. */
function Starfield() {
  const stars = useMemo(() => {
    // Deterministic pseudo-random so SSR and client match.
    const out: { left: number; top: number; size: number; delay: number; dur: number }[] =
      [];
    let seed = 1337;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 60; i++) {
      out.push({
        left: rand() * 100,
        top: rand() * 100,
        size: 1 + rand() * 2,
        delay: rand() * 5,
        dur: 3 + rand() * 4,
      });
    }
    return out;
  }, []);

  return (
    <div aria-hidden className="absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/40 animate-pulse-soft"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   GRID FLOOR — grounds the 3D scene
   ══════════════════════════════════════════ */

function GridFloor({ activeGlow }: { activeGlow: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
      style={{ perspective: "600px" }}
    >
      <div
        className="absolute inset-x-[-50%] bottom-[-20%] h-[120%] animate-grid-pan"
        style={{
          transform: "rotateX(72deg)",
          transformOrigin: "center bottom",
          backgroundImage:
            "linear-gradient(rgba(165,186,95,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(74,98,160,0.16) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 80%)",
        }}
      />
      {/* Glow line on the horizon, tinted by the active stage */}
      <div
        className="absolute inset-x-0 top-0 h-px blur-[1px] transition-[background] duration-700"
        style={{
          background: `linear-gradient(90deg, transparent, ${activeGlow}, transparent)`,
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   FLOATING PARTICLES — depth bubbles
   ══════════════════════════════════════════ */

interface Particle {
  left: number;
  top: number;
  size: number;
  depth: number; // 0 (far) .. 1 (near)
  drift: "a" | "b" | "c";
  delay: number;
}

interface FloatingParticlesProps {
  progress: MotionValue<number>;
  activeGlow: string;
  reduced: boolean;
}

function FloatingParticles({ progress, activeGlow, reduced }: FloatingParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    const out: Particle[] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const count = reduced ? 10 : 26;
    const drifts: Particle["drift"][] = ["a", "b", "c"];
    for (let i = 0; i < count; i++) {
      out.push({
        left: rand() * 100,
        top: rand() * 100,
        size: 6 + rand() * 26,
        depth: rand(),
        drift: drifts[Math.floor(rand() * 3)],
        delay: rand() * 6,
      });
    }
    return out;
  }, [reduced]);

  // Near particles move more than far ones — fake parallax.
  const nearY = useTransform(progress, [0, 1], [80, -120]);
  const farY = useTransform(progress, [0, 1], [30, -45]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => {
        const isNear = p.depth > 0.5;
        return (
          <motion.span
            key={i}
            className={cn(
              "absolute rounded-full",
              !reduced &&
                (p.drift === "a"
                  ? "animate-drift-a"
                  : p.drift === "b"
                  ? "animate-drift-b"
                  : "animate-drift-c"),
            )}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              y: isNear ? nearY : farY,
              opacity: 0.1 + p.depth * 0.5,
              filter: `blur(${(1 - p.depth) * 3}px)`,
              animationDelay: `${p.delay}s`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), ${activeGlow} 70%, transparent 75%)`,
              boxShadow: `0 0 ${p.size}px ${activeGlow}`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════
   MOLECULE ORBITS — SVG rings behind the ring
   ══════════════════════════════════════════ */

function MoleculeOrbits({ activeAccent }: { activeAccent: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="absolute inset-0 animate-orbit-spin">
        <OrbitRing radius={46} dash="6 10" opacity={0.25} accent={activeAccent} dotCount={3} />
      </div>
      <div className="absolute inset-0 animate-orbit-spin-rev">
        <OrbitRing radius={38} dash="2 14" opacity={0.18} accent={activeAccent} dotCount={5} />
      </div>
      <div className="absolute inset-0 animate-orbit-spin" style={{ animationDuration: "70s" }}>
        <OrbitRing radius={30} dash="10 6" opacity={0.12} accent={activeAccent} dotCount={2} />
      </div>
    </div>
  );
}

interface OrbitRingProps {
  radius: number; // percentage of viewBox
  dash: string;
  opacity: number;
  accent: string;
  dotCount: number;
}

function OrbitRing({ radius, dash, opacity, accent, dotCount }: OrbitRingProps) {
  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let i = 0; i < dotCount; i++) {
      const angle = (i / dotCount) * Math.PI * 2;
      // Round to a fixed precision so the SSR and client markup match exactly
      // (Math.cos/sin can differ in the last bits between engines → hydration mismatch).
      out.push({
        x: Number((50 + radius * Math.cos(angle)).toFixed(3)),
        y: Number((50 + radius * Math.sin(angle)).toFixed(3)),
      });
    }
    return out;
  }, [dotCount, radius]);

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 h-full w-full"
      style={{ opacity }}
    >
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={accent}
        strokeWidth="0.4"
        strokeDasharray={dash}
        className="transition-[stroke] duration-700"
      />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.1" fill={accent} className="transition-[fill] duration-700">
          <animate
            attributeName="r"
            values="0.8;1.6;0.8"
            dur="3s"
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════
   STAGE CARD — a single face on the 3D ring
   ══════════════════════════════════════════ */

interface StageCardProps {
  stage: JourneyStage;
  index: number;
  activeIndex: number;
  geometry: RingGeometry;
}

function StageCard({ stage, index, activeIndex, geometry }: StageCardProps) {
  const delta = circularDelta(index, activeIndex, STAGE_COUNT);
  const absDelta = Math.abs(delta);
  const isActive = absDelta === 0;

  // Visual treatment by distance from the front-facing card.
  const targetOpacity = absDelta === 0 ? 1 : absDelta === 1 ? 0.5 : 0.18;
  const targetScale = absDelta === 0 ? 1 : absDelta === 1 ? 0.92 : 0.8;
  const targetBlur = absDelta === 0 ? 0 : absDelta === 1 ? 1.2 : 3;

  const Icon = stage.icon;

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
        className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
        animate={{
          opacity: targetOpacity,
          scale: targetScale,
          filter: `blur(${targetBlur}px)`,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 24 }}
        style={{
          background: `linear-gradient(150deg, ${stage.from} 0%, ${stage.to} 100%)`,
          boxShadow: isActive
            ? `0 30px 60px -20px ${stage.glow}, 0 0 0 1px rgba(255,255,255,0.25) inset`
            : "0 20px 40px -24px rgba(0,0,0,0.6)",
        }}
      >
        {/* Glass sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/20" />
        <div
          className="absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-white/15 blur-md"
          style={{ opacity: isActive ? 0.7 : 0.3 }}
        />

        {/* Big watermark index */}
        <span className="absolute -right-2 -top-6 font-heading text-[7rem] font-black leading-none text-white/10 select-none">
          {stage.index}
        </span>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30">
              <Icon size={24} />
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
                <span
                  key={tag}
                  className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white/90 ring-1 ring-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Active highlight ring */}
        {isActive && (
          <motion.div
            layoutId="active-card-ring"
            className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/60"
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   STAGE RING 3D — the rotating coverflow
   ══════════════════════════════════════════ */

interface StageRing3DProps {
  activeIndex: number;
  activeGlow: string;
  activeAccent: string;
  geometry: RingGeometry;
  reduced: boolean;
}

function StageRing3D({
  activeIndex,
  activeGlow,
  activeAccent,
  geometry,
  reduced,
}: StageRing3DProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Orbits behind the ring */}
      <MoleculeOrbits activeAccent={activeAccent} />

      {/* Central halo glow that takes the active stage colour */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-[background] duration-700 animate-halo-pulse"
        style={{ background: activeGlow }}
      />

      {/* The 3D stage */}
      <div
        className="relative"
        style={{
          width: geometry.cardWidth,
          height: geometry.cardHeight,
          perspective: 1600,
        }}
      >
        {/* The ring is animated to a discrete target angle keyed on activeIndex,
            so the front-facing card ALWAYS matches the panel (it snaps into place
            rather than drifting continuously with raw scroll). */}
        <motion.div
          className="preserve-3d relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: -activeIndex * ANGLE_STEP }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 80, damping: 18 }
          }
        >
          {JOURNEY_STAGES.map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={i}
              activeIndex={activeIndex}
              geometry={geometry}
            />
          ))}
        </motion.div>
      </div>

      {/* Reflection puddle */}
      <div
        aria-hidden
        className="absolute bottom-2 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[100%] blur-xl transition-[background] duration-700"
        style={{ background: activeGlow, opacity: 0.4 }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   STAGE DETAIL PANEL — synced text content
   ══════════════════════════════════════════ */

const panelVariants: Variants = {
  enter: { opacity: 0, y: 28, rotateX: -8 },
  center: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -28,
    rotateX: 8,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
};

interface StageDetailPanelProps {
  stage: JourneyStage;
}

function StageDetailPanel({ stage }: StageDetailPanelProps) {
  const Icon = stage.icon;
  return (
    <div className="relative min-h-[20rem]" style={{ perspective: 1200 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Kicker */}
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg transition-[background] duration-500"
              style={{
                background: `linear-gradient(135deg, ${stage.from}, ${stage.to})`,
              }}
            >
              <Icon size={22} />
            </span>
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500"
              style={{ color: stage.accent }}
            >
              {stage.kicker}
            </span>
          </div>

          <h3 className="font-heading text-2xl font-bold leading-tight text-white md:text-4xl">
            {stage.title}
          </h3>

          <div
            className="mt-3 h-1 w-16 rounded-full transition-[background] duration-500"
            style={{ background: `linear-gradient(90deg, ${stage.from}, ${stage.to})` }}
          />

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {stage.description}
          </p>

          <ul className="mt-6 space-y-3">
            {stage.points.map((point, i) => {
              const PointIcon = point.icon;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15"
                    style={{ color: stage.accent }}
                  >
                    <PointIcon size={16} />
                  </span>
                  <span className="text-sm leading-relaxed text-white/85 md:text-base">
                    {point.text}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════
   PROGRESS RAIL — vertical stage navigation
   ══════════════════════════════════════════ */

interface ProgressRailProps {
  activeIndex: number;
  progress: MotionValue<number>;
  onSelect: (index: number) => void;
}

function ProgressRail({ activeIndex, progress, onSelect }: ProgressRailProps) {
  const fillScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="flex items-center gap-4">
      {/* The rail track */}
      <div className="relative h-44 w-1 rounded-full bg-white/10">
        <motion.div
          className="absolute left-0 top-0 w-full origin-top rounded-full bg-gradient-to-b from-ihu-green-light to-ihu-blue-light"
          style={{ scaleY: fillScale, height: "100%" }}
        />
        {JOURNEY_STAGES.map((stage, i) => {
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
                  isActive
                    ? "h-4 w-4 border-white"
                    : isPast
                    ? "h-3 w-3 border-white/70"
                    : "h-3 w-3 border-white/30",
                )}
                style={{
                  background: isActive
                    ? stage.accent
                    : isPast
                    ? "rgba(255,255,255,0.7)"
                    : "transparent",
                  boxShadow: isActive ? `0 0 14px ${stage.glow}` : "none",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Labels */}
      <div className="hidden flex-col justify-between py-0 sm:flex" style={{ height: "11rem" }}>
        {JOURNEY_STAGES.map((stage, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={stage.id}
              onClick={() => onSelect(i)}
              className={cn(
                "text-left text-xs font-medium transition-all duration-300",
                isActive ? "text-white" : "text-white/40 hover:text-white/70",
              )}
            >
              <span className="block font-heading tabular-nums">{stage.index}</span>
              <span className="block max-w-[9rem] truncate text-[10px] uppercase tracking-wider">
                {stage.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   STAGE COUNTER — large animated index
   ══════════════════════════════════════════ */

function StageCounter({ activeIndex, activeAccent }: { activeIndex: number; activeAccent: string }) {
  const stage = JOURNEY_STAGES[activeIndex];
  return (
    <div className="pointer-events-none flex items-end gap-2">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={stage.id}
          initial={{ opacity: 0, y: 24, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -24, rotateX: 40 }}
          transition={{ duration: 0.4 }}
          className="font-heading text-6xl font-black leading-none transition-colors duration-500 md:text-7xl"
          style={{ color: activeAccent }}
        >
          {stage.index}
        </motion.span>
      </AnimatePresence>
      <span className="mb-2 font-heading text-2xl font-bold text-white/30">
        / 0{STAGE_COUNT}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION HEADING
   ══════════════════════════════════════════ */

function SectionHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ihu-green-light backdrop-blur-md">
        <Atom size={14} />
        Το ταξίδι ενός καλλυντικού
      </span>
      <h2 className="mt-6 font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
        Από το{" "}
        <span className="bg-gradient-to-r from-ihu-green-light to-emerald-200 bg-clip-text text-transparent">
          συστατικό
        </span>{" "}
        στο{" "}
        <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
          προϊόν
        </span>
      </h2>
      <p className="mt-4 text-base text-white/70 md:text-lg">
        Κάθε στάδιο του προγράμματος αντιστοιχεί σε ένα βήμα της πραγματικής
        διαδρομής ενός καλλυντικού. Κυλήστε για να το ζήσετε σε τρεις διαστάσεις.
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   SCROLL HINT
   ══════════════════════════════════════════ */

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.06], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-center"
    >
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
        Κυλήστε
      </span>
      <ChevronDown size={18} className="mx-auto text-white/70 animate-scroll-hint" />
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   CLOSING CTA — appears as the journey ends
   ══════════════════════════════════════════ */

function JourneyCta({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.82, 0.95], [0, 1]);
  const y = useTransform(progress, [0.82, 0.95], [30, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="flex flex-col items-center gap-3 sm:flex-row"
    >
      <Link
        href="/programma"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ihu-blue shadow-lg transition-all hover:gap-3 hover:shadow-xl"
      >
        Δείτε όλο το Πρόγραμμα Σπουδών
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
      <Link
        href="/eggrafes"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
      >
        Αιτήσεις Εισαγωγής
        <ArrowUpRight size={16} />
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   JOURNEY RECAP — horizontal timeline + stats
   ──────────────────────────────────────────
   A non-pinned band shown right after the 3D
   journey. It recaps the five stages as a
   connected timeline (useful for visitors who
   skim) and surfaces the key programme facts
   with animated counters, while transitioning
   the background from the dark stage back to
   the light page below.
   ══════════════════════════════════════════ */

function RecapTimeline() {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-ihu-green-light/40 via-white/30 to-ihu-blue-light/40 md:block" />

      <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {JOURNEY_STAGES.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.li
              key={stage.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Node */}
              <div
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ring-4 ring-ihu-blue-dark transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${stage.from}, ${stage.to})`,
                  boxShadow: `0 14px 30px -12px ${stage.glow}`,
                }}
              >
                <Icon size={24} />
                <span
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-black"
                  style={{ color: stage.accent }}
                >
                  {stage.index}
                </span>
              </div>

              <h4 className="mt-4 font-heading text-sm font-bold text-white">
                {stage.title}
              </h4>
              <p className="mt-1 text-xs text-white/60">{stage.subtitle}</p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function RecapStats() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md lg:grid-cols-4">
      {PROGRAM_STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex flex-col items-center justify-center bg-white/[0.02] px-4 py-8 text-center"
        >
          <AnimatedCounter
            end={stat.value}
            suffix={stat.suffix ?? ""}
            className="text-3xl text-white md:text-4xl"
          />
          <span className="mt-2 text-sm font-semibold text-white/90">{stat.label}</span>
          <span className="mt-1 text-xs text-white/50">{stat.sub}</span>
        </motion.div>
      ))}
    </div>
  );
}

function JourneyRecap() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#10203f] via-ihu-blue to-[#16284a] py-20 md:py-28">
      {/* Soft accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(135,157,66,0.25), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(74,98,160,0.3), transparent 60%)" }}
      />

      <div className="section-container relative z-10 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <h3 className="font-heading text-2xl font-bold text-white md:text-4xl">
            Πέντε στάδια, ένα ολοκληρωμένο πρόγραμμα
          </h3>
          <p className="mt-4 text-white/70">
            Ένα συνεκτικό πρόγραμμα σπουδών που καλύπτει ολόκληρο τον κύκλο ζωής
            ενός καλλυντικού — από το εργαστήριο έρευνας μέχρι την αγορά.
          </p>
        </motion.div>

        <RecapTimeline />

        <div className="mt-16">
          <RecapStats />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */

export function CosmeticJourney3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewport = useViewport();
  const geometry = useRingGeometry(viewport);
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll signal a touch for the parallax background layers.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Derive the active stage index from raw scroll progress (responsive, no lag).
  // The ring rotation itself is handled inside <StageRing3D> via an `animate`
  // prop keyed on this index, so the front card always matches the panel.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(0.9999, Math.max(0, latest));
    const next = Math.round(clamped * (STAGE_COUNT - 1));
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const activeStage = JOURNEY_STAGES[activeIndex];

  // Smoothly programmatic-scroll to a given stage when its dot is clicked.
  const handleSelect = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      const target = top + (index / (STAGE_COUNT - 1)) * scrollable;
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [],
  );

  return (
    <>
    <section
      ref={containerRef}
      aria-label="Το ταξίδι ενός καλλυντικού — διαδραστική παρουσίαση"
      className="relative bg-ihu-blue-dark text-white"
      style={{ height: `${STAGE_COUNT * VH_PER_STAGE}vh` }}
    >
      {/* Pinned 3D stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background layers */}
        <SceneBackground progress={smoothProgress} activeGlow={activeStage.glow} />
        <GridFloor activeGlow={activeStage.glow} />
        <FloatingParticles
          progress={smoothProgress}
          activeGlow={activeStage.glow}
          reduced={reduced}
        />

        {/* Top fade so the section blends with whatever is above */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-ihu-blue-dark to-transparent" />
        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#10203f] to-transparent" />

        {/* Foreground content grid */}
        <div className="section-container relative z-30 flex h-full flex-col px-4 py-8 md:px-8">
          {/* Heading pinned at top */}
          <div className="shrink-0 pt-10 md:pt-14">
            <SectionHeading />
          </div>

          {/* Middle: detail panel + 3D ring */}
          <div className="grid flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Left column — text + counter + rail */}
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <div className="mb-6 hidden lg:block">
                <StageCounter activeIndex={activeIndex} activeAccent={activeStage.accent} />
              </div>

              <StageDetailPanel stage={activeStage} />

              <div className="mt-8 flex flex-col gap-8">
                <ProgressRail
                  activeIndex={activeIndex}
                  progress={smoothProgress}
                  onSelect={handleSelect}
                />
                <JourneyCta progress={smoothProgress} />
              </div>
            </div>

            {/* Right column — the 3D ring */}
            <div className="order-1 flex h-[42vh] items-center justify-center lg:order-2 lg:h-full">
              <StageRing3D
                activeIndex={activeIndex}
                activeGlow={activeStage.glow}
                activeAccent={activeStage.accent}
                geometry={geometry}
                reduced={reduced}
              />
            </div>
          </div>
        </div>

        <ScrollHint progress={smoothProgress} />
      </div>
    </section>

      <JourneyRecap />
    </>
  );
}

export default CosmeticJourney3D;
