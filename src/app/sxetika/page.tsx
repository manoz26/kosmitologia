"use client";

import { PageShell } from "@/components/PageShell";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { ProgramObjectivesSection } from "@/components/sections/ProgramObjectivesSection";
import { SpecializationsBento } from "@/components/sections/SpecializationsBento";
import { CampusSection } from "@/components/sections/CampusSection";
import { HistorySection } from "@/components/sections/HistorySection";

export default function SxetikaPage() {
  return (
    <PageShell 
      title="Η Σχολή & Το Τμήμα" 
      subtitle="Μάθετε για το όραμα, την ιστορία και τις εγκαταστάσεις της Κοσμητείας."
      className="bg-surface" // Using the light surface background
    >
      <div className="flex flex-col gap-12 md:gap-24 pb-20">
        <AboutHeroSection />
        <ProgramObjectivesSection />
        <SpecializationsBento />
        <CampusSection />
        <HistorySection />
      </div>
    </PageShell>
  );
}
