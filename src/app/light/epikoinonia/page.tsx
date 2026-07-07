import type { Metadata } from "next";

import { LightPageHeader, BackToTop, DraftTag } from "@/components/home-light/light-kit";
import { EpikoinoniaLight } from "@/components/home-light/pages/EpikoinoniaLight";

export const metadata: Metadata = {
  title: "Επικοινωνία — Light",
  description:
    "Ήρεμη εκδοχή της σελίδας επικοινωνίας του ΠΜΣ Κοσμητολογία — στοιχεία Γραμματείας και συχνές ερωτήσεις.",
  robots: { index: false, follow: false },
};

export default function EpikoinoniaLightPage() {
  return (
    <div className="bg-[#FAFBFE]">
      <LightPageHeader
        eyebrow="Επικοινωνία"
        title="Ας"
        highlight="μιλήσουμε"
        intro="Στοιχεία επικοινωνίας της Γραμματείας του ΠΜΣ «Κοσμητολογία» και απαντήσεις στις πιο συχνές ερωτήσεις των υποψηφίων."
      />
      <EpikoinoniaLight />
      <BackToTop />
      <DraftTag />
    </div>
  );
}
