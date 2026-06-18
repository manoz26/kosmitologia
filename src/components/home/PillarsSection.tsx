"use client";

/* ══════════════════════════════════════════════════════════════════════════
   PillarsSection — the two specialisation directions
   ──────────────────────────────────────────────────────────────────────────
   Two large pointer-reactive 3D cards. Each has a gradient "header slab" that
   floats forward in Z, an index watermark, a bullet list and a hover sheen.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { pillars } from "./lib/data";
import {
  Icon,
  Reveal,
  SectionHeading,
  TiltCard,
  Chip,
} from "./lib/primitives";

export function PillarsSection() {
  return (
    <section id="directions" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Κατευθύνσεις"
          labelIcon="layers"
          title="Δύο κατευθύνσεις,"
          highlight="μία επιστήμη"
          description="Εξειδικευμένη γνώση προσαρμοσμένη στις σύγχρονες απαιτήσεις της βιομηχανίας — επιλέξτε το μονοπάτι που ταιριάζει στους στόχους σας."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 [perspective:1600px] lg:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.id} delay={i * 0.12} direction={i === 0 ? "left" : "right"}>
              <TiltCard
                max={9}
                innerClassName="glass-lachani-deep rounded-[2rem]"
                className="h-full"
              >
                {/* Header slab */}
                <div
                  className="relative overflow-hidden p-7 md:p-9"
                  style={{
                    background: `linear-gradient(140deg, ${pillar.from}, ${pillar.to})`,
                    transform: "translateZ(30px)",
                  }}
                >
                  {/* sheen */}
                  <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/20 blur-md animate-lh-sheen" />
                  <span className="pointer-events-none absolute -right-3 -top-8 select-none font-heading text-[8rem] font-black leading-none text-white/15">
                    {pillar.index}
                  </span>
                  <div className="relative flex items-center gap-4">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-md"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <Icon name={pillar.icon} size={30} />
                    </span>
                    <span className="rounded-full bg-black/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md">
                      Κατεύθυνση {pillar.index}
                    </span>
                  </div>
                  <h3
                    className="relative mt-6 font-heading text-2xl font-bold leading-tight text-white drop-shadow md:text-[1.7rem]"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="relative mt-2 text-sm italic text-white/80">{pillar.subtitle}</p>
                </div>

                {/* Body */}
                <div className="relative p-7 md:p-9">
                  <p className="text-[15px] leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {pillar.bullets.map((b) => (
                      <li key={b.text} className="flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow"
                          style={{ background: `linear-gradient(135deg, ${pillar.from}, ${pillar.to})` }}
                        >
                          <Icon name={b.icon} size={16} />
                        </span>
                        <span className="text-sm font-medium text-text-primary">{b.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <Chip accent={pillar.accent}>Β' Εξάμηνο</Chip>
                      <Chip accent={pillar.accent}>Ειδίκευση</Chip>
                    </div>
                    <Link
                      href="/programma"
                      className="group inline-flex items-center gap-1.5 text-sm font-bold text-ihu-green-dark transition-all hover:gap-2.5"
                    >
                      Αναλυτικά
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <Link
              href="/programma"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ihu-green-dark/30 bg-white/50 px-7 py-3.5 text-sm font-bold text-ihu-green-dark backdrop-blur-md transition-all hover:bg-ihu-green-dark hover:text-white"
            >
              Δείτε το αναλυτικό Πρόγραμμα Σπουδών
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* faint floor grid for depth */}
      <motion.div
        aria-hidden
        className="home-grid-soft pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-30"
        style={{ maskImage: "linear-gradient(to top, black, transparent)", WebkitMaskImage: "linear-gradient(to top, black, transparent)" }}
      />
    </section>
  );
}

export default PillarsSection;
