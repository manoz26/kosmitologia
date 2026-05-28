"use client";

import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PageShell } from "@/components/PageShell";

export default function ErgastiriaPage() {
  return (
    <PageShell title="Εργαστήρια & Εξοπλισμός" subtitle="Γνωρίστε τους σύγχρονους χώρους έρευνας και ανάπτυξης">
      <div className="py-12 section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mb-8">
            Τα εργαστήρια του Προγράμματος Μεταπτυχιακών Σπουδών "Κοσμητολογία" είναι εξοπλισμένα με 
            όργανα τελευταίας τεχνολογίας, εξασφαλίζοντας ένα ασφαλές και καινοτόμο περιβάλλον για 
            τους φοιτητές. Εδώ λαμβάνουν χώρα πειράματα, παρασκευές καλλυντικών και ποιοτικοί έλεγχοι.
          </p>
        </div>

        <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          Οι Χώροι των Εργαστηρίων
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <PlaceholderImage type="lab" label="Φωτογραφία: Εργαστήριο Παρασκευής" aspectRatio="video" />
          <PlaceholderImage type="lab" label="Φωτογραφία: Εργαστήριο Ποιοτικού Ελέγχου" aspectRatio="video" />
          <PlaceholderImage type="lab" label="Φωτογραφία: Εργαστήριο Μικροβιολογίας" aspectRatio="video" />
          <PlaceholderImage type="lab" label="Φωτογραφία: Χημείο / Απαγωγός" aspectRatio="video" />
        </div>

        <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          Όργανα & Εξοπλισμός
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlaceholderImage type="equipment" label="Φωτογραφία: Φασματοφωτόμετρο" aspectRatio="square" />
          <PlaceholderImage type="equipment" label="Φωτογραφία: Ζυγός Ακριβείας" aspectRatio="square" />
          <PlaceholderImage type="equipment" label="Φωτογραφία: Αναδευτήρες" aspectRatio="square" />
          <PlaceholderImage type="equipment" label="Φωτογραφία: Συσκευή pH" aspectRatio="square" />
          <PlaceholderImage type="equipment" label="Φωτογραφία: Συσκευές HPLC" aspectRatio="square" />
          <PlaceholderImage type="equipment" label="Φωτογραφία: Ομογενοποιητής" aspectRatio="square" />
          <PlaceholderImage type="equipment" label="Φωτογραφία: Υδατόλουτρα" aspectRatio="square" />
          <PlaceholderImage type="equipment" label="Φωτογραφία: Φυγοκέντρος" aspectRatio="square" />
        </div>

      </div>
    </PageShell>
  );
}
