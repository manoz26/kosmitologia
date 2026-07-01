"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CareerPathsExplorer — the five graduate paths, explored in depth
   ──────────────────────────────────────────────────────────────────────────
   A two-pane, λαχανί explorer: a vertical list of the five career paths on the
   left drives a rich detail panel on the right (full description, indicative
   roles, required skills and hiring sectors). Replaces the old off-brand modal
   with an inline, on-brand experience that surfaces *all* of the careers data.
   Live data from @/data/careers, re-tinted to the λαχανί palette.
   ══════════════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { careerPaths, type CareerPath } from "@/data/careers";
import { cn } from "@/lib/utils";
import { Icon, Reveal, SectionHeading } from "@/components/home/lib/primitives";
import type { IconKey } from "@/components/home/lib/data";

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

export function CareerPathsExplorer() {
  const [activeId, setActiveId] = useState(careerPaths[0].id);
  const active = careerPaths.find((c) => c.id === activeId) ?? careerPaths[0];
  const iconKey = CAREER_ICON[active.icon] ?? "rocket";
  const theme = THEME[active.colorTheme];

  return (
    <section id="paths" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Πέντε μονοπάτια"
          labelIcon="trending"
          title="Πού μπορεί να"
          highlight="σας οδηγήσει"
          description="Επιλέξτε ένα επαγγελματικό μονοπάτι για να δείτε αναλυτικά τους ρόλους, τις δεξιότητες και τους τομείς απασχόλησης των αποφοίτων."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-8">
          {/* ── Left: path selector ── */}
          <Reveal direction="left">
            <div
              role="tablist"
              aria-label="Επαγγελματικά μονοπάτια"
              className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0"
            >
              {careerPaths.map((path) => {
                const t = THEME[path.colorTheme];
                const isActive = path.id === activeId;
                return (
                  <button
                    key={path.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(path.id)}
                    className={cn(
                      "group relative flex min-w-[15rem] shrink-0 items-center gap-4 rounded-2xl p-4 text-left transition-all lg:min-w-0",
                      isActive
                        ? "text-white shadow-xl"
                        : "glass-lachani text-text-primary hover:-translate-y-0.5",
                    )}
                    style={isActive ? { background: `linear-gradient(135deg, ${t.from}, ${t.to})` } : undefined}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                        isActive ? "bg-white/20 text-white" : "text-white",
                      )}
                      style={isActive ? undefined : { background: `linear-gradient(140deg, ${t.from}, ${t.to})` }}
                    >
                      <Icon name={CAREER_ICON[path.icon] ?? "rocket"} size={22} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-heading text-sm font-bold leading-snug">{path.title}</span>
                      <span
                        className={cn(
                          "mt-0.5 block text-xs font-medium",
                          isActive ? "text-white/80" : "text-text-secondary",
                        )}
                      >
                        {path.roles.length} ενδεικτικοί ρόλοι
                      </span>
                    </span>
                    <ArrowRight
                      size={18}
                      className={cn(
                        "shrink-0 transition-all",
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* ── Right: detail panel ── */}
          <Reveal direction="right" className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full overflow-hidden rounded-[2rem] glass-lachani-deep p-7 md:p-10"
              >
                {/* decorative themed glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-3xl"
                  style={{ background: `radial-gradient(circle, ${theme.accent}55, transparent 70%)` }}
                />
                {/* oversized ghost icon */}
                <div aria-hidden className="pointer-events-none absolute -bottom-8 -right-4 opacity-[0.06]">
                  <Icon name={iconKey} size={220} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                      style={{ background: `linear-gradient(140deg, ${theme.from}, ${theme.to})` }}
                    >
                      <Icon name={iconKey} size={30} />
                    </span>
                    <h3 className="font-heading text-2xl font-extrabold leading-tight text-text-primary md:text-3xl">
                      {active.title}
                    </h3>
                  </div>

                  <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
                    {active.fullDescription}
                  </p>

                  {/* roles */}
                  <div className="mt-7">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ihu-green-dark">
                      <Icon name="target" size={14} /> Ενδεικτικοί ρόλοι
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-sm"
                          style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* skills + sectors */}
                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/45 p-5 ring-1 ring-ihu-green-dark/10 backdrop-blur-sm">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ihu-green-dark">
                        <Icon name="sparkles" size={14} /> Δεξιότητες
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {active.skills.map((skill) => (
                          <li key={skill} className="flex items-start gap-2.5 text-sm font-medium text-text-primary">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                              style={{ background: theme.accent }}
                            >
                              <Icon name="check" size={12} />
                            </span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-white/45 p-5 ring-1 ring-ihu-green-dark/10 backdrop-blur-sm">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ihu-green-dark">
                        <Icon name="building" size={14} /> Πού θα εργαστείτε
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {active.opportunities.map((opp) => (
                          <li key={opp} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: theme.accent }} />
                            {opp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default CareerPathsExplorer;
