"use client";

/* ══════════════════════════════════════════════════════════════════════════
   home/lib/primitives — shared presentational building blocks
   ──────────────────────────────────────────────────────────────────────────
   Reusable, on-brand pieces (icon resolver, section labels, reveal wrappers,
   3D tilt cards, glass panels, chips) shared by every λαχανί section.
   ══════════════════════════════════════════════════════════════════════════ */

import React from "react";
import {
  motion,
  useMotionTemplate,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  Sprout,
  FlaskConical,
  FlaskRound,
  Microscope,
  HeartPulse,
  Rocket,
  Sparkles,
  Atom,
  Droplets,
  Droplet,
  Dna,
  ShieldCheck,
  Gauge,
  Leaf,
  TestTubes,
  Scale,
  Apple,
  Stethoscope,
  Pill,
  ScanFace,
  GraduationCap,
  Search,
  Briefcase,
  Factory,
  HeartHandshake,
  Beaker,
  Brain,
  Award,
  Users,
  Building2,
  Calendar,
  Clock,
  Euro,
  MapPin,
  BookOpen,
  Lightbulb,
  Target,
  TrendingUp,
  CheckCircle2,
  Quote,
  Star,
  Layers,
  Wand2,
  Gem,
  Palette,
  Globe,
  Sun,
  Waves,
  Hexagon,
  Orbit,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { IconKey } from "./data";
import { useTilt } from "./hooks";

/* ────────────────────────────────────────────
   Icon resolver
   ──────────────────────────────────────────── */

const ICONS: Record<IconKey, LucideIcon> = {
  sprout: Sprout,
  flask: FlaskConical,
  "flask-round": FlaskRound,
  microscope: Microscope,
  "heart-pulse": HeartPulse,
  rocket: Rocket,
  sparkles: Sparkles,
  atom: Atom,
  droplets: Droplets,
  droplet: Droplet,
  dna: Dna,
  shield: ShieldCheck,
  gauge: Gauge,
  leaf: Leaf,
  "test-tubes": TestTubes,
  scale: Scale,
  apple: Apple,
  stethoscope: Stethoscope,
  pill: Pill,
  "scan-face": ScanFace,
  graduation: GraduationCap,
  search: Search,
  briefcase: Briefcase,
  factory: Factory,
  "heart-handshake": HeartHandshake,
  beaker: Beaker,
  brain: Brain,
  award: Award,
  users: Users,
  building: Building2,
  calendar: Calendar,
  clock: Clock,
  euro: Euro,
  "map-pin": MapPin,
  book: BookOpen,
  lightbulb: Lightbulb,
  target: Target,
  trending: TrendingUp,
  check: CheckCircle2,
  quote: Quote,
  star: Star,
  layers: Layers,
  wand: Wand2,
  gem: Gem,
  palette: Palette,
  globe: Globe,
  sun: Sun,
  waves: Waves,
  hexagon: Hexagon,
  orbit: Orbit,
};

export function getIcon(key: IconKey): LucideIcon {
  return ICONS[key] ?? Sparkles;
}

export function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 2,
}: {
  name: IconKey;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = getIcon(name);
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />;
}

/* ────────────────────────────────────────────
   Reveal — scroll-triggered entrance
   ──────────────────────────────────────────── */

const REVEAL_VARIANTS: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -36 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -44 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 44 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 1.08, filter: "blur(8px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  direction?: keyof typeof REVEAL_VARIANTS;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "li" | "span" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={REVEAL_VARIANTS[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* ────────────────────────────────────────────
   Stagger container helper
   ──────────────────────────────────────────── */

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ────────────────────────────────────────────
   Section label (kicker chip)
   ──────────────────────────────────────────── */

export function SectionLabel({
  icon,
  children,
  className,
}: {
  icon?: IconKey;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-ihu-green-dark/15 bg-white/55 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ihu-green-dark shadow-sm backdrop-blur-md ring-glass",
        className,
      )}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────
   Gradient text
   ──────────────────────────────────────────── */

export function GradientText({
  children,
  className,
  variant = "lachani",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "lachani" | "fresh";
}) {
  return (
    <span
      className={cn(
        variant === "fresh" ? "text-gradient-fresh" : "text-gradient-lachani",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────
   Section heading block
   ──────────────────────────────────────────── */

export function SectionHeading({
  label,
  labelIcon,
  title,
  highlight,
  description,
  align = "center",
  className,
}: {
  label?: string;
  labelIcon?: IconKey;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {label && (
        <Reveal direction="up">
          <SectionLabel icon={labelIcon}>{label}</SectionLabel>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.06}>
        <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-text-primary md:text-5xl">
          {title}
          {highlight && (
            <>
              {" "}
              <GradientText>{highlight}</GradientText>
            </>
          )}
        </h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.12}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed text-text-secondary md:text-lg",
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   Glass panel
   ──────────────────────────────────────────── */

export function GlassPanel({
  children,
  className,
  deep = false,
}: {
  children: React.ReactNode;
  className?: string;
  deep?: boolean;
}) {
  return (
    <div
      className={cn(
        deep ? "glass-lachani-deep" : "glass-lachani",
        "rounded-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Chip
   ──────────────────────────────────────────── */

export function Chip({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/55 px-3 py-1 text-[11px] font-semibold text-ihu-green-dark ring-1 ring-ihu-green-dark/10 backdrop-blur-sm",
        className,
      )}
      style={accent ? { color: accent, boxShadow: `inset 0 0 0 1px ${accent}33` } : undefined}
    >
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────
   TiltCard — pointer-reactive 3D card with glare
   ──────────────────────────────────────────── */

export function TiltCard({
  children,
  className,
  innerClassName,
  max = 10,
  glare = true,
  disabled = false,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  max?: number;
  glare?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const tilt = useTilt({ max, disabled });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.9), rgba(255,255,255,0) 55%)`;

  return (
    <motion.div
      onPointerMove={tilt.onPointerMove}
      onPointerEnter={tilt.onPointerEnter}
      onPointerLeave={tilt.onPointerLeave}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.scale,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
        ...style,
      }}
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      <div
        className={cn("relative h-full w-full overflow-hidden", innerClassName)}
        style={{ transform: "translateZ(0px)" }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              opacity: tilt.glareOpacity,
              background: glareBackground,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Soft floating layer (parallax helper)
   ──────────────────────────────────────────── */

export function ParallaxLayer({
  children,
  y,
  x,
  className,
  style,
}: {
  children?: React.ReactNode;
  y?: MotionValue<number>;
  x?: MotionValue<number>;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div style={{ x, y, ...style }} className={className} aria-hidden>
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   IconBadge — the recurring gradient icon square
   ──────────────────────────────────────────── */

export function IconBadge({
  icon,
  size = "md",
  className,
  from = "#879D42",
  to = "#5F712A",
  style,
}: {
  icon: IconKey;
  size?: "sm" | "md" | "lg";
  className?: string;
  from?: string;
  to?: string;
  style?: React.CSSProperties;
}) {
  const dims = size === "sm" ? "h-10 w-10" : size === "lg" ? "h-16 w-16" : "h-12 w-12";
  const iconSize = size === "sm" ? 18 : size === "lg" ? 28 : 22;
  return (
    <span
      className={cn("flex items-center justify-center rounded-2xl text-white shadow-lg", dims, className)}
      style={{ background: `linear-gradient(140deg, ${from}, ${to})`, ...style }}
    >
      <Icon name={icon} size={iconSize} />
    </span>
  );
}

/* ────────────────────────────────────────────
   MiniStat — compact label/value pill
   ──────────────────────────────────────────── */

export function MiniStat({
  value,
  label,
  className,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <p className="font-heading text-3xl font-extrabold text-ihu-green-dark md:text-4xl">{value}</p>
      <p className="mt-1 text-xs font-medium text-text-secondary">{label}</p>
    </div>
  );
}

/* ────────────────────────────────────────────
   Divider — dotted / gradient separators
   ──────────────────────────────────────────── */

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-ihu-green-dark/30" />
      <span className="h-1.5 w-1.5 rotate-45 bg-ihu-green" />
      <span className="h-2 w-2 rotate-45 bg-ihu-green-dark" />
      <span className="h-1.5 w-1.5 rotate-45 bg-ihu-green" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-ihu-green-dark/30" />
    </div>
  );
}

/* ────────────────────────────────────────────
   Decorative divider wave
   ──────────────────────────────────────────── */

export function WaveDivider({
  className,
  flip = false,
  color = "rgba(255,255,255,0.5)",
}: {
  className?: string;
  flip?: boolean;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none w-full overflow-hidden leading-[0]", className)}
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-[60px] w-full md:h-[100px]"
      >
        <path
          fill={color}
          d="M0,64 C240,120 480,8 720,40 C960,72 1200,120 1440,64 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
