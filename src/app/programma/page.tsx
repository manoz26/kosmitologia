import { Metadata } from "next";

import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { CurriculumScroll3D } from "@/components/home/CurriculumScroll3D";
import { CourseExplorer3D } from "@/components/home/CourseExplorer3D";
import { CompareTracks3D } from "@/components/home/CompareTracks3D";
import { ProgramRhythm3D } from "@/components/home/ProgramRhythm3D";
import { StudentLifecycle3D } from "@/components/home/StudentLifecycle3D";
import { SkillsConstellation } from "@/components/home/SkillsConstellation";
import { GlossarySection } from "@/components/home/GlossarySection";
import { PhotoCarousel3D } from "@/components/ui/PhotoCarousel3D";

export const metadata: Metadata = {
  title: "Πρόγραμμα Σπουδών",
  description:
    "Αναλυτικό πρόγραμμα σπουδών του ΠΜΣ Κοσμητολογία — μαθήματα, ECTS, κατευθύνσεις εξειδίκευσης, εβδομαδιαίος ρυθμός και δεξιότητες αποφοίτου.",
};

export default function ProgrammaPage() {
  return (
    <div className="relative">
      <ScrollBackdrop />

      <div className="relative z-0">
        <LachaniPageHeader
          eyebrow="Μαθήματα & Κατευθύνσεις"
          title="Πρόγραμμα"
          highlight="Σπουδών"
          intro="Τρία εξάμηνα · 90 ECTS · 14 μαθήματα. Εξερευνήστε ολόκληρη τη διαδρομή — από τα μαθήματα κορμού και τις δύο κατευθύνσεις, μέχρι τον εβδομαδιαίο ρυθμό και τις δεξιότητες που αποκτά ο απόφοιτος."
        />

        {/* Cinematic horizontal walk-through of the whole programme */}
        <CurriculumScroll3D />

        {/* The detailed, filterable course browser (full data per course) */}
        <CourseExplorer3D />

        {/* The two specialisation tracks compared side by side */}
        <CompareTracks3D />

        {/* How the programme runs week to week + semester by semester */}
        <ProgramRhythm3D />
        <StudentLifecycle3D />

        {/* Graduate skill set + glossary of key terms */}
        <SkillsConstellation />
        <GlossarySection />

        {/* Closing photo gallery */}
        <div className="section-container px-4 pb-24 sm:px-6 lg:px-8">
          <PhotoCarousel3D />
        </div>
      </div>
    </div>
  );
}
