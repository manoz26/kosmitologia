export interface CareerPath {
  icon: string;
  title: string;
  description: string;
  color: "lavender" | "mint" | "peach" | "peach-warm" | "lavender-light";
}

export const careerPaths: CareerPath[] = [
  {
    icon: "flask-conical",
    title: "Έρευνα & Ανάπτυξη",
    description:
      "Στελέχωση τμημάτων R&D εταιρειών καλλυντικών, σχεδιασμός και αξιολόγηση καινοτόμων προϊόντων με τεκμηριωμένη αποτελεσματικότητα.",
    color: "lavender",
  },
  {
    icon: "factory",
    title: "Βιομηχανία Καλλυντικών",
    description:
      "Εργασία σε βιομηχανίες παραγωγής καλλυντικών και δερμοφαρμακευτικών, με ρόλους σε παραγωγή, ποιοτικό έλεγχο και κανονιστική συμμόρφωση.",
    color: "mint",
  },
  {
    icon: "heart-handshake",
    title: "Υγεία & Αισθητική",
    description:
      "Συνεργασία με δερματολόγους και επαγγελματίες υγείας σε κλινικό περιβάλλον, εφαρμογή εξατομικευμένων κοσμητολογικών πρωτοκόλλων.",
    color: "peach",
  },
  {
    icon: "rocket",
    title: "Επιχειρηματικότητα & Consulting",
    description:
      "Ανάπτυξη ιδίας επιχείρησης, παροχή συμβουλευτικών υπηρεσιών σε ανάπτυξη και προώθηση καλλυντικών, συμμετοχή σε ερευνητικά προγράμματα.",
    color: "peach-warm",
  },
  {
    icon: "graduation-cap",
    title: "Εκπαίδευση & Κατάρτιση",
    description:
      "Διδασκαλία και κατάρτιση νέων επαγγελματιών στον τομέα της κοσμητολογίας, σε ακαδημαϊκά ιδρύματα ή εκπαιδευτικούς φορείς.",
    color: "lavender-light",
  },
];
