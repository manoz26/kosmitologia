"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CareerSupport — «Είμαστε δίπλα σας σε κάθε βήμα»
   ──────────────────────────────────────────────────────────────────────────
   The support & networking services offered to students and alumni, as three
   pointer-tilting glass-λαχανί cards with a gradient icon badge and a checklist
   of concrete offerings. Live data from @/data/careers.
   ══════════════════════════════════════════════════════════════════════════ */

import { careerSupport } from "@/data/careers";
import { Icon, IconBadge, Reveal, SectionHeading, TiltCard } from "@/components/home/lib/primitives";

export function CareerSupport() {
  return (
    <section id="support" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Υποστήριξη & Διασύνδεση"
          labelIcon="heart-handshake"
          title="Είμαστε δίπλα σας"
          highlight="σε κάθε βήμα"
          description="Το πρόγραμμά μας δεν προσφέρει μόνο γνώση — προσφέρει ένα ισχυρό δίκτυο και τα εργαλεία για να ξεχωρίσετε στο επαγγελματικό σας ξεκίνημα."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 [perspective:1400px] md:grid-cols-3">
          {careerSupport.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1} direction="up">
              <TiltCard max={8} glare={false} className="h-full" innerClassName="glass-lachani rounded-[1.8rem] p-8 h-full">
                <div style={{ transform: "translateZ(30px)" }}>
                  <IconBadge icon={service.icon} size="lg" />
                  <h3 className="mt-6 font-heading text-xl font-bold text-text-primary">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{service.description}</p>
                  <ul className="mt-6 space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-medium text-text-primary">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white">
                          <Icon name="check" size={12} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareerSupport;
