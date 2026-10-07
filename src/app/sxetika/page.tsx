/* ══════════════════════════════════════════════════════════════════════════
   /sxetika — «Το Τμήμα»
   ──────────────────────────────────────────────────────────────────────────
   One of the five pages of the redesign (docs/protasi-anadiamorfosis.md,
   Αλλαγή 1). It absorbs the old /ergastiria page, which now redirects to
   #ergastiria, and — since 07/10/2026 — the teachers (#didaskontes, moved
   from /programma; /didaskotes redirects here too, see next.config.ts).
   Each section says something the others don't:

     • IdentitySection ...... the Department & the University
     • HistoryMilestones3D .. 1985 → 2021–22, from the study guide
     • FacultyDirectory ..... who teaches (#didaskontes)
     • BeforeAfterSkin ...... the science — interactive 3D molecule
     • JourneyRing3D ........ ingredient → product, the 5 stages (moved from home)
     • LabShowcase3D ........ the labs (#ergastiria)
     • CampusMap3D .......... where — a real satellite map that flies in to the campus
     • CommunityGallery ..... photos
   ══════════════════════════════════════════════════════════════════════════ */

import { Metadata } from "next";

import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { IdentitySection } from "@/components/home/IdentitySection";
import { HistoryMilestones3D } from "@/components/home/HistoryMilestones3D";
import { FacultyDirectory } from "@/components/home/FacultyDirectory";
import { BeforeAfterSkin } from "@/components/home/BeforeAfterSkin";
import { JourneyRing3D } from "@/components/home/JourneyRing3D";
import { LabShowcase3D } from "@/components/home/LabShowcase3D";
import { CampusMap3D } from "@/components/home/CampusMap3D";
import { CommunityGallery } from "@/components/sections/CommunityGallery";

export const metadata: Metadata = {
  title: "Το Τμήμα",
  description:
    "Το Τμήμα Επιστημών Διατροφής & Διαιτολογίας του Διεθνούς Πανεπιστημίου της Ελλάδος: ιστορία, διδάσκοντες, εργαστήρια και η Αλεξάνδρεια Πανεπιστημιούπολη στη Σίνδο.",
  alternates: { canonical: "/sxetika" },
};

export default function SxetikaPage() {
  return (
    <div className="relative">
      <ScrollBackdrop />

      <div className="relative z-0">
        <LachaniPageHeader
          eyebrow="ΔΙΠΑΕ · Σίνδος"
          title="Το"
          highlight="Τμήμα"
          intro="Το Τμήμα Επιστημών Διατροφής & Διαιτολογίας, η ιστορία του, οι διδάσκοντες, τα εργαστήρια και η Πανεπιστημιούπολη όπου γίνονται τα μαθήματα."
          photo="building"
          photoCaption="Το Τμήμα Επιστημών Διατροφής & Διαιτολογίας στην Αλεξάνδρεια Πανεπιστημιούπολη, Σίνδος."
        />

        <IdentitySection />
        <HistoryMilestones3D />
        <FacultyDirectory />
        <BeforeAfterSkin />
        <JourneyRing3D />
        <LabShowcase3D />
        <CampusMap3D />
        <CommunityGallery />
      </div>
    </div>
  );
}
