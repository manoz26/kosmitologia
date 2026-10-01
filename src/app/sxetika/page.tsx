/* ══════════════════════════════════════════════════════════════════════════
   /sxetika — «Το Τμήμα»
   ──────────────────────────────────────────────────────────────────────────
   One of the five pages of the redesign (docs/protasi-anadiamorfosis.md,
   Αλλαγή 1). It absorbs the old /ergastiria page, which now redirects to
   #ergastiria (see next.config.ts). Each section says something the others
   don't:

     • IdentitySection ...... the Department & the University
     • HistoryMilestones3D .. 1985 → 2021–22, from the study guide
     • BeforeAfterSkin ...... the science — interactive 3D molecule
     • LabShowcase3D ........ the labs (#ergastiria)
     • CampusMap3D .......... where — the campus, 1.600 στρέμματα
     • CommunityGallery ..... photos
   ══════════════════════════════════════════════════════════════════════════ */

import { Metadata } from "next";

import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { IdentitySection } from "@/components/home/IdentitySection";
import { HistoryMilestones3D } from "@/components/home/HistoryMilestones3D";
import { BeforeAfterSkin } from "@/components/home/BeforeAfterSkin";
import { LabShowcase3D } from "@/components/home/LabShowcase3D";
import { CampusMap3D } from "@/components/home/CampusMap3D";
import { CommunityGallery } from "@/components/sections/CommunityGallery";

export const metadata: Metadata = {
  title: "Το Τμήμα",
  description:
    "Το Τμήμα Επιστημών Διατροφής & Διαιτολογίας του Διεθνούς Πανεπιστημίου της Ελλάδος: ιστορία, εργαστήρια και η Αλεξάνδρεια Πανεπιστημιούπολη στη Σίνδο.",
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
          intro="Το Τμήμα Επιστημών Διατροφής & Διαιτολογίας, η ιστορία του, τα εργαστήρια και η Πανεπιστημιούπολη όπου γίνονται τα μαθήματα."
        />

        <IdentitySection />
        <HistoryMilestones3D />
        <BeforeAfterSkin />
        <LabShowcase3D />
        <CampusMap3D />
        <CommunityGallery />
      </div>
    </div>
  );
}
