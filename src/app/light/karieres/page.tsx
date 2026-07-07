import type { Metadata } from "next";

import { LightPageHeader, BackToTop, DraftTag } from "@/components/home-light/light-kit";
import { KarieresLight } from "@/components/home-light/pages/KarieresLight";

export const metadata: Metadata = {
  title: "Επαγγελματικές Προοπτικές — Light",
  description:
    "Ήρεμη εκδοχή της σελίδας καριέρας του ΠΜΣ Κοσμητολογία — το προφίλ του αποφοίτου και πέντε πεδία σταδιοδρομίας.",
  robots: { index: false, follow: false },
};

export default function KarieresLightPage() {
  return (
    <div className="bg-[#FAFBFE]">
      <LightPageHeader
        eyebrow="Απόφοιτοι & Καριέρα"
        title="Επαγγελματικές"
        highlight="Προοπτικές"
        intro="Το ΠΜΣ συνδέει την ακαδημαϊκή έρευνα με τη βιομηχανία, δημιουργώντας εξειδικευμένους επιστήμονες για τον χώρο των καλλυντικών και των δερματολογικών εφαρμογών."
      />
      <KarieresLight />
      <BackToTop />
      <DraftTag />
    </div>
  );
}
