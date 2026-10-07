"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CampusMap3D
   ──────────────────────────────────────────────────────────────────────────
   "Πού διεξάγονται τα μαθήματα". A real satellite map (home/lib/CampusFlyMap)
   that flies in from space to the Department's building in Σίνδος when it
   scrolls into view, beside the campus facts and a link with directions in
   Google Maps.

   The map engine is heavy, so it's only loaded when the frame comes within
   ~600px of the viewport; until then the frame shows the same night-sky
   backdrop the flight starts from.
   ══════════════════════════════════════════════════════════════════════════ */

import dynamic from "next/dynamic";
import Link from "next/link";
import { ExternalLink, Navigation } from "lucide-react";

import { program } from "@/data/program";
import { campusFacts } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { GlowOrb } from "./lib/decorations";
import { useInViewOnce } from "./lib/hooks";

const CampusFlyMap = dynamic(() => import("./lib/CampusFlyMap"), {
  ssr: false,
  loading: () => <div className="campus-map h-full w-full" />,
});

/* Directions in Google Maps to the Department's building. */
const { lat, lng } = program.location.value;
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export function CampusMap3D() {
  const [frameRef, near] = useInViewOnce<HTMLDivElement>("600px 0px");

  return (
    <section id="campus" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="right-[-6%] top-10" size={380} color="rgba(216,236,128,0.4)" />

      {/* Map on the left, facts on the right — the mirror of the labs section
          above it, so the page zig-zags instead of stacking the same way. */}
      <div className="section-container relative z-10 grid grid-cols-1 items-center gap-14 px-4 lg:grid-cols-12 lg:gap-10">
        {/* facts */}
        <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
          <SectionHeading
            align="left"
            label="Τοποθεσία"
            labelIcon="map-pin"
            title="Πού διεξάγονται"
            highlight="τα μαθήματα"
            description="Στην καρδιά της Σίνδου Θεσσαλονίκης, στις σύγχρονες εγκαταστάσεις της Αλεξάνδρειας Πανεπιστημιούπολης του ΔΙΠΑΕ."
          />

          {/* The facts as one square-cut ledger */}
          <Reveal direction="up">
            <dl className="mt-9 grid grid-cols-1 edge-top glass-lachani sm:grid-cols-2">
              {campusFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-start gap-3 border-b border-ihu-green-dark/10 p-5 sm:odd:border-r"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow">
                    <Icon name={fact.icon} size={17} />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold text-ihu-green-dark">{fact.label}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-text-primary">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

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

        {/* map — square-cut like the site's photos */}
        <Reveal direction="left" className="lg:order-1 lg:col-span-7">
          <div
            ref={frameRef}
            className="relative h-[26rem] w-full overflow-hidden bg-[#050b14] shadow-[0_30px_70px_-34px_rgba(20,30,8,0.65)] ring-1 ring-black/10 sm:h-[30rem] lg:h-[34rem]"
          >
            {near ? <CampusFlyMap /> : <div className="campus-map h-full w-full" />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CampusMap3D;
