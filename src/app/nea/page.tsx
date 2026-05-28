import { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Νέα & Ανακοινώσεις",
  description: "Τελευταίες ανακοινώσεις, προκηρύξεις και νέα του ΠΜΣ Κοσμητολογία.",
};

export default function NeaPage() {
  return <PageShell title="Νέα & Ανακοινώσεις" subtitle="Ενημέρωση" />;
}
