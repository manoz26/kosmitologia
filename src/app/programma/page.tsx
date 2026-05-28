import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Πρόγραμμα Σπουδών",
  description: "Αναλυτικό πρόγραμμα σπουδών του ΠΜΣ Κοσμητολογία — μαθήματα, ECTS, κατευθύνσεις εξειδίκευσης.",
};

import { CurriculumSection } from "@/components/sections/CurriculumSection";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export default function ProgrammaPage() {
  return (
    <PageShell title="Πρόγραμμα Σπουδών" subtitle="Μαθήματα & Κατευθύνσεις">
      <div className="py-12 section-container">
        <CurriculumSection />
        
        {/* Placeholder gallery */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
            Στιγμιότυπα από τα Εργαστηριακά Μαθήματα
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceholderImage type="students" label="Φωτογραφία: Φοιτητές σε Πείραμα 1" aspectRatio="square" />
            <PlaceholderImage type="students" label="Φωτογραφία: Φοιτητές σε Πείραμα 2" aspectRatio="square" />
            <PlaceholderImage type="students" label="Φωτογραφία: Ομαδική Εργασία στο Lab" aspectRatio="square" />
            <PlaceholderImage type="students" label="Φωτογραφία: Χρήση Μικροσκοπίου" aspectRatio="square" />
            <PlaceholderImage type="students" label="Φωτογραφία: Παρασκευή Κρέμας" aspectRatio="square" />
            <PlaceholderImage type="students" label="Φωτογραφία: Μέτρηση pH" aspectRatio="square" />
            <PlaceholderImage type="students" label="Φωτογραφία: Αξιολόγηση Υφής" aspectRatio="square" />
            <PlaceholderImage type="students" label="Φωτογραφία: Παρουσίαση Εργασίας" aspectRatio="square" />
            <PlaceholderImage type="students" label="Φωτογραφία: Συνεργασία" aspectRatio="square" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
