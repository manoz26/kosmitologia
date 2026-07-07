import type { Metadata } from "next";

import { LightPageHeader, BackToTop, DraftTag } from "@/components/home-light/light-kit";
import { NeaLight } from "@/components/home-light/pages/NeaLight";

export const metadata: Metadata = {
  title: "Νέα & Ανακοινώσεις — Light",
  description:
    "Ήρεμη εκδοχή της σελίδας νέων του ΠΜΣ Κοσμητολογία — ο ετήσιος κύκλος του προγράμματος και οι επίσημες ανακοινώσεις.",
  robots: { index: false, follow: false },
};

export default function NeaLightPage() {
  return (
    <div className="bg-[#FAFBFE]">
      <LightPageHeader
        eyebrow="Ενημέρωση"
        title="Νέα &"
        highlight="Ανακοινώσεις"
        intro="Ο σταθερός ετήσιος ρυθμός του προγράμματος — από την πρόσκληση μέχρι την έναρξη των μαθημάτων — και πού να βρείτε τις ζωντανές ανακοινώσεις."
      />
      <NeaLight />
      <BackToTop />
      <DraftTag />
    </div>
  );
}
