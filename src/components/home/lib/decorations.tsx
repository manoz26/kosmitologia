"use client";

/* ══════════════════════════════════════════════════════════════════════════
   home/lib/decorations — reusable decorative layers
   ──────────────────────────────────────────────────────────────────────────
   Self-contained, deterministic background ornaments (auroras, particle
   fields, sparkles, perspective grid floors, glow orbs) used to give the new
   sections depth without each one re-implementing the same scatter logic.
   ══════════════════════════════════════════════════════════════════════════ */

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScatter, useReduced, useMounted, makeRng } from "./hooks";

/* ────────────────────────────────────────────
   Glow orb — a single soft radial blob
   ──────────────────────────────────────────── */

export function GlowOrb({
  className,
  size = 320,
  color = "rgba(216,236,128,0.7)",
  blur = 80,
  style,
}: {
  className?: string;
  size?: number;
  color?: string;
  blur?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        ...style,
      }}
    />
  );
}

/* ────────────────────────────────────────────
   Aurora — two drifting tinted blobs
   ──────────────────────────────────────────── */

export function Aurora({
  className,
  tintA = "rgba(216,236,128,0.55)",
  tintB = "rgba(135,157,66,0.45)",
}: {
  className?: string;
  tintA?: string;
  tintB?: string;
}) {
  const reduced = useReduced();
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn("absolute -left-[10%] top-[8%] h-[44vh] w-[44vw] rounded-full blur-[90px]", !reduced && "animate-lh-aurora")}
        style={{ background: `radial-gradient(circle, ${tintA} 0%, transparent 70%)` }}
      />
      <div
        className={cn("absolute right-[-8%] bottom-[6%] h-[46vh] w-[46vw] rounded-full blur-[100px]", !reduced && "animate-lh-aurora")}
        style={{ background: `radial-gradient(circle, ${tintB} 0%, transparent 70%)`, animationDelay: "-7s" }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────
   Particle field — floating depth bubbles with
   optional scroll parallax
   ──────────────────────────────────────────── */

export function ParticleField({
  count = 18,
  seed = 21,
  className,
  glow = "rgba(135,157,66,0.5)",
  parallax = true,
}: {
  count?: number;
  seed?: number;
  className?: string;
  glow?: string;
  parallax?: boolean;
}) {
  const reduced = useReduced();
  const mounted = useMounted();
  const particles = useScatter(reduced ? Math.ceil(count / 2) : count, seed);

  const { scrollYProgress } = useScroll();
  // Function-based — range-based scroll transforms desync via WAAPI (see CinematicScrollHero).
  const nearY = useTransform(scrollYProgress, (p) =>
    parallax && !reduced ? -160 * Math.min(1, Math.max(0, p)) : 0,
  );
  const farY = useTransform(scrollYProgress, (p) =>
    parallax && !reduced ? -60 * Math.min(1, Math.max(0, p)) : 0,
  );

  if (!mounted) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => {
        const isNear = p.depth > 0.5;
        return (
          <motion.span
            key={p.id}
            className={cn(!reduced && "animate-drift-b")}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              y: isNear ? nearY : farY,
              opacity: 0.1 + p.depth * 0.4,
              filter: `blur(${(1 - p.depth) * 2.5}px)`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), ${glow} 70%, transparent 75%)`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   Sparkle field — twinkling stars
   ──────────────────────────────────────────── */

export function SparkleField({ count = 14, seed = 73, className }: { count?: number; seed?: number; className?: string }) {
  const reduced = useReduced();
  const mounted = useMounted();
  const sparks = React.useMemo(() => {
    const rand = makeRng(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Number((rand() * 100).toFixed(3)),
      top: Number((rand() * 100).toFixed(3)),
      size: Number((6 + rand() * 12).toFixed(3)),
      delay: Number((rand() * 4).toFixed(3)),
    }));
  }, [count, seed]);

  if (!mounted || reduced) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {sparks.map((s) => (
        <svg
          key={s.id}
          className="absolute animate-lh-sparkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
            fill="rgba(255,255,255,0.85)"
          />
        </svg>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Perspective grid floor
   ──────────────────────────────────────────── */

export function GridFloor({ className, glow = "rgba(165,186,95,0.5)" }: { className?: string; glow?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden", className)} style={{ perspective: "600px" }}>
      <div
        className="absolute inset-x-[-50%] bottom-[-20%] h-[120%] animate-grid-pan"
        style={{
          transform: "rotateX(72deg)",
          transformOrigin: "center bottom",
          backgroundImage:
            "linear-gradient(rgba(95,113,42,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(95,113,42,0.18) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 80%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px blur-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${glow}, transparent)` }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────
   Bubble column — rising bubbles (lab vibe)
   ──────────────────────────────────────────── */

export function BubbleColumn({ className, count = 8, seed = 5 }: { className?: string; count?: number; seed?: number }) {
  const reduced = useReduced();
  const mounted = useMounted();
  const bubbles = React.useMemo(() => {
    const rand = makeRng(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Number((rand() * 100).toFixed(2)),
      size: Number((6 + rand() * 14).toFixed(2)),
      delay: Number((rand() * 6).toFixed(2)),
      dur: Number((5 + rand() * 4).toFixed(2)),
    }));
  }, [count, seed]);

  if (!mounted || reduced) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-0 rounded-full animate-lh-bubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(165,186,95,0.4) 70%, transparent 75%)",
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Noise overlay
   ──────────────────────────────────────────── */

export function NoiseOverlay({ className, opacity = 0.05 }: { className?: string; opacity?: number }) {
  return <div aria-hidden className={cn("home-grain pointer-events-none absolute inset-0 mix-blend-overlay", className)} style={{ opacity }} />;
}

/* ────────────────────────────────────────────
   Radial burst — rotating rays
   ──────────────────────────────────────────── */

export function RadialBurst({
  className,
  rays = 18,
  color = "rgba(135,157,66,0.18)",
  size = 600,
}: {
  className?: string;
  rays?: number;
  color?: string;
  size?: number;
}) {
  const reduced = useReduced();
  const lines = React.useMemo(
    () =>
      Array.from({ length: rays }, (_, i) => {
        const a = (i / rays) * Math.PI * 2;
        return {
          x2: Number((50 + Math.cos(a) * 50).toFixed(3)),
          y2: Number((50 + Math.sin(a) * 50).toFixed(3)),
        };
      }),
    [rays],
  );

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", !reduced && "animate-orbit-spin", className)}
      style={{ width: size, height: size, animationDuration: "120s" }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" style={{ maskImage: "radial-gradient(circle, black 30%, transparent 72%)", WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 72%)" }}>
        {lines.map((l, i) => (
          <line key={i} x1="50" y1="50" x2={l.x2} y2={l.y2} stroke={color} strokeWidth="0.4" />
        ))}
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────
   Constellation field — dots connected by lines
   ──────────────────────────────────────────── */

export function ConstellationField({
  className,
  count = 14,
  seed = 19,
  color = "rgba(95,113,42,0.35)",
}: {
  className?: string;
  count?: number;
  seed?: number;
  color?: string;
}) {
  const mounted = useMounted();
  const nodes = React.useMemo(() => {
    const rand = makeRng(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Number((rand() * 100).toFixed(2)),
      y: Number((rand() * 100).toFixed(2)),
    }));
  }, [count, seed]);

  // connect each node to its nearest neighbour (deterministic)
  const edges = React.useMemo(() => {
    const out: { a: number; b: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      let best = -1;
      let bestD = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = (nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      }
      if (best > i) out.push({ a: i, b: best });
    }
    return out;
  }, [nodes]);

  if (!mounted) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        {edges.map((e, i) => (
          <line key={i} x1={nodes[e.a].x} y1={nodes[e.a].y} x2={nodes[e.b].x} y2={nodes[e.b].y} stroke={color} strokeWidth="0.18" />
        ))}
        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r="0.5" fill={color}>
            <animate attributeName="r" values="0.3;0.8;0.3" dur="4s" begin={`${(n.id % 5) * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
