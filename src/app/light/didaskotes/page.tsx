import type { Metadata } from "next";

import { LightPageHeader, BackToTop, DraftTag } from "@/components/home-light/light-kit";
import { DidaskotesLight } from "@/components/home-light/pages/DidaskotesLight";

export const metadata: Metadata = {
  title: "Διδάσκοντες — Light",
  description:
    "Ήρεμη εκδοχή της σελίδας διδασκόντων του ΠΜΣ Κοσμητολογία — η Συντονιστική Επιτροπή και το διδακτικό σώμα ανά μάθημα.",
  robots: { index: false, follow: false },
};

export default function DidaskotesLightPage() {
  return (
    <div className="bg-[#FAFBFE]">
      <LightPageHeader
        eyebrow="Η ακαδημαϊκή ομάδα"
        title="Οι"
        highlight="Διδάσκοντες"
        intro="Η Συντονιστική Επιτροπή του προγράμματος και οι διδάσκοντες κάθε μαθήματος, όπως ορίζονται στα επίσημα περιγράμματα του Οδηγού Σπουδών."
      />
      <DidaskotesLight />
      <BackToTop />
      <DraftTag />
    </div>
  );
}
