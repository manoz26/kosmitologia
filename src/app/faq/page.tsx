import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Συχνές Ερωτήσεις (FAQ)",
  description: "Απαντήσεις στις πιο συχνές ερωτήσεις σχετικά με το ΠΜΣ Κοσμητολογία — δίδακτρα, διάρκεια, μαθήματα, αιτήσεις.",
};

import { FAQSection } from "@/components/sections/FAQSection";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export default function FAQPage() {
  return (
    <PageShell title="Συχνές Ερωτήσεις" subtitle="Λύστε τις απορίες σας">
      <div className="py-12 section-container">
        <FAQSection />
      </div>
    </PageShell>
  );
}
