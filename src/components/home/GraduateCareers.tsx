"use client";

/* ══════════════════════════════════════════════════════════════════════════
   GraduateCareers — «Επαγγελματική αποκατάσταση»
   ──────────────────────────────────────────────────────────────────────────
   One degree, five directions. The programme sits in the middle as a glowing
   compass and the five career directions the department listed (01/10/2026)
   form a horseshoe of equal cards around it: left, lower-left, below,
   lower-right, right. The old bento made the first direction a giant
   deep-green tile, and the client found it confusing (06/10/2026) — here no
   card outranks another; the only thing that stands out is the degree.

   Desktop (lg+): light traces run from the compass to every card, drawn in
   as the section arrives. A beam on the compass ring swings to the active
   card — the one under the pointer, or each in turn, sweeping the horseshoe
   while the section is on screen — its trace brightens and pulses travel
   down it. The traces are measured from the real layout (offset* metrics,
   which ignore the cards' tilt/entrance transforms), so they meet the cards
   at any width.
   Phones/tablets: the compass on top, the cards in one column on a single
   trunk line. No traces, no auto-sweep; touch devices never run the pulses.
   Reduced motion: everything is drawn, nothing moves on its own.

   Data: src/data/careers.ts (employerGroups, 5 groups — the horseshoe has
   exactly five places). Sectors only; no company names until the client
   approves them (docs/email-pros-pelati.md, q.19).
   ══════════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

import { careerPaths, careerStats, employerGroups, type EmployerGroup } from "@/data/careers";
import { program } from "@/data/program";
import { isTouchDevice } from "@/lib/perf";
import { cn } from "@/lib/utils";
import { Icon, Reveal, SectionHeading, TiltCard } from "./lib/primitives";
import { useMounted, useReduced } from "./lib/hooks";

const rolesOf = (g: EmployerGroup) => careerPaths.find((p) => p.id === g.pathId)?.roles.slice(0, 2) ?? [];

const stats = careerStats.filter((s) => s.suffix === "+");

/* The horseshoe, in card order. `angle` is where the card sits as seen from
   the compass — screen degrees, 0° = east, clockwise (y points down). */
const SLOTS = [
  { angle: 180, place: "lg:col-start-1 lg:row-start-1" },
  { angle: 135, place: "lg:col-start-1 lg:row-start-2" },
  { angle: 90, place: "lg:col-start-2 lg:row-start-2" },
  { angle: 45, place: "lg:col-start-3 lg:row-start-2" },
  { angle: 0, place: "lg:col-start-3 lg:row-start-1" },
] as const;

/* The auto-sweep visits the cards like a pendulum: 01 → 05 → 01. */
const SWEEP = [0, 1, 2, 3, 4, 3, 2, 1];
const SWEEP_MS = 2600;
/* Where the beam rests before anything is active: straight down. */
const REST_ANGLE = 90;

const LIME = "#C8E25E";
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Signed turn in (-180°, 180°] that takes angle `from` to angle `to`. */
function shortestTurn(from: number, to: number): number {
  const m = (((to - from) % 360) + 360) % 360;
  return m > 180 ? m - 360 : m;
}

/* ────────────────────────────────────────────
   Geometry of the traces
   ──────────────────────────────────────────── */

interface Pt {
  x: number;
  y: number;
}
interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
  cx: number;
  cy: number;
}
interface Trace {
  d: string;
  start: Pt;
  end: Pt;
  len: number;
}
interface Geometry {
  w: number;
  h: number;
  traces: Trace[];
}

/* Layout box relative to the stage. offset* metrics skip transforms, so the
   cards' entrance slide and 3D tilt never bend a trace. */
function boxOf(el: HTMLElement): Box {
  const left = el.offsetLeft;
  const top = el.offsetTop;
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  return { left, top, right: left + w, bottom: top + h, cx: left + w / 2, cy: top + h / 2 };
}

/* A polyline whose corners are rounded with quadratic curves. */
function roundedPath(points: Pt[], radius: number): { d: string; len: number } {
  const pts = points.filter((p, i) => i === 0 || Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y) > 0.5);
  const f = (n: number) => n.toFixed(1);
  let d = `M ${f(pts[0].x)} ${f(pts[0].y)}`;
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const [a, b, c] = [pts[i - 1], pts[i], pts[i + 1]];
    const l1 = Math.hypot(b.x - a.x, b.y - a.y);
    const l2 = Math.hypot(c.x - b.x, c.y - b.y);
    const r = Math.min(radius, l1 / 2, l2 / 2);
    const p = { x: b.x - ((b.x - a.x) / l1) * r, y: b.y - ((b.y - a.y) / l1) * r };
    const q = { x: b.x + ((c.x - b.x) / l2) * r, y: b.y + ((c.y - b.y) / l2) * r };
    d += ` L ${f(p.x)} ${f(p.y)} Q ${f(b.x)} ${f(b.y)} ${f(q.x)} ${f(q.y)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${f(last.x)} ${f(last.y)}`;
  return { d, len };
}

/* Traces leave the compass ring at each card's angle. The two side cards
   are reached straight across; the three lower ones drop into the corridor
   between the rows and turn into the top of their card, like circuit traces. */
function computeTraces(hub: Pt, ringR: number, hubBottom: number, boxes: Box[]): Trace[] {
  const GAP = 8;
  const STUB = 16;
  const RADIUS = 22;
  const exit = (deg: number): Pt => ({
    x: hub.x + ringR * Math.cos((deg * Math.PI) / 180),
    y: hub.y + ringR * Math.sin((deg * Math.PI) / 180),
  });
  const rowBottom = Math.max(hubBottom, boxes[0].bottom, boxes[4].bottom);
  const rowTop = Math.min(boxes[1].top, boxes[2].top, boxes[3].top);
  const corridor = (rowBottom + rowTop) / 2;
  const sideY = (b: Box) => Math.min(b.bottom - 28, Math.max(b.top + 28, hub.y));

  return SLOTS.map((slot, i) => {
    const b = boxes[i];
    const s = exit(slot.angle);
    let pts: Pt[];
    if (slot.angle === 180 || slot.angle === 0) {
      const e = { x: slot.angle === 180 ? b.right + GAP : b.left - GAP, y: sideY(b) };
      const mid = (s.x + e.x) / 2;
      pts = [s, { x: mid, y: s.y }, { x: mid, y: e.y }, e];
    } else {
      const e = { x: b.cx, y: b.top - GAP };
      const dir = Math.round(Math.cos((slot.angle * Math.PI) / 180) * 10) / 10;
      const stub = dir === 0 ? s : { x: s.x + Math.sign(dir) * STUB, y: s.y + STUB };
      pts = [s, stub, { x: stub.x, y: corridor }, { x: e.x, y: corridor }, e];
    }
    const { d, len } = roundedPath(pts, RADIUS);
    return { d, len, start: s, end: pts[pts.length - 1] };
  });
}

/* ────────────────────────────────────────────
   The compass — the degree at the centre
   ──────────────────────────────────────────── */

/* A soft lime wedge; rotated so its middle points at the active card. */
const BEAM =
  "conic-gradient(from -30deg, rgba(185,216,74,0) 0deg, rgba(185,216,74,1) 30deg, rgba(185,216,74,0) 60deg, transparent 60deg)";
/* Strongest on the dial's rim band, fading into the core and past the rim. */
const BEAM_FADE = "radial-gradient(circle, transparent 50%, #000 64%, #000 88%, transparent 100%)";

function Compass({
  ringRef,
  rotation,
  activeIndex,
  reduced,
}: {
  ringRef: React.Ref<HTMLDivElement>;
  rotation: number;
  activeIndex: number | null;
  reduced: boolean;
}) {
  const accent = activeIndex === null ? null : employerGroups[activeIndex].accent;
  return (
    <div ref={ringRef} className="relative h-52 w-52 lg:h-60 lg:w-60">
      {/* halo — still */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,226,94,0.5) 0%, rgba(200,226,94,0.16) 40%, rgba(200,226,94,0) 68%)",
        }}
      />
      {/* glass dial */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-white/40 shadow-[inset_0_0_0_1px_rgba(95,113,42,0.18),0_34px_70px_-34px_rgba(63,82,22,0.6)] backdrop-blur-[3px]"
      />
      {/* graduations */}
      <svg aria-hidden viewBox="0 0 240 240" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 72 }, (_, i) => (
          <line
            key={i}
            x1="120"
            y1="5"
            x2="120"
            y2={i % 6 === 0 ? 14 : 9.5}
            stroke="rgba(95,113,42,0.3)"
            strokeWidth={i % 6 === 0 ? 1.4 : 0.8}
            transform={`rotate(${i * 5} 120 120)`}
          />
        ))}
      </svg>
      {/* the beam */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{ rotate: rotation }}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 15, mass: 0.9 }}
        style={{ background: BEAM, maskImage: BEAM_FADE, WebkitMaskImage: BEAM_FADE }}
      />
      {/* slowly turning orbit */}
      <div
        aria-hidden
        className="absolute inset-[20px] rounded-full border border-dashed border-ihu-green-dark/25 motion-safe:animate-[spin_50s_linear_infinite]"
      />
      {/* where the traces leave the ring */}
      {SLOTS.map((slot, i) => {
        const on = i === activeIndex;
        const rad = (slot.angle * Math.PI) / 180;
        return (
          <span
            key={slot.angle}
            aria-hidden
            className="absolute h-2.5 w-2.5 rounded-full bg-white transition-all duration-500"
            style={{
              left: `${50 + 50 * Math.cos(rad)}%`,
              top: `${50 + 50 * Math.sin(rad)}%`,
              transform: `translate(-50%, -50%) scale(${on ? 1.5 : 1})`,
              boxShadow: on
                ? `0 0 0 2px ${employerGroups[i].accent}, 0 0 16px 4px ${LIME}`
                : "0 0 0 2px rgba(95,113,42,0.35)",
            }}
          />
        );
      })}
      {/* the core */}
      <div
        className="absolute inset-[38px] flex flex-col items-center justify-center rounded-full bg-white text-center ring-1 ring-ihu-green-dark/10 transition-shadow duration-700 lg:inset-[44px]"
        style={{
          boxShadow: accent
            ? `0 18px 40px -20px rgba(63,82,22,0.6), 0 0 0 6px ${accent}1f`
            : "0 18px 40px -20px rgba(63,82,22,0.6)",
        }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg lg:h-11 lg:w-11">
          <GraduationCap size={21} />
        </span>
        <span className="mt-2 font-heading text-[15px] font-extrabold leading-tight text-text-primary">
          Κοσμητολογία
        </span>
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ihu-green">
          ΠΜΣ · {program.ects.value} ECTS
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   A career direction — every card the same
   ──────────────────────────────────────────── */

function CareerCard({ group, index, active }: { group: EmployerGroup; index: number; active: boolean }) {
  const grad = (deg: number) => `linear-gradient(${deg}deg, ${group.from}, ${group.to})`;
  return (
    <TiltCard
      max={6}
      className="h-full rounded-3xl transition-shadow duration-500"
      innerClassName="h-full rounded-3xl glass-lachani"
      style={{ boxShadow: active ? `0 30px 60px -30px ${group.accent}` : "0 0 0 0 transparent" }}
    >
      <div className="relative flex h-full flex-col p-6">
        <div aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: grad(90) }} />
        {/* the active card's glow — inside the rounded clip */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500"
          style={{
            opacity: active ? 1 : 0,
            boxShadow: `inset 0 0 0 2px ${group.accent}70, inset 0 0 46px -14px ${group.accent}59`,
          }}
        />

        <div className="flex items-start justify-between">
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500",
              active && "-rotate-6 scale-110",
            )}
            style={{ background: grad(140) }}
          >
            <Icon name={group.icon} size={21} />
          </span>
          <span
            className="font-heading text-[1.75rem] font-black leading-none tabular-nums transition-colors duration-500"
            style={{ color: active ? `${group.accent}cc` : "rgba(95,113,42,0.15)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-text-primary">{group.title}</h3>

        <ul className="mt-4 divide-y divide-ihu-green-dark/10 border-y border-ihu-green-dark/10">
          {group.sectors.map((s) => (
            <li key={s} className="flex items-center gap-3 py-2 text-[13.5px] font-semibold text-text-primary">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: group.accent }} />
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {rolesOf(group).map((role) => (
            <span
              key={role}
              className="rounded-full bg-lachani-mist/80 px-2.5 py-1 text-[11px] font-semibold text-ihu-green-dark ring-1 ring-ihu-green-dark/10"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

/* ────────────────────────────────────────────
   The traces (desktop)
   ──────────────────────────────────────────── */

function Pulse({
  d,
  dur,
  delay,
  color,
  bright,
}: {
  d: string;
  dur: number;
  delay: number;
  color: string;
  bright: boolean;
}) {
  return (
    <g opacity={0}>
      <circle r={bright ? 10 : 7} fill={color} opacity={bright ? 0.35 : 0.25} />
      <circle r={bright ? 3.4 : 2.6} fill="#fff" />
      <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.12;0.82;1"
        dur={`${dur}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </g>
  );
}

function Traces({
  geo,
  activeIndex,
  drawn,
  running,
}: {
  geo: Geometry;
  activeIndex: number | null;
  drawn: boolean;
  running: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
    >
      <defs>
        {geo.traces.map((t, i) => (
          <linearGradient
            key={i}
            id={`${uid}-g${i}`}
            gradientUnits="userSpaceOnUse"
            x1={t.start.x}
            y1={t.start.y}
            x2={t.end.x}
            y2={t.end.y}
          >
            <stop offset="0" stopColor={LIME} />
            <stop offset="1" stopColor={employerGroups[i].accent} />
          </linearGradient>
        ))}
      </defs>

      {geo.traces.map((t, i) => {
        const on = i === activeIndex;
        const accent = employerGroups[i].accent;
        const dur = Math.min(3, Math.max(1.2, t.len / 150));
        return (
          <g key={i}>
            {/* the bed */}
            <path d={t.d} fill="none" stroke="rgba(95,113,42,0.13)" strokeWidth={2} strokeLinecap="round" />
            {/* glow under the active trace */}
            <path
              d={t.d}
              fill="none"
              stroke={accent}
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: on ? 0.2 : 0, transition: "opacity 0.5s ease" }}
            />
            {/* the trace, drawn in as the section arrives */}
            <motion.path
              d={t.d}
              fill="none"
              stroke={`url(#${uid}-g${i})`}
              strokeWidth={on ? 3 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? (on ? 1 : 0.6) : 0 }}
              transition={{
                pathLength: { duration: 1.1, delay: drawn ? 0.3 + i * 0.12 : 0, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.45 },
              }}
            />
            {/* where it meets the card */}
            <circle
              cx={t.end.x}
              cy={t.end.y}
              r={4}
              fill="#fff"
              stroke={accent}
              strokeWidth={2}
              style={{ opacity: drawn ? 1 : 0, transition: `opacity 0.4s ease ${0.9 + i * 0.12}s` }}
            />
            {running && drawn && (
              <>
                <Pulse d={t.d} dur={dur} delay={0.4 + i * 0.37} color={accent} bright={on} />
                {on && <Pulse d={t.d} dur={dur} delay={0.4 + i * 0.37 + dur / 2} color={LIME} bright />}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ────────────────────────────────────────────
   The stage: compass + horseshoe
   ──────────────────────────────────────────── */

function CareerCompass() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const reduced = useReduced();
  const mounted = useMounted();
  const drawn = useInView(stageRef, { once: true, amount: 0.2 });
  const onScreen = useInView(stageRef, { amount: 0.15 });

  const [geo, setGeo] = useState<Geometry | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  /* Measure the real layout; only the desktop horseshoe has traces. */
  const measure = useCallback(() => {
    const stage = stageRef.current;
    const hub = hubRef.current;
    const ring = ringRef.current;
    const cards = cardRefs.current;
    if (!stage || !hub || !ring || cards.length < SLOTS.length || cards.some((c) => !c)) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      setGeo(null);
      return;
    }
    const hubBox = boxOf(hub);
    const traces = computeTraces(
      { x: hubBox.cx, y: hubBox.cy },
      ring.offsetWidth / 2,
      hubBox.bottom,
      cards.map((c) => boxOf(c as HTMLElement)),
    );
    const next = { w: stage.offsetWidth, h: stage.offsetHeight, traces };
    setGeo((prev) =>
      prev && prev.w === next.w && prev.h === next.h && prev.traces.every((t, i) => t.d === next.traces[i].d)
        ? prev
        : next,
    );
  }, []);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure, { passive: true });
    /* Web fonts change the card heights once they arrive. */
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const touch = mounted && isTouchDevice();
  const running = geo !== null && onScreen && !reduced && !touch;

  /* The sweep — paused while a card is under the pointer. */
  useEffect(() => {
    if (!running || hovered !== null) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % SWEEP.length), SWEEP_MS);
    return () => window.clearInterval(id);
  }, [running, hovered]);

  const activeIndex = hovered ?? (running ? SWEEP[step] : null);

  /* The beam turns the short way round, so the rotation stays unwrapped:
     each new target is the previous rotation plus the shortest turn
     (adjusting state while rendering — no effect, no extra frame). */
  const [rotation, setRotation] = useState(REST_ANGLE + 90);
  const turn = shortestTurn(rotation, (activeIndex === null ? REST_ANGLE : SLOTS[activeIndex].angle) + 90);
  if (turn !== 0) setRotation(rotation + turn);

  const leave = (i: number) => {
    /* Carry on the sweep from the card the visitor just left. */
    const at = SWEEP.indexOf(i);
    if (at >= 0) setStep(at);
    setHovered(null);
  };

  return (
    <div
      ref={stageRef}
      className="relative mx-auto mt-16 flex max-w-xl flex-col items-center gap-12 lg:mt-20 lg:grid lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-x-8 lg:gap-y-14"
    >
      {/* a field of dots around the compass — still */}
      <div
        aria-hidden
        className="home-dots pointer-events-none absolute -inset-x-10 -top-10 bottom-0 hidden lg:block"
        style={{
          maskImage: "radial-gradient(circle at 50% 24%, #000 0%, transparent 46%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 24%, #000 0%, transparent 46%)",
        }}
      />

      {geo &&<Traces geo={geo} activeIndex={activeIndex} drawn={drawn} running={running} />}

      <div ref={hubRef} className="relative z-10 flex items-center justify-center lg:col-start-2 lg:row-start-1">
        <Reveal direction="zoom" duration={0.8}>
          <Compass ringRef={ringRef} rotation={rotation} activeIndex={activeIndex} reduced={reduced} />
        </Reveal>
      </div>

      <ul role="list" className="contents">
        {employerGroups.slice(0, SLOTS.length).map((group, i) => (
          <li
            key={group.pathId}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && leave(i)}
            className={cn("relative z-10 w-full", SLOTS[i].place)}
          >
            {/* small screens: a trunk segment in the gap above, with its node —
                drawn in the gaps only, so it never shows through a card */}
            <span
              aria-hidden
              className="absolute -top-12 left-1/2 h-12 w-0.5 -translate-x-1/2 bg-gradient-to-b from-lachani-bright to-ihu-green/45 lg:hidden"
            />
            <span
              aria-hidden
              className="absolute -top-[30px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow ring-2 ring-ihu-green lg:hidden"
            />
            <Reveal direction="up" delay={0.15 + i * 0.1} className="h-full">
              <CareerCard group={group} index={i} active={i === activeIndex} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GraduateCareers() {
  return (
    <section id="apofoitoi" className="relative w-full overflow-hidden py-24 md:py-28">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Καριέρα"
          labelIcon="briefcase"
          title="Επαγγελματική"
          highlight="αποκατάσταση"
          description="Πέντε κατευθύνσεις, από τη βιομηχανία και την έρευνα έως την κλινική πράξη και την επιχειρηματικότητα."
        />

        <CareerCompass />

        {/* The two numbers the department kept + the way to the full paths */}
        <Reveal delay={0.1} direction="up" className="mt-10 lg:mt-12">
          <div className="flex flex-col items-start justify-between gap-6 edge-top glass-lachani-deep px-6 py-5 md:flex-row md:items-center md:px-9">
            <dl className="flex items-center gap-8 sm:gap-10">
              {stats.map((s, i) => (
                <div key={s.label} className={cn("flex items-center gap-3", i > 0 && "border-l border-ihu-green-dark/15 pl-8 sm:pl-10")}>
                  <dd className="font-heading text-3xl font-extrabold tabular-nums text-ihu-green-dark">
                    {s.value}
                    {s.suffix}
                  </dd>
                  <dt className="max-w-[7rem] text-xs font-semibold leading-snug text-text-secondary">{s.label}</dt>
                </div>
              ))}
            </dl>
            <Link
              href="/programma#karieres"
              className="group inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
            >
              Μονοπάτια σταδιοδρομίας
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default GraduateCareers;
