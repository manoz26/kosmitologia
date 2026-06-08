"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { careerPaths, type CareerPath } from "@/data/careers";
import { cn } from "@/lib/utils";

function CareerIcon({ name, className }: { name: string; className?: string }) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "flask-conical": LucideIcons.FlaskConical,
    factory: LucideIcons.Factory,
    "heart-handshake": LucideIcons.HeartHandshake,
    rocket: LucideIcons.Rocket,
    "graduation-cap": LucideIcons.GraduationCap,
  };
  const Icon = iconMap[name] || LucideIcons.Briefcase;
  return <Icon className={className || "h-6 w-6"} />;
}

const themeMap: Record<CareerPath["colorTheme"], { gradient: string; text: string; bg: string; shadow: string }> = {
  blue: { gradient: "from-[#2A427F] to-[#4A62A0]", text: "text-[#2A427F]", bg: "bg-[#F0F4FA]", shadow: "shadow-[#2A427F]/20" },
  green: { gradient: "from-[#5F712A] to-[#879D42]", text: "text-[#5F712A]", bg: "bg-[#F4F7ED]", shadow: "shadow-[#5F712A]/20" },
  emerald: { gradient: "from-[#059669] to-[#34d399]", text: "text-[#059669]", bg: "bg-emerald-50", shadow: "shadow-emerald-500/20" },
  indigo: { gradient: "from-[#4f46e5] to-[#818cf8]", text: "text-[#4f46e5]", bg: "bg-indigo-50", shadow: "shadow-indigo-500/20" },
  slate: { gradient: "from-[#475569] to-[#94a3b8]", text: "text-[#475569]", bg: "bg-slate-100", shadow: "shadow-slate-500/20" },
};

// --- Animations ---
const overlayVariants: any = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3, ease: "easeIn" } },
};

const modalVariants: any = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 300,
      mass: 0.8,
      staggerChildren: 0.1,
      delayChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 200 } },
};

export function CareersSection({ showHeading = true }: { showHeading?: boolean } = {}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "8px"; // Prevent scrollbar shift
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [selectedId]);

  const selectedCareer = careerPaths.find((c) => c.id === selectedId);

  return (
    <SectionWrapper 
      variant="muted"
      id="careers"
      title={showHeading ? "Επαγγελματικές Προοπτικές" : undefined}
      subtitle={showHeading ? "ΚΑΡΙΕΡΑ & ΑΓΟΡΑ ΕΡΓΑΣΙΑΣ" : undefined}
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Background Decorative Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-tr from-[#2A427F]/5 via-transparent to-[#879D42]/5 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {careerPaths.map((career, i) => {
            const theme = themeMap[career.colorTheme];
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={career.id}
                onClick={() => setSelectedId(career.id)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", damping: 20 }}
                whileHover={{ y: -8 }}
                className={cn(
                  "relative cursor-pointer group bg-white border border-border-soft rounded-2xl p-8 flex flex-col h-full",
                  isLarge && "md:col-span-2 lg:col-span-1",
                  "hover:shadow-2xl hover:border-transparent transition-all duration-300",
                  theme.shadow
                )}
              >
                {/* Subtle background glow on hover */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl",
                  theme.bg
                )} />

                <div className={cn(
                  "relative z-10 h-16 w-16 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-6 shadow-lg",
                  "transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500",
                  theme.gradient
                )}>
                  <CareerIcon name={career.icon} className="h-8 w-8" />
                </div>

                <h3 className="relative z-10 font-heading text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                  {career.title}
                </h3>

                <p className="relative z-10 text-base text-text-secondary leading-relaxed flex-grow">
                  {career.shortDescription}
                </p>

                <div className="relative z-10 mt-6 flex items-center text-sm font-semibold tracking-wide text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                  <span>Περισσότερα</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedId && selectedCareer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-slate-900/40 pointer-events-auto"
              onClick={() => setSelectedId(null)}
            />

            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-20 p-2.5 bg-white/50 hover:bg-white/80 backdrop-blur-md text-slate-500 hover:text-slate-900 rounded-full transition-all hover:scale-110 hover:rotate-90 shadow-sm"
                aria-label="Close modal"
              >
                <LucideIcons.X className="h-6 w-6" />
              </button>

              <div className="flex-grow overflow-y-auto custom-scrollbar relative z-10 bg-white">
                {/* Header Section */}
                <div className={cn(
                  "p-8 md:p-12 relative overflow-hidden",
                  themeMap[selectedCareer.colorTheme].bg
                )}>
                  {/* Decorative background icon */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                    animate={{ opacity: 0.04, scale: 1.5, rotate: 12 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute -right-10 -bottom-10 pointer-events-none"
                  >
                    <CareerIcon name={selectedCareer.icon} className="h-96 w-96 text-black" />
                  </motion.div>

                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <motion.div 
                      variants={itemVariants}
                      className={cn(
                        "h-24 w-24 rounded-3xl bg-gradient-to-br flex items-center justify-center text-white shadow-xl shrink-0",
                        themeMap[selectedCareer.colorTheme].gradient
                      )}
                    >
                      <CareerIcon name={selectedCareer.icon} className="h-12 w-12" />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {selectedCareer.title}
                      </h2>
                    </motion.div>
                  </div>
                </div>

                {/* Body Section */}
                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-5 gap-12 bg-white">
                  
                  {/* Left Column (Description) */}
                  <div className="md:col-span-3 space-y-10">
                    <motion.div variants={itemVariants}>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Περιγραφη Ειδικοτητας</h4>
                      <p className="text-xl text-slate-800 leading-relaxed font-semibold mb-6">
                        {selectedCareer.shortDescription}
                      </p>
                      <p className="text-base text-slate-600 leading-relaxed">
                        {selectedCareer.fullDescription}
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <LucideIcons.Target className="h-4 w-4" />
                        Ενδεικτικοι Ρολοι
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedCareer.roles.map((role, idx) => (
                          <span key={idx} className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-semibold border transition-all hover:scale-105",
                            themeMap[selectedCareer.colorTheme].bg,
                            themeMap[selectedCareer.colorTheme].text,
                            "border-black/5"
                          )}>
                            {role}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column (Skills & Opportunities) */}
                  <div className="md:col-span-2 space-y-8">
                    <motion.div variants={itemVariants} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all hover:shadow-md">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <LucideIcons.Sparkles className="h-4 w-4 text-primary" />
                        Απαιτουμενες Δεξιοτητες
                      </h4>
                      <ul className="space-y-4">
                        {selectedCareer.skills.map((skill, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className={cn(
                              "mt-0.5 h-6 w-6 rounded-full flex items-center justify-center shrink-0",
                              themeMap[selectedCareer.colorTheme].bg,
                              themeMap[selectedCareer.colorTheme].text
                            )}>
                              <LucideIcons.Check className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-sm font-medium text-slate-700 pt-0.5">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all hover:shadow-md">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <LucideIcons.Building2 className="h-4 w-4 text-primary" />
                        Που Μπορειτε Να Εργαστειτε
                      </h4>
                      <ul className="space-y-4">
                        {selectedCareer.opportunities.map((opp, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                            <span className="text-sm text-slate-600 leading-relaxed">{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
