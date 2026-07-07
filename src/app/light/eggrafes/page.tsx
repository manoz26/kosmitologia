import type { Metadata } from "next";

import { LightPageHeader, BackToTop, DraftTag } from "@/components/home-light/light-kit";
import { EggrafesLight } from "@/components/home-light/pages/EggrafesLight";

export const metadata: Metadata = {
  title: "Εγγραφές & Αιτήσεις — Light",
  description:
    "Ήρεμη εκδοχή της σελίδας εγγραφών του ΠΜΣ Κοσμητολογία — διαδικασία, δικαιολογητικά και κριτήρια αξιολόγησης κατά τον Οδηγό Σπουδών.",
  robots: { index: false, follow: false },
};

export default function EggrafesLightPage() {
  return (
    <div className="bg-[#FAFBFE]">
      <LightPageHeader
        eyebrow="Κύκλος Σπουδών"
        title="Εγγραφές &"
        highlight="Αιτήσεις"
        intro="Οι σημαντικές ημερομηνίες, τα απαραίτητα δικαιολογητικά και ο τρόπος αξιολόγησης — όλα όπως ορίζονται στον Οδηγό Σπουδών του ΠΜΣ."
      />
      <EggrafesLight />
      <BackToTop />
      <DraftTag />
    </div>
  );
}
