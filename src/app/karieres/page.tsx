import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Επαγγελματικές Προοπτικές",
  description: "Καριέρα μετά το ΠΜΣ Κοσμητολογία — Ε&Α, βιομηχανία, κλινική αισθητική, επιχειρηματικότητα, εκπαίδευση.",
};

import { CareersSection } from "@/components/sections/CareersSection";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export default function KarieresPage() {
  return (
    <PageShell title="Επαγγελματικές Προοπτικές" subtitle="Καριέρα & Αγορά Εργασίας">
      <div className="py-12 section-container">
        <CareersSection />
        
        {/* Placeholder gallery */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
            Προοπτικές και Συνεργασίες
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PlaceholderImage type="careers" label="Φωτογραφία: Βιομηχανία Καλλυντικών" aspectRatio="square" />
            <PlaceholderImage type="careers" label="Φωτογραφία: R&D Εταιρείας" aspectRatio="square" />
            <PlaceholderImage type="careers" label="Φωτογραφία: Συνεργασία με Εταιρείες" aspectRatio="square" />
            <PlaceholderImage type="careers" label="Φωτογραφία: Αποφοίτηση" aspectRatio="square" />
            <PlaceholderImage type="careers" label="Φωτογραφία: Παρουσίαση Προϊόντος" aspectRatio="square" />
            <PlaceholderImage type="careers" label="Φωτογραφία: Ποιοτικός Έλεγχος σε Βιομηχανία" aspectRatio="square" />
            <PlaceholderImage type="careers" label="Φωτογραφία: Startup στην Κοσμητολογία" aspectRatio="square" />
            <PlaceholderImage type="careers" label="Φωτογραφία: Σεμινάριο Καριέρας" aspectRatio="square" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
