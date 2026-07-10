"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ResearchSpotlight3D — "Έρευνα & Διπλωματικές"
   ──────────────────────────────────────────────────────────────────────────
   The research dimension: six active research areas as pointer-reactive tilt
   cards with a gradient header, plus a compact "thesis pipeline" timeline that
   walks through how a Master's thesis takes shape.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { researchAreas, thesisSteps } from "./lib/data";
import { Icon, Reveal, SectionHeading, TiltCard } from "./lib/primitives";
import { ParticleField } from "./lib/decorations";
import { DnaHelix, PetriDish } from "./lib/cosmetic3d";

export function ResearchSpotlight3D() {
  return (
    <section id="research" className="relative w-full overflow-hidden py-24 md:py-32">
      <ParticleField count={14} seed={56} glow="rgba(135,157,66,0.45)" />
      <div className="pointer-events-none absolute right-6 top-24 hidden opacity-70 lg:block">
        <DnaHelix size={90} />
      </div>
      <div className="pointer-events-none absolute left-6 bottom-24 hidden opacity-60 lg:block">
        <PetriDish size={120} />
      </div>

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Έρευνα"
          labelIcon="search"
          title="Έρευνα,"
          highlight="διπλωματικές & καινοτομία"
          description="Στο Γ' εξάμηνο, οι φοιτητές εκπονούν πρωτότυπη έρευνα ή πρακτική άσκηση. Ορισμένοι από τους τομείς που μελετάμε:"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 [perspective:1500px] sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area, i) => (
            <Reveal key={area.title} delay={(i % 3) * 0.08} direction="up">
              <TiltCard max={9} innerClassName="glass-lachani rounded-[1.6rem] h-full" className="h-full">
                <div
                  className="relative overflow-hidden p-6"
                  style={{ background: `linear-gradient(140deg, ${area.from}, ${area.to})`, transform: "translateZ(24px)" }}
                >
                  <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/20 blur-md animate-lh-sheen" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md">
                    <Icon name={area.icon} size={26} />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold leading-snug text-text-primary">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{area.description}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* thesis pipeline */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-[2rem] glass-lachani-deep p-7 md:p-9">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <h3 className="font-heading text-xl font-bold text-text-primary">Η πορεία μιας διπλωματικής</h3>
              <span className="rounded-full bg-ihu-green/12 px-3 py-1 text-xs font-bold text-ihu-green-dark">Γ’ Εξάμηνο · 30 ECTS</span>
            </div>

            <div className="relative mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-ihu-green-light to-ihu-green-dark lg:block" />
              {thesisSteps.map((step) => (
                <div key={step.index} className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg ring-4 ring-[#cfe07f]/40">
                    <Icon name={step.icon} size={22} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-black text-ihu-green-dark">
                      {step.index}
                    </span>
                  </span>
                  <p className="mt-3 text-sm font-semibold text-text-primary">{step.title}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/programma"
                className="group inline-flex items-center gap-2 font-semibold text-ihu-green-dark transition-all hover:gap-3"
              >
                Δείτε τη Διπλωματική & Πρακτική Άσκηση
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ResearchSpotlight3D;
