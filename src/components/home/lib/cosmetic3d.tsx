/* ══════════════════════════════════════════════════════════════════════════
   home/lib/cosmetic3d — CSS-only 3D cosmetic props
   ──────────────────────────────────────────────────────────────────────────
   Lightweight, dependency-free 3D-looking objects built purely from gradients
   and transforms. No images, no WebGL — they stay crisp at any size and tint
   themselves to the λαχανί palette. Used as floating depth props in the hero
   and as accents throughout the page.
   ══════════════════════════════════════════════════════════════════════════ */

import React from "react";
import { cn } from "@/lib/utils";

interface PropBase {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  float?: boolean;
}

/* ────────────────────────────────────────────
   Serum dropper bottle
   ──────────────────────────────────────────── */

export function SerumBottle({ size = 160, className, style, float = true }: PropBase) {
  const w = size;
  const h = size * 1.7;
  return (
    <div
      className={cn("relative", float && "animate-lh-tilt-float", className)}
      style={{ width: w, height: h, ...style }}
      aria-hidden
    >
      {/* Dropper cap */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 rounded-t-md"
        style={{
          width: w * 0.34,
          height: h * 0.16,
          background: "linear-gradient(150deg,#5F712A,#879D42 55%,#4F6321)",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.25)",
        }}
      />
      {/* Cap ring */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: h * 0.15,
          width: w * 0.4,
          height: h * 0.04,
          borderRadius: 6,
          background: "linear-gradient(180deg,#3F4F18,#6E8230)",
        }}
      />
      {/* Neck */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: h * 0.19,
          width: w * 0.26,
          height: h * 0.08,
          background: "linear-gradient(180deg,rgba(255,255,255,0.5),rgba(185,216,74,0.35))",
          borderRadius: 4,
        }}
      />
      {/* Glass body */}
      <div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          top: h * 0.26,
          width: w * 0.78,
          height: h * 0.7,
          borderRadius: w * 0.26,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(200,226,94,0.55) 30%, rgba(135,157,66,0.55) 70%, rgba(95,113,42,0.6) 100%)",
          boxShadow:
            "inset 0 6px 18px rgba(255,255,255,0.55), inset 0 -14px 28px rgba(63,79,24,0.45), 0 24px 50px -20px rgba(95,113,42,0.6)",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Liquid fill */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "62%",
            background:
              "linear-gradient(180deg, rgba(185,216,74,0.85), rgba(135,157,66,0.95))",
            boxShadow: "inset 0 4px 8px rgba(255,255,255,0.4)",
          }}
        />
        {/* Specular highlight */}
        <div
          className="absolute"
          style={{
            top: "8%",
            left: "14%",
            width: "20%",
            height: "70%",
            borderRadius: "999px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0))",
            filter: "blur(2px)",
          }}
        />
        {/* Label */}
        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md"
          style={{
            width: "62%",
            height: "30%",
            background: "rgba(255,255,255,0.78)",
            boxShadow: "0 2px 8px rgba(63,79,24,0.25)",
          }}
        >
          <span
            className="font-heading font-black tracking-tight"
            style={{ fontSize: w * 0.12, color: "#5F712A", lineHeight: 1 }}
          >
            COSM
          </span>
          <span style={{ fontSize: w * 0.05, color: "#879D42", letterSpacing: 2 }}>
            SERUM · ΔΙΠΑΕ
          </span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Cream jar
   ──────────────────────────────────────────── */

export function CreamJar({ size = 170, className, style, float = true }: PropBase) {
  const w = size;
  const h = size * 0.92;
  return (
    <div
      className={cn("relative", float && "animate-lh-droplet-bob", className)}
      style={{ width: w, height: h, ...style }}
      aria-hidden
    >
      {/* Lid */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: w * 0.92,
          height: h * 0.32,
          borderRadius: `${w * 0.5}px ${w * 0.5}px 12px 12px`,
          background: "linear-gradient(160deg,#B9D84A,#879D42 60%,#5F712A)",
          boxShadow:
            "inset 0 4px 10px rgba(255,255,255,0.55), inset 0 -8px 16px rgba(63,79,24,0.4), 0 16px 30px -14px rgba(95,113,42,0.6)",
        }}
      >
        <div
          className="absolute left-1/2 top-[22%] -translate-x-1/2 rounded-full"
          style={{ width: "44%", height: "10%", background: "rgba(255,255,255,0.5)", filter: "blur(2px)" }}
        />
      </div>
      {/* Jar body */}
      <div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          bottom: 0,
          width: w,
          height: h * 0.72,
          borderRadius: `18px 18px ${w * 0.28}px ${w * 0.28}px`,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(228,238,200,0.7) 50%, rgba(165,186,95,0.55))",
          boxShadow:
            "inset 0 8px 18px rgba(255,255,255,0.6), inset 0 -16px 30px rgba(95,113,42,0.35), 0 24px 50px -20px rgba(95,113,42,0.5)",
        }}
      >
        <div
          className="absolute"
          style={{
            top: "10%",
            left: "12%",
            width: "16%",
            height: "60%",
            borderRadius: 999,
            background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0))",
            filter: "blur(2px)",
          }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Glossy droplet
   ──────────────────────────────────────────── */

export function Droplet3D({ size = 90, className, style, float = true }: PropBase) {
  return (
    <div
      className={cn("relative", float && "animate-lh-droplet-bob", className)}
      style={{ width: size, height: size * 1.3, ...style }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          transform: "rotate(45deg)",
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(200,226,94,0.9) 35%, rgba(135,157,66,0.95) 80%)",
          boxShadow:
            "inset -6px -8px 16px rgba(63,79,24,0.45), inset 6px 8px 14px rgba(255,255,255,0.7), 0 18px 36px -16px rgba(95,113,42,0.6)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "18%",
          left: "26%",
          width: "26%",
          height: "26%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0))",
          filter: "blur(1px)",
        }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────
   Stylised leaf
   ──────────────────────────────────────────── */

export function Leaf3D({ size = 120, className, style, float = true }: PropBase) {
  return (
    <div
      className={cn("relative", float && "animate-lh-tilt-float", className)}
      style={{ width: size, height: size, ...style }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "0 100% 0 100%",
          background:
            "linear-gradient(135deg, #C8E25E 0%, #A5BA5F 45%, #5F712A 100%)",
          boxShadow:
            "inset 0 8px 18px rgba(255,255,255,0.45), inset 0 -12px 24px rgba(63,79,24,0.5), 0 18px 40px -18px rgba(95,113,42,0.6)",
        }}
      />
      {/* Midrib */}
      <div
        className="absolute left-1/2 top-1/2 h-[80%] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{ background: "rgba(255,255,255,0.55)" }}
      />
      {/* Veins */}
      {[0.28, 0.46, 0.64].map((p, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 origin-left"
          style={{
            width: `${22 - i * 4}%`,
            height: 1.5,
            background: "rgba(255,255,255,0.4)",
            transform: `translate(-50%,-50%) rotate(45deg) translateY(${(p - 0.5) * size}px) rotate(38deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Molecule / atom cluster
   ──────────────────────────────────────────── */

export function Molecule3D({ size = 130, className, style, float = true }: PropBase) {
  const node = (
    top: string,
    left: string,
    d: number,
    grad: string,
  ): React.CSSProperties => ({
    position: "absolute",
    top,
    left,
    width: d,
    height: d,
    marginLeft: -d / 2,
    marginTop: -d / 2,
    borderRadius: "50%",
    background: grad,
    boxShadow: "inset -3px -4px 8px rgba(63,79,24,0.4), inset 3px 3px 6px rgba(255,255,255,0.7), 0 8px 18px -8px rgba(95,113,42,0.6)",
  });

  return (
    <div
      className={cn("relative", float && "animate-lh-spin-y", className)}
      style={{ width: size, height: size, transformStyle: "preserve-3d", ...style }}
      aria-hidden
    >
      {/* Bonds */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <g stroke="rgba(95,113,42,0.45)" strokeWidth="2">
          <line x1="50" y1="50" x2="22" y2="26" />
          <line x1="50" y1="50" x2="80" y2="30" />
          <line x1="50" y1="50" x2="30" y2="78" />
          <line x1="50" y1="50" x2="76" y2="74" />
        </g>
      </svg>
      <div style={node("50%", "50%", size * 0.3, "radial-gradient(circle at 35% 30%, #C8E25E, #879D42 70%, #5F712A)")} />
      <div style={node("26%", "22%", size * 0.17, "radial-gradient(circle at 35% 30%, #ffffff, #B9D84A 70%, #879D42)")} />
      <div style={node("30%", "80%", size * 0.15, "radial-gradient(circle at 35% 30%, #ffffff, #A5BA5F 70%, #5F712A)")} />
      <div style={node("78%", "30%", size * 0.14, "radial-gradient(circle at 35% 30%, #ffffff, #C8E25E 70%, #879D42)")} />
      <div style={node("74%", "76%", size * 0.16, "radial-gradient(circle at 35% 30%, #ffffff, #A5BA5F 70%, #5F712A)")} />
    </div>
  );
}

/* ────────────────────────────────────────────
   Orbiting ring (decorative)
   ──────────────────────────────────────────── */

export function OrbitRing({
  size = 200,
  className,
  style,
  color = "rgba(95,113,42,0.4)",
  dash = "4 10",
  duration = 26,
  reverse = false,
  dotColor = "#879D42",
}: PropBase & {
  color?: string;
  dash?: string;
  duration?: number;
  reverse?: boolean;
  dotColor?: string;
}) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        width: size,
        height: size,
        animation: `${reverse ? "orbit-spin-rev" : "orbit-spin"} ${duration}s linear infinite`,
        ...style,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          strokeDasharray={dash}
        />
        <circle cx="50" cy="4" r="2.4" fill={dotColor} />
        <circle cx="96" cy="50" r="1.8" fill={dotColor} opacity="0.7" />
        <circle cx="50" cy="96" r="2" fill={dotColor} opacity="0.5" />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────
   Pipette / dropper
   ──────────────────────────────────────────── */

export function Pipette({ size = 70, className, style, float = true }: PropBase) {
  const w = size;
  const h = size * 3;
  return (
    <div className={cn("relative", float && "animate-lh-tilt-float", className)} style={{ width: w, height: h, ...style }} aria-hidden>
      {/* rubber bulb */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 rounded-t-full"
        style={{
          width: w,
          height: h * 0.28,
          background: "linear-gradient(150deg,#879D42,#5F712A)",
          boxShadow: "inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.25)",
        }}
      />
      {/* glass tube */}
      <div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          top: h * 0.27,
          width: w * 0.34,
          height: h * 0.6,
          borderRadius: 8,
          background: "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(185,216,74,0.4))",
          boxShadow: "inset 0 0 6px rgba(255,255,255,0.6)",
        }}
      >
        <div className="absolute inset-x-0 bottom-0" style={{ height: "55%", background: "linear-gradient(180deg, rgba(185,216,74,0.85), rgba(135,157,66,0.95))" }} />
      </div>
      {/* tip */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: h * 0.03,
          width: w * 0.12,
          height: h * 0.12,
          background: "linear-gradient(180deg, rgba(135,157,66,0.7), rgba(95,113,42,0.9))",
          clipPath: "polygon(50% 100%, 0 0, 100% 0)",
        }}
      />
      {/* drop */}
      <div
        className="absolute left-1/2 -translate-x-1/2 animate-lh-droplet-bob"
        style={{
          bottom: -h * 0.04,
          width: w * 0.2,
          height: w * 0.26,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          transform: "rotate(0deg)",
          background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(165,186,95,0.95))",
          boxShadow: "0 6px 10px -4px rgba(95,113,42,0.6)",
        }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────
   Petri dish (top-down)
   ──────────────────────────────────────────── */

export function PetriDish({ size = 150, className, style, float = true }: PropBase) {
  return (
    <div className={cn("relative", float && "animate-lh-droplet-bob", className)} style={{ width: size, height: size, ...style }} aria-hidden>
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.6), rgba(228,238,200,0.7) 45%, rgba(165,186,95,0.55) 100%)",
          boxShadow: "inset 0 8px 18px rgba(255,255,255,0.55), inset 0 -10px 22px rgba(95,113,42,0.4), 0 20px 44px -18px rgba(95,113,42,0.5)",
        }}
      >
        {/* culture swirls */}
        <div className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 animate-lh-spin-y" style={{ background: "conic-gradient(from 0deg, rgba(135,157,66,0.5), rgba(185,216,74,0.2), rgba(95,113,42,0.5), rgba(185,216,74,0.2), rgba(135,157,66,0.5))", filter: "blur(4px)" }} />
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${22 + ((i * 37) % 60)}%`,
              top: `${28 + ((i * 53) % 50)}%`,
              width: 8 + (i % 3) * 5,
              height: 8 + (i % 3) * 5,
              background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8), rgba(135,157,66,0.7))",
            }}
          />
        ))}
        {/* rim highlight */}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 0 0 6px rgba(255,255,255,0.25)" }} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   DNA double helix
   ──────────────────────────────────────────── */

export function DnaHelix({ size = 120, className, style, float = true }: PropBase) {
  const rungs = 12;
  const h = size * 2;
  return (
    <div className={cn("relative", float && "animate-lh-tilt-float", className)} style={{ width: size, height: h, ...style }} aria-hidden>
      {Array.from({ length: rungs }).map((_, i) => {
        const t = i / (rungs - 1);
        const phase = t * Math.PI * 2.4;
        const x1 = 50 + Math.sin(phase) * 38;
        const x2 = 50 - Math.sin(phase) * 38;
        const depth = (Math.cos(phase) + 1) / 2; // 0..1
        return (
          <div key={i} className="absolute left-0 right-0" style={{ top: `${t * 92 + 2}%`, height: 2 }}>
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
              style={{
                left: `${Math.min(x1, x2)}%`,
                width: `${Math.abs(x1 - x2)}%`,
                background: "linear-gradient(90deg, rgba(135,157,66,0.7), rgba(185,216,74,0.5))",
                opacity: 0.4 + depth * 0.5,
              }}
            />
            <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${x1}%`, top: "50%", background: "radial-gradient(circle at 35% 30%,#fff,#879D42)", boxShadow: "0 2px 4px rgba(95,113,42,0.5)", transform: `scale(${0.7 + depth * 0.6})` }} />
            <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${x2}%`, top: "50%", background: "radial-gradient(circle at 35% 30%,#fff,#5F712A)", boxShadow: "0 2px 4px rgba(95,113,42,0.5)", transform: `scale(${0.7 + (1 - depth) * 0.6})` }} />
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   Ingredient orb — glossy tinted sphere
   ──────────────────────────────────────────── */

export function IngredientOrb({
  size = 120,
  className,
  style,
  float = true,
  from = "#B9D84A",
  to = "#5F712A",
}: PropBase & { from?: string; to?: string }) {
  return (
    <div className={cn("relative", float && "animate-lh-droplet-bob", className)} style={{ width: size, height: size, ...style }} aria-hidden>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), ${from} 38%, ${to} 100%)`,
          boxShadow: `inset -8px -10px 22px rgba(63,79,24,0.5), inset 8px 10px 18px rgba(255,255,255,0.55), 0 22px 44px -16px rgba(95,113,42,0.6)`,
        }}
      />
      <div className="absolute left-[24%] top-[18%] h-[24%] w-[24%] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0))", filter: "blur(1px)" }} />
      <div className="absolute bottom-[20%] right-[22%] h-[10%] w-[10%] rounded-full bg-white/40 blur-[1px]" />
    </div>
  );
}

/* ────────────────────────────────────────────
   Test-tube rack
   ──────────────────────────────────────────── */

export function TestTubeRack({ size = 150, className, style, float = true }: PropBase) {
  const tubes = [0.55, 0.72, 0.4];
  return (
    <div className={cn("relative flex items-end justify-center gap-2", float && "animate-lh-tilt-float", className)} style={{ width: size, height: size * 1.3, ...style }} aria-hidden>
      {tubes.map((fill, i) => (
        <div key={i} className="relative overflow-hidden" style={{ width: size * 0.18, height: size * 1.05, borderRadius: `4px 4px ${size * 0.1}px ${size * 0.1}px`, background: "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(185,216,74,0.3))", boxShadow: "inset 0 0 6px rgba(255,255,255,0.6), 0 8px 16px -8px rgba(95,113,42,0.5)" }}>
          <div className="absolute inset-x-0 bottom-0" style={{ height: `${fill * 100}%`, background: `linear-gradient(180deg, rgba(185,216,74,0.85), ${["#879D42", "#5F712A", "#9FCB4C"][i]})` }} />
          <div className="absolute left-[20%] top-[8%] h-[60%] w-[16%] rounded-full bg-white/60 blur-[1px]" />
        </div>
      ))}
      {/* rack base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-md" style={{ width: size * 0.92, height: size * 0.16, background: "linear-gradient(180deg,#879D42,#5F712A)", boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4)" }} />
    </div>
  );
}

/* ────────────────────────────────────────────
   Skin cross-section (stacked layers)
   ──────────────────────────────────────────── */

export function SkinCrossSection({
  size = 260,
  className,
  style,
  activeLayer = -1,
}: PropBase & { activeLayer?: number }) {
  const layers = [
    { h: 0.22, from: "#C8E25E", to: "#9DAE2E", label: "Επιδερμίδα" },
    { h: 0.42, from: "#9FCB4C", to: "#5E9A4E", label: "Χόριο" },
    { h: 0.36, from: "#7FC79A", to: "#3E7A4E", label: "Υποδόριος" },
  ];
  return (
    <div className={cn("relative overflow-hidden rounded-[1.6rem]", className)} style={{ width: size, height: size * 1.1, ...style }} aria-hidden>
      <div className="flex h-full w-full flex-col">
        {layers.map((l, i) => {
          const active = activeLayer === i;
          return (
            <div
              key={i}
              className="relative w-full transition-all duration-500"
              style={{
                height: `${l.h * 100}%`,
                background: `linear-gradient(160deg, ${l.from}, ${l.to})`,
                transform: active ? "scale(1.02)" : "scale(1)",
                boxShadow: active ? "inset 0 0 0 2px rgba(255,255,255,0.6)" : "inset 0 -1px 0 rgba(255,255,255,0.25)",
                zIndex: active ? 5 : 1,
              }}
            >
              {/* texture dots */}
              <div className="home-dots absolute inset-0 opacity-30" />
              {i === 0 && (
                <div className="absolute inset-x-0 top-0 h-2 bg-white/40" style={{ filter: "blur(1px)" }} />
              )}
            </div>
          );
        })}
      </div>
      {/* hair follicle */}
      <div className="absolute left-[30%] top-[10%] h-[70%] w-[3px] rotate-6 rounded-full bg-[#5F712A]/50" />
      <div className="absolute left-[68%] top-[16%] h-[55%] w-[3px] -rotate-6 rounded-full bg-[#5F712A]/40" />
    </div>
  );
}

/* ────────────────────────────────────────────
   Soap bubble — iridescent sphere
   ──────────────────────────────────────────── */

export function SoapBubble({ size = 90, className, style, float = true }: PropBase) {
  return (
    <div className={cn("relative", float && "animate-lh-droplet-bob", className)} style={{ width: size, height: size, ...style }} aria-hidden>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9), rgba(216,236,128,0.4) 38%, rgba(165,186,95,0.35) 64%, rgba(135,157,66,0.25) 100%)",
          boxShadow: "inset -6px -8px 16px rgba(95,113,42,0.25), inset 6px 8px 14px rgba(255,255,255,0.7), 0 12px 28px -12px rgba(95,113,42,0.45)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      />
      {/* iridescent sweep */}
      <div
        className="absolute inset-1 rounded-full opacity-50 animate-lh-spin-y"
        style={{ background: "conic-gradient(from 0deg, transparent, rgba(185,216,74,0.5), transparent, rgba(255,255,255,0.6), transparent)" }}
      />
      <div className="absolute left-[24%] top-[18%] h-[20%] w-[20%] rounded-full bg-white/80 blur-[1px]" />
    </div>
  );
}

/* ────────────────────────────────────────────
   Capsule (softgel)
   ──────────────────────────────────────────── */

export function Capsule({ size = 120, className, style, float = true }: PropBase) {
  const w = size;
  const h = size * 0.5;
  return (
    <div className={cn("relative", float && "animate-lh-tilt-float", className)} style={{ width: w, height: h, transform: "rotate(-18deg)", ...style }} aria-hidden>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: h,
          background: "linear-gradient(180deg, rgba(216,236,128,0.95), rgba(135,157,66,0.95))",
          boxShadow: "inset 0 4px 8px rgba(255,255,255,0.6), inset 0 -6px 12px rgba(63,79,24,0.4), 0 14px 28px -12px rgba(95,113,42,0.5)",
        }}
      >
        {/* highlight */}
        <div className="absolute left-[8%] top-[20%] h-[30%] w-[60%] rounded-full bg-white/55 blur-[2px]" />
        {/* seam */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-black/15" />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Colour swatch fan
   ──────────────────────────────────────────── */

export function ColorSwatch({ size = 150, className, style, float = true }: PropBase) {
  const shades = ["#5F712A", "#7E9636", "#A5BA5F", "#C8E25E", "#E4EEC8"];
  return (
    <div className={cn("relative", float && "animate-lh-tilt-float", className)} style={{ width: size, height: size * 0.7, ...style }} aria-hidden>
      {shades.map((c, i) => (
        <div
          key={c}
          className="absolute bottom-0 left-1/2 origin-bottom rounded-xl shadow-lg"
          style={{
            width: size * 0.26,
            height: size * 0.62,
            background: `linear-gradient(180deg, ${c}, ${c}cc)`,
            transform: `translateX(-50%) rotate(${(i - 2) * 16}deg)`,
            transformOrigin: "bottom center",
            border: "2px solid rgba(255,255,255,0.6)",
            zIndex: i,
          }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Resolver — pick a prop by name
   ──────────────────────────────────────────── */

export type PropName =
  | "bottle"
  | "jar"
  | "droplet"
  | "leaf"
  | "molecule"
  | "pipette"
  | "petri"
  | "dna"
  | "orb"
  | "rack";

export function CosmeticProp({
  name,
  ...rest
}: PropBase & { name: PropName }) {
  switch (name) {
    case "bottle":
      return <SerumBottle {...rest} />;
    case "jar":
      return <CreamJar {...rest} />;
    case "droplet":
      return <Droplet3D {...rest} />;
    case "leaf":
      return <Leaf3D {...rest} />;
    case "molecule":
      return <Molecule3D {...rest} />;
    case "pipette":
      return <Pipette {...rest} />;
    case "petri":
      return <PetriDish {...rest} />;
    case "dna":
      return <DnaHelix {...rest} />;
    case "orb":
      return <IngredientOrb {...rest} />;
    case "rack":
      return <TestTubeRack {...rest} />;
    default:
      return null;
  }
}
