import { Metadata } from "next";

import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { NewsSection } from "@/components/home/NewsSection";

export const metadata: Metadata = {
  title: "Νέα & Ανακοινώσεις",
  description:
    "Τελευταίες ανακοινώσεις, προκηρύξεις, εκδηλώσεις και νέα του ΠΜΣ Κοσμητολογία.",
  alternates: { canonical: "/nea" },
};

export default function NeaPage() {
  return (
    <div className="relative">
      <ScrollBackdrop />

      <div className="relative z-0">
        <LachaniPageHeader
          eyebrow="Ενημέρωση"
          title="Νέα &"
          highlight="Ανακοινώσεις"
          intro="Προκηρύξεις, εκδηλώσεις και τα τελευταία νέα του προγράμματος και της κοινότητάς μας."
        />

        <NewsSection />
      </div>
    </div>
  );
}
