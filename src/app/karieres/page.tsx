import { Metadata } from "next";

import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { CareerStatBand } from "@/components/karieres/CareerStatBand";
import { CareerPathsExplorer } from "@/components/karieres/CareerPathsExplorer";
import { CareerAscent3D } from "@/components/karieres/CareerAscent3D";
import { SkillsConstellation } from "@/components/home/SkillsConstellation";
import { CareerSupport } from "@/components/karieres/CareerSupport";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { TestimonialsDeck } from "@/components/home/TestimonialsDeck";
import { CtaFinale3D } from "@/components/home/CtaFinale3D";

export const metadata: Metadata = {
  title: "Επαγγελματικές Προοπτικές",
  description:
    "Καριέρα μετά το ΠΜΣ Κοσμητολογία — Ε&Α, βιομηχανία, κλινική αισθητική, επιχειρηματικότητα και εκπαίδευση. Πέντε μονοπάτια σταδιοδρομίας, δεξιότητες αποφοίτου και δίκτυο υποστήριξης.",
  alternates: { canonical: "/karieres" },
};

export default function KarieresPage() {
  return (
    <div className="relative">
      <ScrollBackdrop />

      <div className="relative z-0">
        <LachaniPageHeader
          eyebrow="Απόφοιτοι & Καριέρα"
          title="Επαγγελματικές"
          highlight="Προοπτικές"
          intro="Το ΠΜΣ συνδέει άμεσα την ακαδημαϊκή έρευνα με τη βιομηχανία, δημιουργώντας εξειδικευμένους επιστήμονες έτοιμους να ηγηθούν στον χώρο των καλλυντικών και των δερματολογικών εφαρμογών."
        />

        {/* Career, με μια ματιά */}
        <CareerStatBand />

        {/* The five paths, explored in depth */}
        <CareerPathsExplorer />

        {/* The ascent from student to professional */}
        <CareerAscent3D />

        {/* The competencies a graduate masters */}
        <SkillsConstellation />

        {/* Support & networking services */}
        <CareerSupport />

        {/* Where graduates find work + alumni voices */}
        <PartnersMarquee />
        <TestimonialsDeck />

        {/* Closing call to action */}
        <CtaFinale3D />
      </div>
    </div>
  );
}
