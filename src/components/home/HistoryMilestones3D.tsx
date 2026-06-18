"use client";

/* ══════════════════════════════════════════════════════════════════════════
   HistoryMilestones3D — "Ορόσημα"
   ──────────────────────────────────────────────────────────────────────────
   The programme's story as a connected four-node horizontal timeline, closing
   with a compact stat row. Reveal-on-scroll with a gradient connector.
   ══════════════════════════════════════════════════════════════════════════ */

import { milestones } from "./lib/data";
import { Icon, Reveal, SectionHeading, MiniStat, Divider } from "./lib/primitives";
import { GlowOrb } from "./lib/decorations";

export function HistoryMilestones3D() {
  return (
    <section id="milestones" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="left-1/2 top-10 -translate-x-1/2" size={420} color="rgba(216,236,128,0.4)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Η ιστορία μας"
          labelIcon="star"
          title="Ορόσημα"
          highlight="διαδρομής"
          description="Ένα πρόγραμμα που χτίστηκε με όραμα — από την ίδρυση μέχρι τον σημερινό κύκλο σπουδών."
        />

        <div className="relative mt-16">
          {/* connector */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-ihu-green-light via-ihu-green to-ihu-green-dark md:block" />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.period} delay={i * 0.1} direction="up" className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-xl ring-4 ring-[#cfe07f]/40">
                  <Icon name={m.icon} size={28} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-black text-ihu-green-dark">
                    {i + 1}
                  </span>
                </span>
                <span className="mt-4 rounded-full bg-ihu-green/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ihu-green-dark">
                  {m.period}
                </span>
                <h3 className="mt-3 font-heading text-base font-bold text-text-primary">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{m.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Divider className="mt-16" />

        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            <MiniStat value="1.600" label="Στρέμματα campus" />
            <MiniStat value="19" label="Μέλη ΔΕΠ" />
            <MiniStat value="5" label="Ιδρύματα-δίκτυο" />
            <MiniStat value="90 ECTS" label="Πιστωτικές μονάδες" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HistoryMilestones3D;
