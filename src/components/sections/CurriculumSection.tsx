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

function CourseCard({ course, index, onClick }: { course: Course; index: number; onClick: () => void }) {
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
      textHover: "group-hover:text-lavender",
    },
    mint: {
      bg: "bg-mint-50",
      icon: "bg-mint text-white",
      badge: "bg-mint-50 text-mint-dark",
      border: "hover:border-mint/30",
      textHover: "group-hover:text-mint-dark",
    },
    peach: {
      bg: "bg-peach-50",
      icon: "bg-peach text-white",
      badge: "bg-peach-50 text-peach-warm",
      border: "hover:border-peach/30",
      textHover: "group-hover:text-peach-warm",
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
      onClick={onClick}
      className={cn(
        "group border border-border-soft shadow-sm bg-white rounded-2xl p-5 cursor-pointer transition-colors border border-transparent flex flex-col justify-between h-full relative overflow-hidden",
        colors.border,
        course.ects === 30 && "md:col-span-2"
      )}
    >
      {/* Subtle hover gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex items-start gap-4 relative z-10">
        <div className={cn("flex-shrink-0 h-11 w-11 rounded-md flex items-center justify-center shadow-sm", colors.icon)}>
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
          <h3 className="font-heading font-semibold text-sm text-text-primary leading-snug mb-1.5 group-hover:text-primary transition-colors">
            {course.nameGr}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {course.description}
          </p>
          <div className={cn("mt-3 flex items-center gap-1.5 text-[11px] font-bold text-text-muted transition-colors", colors.textHover)}>
            <span>Περισσότερα</span>
            <LucideIcons.ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-md z-10"
      >
        <div className="sticky top-0 right-0 p-4 flex justify-end bg-gradient-to-b from-white via-white to-transparent z-20 pointer-events-none">
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-md text-text-secondary hover:bg-muted hover:text-text-primary transition-colors pointer-events-auto shadow-sm border border-border-soft"
          >
            <LucideIcons.X size={20} />
          </button>
        </div>

        <div className="px-8 pb-10 pt-4 -mt-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-md bg-lavender/10 text-lavender flex items-center justify-center shrink-0">
              <CourseIcon name={course.icon} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-lavender-50 text-lavender-dark">
                  {course.code}
                </span>
                <span className="text-xs font-semibold text-text-secondary bg-muted px-2.5 py-0.5 rounded-md">
                  {course.ects} ECTS
                </span>
              </div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                {course.nameGr}
              </h2>
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed mb-8">
            {course.description}
          </p>

          <div className="space-y-6">
            {course.outcomes && course.outcomes.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-heading font-bold text-text-primary mb-3">
                  <LucideIcons.Target size={18} className="text-lavender" />
                  Μαθησιακά Αποτελέσματα
                </h4>
                <ul className="space-y-2">
                  {course.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                      <LucideIcons.CheckCircle2 size={16} className="text-mint shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.skills && course.skills.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-heading font-bold text-text-primary mb-3">
                  <LucideIcons.Lightbulb size={18} className="text-peach-warm" />
                  Γενικές & Ειδικές Ικανότητες
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed p-3 rounded-xl bg-peach-50/50 border border-peach/20 transition-all hover:bg-peach-50 hover:border-peach/40">
                      <LucideIcons.Zap size={16} className="text-peach-warm shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.professors && course.professors.length > 0 && (
              <div className="p-4 rounded-2xl bg-surface border border-border-soft">
                <h4 className="flex items-center gap-2 font-heading font-bold text-text-primary mb-3">
                  <LucideIcons.Users size={18} className="text-lavender" />
                  Διδάσκοντες
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.professors.map((prof, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border-soft rounded-lg text-xs font-medium text-text-secondary shadow-sm">
                      <LucideIcons.User size={12} className="text-text-muted" />
                      {prof}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {course.books && course.books.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-heading font-bold text-text-primary mb-3">
                  <LucideIcons.Book size={18} className="text-lavender" />
                  Προτεινόμενα Συγγράμματα
                </h4>
                <ul className="space-y-3">
                  {course.books.map((book, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-surface border border-border-soft text-sm text-text-secondary leading-relaxed">
                      <LucideIcons.BookOpen size={16} className="text-text-muted shrink-0 mt-0.5" />
                      <span>{book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function CurriculumSection() {
  const [activeSemester, setActiveSemester] = useState<1 | 2 | 3>(1);
  const [activeTrack, setActiveTrack] = useState<"all" | "preparation" | "dermatology">("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const semesterCourses = getCoursesBySemester(activeSemester);
  const filteredCourses =
    activeSemester === 2 && activeTrack !== "all"
      ? semesterCourses.filter((c) => c.track === activeTrack)
      : semesterCourses;

  return (
    <>
      <SectionWrapper variant="muted" divider="bold"
        id="curriculum"
        
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
                "relative px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300",
                activeSemester === sem.id
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-white/90 border border-white/50 text-text-secondary hover:bg-white hover:text-primary shadow-sm"
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
                "px-4 py-2 rounded-md text-xs font-semibold transition-all border",
                activeTrack === "all"
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white/80 border-white/60 text-text-secondary hover:bg-white hover:text-primary"
              )}
            >
              Όλα
            </button>
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={cn(
                  "px-4 py-2 rounded-md text-xs font-semibold transition-all border",
                  activeTrack === track.id
                    ? track.color === "mint"
                      ? "bg-mint text-white border-mint shadow-sm"
                      : "bg-peach-warm text-white border-peach-warm shadow-sm"
                    : "bg-white/80 border-white/60 text-text-secondary hover:bg-white hover:text-primary"
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
              <CourseCard key={course.code} course={course} index={i} onClick={() => setSelectedCourse(course)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </SectionWrapper>

      <AnimatePresence>
        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
