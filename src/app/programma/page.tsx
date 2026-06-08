import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Πρόγραμμα Σπουδών",
  description: "Αναλυτικό πρόγραμμα σπουδών του ΠΜΣ Κοσμητολογία — μαθήματα, ECTS, κατευθύνσεις εξειδίκευσης.",
};

import { CurriculumSection } from "@/components/sections/CurriculumSection";
import { PhotoCarousel3D } from "@/components/ui/PhotoCarousel3D";

export default function ProgrammaPage() {
  return (
    <PageShell title="Πρόγραμμα Σπουδών" subtitle="Μαθήματα & Κατευθύνσεις">
      <div className="py-12 section-container">
        <CurriculumSection />
        
        <div className="mt-16 sm:mt-24">
          <PhotoCarousel3D />
        </div>
      </div>
    </PageShell>
  );
}
