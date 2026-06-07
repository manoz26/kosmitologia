import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import ContactContent from "./ContactContent";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqWidget } from "@/components/ui/FaqWidget";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: "Στοιχεία επικοινωνίας Γραμματείας ΠΜΣ Κοσμητολογία — τηλέφωνο, email, διεύθυνση.",
};

export default function EpikoinoniaPage() {
  return (
    <PageShell title="Επικοινωνία" subtitle="Επικοινωνήστε μαζί μας">
      <div className="py-12 section-container">
        <ContactSection />
        
        {/* FAQ Widget */}
        <FaqWidget />
      </div>
    </PageShell>
  );
}
