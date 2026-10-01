import { Metadata } from "next";

import { EggrafesContent } from "./EggrafesContent";

export const metadata: Metadata = {
  title: "Εισαγωγή",
  description:
    "Αιτήσεις εισαγωγής στο ΠΜΣ Κοσμητολογία — ημερομηνίες υποβολής, δικαιολογητικά, κριτήρια, δίδακτρα, επίσημα έγγραφα και συχνές ερωτήσεις.",
  alternates: { canonical: "/eggrafes" },
};

export default function EggrafesPage() {
  return <EggrafesContent />;
}
