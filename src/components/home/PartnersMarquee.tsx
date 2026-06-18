"use client";

/* ══════════════════════════════════════════════════════════════════════════
   PartnersMarquee
   ──────────────────────────────────────────────────────────────────────────
   A network ribbon of the sectors and institutions our graduates connect with.
   A single drifting marquee of glass chips with an icon, pausing on hover.
   ══════════════════════════════════════════════════════════════════════════ */

import { cn } from "@/lib/utils";
import { partners } from "./lib/data";
import { Reveal } from "./lib/primitives";
import { Building2 } from "lucide-react";

export function PartnersMarquee() {
  const track = [...partners, ...partners];
  return (
    <section id="partners" className="relative w-full overflow-hidden py-16 md:py-20">
      <div className="section-container px-4">
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-ihu-green-dark/70">
            Δίκτυο & Συνεργασίες
          </p>
          <h3 className="mt-3 text-center font-heading text-2xl font-extrabold text-text-primary md:text-3xl">
            Εκεί που βρίσκουν δουλειά οι απόφοιτοί μας
          </h3>
        </Reveal>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#AEC94A]/55 to-transparent md:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#AEC94A]/55 to-transparent md:w-36" />

        <div className="group relative flex overflow-hidden">
          <div
            className={cn(
              "flex min-w-max shrink-0 items-center gap-4 pr-4 animate-lh-marquee [animation-play-state:running] group-hover:[animation-play-state:paused]",
            )}
          >
            {track.map((partner, i) => (
              <span
                key={`${partner}-${i}`}
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl glass-lachani px-5 py-3 text-sm font-bold text-text-primary"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white">
                  <Building2 size={16} />
                </span>
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnersMarquee;
