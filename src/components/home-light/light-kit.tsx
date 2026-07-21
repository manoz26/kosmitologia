"use client";

/* ══════════════════════════════════════════════════════════════════════════
   light-kit — shared primitives for the calm /light/* draft pages
   ──────────────────────────────────────────────────────────────────────────
   The /light homepage (see LightSections.tsx) established a design contract:

     • Static white / pale background. Λαχανί appears only as an accent
       (kickers, icon chips, buttons), never as a full-section fill.
     • Single-colour, modestly sized headings. No gradient text.
     • Motion below the hero is a one-shot 14px fade-rise. Nothing loops.
     • Each /light subpage keeps exactly ONE restrained "signature" moment
       (a scroll-driven or interactive section) — everything else stays still.

   These are the building blocks every /light/* draft shares. They deliberately
   mirror the primitives inside LightSections so the two read as one system,
   without importing from it (the home page stays untouched / approved).
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Apple,
  Atom,
  Award,
  Beaker,
  Book,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Check,
  Clock,
  Droplets,
  FlaskConical,
  FlaskRound,
  Factory,
  Gauge,
  Globe,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Layers,
  Leaf,
  Lightbulb,
  MapPin,
  Microscope,
  Palette,
  Pill,
  Rocket,
  Scale,
  ScanFace,
  Search,
  Shield,
  Sparkles,
  Sprout,
  Sun,
  Target,
  TestTubes,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* Shared page gutter. */
export const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/* ────────────────────────────────────────────
   Icons — resolve string keys used across data
   ──────────────────────────────────────────── */

const ICONS: Record<string, LucideIcon> = {
  apple: Apple,
  atom: Atom,
  award: Award,
  beaker: Beaker,
  book: Book,
  "book-open": BookOpen,
  briefcase: Briefcase,
  building: Building2,
  calendar: Calendar,
  check: Check,
  clock: Clock,
  droplets: Droplets,
  factory: Factory,
  flask: FlaskConical,
  "flask-conical": FlaskConical,
  "flask-round": FlaskRound,
  gauge: Gauge,
  globe: Globe,
  graduation: GraduationCap,
  "graduation-cap": GraduationCap,
  "heart-handshake": HeartHandshake,
  "heart-pulse": HeartPulse,
  layers: Layers,
  leaf: Leaf,
  lightbulb: Lightbulb,
  "map-pin": MapPin,
  microscope: Microscope,
  palette: Palette,
  pill: Pill,
  rocket: Rocket,
  scale: Scale,
  "scan-face": ScanFace,
  search: Search,
  shield: Shield,
  sparkles: Sparkles,
  sprout: Sprout,
  sun: Sun,
  target: Target,
  "test-tubes": TestTubes,
  trending: TrendingUp,
  users: Users,
};

export function LightIcon({
  name,
  size = 18,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={1.9} className={className} />;
}

/* Small rounded icon chip — the one place λαχανί tints a surface. */
export function IconChip({
  name,
  size = 10,
}: {
  name: string;
  size?: 9 | 10 | 11 | 12;
}) {
  const box = { 9: "h-9 w-9", 10: "h-10 w-10", 11: "h-11 w-11", 12: "h-12 w-12" }[size];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark",
        box,
      )}
    >
      <LightIcon name={name} size={size < 11 ? 18 : 20} />
    </span>
  );
}

/* ────────────────────────────────────────────
   Scroll progress helper — every /light/* page
   drives its single signature moment through a
   function-based transform of a 0..1 progress
   (range-based transforms desync here — see the
   HistoryTimeline note in SxetikaLight).
   ──────────────────────────────────────────── */

/** Map overall progress `p` (0..1) to a 0..1 sub-span between `a` and `b`. */
export const spanOf = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

/* ────────────────────────────────────────────
   Motion — one-shot fade-rise, the only ambient
   animation below a page header
   ──────────────────────────────────────────── */

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Typographic bits
   ──────────────────────────────────────────── */

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-ihu-green-dark">
      {children}
    </p>
  );
}

/* Left-aligned, single-colour section head. */
export function SectionHead({
  kicker,
  title,
  description,
  center = false,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <FadeIn className={cn(center ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed text-text-secondary", center && "mx-auto")}>
          {description}
        </p>
      )}
    </FadeIn>
  );
}

/* ────────────────────────────────────────────
   Buttons / links
   ──────────────────────────────────────────── */

export function PrimaryLink({
  href,
  children,
  download,
}: {
  href: string;
  children: React.ReactNode;
  download?: string;
}) {
  return (
    <a
      href={href}
      {...(download ? { download } : {})}
      className="group inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
    >
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export function GhostLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-text-primary ring-1 ring-slate-300 transition-colors hover:bg-slate-50"
    >
      {children}
    </a>
  );
}

/* Quiet inline "→ more" link. */
export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-bold text-ihu-green-dark"
    >
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

/* ────────────────────────────────────────────
   Page header — the calm opener of a /light/* page
   ──────────────────────────────────────────────
   A quiet band that replaces the heavy hero of the original pages: an eyebrow,
   a single-colour title with one λαχανί-tinted word, and a short intro. Sits on
   the page's own pale background. Cleared of the fixed navbar with top padding.
   ──────────────────────────────────────────── */

export function LightPageHeader({
  eyebrow,
  title,
  highlight,
  intro,
  children,
  transparent = false,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro?: string;
  children?: React.ReactNode;
  /** Drop the band's own fill/border so a page-level backdrop shows through. */
  transparent?: boolean;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden",
        !transparent && "border-b border-slate-200/70 bg-[#F4F7ED]",
      )}
    >
      {/* one faint λαχανί wash, top-right — the only decoration */}
      {!transparent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(185,216,74,0.28), transparent 70%)" }}
        />
      )}
      <div className={cn(CONTAINER, "relative pt-32 pb-16 md:pt-36 md:pb-20")}>
        <FadeIn>
          <Kicker>{eyebrow}</Kicker>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary md:text-6xl">
            {title}
            {highlight && <> <span className="text-ihu-green-dark">{highlight}</span></>}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {intro}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </FadeIn>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────
   Back to top — the only piece of floating chrome
   ──────────────────────────────────────────── */

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Επιστροφή στην αρχή"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-white text-ihu-green-dark shadow-md ring-1 ring-slate-200 transition-all hover:-translate-y-0.5",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}

/* Small draft ribbon so a reviewer always knows this is the light variant. */
export function DraftTag() {
  return (
    <div className="fixed bottom-6 left-6 z-40 rounded-full bg-ihu-green-dark/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-sm">
      Light draft
    </div>
  );
}
