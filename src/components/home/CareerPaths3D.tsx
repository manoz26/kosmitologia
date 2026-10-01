"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CareerPaths3D — scroll-driven "rising platform" of 3D flip cards
   ──────────────────────────────────────────────────────────────────────────
   Career destinations live on a 3D platform that is tilted away from the
   viewer. As the section scrolls up into view the whole platform *rises and
   levels out* (rotateX → 0) while each card lifts from depth with a stagger —
   a motion deliberately different from the horizontal cover-flow used for the
   faculty. Each card keeps its signature hover/focus flip to reveal concrete
   roles and hiring sectors. Live data from @/data/careers, re-tinted to λαχανί.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, Rotate3d } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { careerPaths, careerStats, type CareerPath } from "@/data/careers";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { useReduced } from "./lib/hooks";
import { partners, type IconKey } from "./lib/data";

/* «Εκεί που βρίσκουν δουλειά» — the list the department kept (01/10/2026),
   split into sectors and education. Named employers are pending from the
   client (docs/email-pros-pelati.md) — never invent company names here. */
const EDUCATION = new Set(["ΑΠΘ", "ΠΑΔΑ", "UNIC", "ΙΕΚ & ΚΔΒΜ"]);
const workSectors = partners.filter((p) => !EDUCATION.has(p));
const workEducation = partners.filter((p) => EDUCATION.has(p));

const CAREER_ICON: Record<string, IconKey> = {
  "flask-conical": "flask",
  factory: "factory",
  "heart-handshake": "heart-handshake",
  rocket: "rocket",
  "graduation-cap": "graduation",
};

/* Re-tint every theme to a λαχανί shade so nothing clashes with the canvas. */
const THEME: Record<CareerPath["colorTheme"], { from: string; to: string; accent: string }> = {
  blue: { from: "#5E9A4E", to: "#9FCB4C", accent: "#5E9A4E" },
  green: { from: "#7E9636", to: "#B9D84A", accent: "#879D42" },
  emerald: { from: "#3E7A4E", to: "#7FC79A", accent: "#3E9466" },
  indigo: { from: "#6E7C1E", to: "#C8E25E", accent: "#9DAE2E" },
  slate: { from: "#5F712A", to: "#A5BA5F", accent: "#5F712A" },
};

function FlipCard({ path, index }: { path: CareerPath; index: number }) {
  const theme = THEME[path.colorTheme];
  const iconKey = CAREER_ICON[path.icon] ?? "rocket";
  const grad = (deg: number) => `linear-gradient(${deg}deg, ${theme.from}, ${theme.to})`;
  return (
    <div className="group h-[27rem] [perspective:1600px]" tabIndex={0}>
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        {/* Front — what the path is + its typical roles */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl glass-lachani p-6 shadow-[0_18px_40px_-24px_rgba(63,82,22,0.45)] [backface-visibility:hidden]">
          <div aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: grad(90) }} />
          <div className="flex items-start justify-between">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ background: grad(140) }}
            >
              <Icon name={iconKey} size={24} />
            </div>
            <span className="font-heading text-3xl font-black tabular-nums text-ihu-green-dark/15">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-text-primary">{path.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">{path.shortDescription}</p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">Ενδεικτικοί ρόλοι</p>
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: theme.accent }}>
                <Rotate3d size={13} /> Γύρισε
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {path.roles.map((role) => (
                <span key={role} className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-text-primary ring-1 ring-ihu-green-dark/10">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back — the skills it needs and where the jobs are */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ background: grad(150) }}
        >
          <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/15 blur-md animate-lh-sheen" />
          <h3 className="font-heading text-lg font-bold">{path.title}</h3>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/75">Δεξιότητες</p>
          <ul className="mt-2 space-y-1.5">
            {path.skills.map((skill) => (
              <li key={skill} className="flex items-center gap-2 text-sm font-medium">
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-white/80" /> {skill}
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-white/75">Τομείς απασχόλησης</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {path.opportunities.map((opp) => (
              <span key={opp} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium ring-1 ring-white/25">
                {opp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkGroup({
  title,
  items,
  icon: IconCmp,
}: {
  title: string;
  items: string[];
  icon: typeof Building2;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ihu-green-dark">{title}</p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {items.map((p) => (
          <li
            key={p}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-3.5 py-2 text-sm font-semibold text-text-primary ring-1 ring-ihu-green-dark/10"
          >
            <IconCmp size={15} className="text-ihu-green-dark" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Per-card lift: each tile rises out of depth with a stagger ── */
function CardRiser({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const start = (index / total) * 0.4;
  const end = start + 0.55;
  const z = useTransform(progress, [start, end], [-260, 0], { clamp: true });
  const y = useTransform(progress, [start, end], [70, 0], { clamp: true });
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.3)], [0, 1], { clamp: true });
  return (
    <motion.div style={{ z, y, opacity }} className="[transform-style:preserve-3d] will-change-transform">
      {children}
    </motion.div>
  );
}

export function CareerPaths3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  // the whole platform tilts up from a raked angle to flat
  const rotateX = useTransform(smooth, [0, 1], reduced ? [0, 0] : [32, 0]);
  const platformY = useTransform(smooth, [0, 1], reduced ? [0, 0] : [60, 0]);
  const platformOpacity = useTransform(smooth, [0, 0.4], [reduced ? 1 : 0.2, 1]);

  return (
    <section id="karieres" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Καριέρα"
          labelIcon="trending"
          title="Πέντε μονοπάτια"
          highlight="σταδιοδρομίας"
          description="Το προφίλ των αποφοίτων μας αντιστοιχεί σε σύγχρονα, άρτια εκπαιδευμένα στελέχη — έτοιμα για τον ιδιωτικό και τον δημόσιο τομέα."
        />

        {/* the raked 3D platform */}
        <div ref={ref} className="mt-16 [perspective:1500px] [perspective-origin:50%_0%]">
          <motion.div
            style={{ rotateX, y: platformY, opacity: platformOpacity, transformOrigin: "50% 15%" }}
            className="grid grid-cols-1 gap-6 [transform-style:preserve-3d] sm:grid-cols-2 lg:grid-cols-3"
          >
            {careerPaths.map((path, i) => (
              <CardRiser key={path.id} progress={smooth} index={i} total={careerPaths.length + 1}>
                <FlipCard path={path} index={i} />
              </CardRiser>
            ))}

            {/* Sixth tile: the career numbers (15+ / 12+) and the way in */}
            <CardRiser progress={smooth} index={careerPaths.length} total={careerPaths.length + 1}>
              <div className="flex h-[27rem] flex-col justify-center rounded-3xl glass-lachani-deep p-8 text-center">
                <dl className="grid grid-cols-2 gap-4">
                  {careerStats
                    .filter((s) => s.suffix === "+")
                    .map((s) => (
                      <div key={s.label}>
                        <dd className="font-heading text-4xl font-extrabold text-ihu-green-dark">
                          {s.value}
                          {s.suffix}
                        </dd>
                        <dt className="mt-1 text-xs leading-snug text-text-secondary">{s.label}</dt>
                      </div>
                    ))}
                </dl>
                <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                  Ρόλοι σε Ε&Α, βιομηχανία, κλινική πράξη και αγορά, σε κλάδους εργοδοτών με τους οποίους συνεργάζεται το πρόγραμμα.
                </p>
                <Link
                  href="/eggrafes"
                  className="group mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
                >
                  Κάνε αίτηση
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </CardRiser>
          </motion.div>
        </div>

        {/* Where graduates work */}
        <Reveal direction="up">
          <div className="mx-auto mt-14 max-w-5xl rounded-3xl glass-lachani-deep p-6 md:p-8">
            <h3 className="font-heading text-xl font-extrabold text-text-primary md:text-2xl">
              Πού εργάζονται οι απόφοιτοι
            </h3>
            <div className="mt-5 grid gap-6 md:grid-cols-[1.6fr_1fr]">
              <WorkGroup title="Κλάδοι" items={workSectors} icon={Building2} />
              <WorkGroup title="Εκπαίδευση & έρευνα" items={workEducation} icon={GraduationCap} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CareerPaths3D;
