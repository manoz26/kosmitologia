"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ProgramRhythm3D — "Πώς λειτουργεί"
   ──────────────────────────────────────────────────────────────────────────
   The weekly rhythm of the programme as three connected day-cards, followed by
   the learning formats (in-person / lab / distance). Designed to reassure
   working professionals about the schedule.
   ══════════════════════════════════════════════════════════════════════════ */

import { weeklyRhythm, learningFormats } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { GlowOrb } from "./lib/decorations";

export function ProgramRhythm3D() {
  return (
    <section id="rhythm" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="left-[-6%] top-24" size={340} color="rgba(216,236,128,0.4)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Πώς λειτουργεί"
          labelIcon="clock"
          title="Σχεδιασμένο για"
          highlight="εργαζόμενους"
          description="Τα μαθήματα συγκεντρώνονται σε τρεις ημέρες, ώστε το μεταπτυχιακό να συνδυάζεται με την επαγγελματική ζωή."
        />

        {/* weekly rhythm */}
        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-ihu-green-light via-ihu-green to-ihu-green-dark md:block" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {weeklyRhythm.map((day, i) => (
              <Reveal key={day.day} delay={i * 0.1} direction="up">
                <div className="group relative flex flex-col items-center rounded-3xl glass-lachani p-7 text-center transition-transform duration-300 hover:-translate-y-1.5">
                  <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg ring-4 ring-[#cfe07f]/40">
                    <Icon name={day.icon} size={30} />
                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-ihu-green-dark shadow">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold text-text-primary">{day.day}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ihu-green-dark">{day.time}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{day.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* learning formats */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {learningFormats.map((format, i) => (
            <Reveal key={format.title} delay={i * 0.08} direction="up">
              <div className="flex h-full items-start gap-4 rounded-3xl glass-lachani-deep p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/55 text-ihu-green-dark ring-1 ring-ihu-green-dark/10">
                  <Icon name={format.icon} size={22} />
                </span>
                <div>
                  <h4 className="font-heading text-base font-bold text-text-primary">{format.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{format.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramRhythm3D;
