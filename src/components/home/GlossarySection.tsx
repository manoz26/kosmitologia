"use client";

/* ══════════════════════════════════════════════════════════════════════════
   GlossarySection — "Λεξικό Κοσμητολογίας"
   ──────────────────────────────────────────────────────────────────────────
   Key cosmetology terms as 3D flip cards: the front shows the term, hover (or
   focus) flips it to reveal a plain-language definition. A friendly on-ramp for
   prospective students from other disciplines.
   ══════════════════════════════════════════════════════════════════════════ */

import { glossary, type GlossaryTerm } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";

function GlossaryCard({ item }: { item: GlossaryTerm }) {
  return (
    <div className="group h-44 [perspective:1400px]">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        {/* front */}
        <button className="absolute inset-0 flex flex-col items-start justify-between rounded-3xl glass-lachani p-6 text-left [backface-visibility:hidden]">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
            <Icon name={item.icon} size={22} />
          </span>
          <div>
            <h3 className="font-heading text-lg font-bold text-text-primary">{item.term}</h3>
            {item.acronym && <p className="mt-0.5 text-[11px] leading-tight text-text-secondary">{item.acronym}</p>}
          </div>
        </button>
        {/* back */}
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-ihu-green to-ihu-green-dark p-6 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/15 blur-md animate-lh-sheen" />
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white/80">{item.term}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/95">{item.definition}</p>
        </div>
      </div>
    </div>
  );
}

export function GlossarySection() {
  return (
    <section id="glossary" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Λεξικό"
          labelIcon="book"
          title="Η ορολογία"
          highlight="απλά"
          description="Δεν χρειάζεται σχετικό πτυχίο για να ξεκινήσετε. Γνωρίστε τους βασικούς όρους της κοσμητολογίας — περάστε πάνω από κάθε κάρτα."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {glossary.map((item, i) => (
            <Reveal key={item.term} delay={(i % 4) * 0.06} direction="up">
              <GlossaryCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GlossarySection;
