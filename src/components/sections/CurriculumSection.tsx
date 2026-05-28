"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { courses, semesters, tracks, getCoursesBySemester, type Course } from "@/data/courses";
import { cn } from "@/lib/utils";

function CourseIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    search: LucideIcons.Search,
    microscope: LucideIcons.Microscope,
    briefcase: LucideIcons.Briefcase,
    "flask-conical": LucideIcons.FlaskConical,
    sparkles: LucideIcons.Sparkles,
    leaf: LucideIcons.Leaf,
    scale: LucideIcons.Scale,
    "test-tubes": LucideIcons.TestTubes,
    "heart-pulse": LucideIcons.HeartPulse,
    apple: LucideIcons.Apple,
    stethoscope: LucideIcons.Stethoscope,
    pill: LucideIcons.Pill,
    "scan-face": LucideIcons.ScanFace,
    "graduation-cap": LucideIcons.GraduationCap,
  };
  const Icon = iconMap[name] || LucideIcons.BookOpen;
  return <Icon className="h-5 w-5" />;
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const trackColor = course.track === "preparation"
    ? "mint"
    : course.track === "dermatology"
    ? "peach"
    : "lavender";

  const colorClasses = {
    lavender: {
      bg: "bg-lavender-50",
      icon: "bg-lavender text-white",
      badge: "bg-lavender-50 text-lavender-dark",
      border: "hover:border-lavender/30",
    },
    mint: {
      bg: "bg-mint-50",
      icon: "bg-mint text-white",
      badge: "bg-mint-50 text-mint-dark",
      border: "hover:border-mint/30",
    },
    peach: {
      bg: "bg-peach-50",
      icon: "bg-peach text-white",
      badge: "bg-peach-50 text-peach-warm",
      border: "hover:border-peach/30",
    },
  };

  const colors = colorClasses[trackColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 12px 40px rgba(139, 126, 200, 0.12)",
        transition: { duration: 0.2 },
      }}
      className={cn(
        "glass-card rounded-2xl p-5 cursor-pointer transition-colors border border-transparent",
        colors.border,
        course.ects === 30 && "md:col-span-2"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center", colors.icon)}>
          <CourseIcon name={course.icon} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={cn("inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider", colors.badge)}>
              {course.code}
            </span>
            <span className="text-[10px] font-medium text-text-muted">
              {course.ects} ECTS
            </span>
          </div>
          <h3 className="font-heading font-semibold text-sm text-text-primary leading-snug mb-1.5">
            {course.nameGr}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function CurriculumSection() {
  const [activeSemester, setActiveSemester] = useState<1 | 2 | 3>(1);
  const [activeTrack, setActiveTrack] = useState<"all" | "preparation" | "dermatology">("all");

  const semesterCourses = getCoursesBySemester(activeSemester);
  const filteredCourses =
    activeSemester === 2 && activeTrack !== "all"
      ? semesterCourses.filter((c) => c.track === activeTrack)
      : semesterCourses;

  return (
    <SectionWrapper
      id="curriculum"
      variant="mesh"
      title="Πρόγραμμα Σπουδών"
      subtitle="Μαθήματα"
    >
      {/* Semester Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {semesters.map((sem) => (
          <button
            key={sem.id}
            onClick={() => { setActiveSemester(sem.id as 1 | 2 | 3); setActiveTrack("all"); }}
            className={cn(
              "relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300",
              activeSemester === sem.id
                ? "bg-gradient-to-r from-lavender to-lavender-dark text-white shadow-lg shadow-lavender/20"
                : "glass-card text-text-secondary hover:text-lavender"
            )}
          >
            <span className="relative z-10">{sem.label}</span>
          </button>
        ))}
      </div>

      {/* Subtitle */}
      <p className="text-center text-sm text-text-muted mb-6">
        {semesters.find((s) => s.id === activeSemester)?.sublabel}
      </p>

      {/* Track filter (only for semester 2) */}
      {activeSemester === 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setActiveTrack("all")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
              activeTrack === "all"
                ? "bg-lavender-50 text-lavender-dark"
                : "text-text-muted hover:text-text-secondary"
            )}
          >
            Όλα
          </button>
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setActiveTrack(track.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
                activeTrack === track.id
                  ? track.color === "mint"
                    ? "bg-mint-50 text-mint-dark"
                    : "bg-peach-50 text-peach-warm"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              {track.nameGr}
            </button>
          ))}
        </motion.div>
      )}

      {/* Bento Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeSemester}-${activeTrack}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredCourses.map((course, i) => (
            <CourseCard key={course.code} course={course} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
