import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactSection } from "@/components/sections/ContactSection";

import { LachaniSurface } from "@/components/home/LachaniSurface";
import { FaqSection } from "@/components/home/FaqSection";
import { StayInTouch } from "@/components/home/StayInTouch";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description:
    "Στοιχεία επικοινωνίας Γραμματείας ΠΜΣ Κοσμητολογία — τηλέφωνο, email, διεύθυνση, συχνές ερωτήσεις και ενημέρωση.",
};

export default function EpikoinoniaPage() {
  return (
    <>
      <PageShell title="Επικοινωνία" subtitle="Επικοινωνήστε μαζί μας">
        <div className="py-12 section-container">
          <ContactSection />
        </div>
      </PageShell>

      {/* ── Λαχανί band: FAQ & stay-in-touch ── */}
      <LachaniSurface>
        <FaqSection />
        <StayInTouch />
      </LachaniSurface>
    </>
  );
}
