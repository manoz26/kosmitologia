import { Metadata } from "next";

import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { SpecializationTracks3D } from "@/components/home/SpecializationTracks3D";
import { CurriculumScroll3D } from "@/components/home/CurriculumScroll3D";
import { ProgramRhythm3D } from "@/components/home/ProgramRhythm3D";
import { StudentLifecycle3D } from "@/components/home/StudentLifecycle3D";
import { SkillsConstellation } from "@/components/home/SkillsConstellation";
import { GlossarySection } from "@/components/home/GlossarySection";
import { PhotoCarousel3D } from "@/components/ui/PhotoCarousel3D";

export const metadata: Metadata = {
  title: "Πρόγραμμα Σπουδών",
  description:
    "Αναλυτικό πρόγραμμα σπουδών του ΠΜΣ Κοσμητολογία — δύο ειδικεύσεις, 11 μαθήματα, 90 ECTS. Αναλυτικά στοιχεία ανά μάθημα: περιεχόμενο, διδάσκοντες, βιβλιογραφία και τρόπος αξιολόγησης.",
};

export default function ProgrammaPage() {
  return (
    <div className="relative">
      <ScrollBackdrop />

      <div className="relative z-0">
        <LachaniPageHeader
          eyebrow="Δύο Ειδικεύσεις · 90 ECTS"
          title="Πρόγραμμα"
          highlight="Σπουδών"
          intro="Τρία εξάμηνα · 90 ECTS · δύο ειδικεύσεις που μοιράζονται κοινό κορμό. Ακολουθήστε τη διαδρομή που χωρίζει στην «Παρασκευή & Αξιολόγηση Καλλυντικών» και στις «Εφαρμογές της Κοσμητολογίας στη Δερματολογία» — και ανοίξτε κάθε μάθημα για αναλυτικά, επίσημα στοιχεία."
        />

        {/* The two specialisations as a branching, scroll-driven, clickable path */}
        <SpecializationTracks3D />

        {/* Cinematic horizontal walk-through of the whole programme */}
        <CurriculumScroll3D />

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
