import type { Metadata } from "next";

import { LightPageHeader, BackToTop, DraftTag } from "@/components/home-light/light-kit";
import { ErgastiriaLight } from "@/components/home-light/pages/ErgastiriaLight";

export const metadata: Metadata = {
  title: "Εργαστήρια & Υποδομές — Light",
  description:
    "Ήρεμη εκδοχή της σελίδας εργαστηρίων του ΠΜΣ Κοσμητολογία — παρασκευή, ενόργανη ανάλυση και αξιολόγηση δέρματος.",
  robots: { index: false, follow: false },
};

export default function ErgastiriaLightPage() {
  return (
    <div className="bg-[#FAFBFE]">
      <LightPageHeader
        eyebrow="Χώροι Έρευνας & Ανάπτυξης"
        title="Εργαστήρια &"
        highlight="Υποδομές"
        intro="Εργαστήρια παρασκευής, ενόργανης ανάλυσης και αξιολόγησης δέρματος, όπου η θεωρία γίνεται πράξη — από την πρώτη ύλη μέχρι τον ποιοτικό έλεγχο."
      />
      <ErgastiriaLight />
      <BackToTop />
      <DraftTag />
    </div>
  );
}
