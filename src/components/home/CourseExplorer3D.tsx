"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CourseExplorer3D — interactive course browser
   ──────────────────────────────────────────────────────────────────────────
   A filterable, expandable explorer over the full curriculum. Tabs switch
   semester (with a track sub-filter for the 2nd semester), and each course
   card expands to reveal its learning outcomes, skills, teaching staff and
   bibliography — all sourced live from @/data/courses.
   ══════════════════════════════════════════════════════════════════════════ */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { courses, semesters, tracks, type Course } from "@/data/courses";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import type { IconKey } from "./lib/data";

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
  stethoscope: "stethoscope",
  pill: "pill",
  "scan-face": "scan-face",
  "graduation-cap": "graduation",
};

const SEMESTER_THEME: Record<number, { from: string; to: string; accent: string }> = {
  1: { from: "#7E9636", to: "#B9D84A", accent: "#879D42" },
  2: { from: "#5E9A4E", to: "#9FCB4C", accent: "#5E9A4E" },
  3: { from: "#3E7A4E", to: "#7FC79A", accent: "#3E9466" },
};

type TrackFilter = "all" | "preparation" | "dermatology";

/* ── A single expandable course card ── */
function CourseRow({ course, open, onToggle }: { course: Course; open: boolean; onToggle: () => void }) {
  const theme = SEMESTER_THEME[course.semester];
  const iconKey = COURSE_ICON[course.icon] ?? "sparkles";

  return (
    <div className={cn("overflow-hidden rounded-3xl glass-lachani transition-all", open && "ring-1 ring-ihu-green/30")}>
      <button onClick={onToggle} className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6" aria-expanded={open}>
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow"
          style={{ background: `linear-gradient(140deg, ${theme.from}, ${theme.to})` }}
        >
          <Icon name={iconKey} size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ihu-green/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ihu-green-dark">
              {course.code}
            </span>
            <span className="rounded-full bg-white/55 px-2 py-0.5 text-[10px] font-bold text-ihu-green-dark">{course.ects} ECTS</span>
            {course.track && (
              <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: theme.accent }}>
                {course.track === "preparation" ? "Παρασκευή" : "Δερματολογία"}
              </span>
            )}
          </div>
          <h3 className="mt-1 font-heading text-[15px] font-bold leading-snug text-text-primary">{course.nameGr}</h3>
          <p className="truncate text-xs italic text-text-secondary">{course.nameEn}</p>
        </div>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow transition-transform duration-300",
            open ? "rotate-45 bg-ihu-green-dark" : "bg-ihu-green",
          )}
        >
          <Plus size={16} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-ihu-green-dark/10 px-5 py-5 md:px-6">
              <p className="text-sm leading-relaxed text-text-secondary">{course.description}</p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {course.outcomes && course.outcomes.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ihu-green-dark">Μαθησιακά αποτελέσματα</p>
                    <ul className="space-y-1.5">
                      {course.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-2 text-sm text-text-primary/90">
                          <Icon name="check" size={15} className="mt-0.5 shrink-0 text-ihu-green" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {course.skills && course.skills.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ihu-green-dark">Δεξιότητες</p>
                    <ul className="space-y-1.5">
                      {course.skills.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-text-primary/90">
                          <Icon name="target" size={15} className="mt-0.5 shrink-0 text-ihu-green" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {course.professors && course.professors.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ihu-green-dark">Διδάσκοντες</p>
                  <div className="flex flex-wrap gap-2">
                    {course.professors.map((p) => (
                      <span key={p} className="rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-text-primary ring-1 ring-ihu-green-dark/10">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {course.books && course.books.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ihu-green-dark">Ενδεικτική βιβλιογραφία</p>
                  <ul className="space-y-1">
                    {course.books.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-text-secondary">
                        <Icon name="book" size={14} className="mt-0.5 shrink-0 text-ihu-green" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CourseExplorer3D() {
  const [semester, setSemester] = useState<1 | 2 | 3>(1);
  const [track, setTrack] = useState<TrackFilter>("all");
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(() => {
    let result = courses.filter((c) => c.semester === semester);
    if (semester === 2 && track !== "all") result = result.filter((c) => c.track === track);
    return result;
  }, [semester, track]);

  const totalEcts = useMemo(() => list.reduce((sum, c) => sum + c.ects, 0), [list]);

  return (
    <section id="courses" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Αναλυτικά μαθήματα"
          labelIcon="book"
          title="Εξερευνήστε"
          highlight="κάθε μάθημα"
          description="Φιλτράρετε ανά εξάμηνο και κατεύθυνση και ανοίξτε κάθε μάθημα για μαθησιακά αποτελέσματα, δεξιότητες, διδάσκοντες και βιβλιογραφία."
        />

        {/* semester tabs */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {semesters.map((sem) => {
              const isActive = sem.id === semester;
              return (
                <button
                  key={sem.id}
                  onClick={() => {
                    setSemester(sem.id as 1 | 2 | 3);
                    setOpen(null);
                    if (sem.id !== 2) setTrack("all");
                  }}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300",
                    isActive
                      ? "bg-ihu-green-dark text-white shadow-lg"
                      : "border border-ihu-green-dark/20 bg-white/55 text-ihu-green-dark backdrop-blur-md hover:bg-white/80",
                  )}
                >
                  {sem.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* track sub-filter for semester 2 */}
        <AnimatePresence>
          {semester === 2 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {([
                  { id: "all", label: "Όλες οι κατευθύνσεις" },
                  { id: tracks[0].id, label: "Παρασκευή & Αξιολόγηση" },
                  { id: tracks[1].id, label: "Δερματολογία" },
                ] as { id: TrackFilter; label: string }[]).map((t) => {
                  const isActive = track === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTrack(t.id);
                        setOpen(null);
                      }}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300",
                        isActive ? "bg-ihu-green text-white shadow" : "bg-white/45 text-ihu-green-dark hover:bg-white/70",
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* summary */}
        <Reveal delay={0.05}>
          <p className="mt-6 text-center text-sm text-text-secondary">
            <span className="font-bold text-ihu-green-dark">{list.length}</span> μαθήματα ·{" "}
            <span className="font-bold text-ihu-green-dark">{totalEcts} ECTS</span>
          </p>
        </Reveal>

        {/* course list */}
        <div className="mx-auto mt-8 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${semester}-${track}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {list.map((course) => (
                <CourseRow
                  key={course.code}
                  course={course}
                  open={open === course.code}
                  onToggle={() => setOpen((cur) => (cur === course.code ? null : course.code))}
                />
              ))}
              {list.length === 0 && (
                <p className="rounded-2xl glass-lachani px-6 py-10 text-center text-sm text-text-secondary">
                  Δεν υπάρχουν μαθήματα για αυτό το φίλτρο.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* scroll hint */}
        <div className="mt-8 flex justify-center">
          <ChevronDown size={18} className="animate-scroll-hint text-ihu-green-dark/50" />
        </div>
      </div>
    </section>
  );
}

export default CourseExplorer3D;
