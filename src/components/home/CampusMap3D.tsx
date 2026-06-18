"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CampusMap3D
   ──────────────────────────────────────────────────────────────────────────
   "Πού θα σπουδάσεις". A tilting 3D map card (stylised, dependency-free, with a
   pulsing location pin and animated roads) beside the campus facts and a link
   that opens the real location in Google Maps.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

import { campusFacts } from "./lib/data";
import { Icon, Reveal, SectionHeading, TiltCard } from "./lib/primitives";
import { GlowOrb } from "./lib/decorations";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Alexander+Campus+International+Hellenic+University+Sindos";

function StylisedMap() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] border-4 border-white bg-gradient-to-br from-[#E4EEC8] to-[#C6D98C] shadow-2xl">
      {/* parks / blocks */}
      <div className="home-grid-soft absolute inset-0 opacity-40" />
      <div className="absolute left-[12%] top-[16%] h-20 w-28 rounded-lg bg-ihu-green/25" />
      <div className="absolute right-[14%] top-[22%] h-16 w-20 rounded-lg bg-ihu-green/20" />
      <div className="absolute bottom-[18%] left-[20%] h-24 w-24 rounded-lg bg-ihu-green/20" />
      <div className="absolute bottom-[22%] right-[18%] h-16 w-24 rounded-lg bg-ihu-green/25" />

      {/* roads */}
      <div className="absolute left-0 right-0 top-1/2 h-2.5 -translate-y-1/2 bg-white/70" />
      <div className="absolute bottom-0 left-1/2 top-0 w-2.5 -translate-x-1/2 bg-white/70" />
      <div className="absolute left-0 right-0 top-[28%] h-1.5 bg-white/50" />
      <div className="absolute bottom-0 left-[70%] top-0 w-1.5 bg-white/50" />

      {/* animated dashed route */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M6,90 C30,70 40,55 50,50 C62,44 74,30 92,14" fill="none" stroke="#5F712A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* pin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full" style={{ transform: "translate(-50%,-100%) translateZ(60px)" }}>
        <div className="relative">
          <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-lh-pulse-ring rounded-full bg-ihu-green/50" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full rounded-bl-none bg-ihu-green-dark text-white shadow-xl ring-2 ring-white" style={{ transform: "rotate(45deg)" }}>
            <MapPin size={20} style={{ transform: "rotate(-45deg)" }} />
          </span>
        </div>
      </div>

      {/* label chip */}
      <div className="absolute bottom-4 left-4 rounded-xl bg-white/85 px-3 py-2 text-xs font-bold text-ihu-green-dark shadow-lg backdrop-blur-md">
        Αλεξάνδρεια Πανεπιστημιούπολη · Σίνδος
      </div>
    </div>
  );
}

export function CampusMap3D() {
  return (
    <section id="campus" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="right-[-6%] top-10" size={380} color="rgba(216,236,128,0.4)" />

      <div className="section-container relative z-10 grid grid-cols-1 items-center gap-14 px-4 lg:grid-cols-2">
        {/* facts */}
        <div>
          <SectionHeading
            align="left"
            label="Τοποθεσία"
            labelIcon="map-pin"
            title="Πού θα"
            highlight="σπουδάσετε"
            description="Στην καρδιά της Σίνδου Θεσσαλονίκης, στις σύγχρονες εγκαταστάσεις της Αλεξάνδρειας Πανεπιστημιούπολης του ΔΙΠΑΕ."
          />

          <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {campusFacts.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.08} direction="up">
                <div className="flex h-full items-start gap-3 rounded-2xl glass-lachani p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow">
                    <Icon name={fact.icon} size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-ihu-green-dark">{fact.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-text-primary">{fact.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
              >
                <Navigation size={16} /> Οδηγίες πρόσβασης
                <ExternalLink size={14} className="opacity-70" />
              </Link>
              <Link
                href="/epikoinonia"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ihu-green-dark/25 bg-white/55 px-6 py-3 text-sm font-bold text-ihu-green-dark backdrop-blur-md transition-all hover:bg-white/80"
              >
                Στοιχεία επικοινωνίας
              </Link>
            </div>
          </Reveal>
        </div>

        {/* map */}
        <Reveal direction="right">
          <div className="relative mx-auto h-[24rem] w-full max-w-xl [perspective:1500px] md:h-[28rem]">
            <TiltCard max={8} glare={false} className="h-full w-full" innerClassName="h-full w-full">
              <StylisedMap />
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CampusMap3D;
