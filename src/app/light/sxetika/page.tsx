import type { Metadata } from "next";

import { LightPageHeader, BackToTop, DraftTag } from "@/components/home-light/light-kit";
import { ChemistryBackdrop } from "@/components/home-light/ChemistryBackdrop";
import { SxetikaLight } from "@/components/home-light/pages/SxetikaLight";

export const metadata: Metadata = {
  title: "Η Σχολή & το Τμήμα — Light",
  description:
    "Ήρεμη εκδοχή της σελίδας «Σχετικά» του ΠΜΣ Κοσμητολογία — το Ίδρυμα, το Τμήμα Επιστημών Διατροφής & Διαιτολογίας και η ιστορία του.",
  robots: { index: false, follow: false },
};

export default function SxetikaLightPage() {
  return (
    <div className="relative isolate bg-[#F5F8E8]">
      <ChemistryBackdrop variant="dna" />
      <LightPageHeader
        transparent
        eyebrow="ΔΙΠΑΕ · Σχολή Επιστημών Υγείας"
        title="Η Σχολή & το"
        highlight="Τμήμα"
        intro="Το ΠΜΣ «Κοσμητολογία» λειτουργεί στο Τμήμα Επιστημών Διατροφής & Διαιτολογίας του Διεθνούς Πανεπιστημίου της Ελλάδος, στην Αλεξάνδρεια Πανεπιστημιούπολη της Σίνδου."
      />
      <SxetikaLight />
      <BackToTop />
      <DraftTag />
    </div>
  );
}
