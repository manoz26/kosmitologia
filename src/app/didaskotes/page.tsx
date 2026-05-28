import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Διδάσκοντες",
  description: "Η ακαδημαϊκή ομάδα του ΠΜΣ Κοσμητολογία — διδάσκοντες, ερευνητές και ειδικοί επιστήμονες.",
};

import { FacultySection } from "@/components/sections/FacultySection";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export default function DidaskotesPage() {
  return (
    <PageShell title="Διδακτικό Προσωπικό" subtitle="Γνωρίστε τους Καθηγητές μας">
      <div className="py-12 section-container">
        <FacultySection />
        
        {/* Placeholder gallery */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
            Στιγμιότυπα Διδασκαλίας & Συνεργασίας
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PlaceholderImage type="professor" label="Φωτογραφία: Καθηγητής σε Διάλεξη" aspectRatio="portrait" />
            <PlaceholderImage type="professor" label="Φωτογραφία: Καθηγητής σε Εργαστήριο" aspectRatio="portrait" />
            <PlaceholderImage type="professor" label="Φωτογραφία: Συζήτηση με Φοιτητές" aspectRatio="portrait" />
            <PlaceholderImage type="professor" label="Φωτογραφία: Επίδειξη Πειράματος" aspectRatio="portrait" />
            <PlaceholderImage type="professor" label="Φωτογραφία: Παρουσίαση Έρευνας" aspectRatio="portrait" />
            <PlaceholderImage type="professor" label="Φωτογραφία: Διδασκαλία στο Αμφιθέατρο" aspectRatio="portrait" />
            <PlaceholderImage type="professor" label="Φωτογραφία: Καθηγητής - Πορτραίτο" aspectRatio="portrait" />
            <PlaceholderImage type="professor" label="Φωτογραφία: Συνεργασία Καθηγητών" aspectRatio="portrait" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
