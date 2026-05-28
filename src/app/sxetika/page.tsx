"use client";

import { AboutSection } from "@/components/sections/AboutSection";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PageShell } from "@/components/PageShell";

export default function SxetikaPage() {
  return (
    <PageShell title="Η Σχολή & Το Τμήμα" subtitle="Μάθετε για το όραμα, την ιστορία και τις εγκαταστάσεις της Κοσμητείας.">
      <div className="py-12 section-container">
        <AboutSection />
        
        {/* Lots of placeholders as requested */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 text-center">
            Οι Εγκαταστάσεις μας
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceholderImage type="classroom" label="Φωτογραφία: Κεντρικό Αμφιθέατρο" aspectRatio="video" />
            <PlaceholderImage type="campus" label="Φωτογραφία: Εξωτερικός Χώρος ΔιΠΑΕ" aspectRatio="video" />
            <PlaceholderImage type="classroom" label="Φωτογραφία: Αίθουσα Διδασκαλίας 1" aspectRatio="video" />
            <PlaceholderImage type="classroom" label="Φωτογραφία: Αίθουσα Διδασκαλίας 2" aspectRatio="video" />
            <PlaceholderImage type="campus" label="Φωτογραφία: Βιβλιοθήκη Σχολής" aspectRatio="video" />
            <PlaceholderImage type="generic" label="Φωτογραφία: Χώρος Συνελεύσεων" aspectRatio="video" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
