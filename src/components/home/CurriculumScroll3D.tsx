"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CurriculumScroll3D
   ──────────────────────────────────────────────────────────────────────────
   A pinned, horizontally-scrolling curriculum. Vertical scroll drives a 3D
   track sideways through an intro panel, the three semesters and every course
   card (live data from @/data/courses), finishing on a CTA panel. A progress
   bar and live semester indicator sit on top.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

import { courses, semesters, type Course } from "@/data/courses";
import { Icon, GradientText } from "./lib/primitives";
import type { IconKey } from "./lib/data";
import { useViewport, useReduced } from "./lib/hooks";

/* Map the course icon strings onto our IconKey set. */
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

const SEMESTER_THEME: Record<number, { from: string; to: string; glow: string; accent: string }> = {
  1: { from: "#7E9636", to: "#B9D84A", glow: "rgba(165,186,95,0.5)", accent: "#879D42" },
  2: { from: "#5E9A4E", to: "#9FCB4C", glow: "rgba(135,176,80,0.5)", accent: "#5E9A4E" },
  3: { from: "#3E7A4E", to: "#7FC79A", glow: "rgba(95,150,110,0.5)", accent: "#3E9466" },
};

type Item =
  | { kind: "intro" }
  | { kind: "header"; semester: number }
  | { kind: "course"; course: Course }
  | { kind: "cta" };

function buildItems(): Item[] {
  const items: Item[] = [{ kind: "intro" }];
  for (const sem of semesters) {
    items.push({ kind: "header", semester: sem.id });
    for (const c of courses.filter((x) => x.semester === sem.id)) {
      items.push({ kind: "course", course: c });
    }
  }
  items.push({ kind: "cta" });
  return items;
}

/* ── Cards ── */

function IntroPanel() {
  return (
    <div className="flex h-full w-[78vw] max-w-sm shrink-0 flex-col justify-center pr-6 sm:w-[420px]">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ihu-green-dark/15 bg-white/55 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ihu-green-dark backdrop-blur-md">
        <GraduationCap size={14} /> Πρόγραμμα Σπουδών
      </span>
      <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.08] text-text-primary sm:text-4xl md:text-5xl">
        {courses.length} μαθήματα,
        <br />
        <GradientText>δύο ειδικεύσεις</GradientText>
      </h2>
      <p className="mt-4 text-base leading-relaxed text-text-secondary">
        Τρία εξάμηνα · 90 ECTS. Μια γρήγορη ματιά σε ολόκληρο το πρόγραμμα —
        από τα κοινά μαθήματα κορμού μέχρι τα μαθήματα ειδίκευσης και τη διπλωματική.
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-ihu-green-dark">
        Κυλήστε
        <ArrowRight size={16} className="animate-pulse" />
      </div>
    </div>
  );
}

function SemesterHeader({ semester }: { semester: number }) {
  const sem = semesters.find((s) => s.id === semester)!;
  const theme = SEMESTER_THEME[semester];
  return (
    <div className="flex h-full w-[60vw] max-w-[300px] shrink-0 flex-col justify-center pr-6 sm:w-[300px]">
      <span
        className="font-heading text-[7rem] font-black leading-none"
        style={{ color: theme.accent, opacity: 0.85 }}
      >
        {semester}
      </span>
      <h3 className="mt-2 font-heading text-2xl font-bold text-text-primary">{sem.label}</h3>
      <p className="mt-1 text-sm text-text-secondary">{sem.sublabel}</p>
      <div className="mt-4 h-1.5 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${theme.from}, ${theme.to})` }} />
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const theme = SEMESTER_THEME[course.semester];
  const iconKey = COURSE_ICON[course.icon] ?? "sparkles";
  return (
    <div className="group relative flex h-full w-[80vw] max-w-[340px] shrink-0 flex-col overflow-hidden rounded-[1.6rem] glass-lachani pr-0 sm:w-[340px]">
      {/* header band */}
      <div className="relative overflow-hidden p-6" style={{ background: `linear-gradient(140deg, ${theme.from}, ${theme.to})` }}>
        <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/20 blur-md opacity-0 transition-opacity duration-700 group-hover:animate-lh-sheen group-hover:opacity-100" />
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md">
            <Icon name={iconKey} size={22} />
          </span>
          <span className="rounded-full bg-black/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md">
            {course.code}
          </span>
        </div>
      </div>
      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-heading text-base font-bold leading-snug text-text-primary">{course.nameGr}</h4>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-text-secondary">{course.description}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ihu-green/10 px-3 py-1 text-xs font-bold text-ihu-green-dark">
            {course.ects} ECTS
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: theme.accent }}>
            {course.stream === "core" ? "Κοινό" : course.track === "preparation" ? "Ειδίκευση Ι" : "Ειδίκευση ΙΙ"}
          </span>
        </div>
      </div>
    </div>
  );
}

function CtaPanel() {
  return (
    <div className="flex h-full w-[78vw] max-w-sm shrink-0 flex-col justify-center pr-6 sm:w-[400px]">
      <div className="glass-lachani-deep rounded-[2rem] p-8">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
          <GraduationCap size={26} />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-extrabold text-text-primary">
          Έτοιμοι για το <GradientText>επόμενο βήμα;</GradientText>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Δείτε το αναλυτικό πρόγραμμα με μαθησιακά αποτελέσματα, διδάσκοντες και
          βιβλιογραφία για κάθε μάθημα.
        </p>
        <Link
          href="/programma"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
        >
          Αναλυτικό Πρόγραμμα
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function renderItem(item: Item) {
  switch (item.kind) {
    case "intro":
      return <IntroPanel key="intro" />;
    case "header":
      return <SemesterHeader key={`h-${item.semester}`} semester={item.semester} />;
    case "course":
      return <CourseCard key={item.course.code} course={item.course} />;
    case "cta":
      return <CtaPanel key="cta" />;
    default:
      return null;
  }
}

export function CurriculumScroll3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { width: vw } = useViewport();
  const [distance, setDistance] = useState(0);

  const items = buildItems();

  // Measure how far the track must travel horizontally.
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const total = track.scrollWidth;
      setDistance(Math.max(0, total - window.innerWidth + 32));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 400); // after fonts/images settle
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [vw]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const barScale = useTransform(smooth, [0, 1], [0.02, 1]);

  // Section height scales with how much horizontal travel exists.
  const heightVh = reduced ? 100 : Math.min(420, 120 + distance / (vw || 1280) * 90);

  return (
    <section
      ref={containerRef}
      id="curriculum"
      className="relative w-full"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* top bar */}
        <div className="section-container relative z-20 px-4 pt-24 md:pt-28">
          <div className="flex items-end justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ihu-green-dark">
              Πρόγραμμα Σπουδών · 3 Εξάμηνα · 90 ECTS
            </p>
            <span className="hidden text-xs font-medium text-text-secondary sm:block">
              Κυλήστε κάθετα →
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ihu-green-dark/10">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-ihu-green-light to-ihu-green-dark"
              style={{ scaleX: barScale }}
            />
          </div>
        </div>

        {/* horizontal track */}
        <div className="relative flex flex-1 items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-[60vh] max-h-[440px] items-stretch gap-5 px-4 will-change-transform md:gap-6 md:px-8"
          >
            {items.map((item) => renderItem(item))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CurriculumScroll3D;
