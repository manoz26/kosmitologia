import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description:
    "Στοιχεία επικοινωνίας Γραμματείας ΠΜΣ Κοσμητολογία — τηλέφωνο, email, διεύθυνση, ωράριο και χάρτης.",
  alternates: { canonical: "/epikoinonia" },
};

export default function EpikoinoniaPage() {
  return (
    <>
      <PageShell title="Επικοινωνία" subtitle="Επικοινωνήστε μαζί μας">
        <div className="py-12 section-container">
          <ContactSection />
        </div>
      </PageShell>
    </>
  );
}
