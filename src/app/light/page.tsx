/* ══════════════════════════════════════════════════════════════════════════
   /light — the calm homepage draft
   ──────────────────────────────────────────────────────────────────────────
   A separate, self-contained "light" version of the homepage, built to answer
   the reviewer's «too much / βαρύ» note without touching the current home
   at `/`. If it's approved, its sections can replace the ones on `/`.

   What it keeps: the scroll-scrub video opener (the page's single "wow"),
   and — re-added on request — the pinned 3D "journey" section, verbatim
   from the main home page.
   What it drops: the second hero, the animated backdrop, the marquee, the
   scroll-spy dock — everything else below the hero is still, white, and
   single-colour, with each number appearing exactly once.
   ══════════════════════════════════════════════════════════════════════════ */

import type { Metadata } from "next";

import { HeroLight } from "@/components/home-light/HeroLight";
import { JourneyRing3D } from "@/components/home/JourneyRing3D";
import {
  FactsStrip,
  ProgramSection,
  CurriculumSection,
  SchoolSection,
  PeopleSection,
  NewsLight,
  AdmissionsSection,
  BackToTop,
} from "@/components/home-light/LightSections";

export const metadata: Metadata = {
  title: "Αρχική — Light πρόταση",
  description:
    "Ήρεμη εκδοχή της αρχικής σελίδας του ΠΜΣ Κοσμητολογία — προσχέδιο προς αξιολόγηση.",
  /* Draft variant — keep it out of search engines. */
  robots: { index: false, follow: false },
};

export default function LightHome() {
  return (
    <div className="bg-[#FAFBFE]">
      <HeroLight />
      <FactsStrip />
      {/* JourneyRing3D expects the λαχανί canvas that <ScrollBackdrop/> paints
          on the main page. It isn't mounted here, so this wrapper reproduces
          just that base gradient (verbatim from ScrollBackdrop) as a
          fixed-attachment background, confined to this section only. */}
      <div
        className="bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(168deg, #B9D84A 0%, #A8C24A 32%, #A5BA5F 60%, #B6CC6A 100%)",
        }}
      >
        <JourneyRing3D />
      </div>
      <ProgramSection />
      <CurriculumSection />
      <SchoolSection />
      <PeopleSection />
      <NewsLight />
      <AdmissionsSection />
      <BackToTop />
    </div>
  );
}
