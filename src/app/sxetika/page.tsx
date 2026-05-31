"use client";

import { AboutSection } from "@/components/sections/AboutSection";
import { SpecializationsSection } from "@/components/sections/SpecializationsSection";
import { InstitutionSection } from "@/components/sections/InstitutionSection";
import { AdmissionSection } from "@/components/sections/AdmissionSection";
import { EvaluationCriteriaSection } from "@/components/sections/EvaluationCriteriaSection";
import { PageShell } from "@/components/PageShell";

export default function SxetikaPage() {
  return (
    <PageShell title="Η Σχολή & Το Τμήμα" subtitle="Μάθετε για το όραμα, την ιστορία και τις εγκαταστάσεις της Κοσμητείας.">
      <div className="py-12 flex flex-col gap-8 md:gap-16">
        <AboutSection />
        
        <SpecializationsSection />
        
        <InstitutionSection />

        <div className="mt-8 flex flex-col gap-12">
          <EvaluationCriteriaSection />
          <AdmissionSection />
        </div>
      </div>
    </PageShell>
  );
}
