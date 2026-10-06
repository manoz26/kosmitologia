"use client";

/* ══════════════════════════════════════════════════════════════════════════
   HistoryMilestones3D — "Ορόσημα"
   ──────────────────────────────────────────────────────────────────────────
   The Department's real milestones (study guide σ.4–6) as a connected
   four-node horizontal timeline, closing with a compact stat row. Reveal-on-scroll with a gradient connector.
   ══════════════════════════════════════════════════════════════════════════ */

import { faculty } from "@/data/faculty";
import { milestones } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { GlowOrb } from "./lib/decorations";

const institutions = new Set(faculty.map((f) => f.institution)).size;

export function HistoryMilestones3D() {
  return (
    <section id="milestones" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="left-[-4%] top-10" size={420} color="rgba(216,236,128,0.4)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Η ιστορία μας"
          labelIcon="star"
          title="Ορόσημα"
          highlight="διαδρομής"
          description="Από το πρώτο τμήμα Διατροφής του 1985 μέχρι το ΠΜΣ «Κοσμητολογία»."
        />

        <div className="relative mt-16">
          {/* connector */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-ihu-green-light via-ihu-green to-ihu-green-dark md:block" />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.period} delay={i * 0.1} direction="up" className="relative flex flex-col items-start pr-4 text-left">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-xl ring-4 ring-[#cfe07f]/40">
                  <Icon name={m.icon} size={28} />
                </span>
                {/* the year carries the column, like a dateline */}
                <span className="mt-6 font-heading text-3xl font-extrabold tabular-nums tracking-tight text-ihu-green-dark">
                  {m.period}
                </span>
                <h3 className="mt-2 font-heading text-base font-bold text-text-primary">{m.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">{m.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* The faculty today, as a square-cut strip on the grid */}
        <Reveal delay={0.05}>
          <dl className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-4 edge-top pt-6">
            {[
              { value: faculty.length, label: "Διδάσκοντες" },
              { value: institutions, label: "Φορείς διδασκόντων" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-3">
                <dd className="font-heading text-4xl font-extrabold tabular-nums text-ihu-green-dark">{s.value}</dd>
                <dt className="text-sm font-medium text-text-secondary">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export default HistoryMilestones3D;
