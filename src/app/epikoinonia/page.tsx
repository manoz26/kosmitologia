import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import ContactContent from "./ContactContent";
import { ContactSection } from "@/components/sections/ContactSection";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: "Στοιχεία επικοινωνίας Γραμματείας ΠΜΣ Κοσμητολογία — τηλέφωνο, email, διεύθυνση.",
};

export default function EpikoinoniaPage() {
  return (
    <PageShell title="Επικοινωνία" subtitle="Επικοινωνήστε μαζί μας">
      <div className="py-12 section-container">
        <ContactSection />
        
        {/* Placeholder gallery */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlaceholderImage type="generic" label="Χάρτης Τοποθεσίας (Placeholder)" aspectRatio="video" />
            <PlaceholderImage type="campus" label="Εξωτερική Όψη Κτιρίου" aspectRatio="video" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
