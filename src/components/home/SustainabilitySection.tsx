"use client";

/* ══════════════════════════════════════════════════════════════════════════
   SustainabilitySection — "Βιωσιμότητα & Πράσινη Χημεία"
   ──────────────────────────────────────────────────────────────────────────
   The programme's commitment to green chemistry, as a grid of tilt cards over
   a radial burst, framed by a leaf and a colour-swatch fan.
   ══════════════════════════════════════════════════════════════════════════ */

import { commitments } from "./lib/data";
import { Reveal, SectionHeading, TiltCard, IconBadge } from "./lib/primitives";
import { RadialBurst } from "./lib/decorations";
import { Leaf3D, ColorSwatch } from "./lib/cosmetic3d";

export function SustainabilitySection() {
  return (
    <section id="sustainability" className="relative w-full overflow-hidden py-24 md:py-32">
      <RadialBurst className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(135,157,66,0.14)" size={700} />
      <div className="pointer-events-none absolute left-6 top-24 hidden opacity-80 lg:block">
        <Leaf3D size={120} />
      </div>
      <div className="pointer-events-none absolute right-8 bottom-20 hidden opacity-70 lg:block">
        <ColorSwatch size={150} />
      </div>

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Βιωσιμότητα"
          labelIcon="leaf"
          title="Ομορφιά με"
          highlight="συνείδηση"
          description="Η σύγχρονη κοσμητολογία είναι αδιαχώριστη από τη βιωσιμότητα. Διδάσκουμε τις αρχές της πράσινης χημείας σε κάθε στάδιο."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 [perspective:1500px] sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08} direction="up">
              <TiltCard max={10} glare={false} innerClassName="glass-lachani rounded-3xl p-7 h-full" className="h-full">
                <IconBadge icon={c.icon} size="lg" style={{ transform: "translateZ(40px)" }} />
                <h3 className="mt-5 font-heading text-lg font-bold text-text-primary" style={{ transform: "translateZ(26px)" }}>
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{c.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SustainabilitySection;
