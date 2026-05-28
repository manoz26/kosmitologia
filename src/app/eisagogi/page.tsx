import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Εισαγωγή & Δικαιολογητικά",
  description: "Κριτήρια εισαγωγής, απαιτούμενα δικαιολογητικά, δίδακτρα και διαδικασία αίτησης στο ΠΜΣ Κοσμητολογία.",
};

import { AdmissionSection } from "@/components/sections/AdmissionSection";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export default function EisagogiPage() {
  return (
    <PageShell title="Διαδικασία Εισαγωγής" subtitle="Προϋποθέσεις & Αιτήσεις">
      <div className="py-12 section-container">
        <AdmissionSection />
        
        {/* Placeholder gallery */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
            Στιγμιότυπα από τη Ζωή στη Σχολή
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceholderImage type="campus" label="Φωτογραφία: Γραμματεία ΠΜΣ" aspectRatio="video" />
            <PlaceholderImage type="classroom" label="Φωτογραφία: Εξωτερικό Αμφιθέατρο" aspectRatio="video" />
            <PlaceholderImage type="students" label="Φωτογραφία: Φοιτητές στο Campus" aspectRatio="video" />
            <PlaceholderImage type="campus" label="Φωτογραφία: Χώρος Αναμονής" aspectRatio="video" />
            <PlaceholderImage type="campus" label="Φωτογραφία: Κεντρική Είσοδος" aspectRatio="video" />
            <PlaceholderImage type="classroom" label="Φωτογραφία: Αίθουσα Υποδοχής" aspectRatio="video" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
