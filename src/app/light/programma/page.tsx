import type { Metadata } from "next";

import { LightPageHeader, BackToTop, DraftTag } from "@/components/home-light/light-kit";
import { ChemistryBackdrop } from "@/components/home-light/ChemistryBackdrop";
import { ProgrammaLight } from "@/components/home-light/pages/ProgrammaLight";

export const metadata: Metadata = {
  title: "Πρόγραμμα Σπουδών — Light",
  description:
    "Ήρεμη εκδοχή του προγράμματος σπουδών του ΠΜΣ Κοσμητολογία — δύο ειδικεύσεις, 11 μαθήματα, 90 ECTS, με αναλυτικά περιγράμματα ανά μάθημα.",
  robots: { index: false, follow: false },
};

export default function ProgrammaLightPage() {
  return (
    <div className="relative isolate bg-[#F5F8E8]">
      <ChemistryBackdrop variant="method" />
      <LightPageHeader
        transparent
        eyebrow="Δύο Ειδικεύσεις · 90 ECTS"
        title="Πρόγραμμα"
        highlight="Σπουδών"
        intro="Τρία εξάμηνα, δύο ειδικεύσεις με κοινό κορμό. Ακολουθήστε τη διαδρομή σας — «Παρασκευή & Αξιολόγηση Καλλυντικών» ή «Εφαρμογές της Κοσμητολογίας στη Δερματολογία» — και ανοίξτε κάθε μάθημα για αναλυτικά, επίσημα στοιχεία."
      />
      <ProgrammaLight />
      <BackToTop />
      <DraftTag />
    </div>
  );
}
