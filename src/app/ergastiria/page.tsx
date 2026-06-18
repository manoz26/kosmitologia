import { Metadata } from "next";

import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { LabShowcase3D } from "@/components/home/LabShowcase3D";
import { ScienceMethodology3D } from "@/components/home/ScienceMethodology3D";
import { ResearchSpotlight3D } from "@/components/home/ResearchSpotlight3D";
import { FormulationLab3D } from "@/components/home/FormulationLab3D";

export const metadata: Metadata = {
  title: "Εργαστήρια & Υποδομές",
  description:
    "Τα εργαστήρια του ΠΜΣ Κοσμητολογία — παρασκευή, ενόργανη ανάλυση, αξιολόγηση δέρματος, ερευνητικές περιοχές και η επιστημονική μεθοδολογία του προγράμματος.",
};

export default function ErgastiriaPage() {
  return (
    <div className="relative">
      <ScrollBackdrop />

      <div className="relative z-0">
        <LachaniPageHeader
          eyebrow="Χώροι Έρευνας & Ανάπτυξης"
          title="Εργαστήρια &"
          highlight="Υποδομές"
          intro="Πλήρως εξοπλισμένα εργαστήρια παρασκευής, ενόργανης ανάλυσης και αξιολόγησης δέρματος, όπου η θεωρία γίνεται πράξη — από την πρώτη ύλη μέχρι τον ποιοτικό έλεγχο και την έρευνα."
        />

        {/* The labs themselves */}
        <LabShowcase3D />

        {/* A hands-on formulation walkthrough */}
        <FormulationLab3D />

        {/* How research is done here + the active research areas */}
        <ScienceMethodology3D />
        <ResearchSpotlight3D />
      </div>
    </div>
  );
}
