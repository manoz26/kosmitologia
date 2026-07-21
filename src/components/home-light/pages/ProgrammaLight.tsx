"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /light/programma — Πρόγραμμα Σπουδών (calm draft)
   ──────────────────────────────────────────────────────────────────────────
   Signature moment: an interactive curriculum explorer. Toggle between the two
   specialisations and open any course for its full, official description. All
   data comes from courses.ts — the vetted transcription of the study guide's
   course outlines (περιγράμματα μαθημάτων). No looping motion.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  courses,
  semesters,
  specializations,
  getSpecializationCourses,
  type Course,
} from "@/data/courses";
import {
  CONTAINER,
  FadeIn,
  LightIcon,
  SectionHead,
  PrimaryLink,
  MoreLink,
  spanOf,
} from "@/components/home-light/light-kit";

type TrackId = "preparation" | "dermatology";

const programmeFacts: { value: string; label: string }[] = [
  { value: "3", label: "εξάμηνα (έως 5 μερικής φοίτησης)" },
  { value: "90", label: "ECTS · 30 ανά εξάμηνο" },
  { value: "2", label: "ειδικεύσεις με κοινό κορμό" },
  { value: "13", label: "εβδομάδες × 26 ώρες ανά μάθημα" },
];

function streamLabel(c: Course): { text: string; className: string } {
  if (c.stream === "core")
    return { text: "Κοινό", className: "bg-slate-100 text-text-secondary" };
  return { text: "Ειδίκευσης", className: "bg-lachani-mist text-ihu-green-dark" };
}

/* ── Course detail modal ── */
function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const sem = semesters.find((s) => s.id === course.semester);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={course.nameGr}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
              <LightIcon name={course.icon} size={22} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">
                {course.code} · {sem?.label}
              </p>
              <h3 className="mt-1 font-heading text-xl font-extrabold leading-tight text-text-primary">
                {course.nameGr}
              </h3>
              <p className="mt-0.5 text-xs text-text-muted">{course.nameEn}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Κλείσιμο"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-text-muted ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-ihu-green-dark px-3 py-1 font-bold text-white">
            {course.ects} ECTS
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-text-secondary">
            {course.type}
          </span>
          {course.hours && (
            <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-text-secondary">
              {course.hours} ώρες/εβδ.
            </span>
          )}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-text-secondary">{course.description}</p>

        {course.content && course.content.length > 0 && (
          <ModalBlock title="Περιεχόμενο">
            <ul className="space-y-1.5">
              {course.content.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-text-secondary">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ihu-green-dark" />
                  {c}
                </li>
              ))}
            </ul>
          </ModalBlock>
        )}

        {course.professors && course.professors.length > 0 && (
          <ModalBlock title="Διδάσκοντες">
            <div className="flex flex-wrap gap-2">
              {course.professors.map((p) => (
                <span
                  key={p}
                  className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-text-secondary ring-1 ring-slate-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </ModalBlock>
        )}

        {course.assessment && (
          <ModalBlock title="Αξιολόγηση">
            <p className="text-sm text-text-secondary">{course.assessment}</p>
          </ModalBlock>
        )}

        {course.books && course.books.length > 0 && (
          <ModalBlock title="Ενδεικτική βιβλιογραφία">
            <ul className="space-y-1.5">
              {course.books.map((b) => (
                <li key={b} className="text-xs leading-relaxed text-text-muted">
                  {b}
                </li>
              ))}
            </ul>
          </ModalBlock>
        )}
      </div>
    </div>
  );
}

function ModalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-slate-100 pt-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ihu-green-dark">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/* ── Scroll signature: the common core splitting into the two tracks ──
   A calm, scroll-drawn diagram: one stem (the shared core) that branches into
   the two specialisations as the section passes through the viewport. All
   transforms are function-based on purpose (see light-kit note). */
function TrackSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 52%"],
  });

  const stem = useTransform(scrollYProgress, (p) => spanOf(p, 0, 0.32));
  const branchL = useTransform(scrollYProgress, (p) => spanOf(p, 0.28, 0.76));
  const branchR = useTransform(scrollYProgress, (p) => spanOf(p, 0.34, 0.82));
  const nodeIn = useTransform(scrollYProgress, (p) => spanOf(p, 0.22, 0.36));
  const cardsIn = useTransform(scrollYProgress, (p) => spanOf(p, 0.55, 0.9));
  const cardsY = useTransform(scrollYProgress, (p) => 18 * (1 - spanOf(p, 0.55, 0.9)));

  return (
    <div ref={ref} className="mt-12">
      {/* the shared start */}
      <div className="mx-auto w-fit rounded-full bg-white px-4 py-2 text-xs font-bold text-text-secondary ring-1 ring-slate-200">
        Α’ εξάμηνο · κοινός κορμός & πρώτο μάθημα ειδίκευσης
      </div>

      {/* the branching paths */}
      <svg
        viewBox="0 0 720 300"
        fill="none"
        aria-hidden
        className="mx-auto mt-2 block w-full max-w-3xl"
      >
        {/* base rails */}
        <path d="M 360 10 V 120" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M 360 120 C 360 200 150 180 150 290"
          stroke="#E2E8F0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 360 120 C 360 200 570 180 570 290"
          stroke="#E2E8F0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* scroll-drawn fills */}
        <motion.path
          d="M 360 10 V 120"
          stroke="#5F712A"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: stem }}
        />
        <motion.path
          d="M 360 120 C 360 200 150 180 150 290"
          stroke="#5F712A"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: branchL }}
        />
        <motion.path
          d="M 360 120 C 360 200 570 180 570 290"
          stroke="#5F712A"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: branchR }}
        />
        {/* the split node */}
        <motion.circle
          cx="360"
          cy="120"
          r="7"
          fill="#5F712A"
          style={{ opacity: nodeIn, scale: nodeIn }}
        />
        <circle cx="360" cy="120" r="3" fill="#F4F7ED" />
      </svg>

      {/* the two destinations */}
      <motion.div
        style={{ opacity: cardsIn, y: cardsY }}
        className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2"
      >
        {specializations.map((s) => {
          const diff =
            s.id === "preparation"
              ? ["Συστατικά Καλλυντικών — Α'", "Ποιοτικός Έλεγχος Καλλυντικών — Β'"]
              : ["Ειδικά Θέματα Κοσμητολογίας — Α'", "Παθοφυσιολογία Αντιγήρανσης — Β'"];
          return (
            <div key={s.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lachani-mist font-heading text-sm font-extrabold text-ihu-green-dark">
                  {s.numeral}
                </span>
                <p className="font-heading text-sm font-bold leading-snug text-text-primary">
                  {s.nameGr}
                </p>
              </div>
              <ul className="mt-4 space-y-1.5">
                {diff.map((d) => (
                  <li key={d} className="flex gap-2 text-xs leading-relaxed text-text-secondary">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ihu-green-dark" />
                    {d}
                  </li>
                ))}
                <li className="flex gap-2 text-xs leading-relaxed text-text-secondary">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ihu-green-dark" />
                  Γ’ εξάμηνο: Διπλωματική ή Πρακτική Άσκηση
                </li>
              </ul>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Signature: the explorer ── */
function CurriculumExplorer() {
  const [track, setTrack] = useState<TrackId>("preparation");
  const [openCourse, setOpenCourse] = useState<Course | null>(null);

  const trackCourses = getSpecializationCourses(track);

  return (
    <div className="mt-10">
      {/* track toggle */}
      <div className="mx-auto flex w-full max-w-xl rounded-full bg-slate-100 p-1">
        {specializations.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setTrack(s.id)}
            className={cn(
              "flex-1 rounded-full px-4 py-2.5 text-center text-xs font-bold transition-colors sm:text-sm",
              track === s.id
                ? "bg-ihu-green-dark text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            <span className="mr-1.5 opacity-70">{s.numeral}</span>
            {s.id === "preparation" ? "Παρασκευή & Αξιολόγηση" : "Εφαρμογές στη Δερματολογία"}
          </button>
        ))}
      </div>

      {/* semesters */}
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {semesters.map((sem, i) => {
          const list = trackCourses.filter((c) => c.semester === sem.id);
          const ects = list.reduce((sum, c) => sum + c.ects, 0);
          return (
            <FadeIn key={sem.id} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <div className="flex items-baseline justify-between">
                  <p className="font-heading text-base font-bold text-text-primary">{sem.label}</p>
                  <span className="text-xs font-semibold tabular-nums text-text-muted">
                    {ects} ECTS
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-text-muted">{sem.sublabel}</p>
                <ul className="mt-4 space-y-2">
                  {list.map((c) => {
                    const badge = streamLabel(c);
                    return (
                      <li key={c.code}>
                        <button
                          type="button"
                          onClick={() => setOpenCourse(c)}
                          className="group flex w-full items-start gap-3 rounded-xl border border-slate-100 p-3 text-left transition-colors hover:border-ihu-green-light hover:bg-lachani-mist/40"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-lachani-mist text-ihu-green-dark">
                            <LightIcon name={c.icon} size={17} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold leading-snug text-text-primary">
                              {c.nameGr}
                            </span>
                            <span className="mt-1 flex items-center gap-2">
                              <span
                                className={cn(
                                  "rounded px-1.5 py-0.5 text-[10px] font-bold",
                                  badge.className,
                                )}
                              >
                                {badge.text}
                              </span>
                              <span className="text-[11px] font-semibold tabular-nums text-text-muted">
                                {c.ects} ECTS
                              </span>
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn className="mt-5">
        <p className="text-center text-xs text-text-muted">
          Πατήστε ένα μάθημα για αναλυτικό περίγραμμα — περιεχόμενο, διδάσκοντες, βιβλιογραφία & τρόπο
          αξιολόγησης.
        </p>
      </FadeIn>

      {openCourse && <CourseModal course={openCourse} onClose={() => setOpenCourse(null)} />}
    </div>
  );
}

export function ProgrammaLight() {
  const total = courses.length;

  return (
    <>
      {/* At-a-glance facts */}
      <section>
        <div className={cn(CONTAINER, "grid grid-cols-2 gap-8 py-14 lg:grid-cols-4")}>
          {programmeFacts.map((f, i) => (
            <FadeIn key={f.label} delay={i * 0.06} className="text-center">
              <p className="font-heading text-4xl font-extrabold tracking-tight text-ihu-green-dark">
                {f.value}
              </p>
              <p className="mx-auto mt-1.5 max-w-[16ch] text-sm font-medium text-text-secondary">
                {f.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Scroll signature: common core → two tracks */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            center
            kicker="Η δομή"
            title="Κοινός κορμός, δύο κατευθύνσεις"
            description="Οι δύο ειδικεύσεις μοιράζονται επτά κοινά μαθήματα και διαφέρουν σε ένα μάθημα ανά διδακτικό εξάμηνο — η διαδρομή χωρίζει, ο πυρήνας μένει κοινός."
          />
          <TrackSplit />
        </div>
      </section>

      {/* Signature: curriculum explorer */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            center
            kicker="Τα μαθήματα"
            title="Το πρόγραμμα, μάθημα προς μάθημα"
            description={`${total} μαθήματα συνολικά, το καθένα με πλήρες επίσημο περίγραμμα. Επιλέξτε ειδίκευση και ανοίξτε όποιο μάθημα θέλετε.`}
          />
          <CurriculumExplorer />
        </div>
      </section>

      {/* Third semester note */}
      <section className="py-20 md:py-24">
        <div className={cn(CONTAINER, "grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16")}>
          <SectionHead
            kicker="Γ' Εξάμηνο"
            title="Διπλωματική ή Πρακτική Άσκηση"
            description="Το πρόγραμμα κλείνει με 30 ECTS πρωτότυπης έρευνας υπό επίβλεψη μέλους ΔΕΠ, ή πρακτικής άσκησης σε χώρο παρασκευής και αξιολόγησης καλλυντικών, με δημόσια παρουσίαση των αποτελεσμάτων."
          />
          <FadeIn delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: "lightbulb", t: "Επιλογή θέματος & επιβλέποντα" },
                { icon: "search", t: "Σχεδιασμός & υλοποίηση έρευνας" },
                { icon: "factory", t: "Εναλλακτικά: πρακτική σε φορέα του κλάδου" },
                { icon: "graduation", t: "Δημόσια υποστήριξη ενώπιον επιτροπής" },
              ].map((s) => (
                <div
                  key={s.t}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
                    <LightIcon name={s.icon} />
                  </span>
                  <p className="text-sm font-medium leading-snug text-text-secondary">{s.t}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className={cn(CONTAINER, "flex flex-wrap items-center gap-x-6 gap-y-3")}>
          <PrimaryLink href="/light/eggrafes">Εγγραφές & δικαιολογητικά</PrimaryLink>
          <MoreLink href="/light/didaskotes">Οι διδάσκοντες</MoreLink>
        </div>
      </section>
    </>
  );
}

export default ProgrammaLight;
