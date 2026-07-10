import { Metadata } from "next";

import { EggrafesContent } from "./EggrafesContent";

export const metadata: Metadata = {
  title: "Εγγραφές & Αιτήσεις",
  description:
    "Αιτήσεις εισαγωγής στο ΠΜΣ Κοσμητολογία — ημερομηνίες υποβολής, έντυπο αίτησης, απαραίτητα δικαιολογητικά και στοιχεία Γραμματείας.",
  alternates: { canonical: "/eggrafes" },
};

export default function EggrafesPage() {
  return <EggrafesContent />;
}
