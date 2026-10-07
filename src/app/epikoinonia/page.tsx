import { Metadata } from "next";

import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description:
    "Στοιχεία επικοινωνίας Γραμματείας ΠΜΣ Κοσμητολογία — τηλέφωνο, email, διεύθυνση, ωράριο και χάρτης.",
  alternates: { canonical: "/epikoinonia" },
};

export default function EpikoinoniaPage() {
  return (
    <div className="relative">
      <ScrollBackdrop />

      <div className="relative z-0">
        <LachaniPageHeader
          eyebrow="Γραμματεία ΠΜΣ"
          title="Επικοινωνία"
          intro="Τηλέφωνο, email, διεύθυνση και ωράριο της Γραμματείας, με οδηγίες πρόσβασης στην Πανεπιστημιούπολη."
        />

        <ContactSection />
      </div>
    </div>
  );
}
