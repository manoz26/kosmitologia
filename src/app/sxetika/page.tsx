import { Metadata } from "next";

import { PageShell } from "@/components/PageShell";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { ProgramObjectivesSection } from "@/components/sections/ProgramObjectivesSection";
import { SpecializationsBento } from "@/components/sections/SpecializationsBento";

import { LachaniSurface } from "@/components/home/LachaniSurface";
import { IdentitySection } from "@/components/home/IdentitySection";
import { HistoryMilestones3D } from "@/components/home/HistoryMilestones3D";
import { SkinScience3D } from "@/components/home/SkinScience3D";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { CampusMap3D } from "@/components/home/CampusMap3D";
import { CommunityGallery } from "@/components/sections/CommunityGallery";

export const metadata: Metadata = {
  title: "Η Σχολή & το Τμήμα",
  description:
    "Το ΠΜΣ Κοσμητολογία στο Διεθνές Πανεπιστήμιο της Ελλάδος — όραμα, στόχοι, ιστορία, ειδικεύσεις και οι εγκαταστάσεις του Τμήματος Επιστημών Διατροφής & Διαιτολογίας στη Σίνδο.",
  alternates: { canonical: "/sxetika" },
};

export default function SxetikaPage() {
  return (
    <>
      <PageShell
        title="Η Σχολή & Το Τμήμα"
        subtitle="Μάθετε για το όραμα, την ιστορία και τις εγκαταστάσεις της Κοσμητείας."
        className="bg-surface"
      >
        <div className="flex flex-col gap-12 md:gap-24">
          <AboutHeroSection />
          <ProgramObjectivesSection />
          <SpecializationsBento />
        </div>
      </PageShell>

      {/* ── Λαχανί band: identity, history, science, sustainability & campus ── */}
      <LachaniSurface>
        <IdentitySection />
        <HistoryMilestones3D />
        <SkinScience3D />
        <SustainabilitySection />
        <CampusMap3D />
        <CommunityGallery />
      </LachaniSurface>
    </>
  );
}
