"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ValueBand
   ──────────────────────────────────────────────────────────────────────────
   A compact trust strip of four headline value props, bridging the hero and
   the main body. Glass chips with a lifted icon and a hover sheen.
   ══════════════════════════════════════════════════════════════════════════ */

import { valueHighlights } from "./lib/data";
import { Icon, Reveal } from "./lib/primitives";

export function ValueBand() {
  return (
    <section className="relative w-full py-10 md:py-14">
      <div className="section-container px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {valueHighlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} direction="up">
              <div className="group flex items-center gap-3 overflow-hidden rounded-2xl glass-lachani px-4 py-4 transition-transform duration-300 hover:-translate-y-1">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow">
                  <span className="pointer-events-none absolute -inset-y-2 -left-1/2 w-1/2 -skew-x-12 bg-white/30 blur-md opacity-0 transition-opacity duration-500 group-hover:animate-lh-sheen group-hover:opacity-100" />
                  <Icon name={item.icon} size={20} />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-text-primary">{item.title}</p>
                  <p className="text-xs text-text-secondary">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueBand;
