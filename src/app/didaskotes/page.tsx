import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

import { FacultySection } from "@/components/sections/FacultySection";
import { CommitteeSection } from "@/components/sections/CommitteeSection";
import { LachaniSurface } from "@/components/home/LachaniSurface";
import { FacultyShowcase } from "@/components/home/FacultyShowcase";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";

export const metadata: Metadata = {
  title: "Διδάσκοντες",
  description:
    "Η ακαδημαϊκή ομάδα του ΠΜΣ Κοσμητολογία — διδάσκοντες, ερευνητές, ειδικοί επιστήμονες και το δίκτυο συνεργατών του προγράμματος.",
  alternates: { canonical: "/didaskotes" },
};

export default function DidaskotesPage() {
  return (
    <>
      <PageShell title="Διδακτικό Προσωπικό" subtitle="Γνωρίστε τους Καθηγητές μας">
        <div className="py-12 section-container">
          <CommitteeSection />
          <FacultySection />
        </div>
      </PageShell>

      {/* ── Λαχανί band: featured mentors & partner network ── */}
      <LachaniSurface>
        <FacultyShowcase />
        <PartnersMarquee />
      </LachaniSurface>
    </>
  );
}
