"use client";

/* ══════════════════════════════════════════════════════════════════════════
   home/lib/primitives — shared presentational building blocks
   ──────────────────────────────────────────────────────────────────────────
   Reusable, on-brand pieces (icon resolver, section labels, reveal wrappers,
   3D tilt cards, glass panels, chips) shared by every λαχανί section.
   ══════════════════════════════════════════════════════════════════════════ */

import React, { createElement } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
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
  Megaphone,
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
  megaphone: Megaphone,
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
  /* createElement: getIcon returns stable module-level components from the
     ICONS map, so nothing is "created during render" — this just keeps the
     react-hooks/static-components rule from misreading the lookup as a new
     component definition. */
  return createElement(getIcon(name), { size, className, strokeWidth });
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
        "inline-flex items-center gap-2 rounded-full border border-ihu-green-dark/15 bg-white/70 px-4 py-1.5 text-sm font-semibold text-ihu-green-dark",
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

/* The rule every section heading stands on: a short dark-green bar on a
   hairline that runs the width of the column, drawn in from the left as the
   section arrives — the one motion of the heading. Square-cut, like the
   other "structure" on the page. */
export function HeadingRule({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className={cn("relative h-[3px] w-full", className)}>
      <motion.span
        className="absolute inset-x-0 top-[1px] h-px origin-left bg-ihu-green-dark/20"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-0 top-0 h-[3px] w-12 origin-left bg-ihu-green-dark"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* A text link with an arrow — the "see all" of a section. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-bold text-ihu-green-dark underline-offset-[6px] transition-colors hover:text-text-primary hover:underline",
        className,
      )}
    >
      {children}
      <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* Section heading — on the page grid, never floating in the middle.
   • "split" (default): the rule on top with the section's name on the left
     and its "see all" link on the right; under it the title on the left and
     the intro on the right, sitting on the title's baseline.
   • "left": the same rule and label, title and intro stacked — for headings
     that live inside one column of a two-column section.
   • "center": the old centred block, for the few places that need it. */
export function SectionHeading({
  label,
  labelIcon,
  title,
  highlight,
  description,
  action,
  align = "split",
  className,
}: {
  label?: string;
  labelIcon?: IconKey;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  description?: React.ReactNode;
  /** The section's "see all" link, shown at the right end of the rule. */
  action?: { href: string; label: string };
  align?: "split" | "left" | "center";
  className?: string;
}) {
  const heading = (
    <h2
      className={cn(
        "font-heading font-extrabold tracking-[-0.022em] text-text-primary",
        align === "split"
          ? "text-[2.15rem] leading-[1.04] md:text-5xl lg:text-[3.4rem]"
          : "text-3xl leading-[1.08] md:text-[2.75rem]",
      )}
    >
      {title}
      {highlight && (
        <>
          {title ? " " : null}
          <GradientText>{highlight}</GradientText>
        </>
      )}
    </h2>
  );

  if (align === "center") {
    return (
      <div className={cn("mx-auto max-w-3xl text-center", className)}>
        {label && (
          <Reveal direction="up">
            <SectionLabel icon={labelIcon}>{label}</SectionLabel>
          </Reveal>
        )}
        <Reveal direction="up" delay={0.06} className="mt-5">
          {heading}
        </Reveal>
        {description && (
          <Reveal direction="up" delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    );
  }

  const intro = description && (
    <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-[1.0625rem]">{description}</p>
  );

  return (
    <div className={cn("relative", className)}>
      <HeadingRule />
      <div className="flex min-h-5 items-center justify-between gap-6 pt-4">
        {label ? (
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-ihu-green-dark">
              {labelIcon && <Icon name={labelIcon} size={15} />}
              {label}
            </span>
          </Reveal>
        ) : (
          <span />
        )}
        {action && (
          <Reveal direction="up" delay={0.1} className="hidden md:block">
            <ArrowLink href={action.href}>{action.label}</ArrowLink>
          </Reveal>
        )}
      </div>

      {align === "split" ? (
        <div className="mt-6 grid gap-5 md:mt-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <Reveal direction="up" delay={0.06} className="lg:col-span-7">
            {heading}
          </Reveal>
          {intro && (
            <Reveal direction="up" delay={0.12} className="lg:col-span-5 lg:pb-1.5 xl:col-span-4 xl:col-start-9">
              {intro}
            </Reveal>
          )}
        </div>
      ) : (
        <div className="mt-5 max-w-2xl">
          <Reveal direction="up" delay={0.06}>
            {heading}
          </Reveal>
          {intro && (
            <Reveal direction="up" delay={0.12} className="mt-5">
              {intro}
            </Reveal>
          )}
        </div>
      )}

      {action && (
        <Reveal direction="up" delay={0.14} className="mt-5 md:hidden">
          <ArrowLink href={action.href}>{action.label}</ArrowLink>
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
