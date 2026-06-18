"use client";

/* ══════════════════════════════════════════════════════════════════════════
   SkillsConstellation
   ──────────────────────────────────────────────────────────────────────────
   The competencies a graduate masters, each as an animated circular progress
   ring that fills when scrolled into view, on a tilting glass card. A compact,
   data-dense "skills radar" without a charting dependency.
   ══════════════════════════════════════════════════════════════════════════ */

import { motion } from "framer-motion";

import { skills, type Skill } from "./lib/data";
import { Icon, Reveal, SectionHeading, TiltCard } from "./lib/primitives";

const SIZE = 92;
const STROKE = 8;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

function SkillRing({ skill, delay }: { skill: Skill; delay: number }) {
  const offset = CIRC * (1 - skill.level / 100);
  return (
    <TiltCard max={10} glare={false} innerClassName="glass-lachani rounded-3xl p-6 h-full" className="h-full">
      <div className="flex flex-col items-center text-center">
        <div className="relative" style={{ width: SIZE, height: SIZE, transform: "translateZ(34px)" }}>
          <svg width={SIZE} height={SIZE} className="-rotate-90">
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(95,113,42,0.14)" strokeWidth={STROKE} />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="url(#skill-grad)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              initial={{ strokeDashoffset: CIRC }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ihu-green/12 text-ihu-green-dark">
              <Icon name={skill.icon} size={15} />
            </span>
          </div>
          {/* floating percentage */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5 }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-ihu-green-dark px-2 py-0.5 font-heading text-[11px] font-bold text-white shadow"
          >
            {skill.level}%
          </motion.span>
        </div>

        <h3 className="mt-5 font-heading text-sm font-bold leading-snug text-text-primary" style={{ transform: "translateZ(20px)" }}>
          {skill.label}
        </h3>
        <span className="mt-1.5 rounded-full bg-white/55 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ihu-green-dark">
          {skill.category}
        </span>
      </div>
    </TiltCard>
  );
}

export function SkillsConstellation() {
  return (
    <section id="skills" className="relative w-full overflow-hidden py-24 md:py-32">
      {/* shared gradient definition for every ring */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="skill-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B9D84A" />
            <stop offset="100%" stopColor="#5F712A" />
          </linearGradient>
        </defs>
      </svg>

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Δεξιότητες"
          labelIcon="target"
          title="Τι θα"
          highlight="κατακτήσετε"
          description="Δέκα βασικές ικανότητες που αποκτά ο απόφοιτος — από τον σχεδιασμό φόρμουλας μέχρι την κανονιστική συμμόρφωση και το branding."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 [perspective:1400px] sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill, i) => (
            <Reveal key={skill.label} delay={(i % 5) * 0.06} direction="up">
              <SkillRing skill={skill} delay={(i % 5) * 0.08} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsConstellation;
