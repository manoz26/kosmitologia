"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ScienceMethodology3D — "Η επιστημονική μέθοδος"
   ──────────────────────────────────────────────────────────────────────────
   The research method as a connected six-step 3D flow. Each step is a glass
   node on a winding gradient path, revealing as it scrolls into view, over a
   faint constellation field.
   ══════════════════════════════════════════════════════════════════════════ */

import { methodSteps } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { ConstellationField } from "./lib/decorations";
import { Capsule } from "./lib/cosmetic3d";

export function ScienceMethodology3D() {
  return (
    <section id="method" className="relative w-full overflow-hidden py-24 md:py-32">
      <ConstellationField count={16} seed={42} color="rgba(95,113,42,0.3)" />
      <div className="pointer-events-none absolute right-10 top-28 hidden opacity-70 lg:block">
        <Capsule size={130} />
      </div>

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Μεθοδολογία"
          labelIcon="search"
          title="Η επιστημονική"
          highlight="μέθοδος"
          description="Πίσω από κάθε ισχυρισμό κρύβεται μια αυστηρή μεθοδολογία. Έτσι μετατρέπουμε μια ιδέα σε τεκμηριωμένη γνώση."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 [perspective:1500px] sm:grid-cols-2 lg:grid-cols-3">
          {methodSteps.map((step, i) => (
            <Reveal key={step.index} delay={(i % 3) * 0.08} direction="up">
              <div className="group relative h-full overflow-hidden rounded-[1.6rem] glass-lachani p-7 transition-transform duration-300 hover:-translate-y-1.5">
                {/* big index watermark */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none font-heading text-[5.5rem] font-black leading-none text-ihu-green-dark/10">
                  {step.index}
                </span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                  <Icon name={step.icon} size={26} />
                </span>
                <h3 className="relative mt-5 font-heading text-lg font-bold text-text-primary">{step.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-text-secondary">{step.description}</p>

                {/* connector arrow (decorative) */}
                {i < methodSteps.length - 1 && (
                  <span className="pointer-events-none absolute bottom-4 right-5 text-ihu-green-dark/30 transition-transform duration-300 group-hover:translate-x-1">
                    <Icon name="check" size={18} />
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScienceMethodology3D;
