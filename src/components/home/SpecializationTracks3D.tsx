"use client";

/* ══════════════════════════════════════════════════════════════════════════
   SpecializationTracks3D — "Ένα πρόγραμμα, δύο ειδικεύσεις"
   ──────────────────────────────────────────────────────────────────────────
   The flagship, scroll-driven view of the curriculum that makes the TWO
   specialisations unmistakable. A central rail fills with scroll: shared
   (core) courses sit centred on it, while at each semester the path forks
   left (Παρασκευή & Αξιολόγηση) and right (Εφαρμογές στη Δερματολογία) into a
   pair of specialisation-only courses, then merges again for the thesis.

   Every course is a button → opens a modal with the full, verified record from
   the official study guide: περίληψη, περιεχόμενο, διδάσκοντες, βιβλιογραφία,
   μαθησιακά αποτελέσματα και τρόπος αξιολόγησης.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  curriculum,
  specializations,
  getSpecializationCourses,
  getSpecializationEcts,
  type Course,
} from "@/data/courses";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { Aurora, GlowOrb } from "./lib/decorations";
import type { IconKey } from "./lib/data";
import { useReduced } from "./lib/hooks";

/* Map the course icon strings onto the shared IconKey set. */
const COURSE_ICON: Record<string, IconKey> = {
  search: "search",
  microscope: "microscope",
  briefcase: "briefcase",
  "flask-conical": "flask",
  sparkles: "sparkles",
  leaf: "leaf",
  scale: "scale",
  "test-tubes": "test-tubes",
  "heart-pulse": "heart-pulse",
  apple: "apple",
  "graduation-cap": "graduation",
};

const SEM_LABEL: Record<number, string> = { 1: "Α' Εξάμηνο", 2: "Β' Εξάμηνο", 3: "Γ' Εξάμηνο" };
const SEM_NUMERAL: Record<number, string> = { 1: "Α", 2: "Β", 3: "Γ" };

const CORE_FROM = "#6E7C1E";
const CORE_TO = "#B9D84A";
const CORE_ACCENT = "#5F712A";

function iconOf(course: Course): IconKey {
  return COURSE_ICON[course.icon] ?? "sparkles";
}

function specMeta(id: "preparation" | "dermatology") {
  return specializations.find((s) => s.id === id)!;
}

/* ────────────────────────────────────────────
   Shared (core) course card — centred on the rail
   ──────────────────────────────────────────── */

function SharedCard({ course, onOpen }: { course: Course; onOpen: (c: Course) => void }) {
  return (
    <Reveal direction="up" className="relative mx-auto w-full max-w-xl">
      <button
        onClick={() => onOpen(course)}
        className="group relative flex w-full items-center gap-4 overflow-hidden rounded-3xl glass-lachani px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:ring-1 hover:ring-ihu-green/30 md:px-6"
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow"
          style={{ background: `linear-gradient(140deg, ${CORE_FROM}, ${CORE_TO})` }}
        >
          <Icon name={iconOf(course)} size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ihu-green/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ihu-green-dark">
              {course.code}
            </span>
            <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-bold text-ihu-green-dark">
              {course.ects} ECTS
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-ihu-green-dark/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              <Icon name="check" size={11} /> Κοινό
            </span>
          </div>
          <h4 className="mt-1 font-heading text-[15px] font-bold leading-snug text-text-primary">{course.nameGr}</h4>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ihu-green text-white shadow transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-lg leading-none">›</span>
        </span>
      </button>
    </Reveal>
  );
}

/* ────────────────────────────────────────────
   Specialisation (fork) course card — offset lane
   ──────────────────────────────────────────── */

function ForkCard({
  course,
  side,
  onOpen,
}: {
  course: Course;
  side: "preparation" | "dermatology";
  onOpen: (c: Course) => void;
}) {
  const meta = specMeta(side);
  return (
    <Reveal direction={side === "preparation" ? "left" : "right"} className="h-full">
      <button
        onClick={() => onOpen(course)}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] glass-lachani text-left transition-all duration-300 hover:-translate-y-1"
        style={{ boxShadow: `0 22px 55px -30px ${meta.glow}` }}
      >
        {/* accent header band */}
        <div className="relative overflow-hidden p-5" style={{ background: `linear-gradient(140deg, ${meta.from}, ${meta.to})` }}>
          <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/25 blur-md opacity-0 transition-opacity duration-700 group-hover:animate-lh-sheen group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md">
              <Icon name={iconOf(course)} size={20} />
            </span>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-black/20 px-2 text-xs font-black text-white backdrop-blur-md">
              {meta.numeral}
            </span>
          </div>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/85">
            Μόνο στην Ειδίκευση {meta.numeral}
          </p>
        </div>
        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ihu-green/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ihu-green-dark">
              {course.code}
            </span>
            <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-bold text-ihu-green-dark">
              {course.ects} ECTS
            </span>
          </div>
          <h4 className="mt-2 font-heading text-[15px] font-bold leading-snug text-text-primary">{course.nameGr}</h4>
          <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-text-secondary">{course.description}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold" style={{ color: meta.accent }}>
            Δείτε το μάθημα
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </button>
    </Reveal>
  );
}

/* ────────────────────────────────────────────
   Fork block — the moment the two paths diverge
   ──────────────────────────────────────────── */

function ForkBlock({
  prep,
  derm,
  onOpen,
}: {
  prep: Course;
  derm: Course;
  onOpen: (c: Course) => void;
}) {
  const a = specMeta("preparation");
  const b = specMeta("dermatology");
  return (
    <div className="relative">
      {/* divergence label + splitter */}
      <Reveal direction="up" className="relative z-10 mx-auto mb-6 flex w-fit flex-col items-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ihu-green-dark shadow-lg ring-1 ring-ihu-green-dark/10">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20V12" />
            <path d="M12 12C12 8 9 6 5 5" />
            <path d="M12 12C12 8 15 6 19 5" />
          </svg>
        </span>
        <span className="mt-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ihu-green-dark ring-1 ring-ihu-green-dark/10 backdrop-blur-md">
          Εδώ διαφοροποιείται η ειδίκευση
        </span>
      </Reveal>

      {/* the two diverging lanes */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
        {/* left rail decoration */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 right-3 hidden h-8 w-16 md:block"
            style={{
              borderRight: `2px solid ${a.accent}`,
              borderTop: `2px solid ${a.accent}`,
              borderTopRightRadius: "14px",
              opacity: 0.5,
            }}
          />
          <ForkCard course={prep} side="preparation" onOpen={onOpen} />
        </div>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 left-3 hidden h-8 w-16 md:block"
            style={{
              borderLeft: `2px solid ${b.accent}`,
              borderTop: `2px solid ${b.accent}`,
              borderTopLeftRadius: "14px",
              opacity: 0.5,
            }}
          />
          <ForkCard course={derm} side="dermatology" onOpen={onOpen} />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Semester marker
   ──────────────────────────────────────────── */

function SemesterMarker({ semester, ects }: { semester: number; ects: number }) {
  return (
    <Reveal direction="up" className="relative z-10 mx-auto flex w-fit items-center gap-4">
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl font-heading text-2xl font-black text-white shadow-xl ring-4 ring-[#cfe07f]/40"
        style={{ background: `linear-gradient(140deg, ${CORE_FROM}, ${CORE_TO})` }}
      >
        {SEM_NUMERAL[semester]}
      </span>
      <div>
        <h3 className="font-heading text-xl font-bold text-text-primary">{SEM_LABEL[semester]}</h3>
        <p className="text-sm font-semibold text-ihu-green-dark">{ects} ECTS</p>
      </div>
    </Reveal>
  );
}

/* ────────────────────────────────────────────
   The two-specialisation split banner
   ──────────────────────────────────────────── */

function SplitBanner() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {specializations.map((s, i) => {
          const count = getSpecializationCourses(s.id).length;
          const ects = getSpecializationEcts(s.id);
          return (
            <Reveal key={s.id} direction={i === 0 ? "left" : "right"} className="h-full">
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-[1.8rem] glass-lachani"
                style={{ boxShadow: `0 26px 60px -34px ${s.glow}` }}
              >
                <div className="relative overflow-hidden p-6" style={{ background: `linear-gradient(140deg, ${s.from}, ${s.to})` }}>
                  <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/20 blur-md animate-lh-sheen" />
                  <div className="flex items-center gap-3">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md">
                      <Icon name={s.icon as IconKey} size={26} />
                    </span>
                    <span className="font-heading text-4xl font-black text-white/90">{s.numeral}</span>
                  </div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">Ειδίκευση {s.numeral}</p>
                  <h3 className="mt-1 font-heading text-lg font-bold leading-snug text-white">{s.nameGr}</h3>
                  <p className="mt-1 text-xs italic text-white/80">{s.nameEn}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-text-secondary">{s.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/60 px-3 py-1 text-[11px] font-bold text-ihu-green-dark ring-1 ring-ihu-green-dark/10">
                      {count} μαθήματα
                    </span>
                    <span className="rounded-full bg-white/60 px-3 py-1 text-[11px] font-bold text-ihu-green-dark ring-1 ring-ihu-green-dark/10">
                      {ects} ECTS
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* central fork glyph joining the two */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-ihu-green-dark shadow-xl ring-1 ring-ihu-green-dark/10">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v6" />
            <path d="M12 10c0 4-3 6-7 7" />
            <path d="M12 10c0 4 3 6 7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Course detail modal
   ──────────────────────────────────────────── */

function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  const meta = course.stream === "core" ? null : specMeta(course.stream);
  const from = meta?.from ?? CORE_FROM;
  const to = meta?.to ?? CORE_TO;
  const accent = meta?.accent ?? CORE_ACCENT;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="absolute inset-0 bg-ihu-green-dark/30 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={course.nameGr}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-t-[2rem] glass-lachani-deep shadow-2xl sm:rounded-[2rem]"
      >
        {/* header band */}
        <div className="relative overflow-hidden p-6 md:p-7" style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}>
          <div className="pointer-events-none absolute -inset-y-3 -left-1/3 w-1/2 -skew-x-12 bg-white/20 blur-md animate-lh-sheen" />
          <button
            onClick={onClose}
            aria-label="Κλείσιμο"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur-md transition-colors hover:bg-white/40"
          >
            <X size={18} />
          </button>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md">
            <Icon name={iconOf(course)} size={26} />
          </span>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white/90 backdrop-blur-md">
              {course.code}
            </span>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
              {SEM_LABEL[course.semester]}
            </span>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
              {course.ects} ECTS
            </span>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
              {course.type}
            </span>
          </div>
          <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-white">{course.nameGr}</h3>
          <p className="mt-1 text-sm italic text-white/80">{course.nameEn}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-black/15 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md">
            {course.stream === "core" ? "Κοινό και στις δύο ειδικεύσεις" : `Ειδίκευση ${meta!.numeral} · ${meta!.nameGr}`}
          </p>
        </div>

        {/* scrollable body */}
        <div className="max-h-[calc(92vh-15rem)] overflow-y-auto p-6 md:p-7">
          <p className="text-sm leading-relaxed text-text-secondary">{course.description}</p>

          {course.content && course.content.length > 0 && (
            <Block title="Περιεχόμενο μαθήματος" icon="layers" accent={accent}>
              <ul className="space-y-1.5">
                {course.content.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-text-primary/90">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {course.outcomes && course.outcomes.length > 0 && (
            <Block title="Μαθησιακά αποτελέσματα" icon="target" accent={accent}>
              <ul className="space-y-1.5">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-text-primary/90">
                    <Icon name="check" size={15} className="mt-0.5 shrink-0 text-ihu-green" />
                    {o}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {course.skills && course.skills.length > 0 && (
            <Block title="Δεξιότητες" icon="sparkles" accent={accent}>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((s) => (
                  <span key={s} className="rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-text-primary ring-1 ring-ihu-green-dark/10">
                    {s}
                  </span>
                ))}
              </div>
            </Block>
          )}

          {course.professors && course.professors.length > 0 && (
            <Block title="Διδάσκοντες" icon="users" accent={accent}>
              <div className="flex flex-wrap gap-2">
                {course.professors.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-text-primary ring-1 ring-ihu-green-dark/10">
                    <Icon name="users" size={13} className="text-ihu-green" />
                    {p}
                  </span>
                ))}
              </div>
            </Block>
          )}

          {course.books && course.books.length > 0 && (
            <Block title="Ενδεικτική βιβλιογραφία" icon="book" accent={accent}>
              <ul className="space-y-1.5">
                {course.books.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Icon name="book" size={14} className="mt-0.5 shrink-0 text-ihu-green" />
                    {b}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {course.assessment && (
            <Block title="Τρόπος αξιολόγησης" icon="scale" accent={accent}>
              <p className="text-sm text-text-primary/90">{course.assessment}</p>
            </Block>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({
  title,
  icon,
  accent,
  children,
}: {
  title: string;
  icon: IconKey;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-ihu-green-dark/10 pt-5">
      <p className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>
        <Icon name={icon} size={14} />
        {title}
      </p>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Section
   ──────────────────────────────────────────── */

export function SpecializationTracks3D() {
  const [selected, setSelected] = useState<Course | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReduced();

  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 70%", "end 65%"] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="specializations" className="relative w-full overflow-hidden py-24 md:py-32">
      <Aurora tintA="rgba(216,236,128,0.35)" tintB="rgba(110,180,140,0.3)" />
      <GlowOrb className="left-[-6%] top-40" size={360} color="rgba(165,186,95,0.4)" />
      <GlowOrb className="right-[-8%] top-1/2" size={340} color="rgba(110,180,140,0.35)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Δύο Κατευθύνσεις"
          labelIcon="layers"
          title="Ένα πρόγραμμα,"
          highlight="δύο ειδικεύσεις"
          description="Ξεκινάτε μαζί από έναν κοινό κορμό και, σε κάθε εξάμηνο, ο δρόμος χωρίζει σε δύο ειδικεύσεις. Κυλήστε για να δείτε τη διαδρομή — και πατήστε σε κάθε μάθημα για αναλυτικά στοιχεία."
        />

        {/* two specialisations, side by side */}
        <SplitBanner />

        {/* the branching timeline */}
        <div ref={railRef} className="relative mt-20">
          {/* central rail (behind everything) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden w-1 -translate-x-1/2 rounded-full bg-ihu-green-dark/10 md:block"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden w-1 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-ihu-green-light via-ihu-green to-ihu-green-dark md:block"
            style={{ scaleY: reduced ? 1 : fill, height: "100%" }}
          />

          <div className="relative space-y-16 md:space-y-20">
            {curriculum.map((row) => (
              <div key={row.semester} className="space-y-8">
                <SemesterMarker
                  semester={row.semester}
                  ects={row.shared.reduce((s, c) => s + c.ects, 0) + (row.fork ? row.fork.preparation.ects : 0)}
                />

                {row.shared.length > 0 && (
                  <div className="space-y-4">
                    {row.shared.map((c) => (
                      <SharedCard key={c.code} course={c} onOpen={setSelected} />
                    ))}
                  </div>
                )}

                {row.fork && <ForkBlock prep={row.fork.preparation} derm={row.fork.dermatology} onOpen={setSelected} />}
              </div>
            ))}

            {/* merge note */}
            <Reveal direction="up" className="relative z-10 mx-auto w-fit">
              <p className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-ihu-green-dark ring-1 ring-ihu-green-dark/10 backdrop-blur-md">
                <Icon name="graduation" size={16} />
                …και οι δύο δρόμοι καταλήγουν στη διπλωματική εργασία.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <CourseModal course={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default SpecializationTracks3D;
