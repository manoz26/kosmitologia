import { Metadata } from "next";
import KarieresClient from "./KarieresClient";

export const metadata: Metadata = {
  title: "Επαγγελματικές Προοπτικές",
  description: "Καριέρα μετά το ΠΜΣ Κοσμητολογία — Ε&Α, βιομηχανία, κλινική αισθητική, επιχειρηματικότητα, εκπαίδευση.",
};

export default function KarieresPage() {
  return <KarieresClient />;
}
