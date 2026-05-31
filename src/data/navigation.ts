export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const mainNavItems: NavItem[] = [
  { label: "Αρχική", href: "/" },
  { label: "Πρόγραμμα Σπουδών", href: "/programma" },
  { label: "Εισαγωγή", href: "/eggrafes" },
  { label: "Διδάσκοντες", href: "/didaskotes" },
  { label: "Καριέρα", href: "/karieres" },
  { label: "Νέα", href: "/nea" },
  { label: "Επικοινωνία", href: "/epikoinonia" },
];

export const homeScrollLinks: NavItem[] = [
  { label: "Σχετικά", href: "#about" },
  { label: "Πρόγραμμα", href: "#curriculum" },
  { label: "Διδάσκοντες", href: "#faculty" },
  { label: "Εισαγωγή", href: "#admission" },
  { label: "Καριέρα", href: "#careers" },
  { label: "FAQ", href: "#faq" },
  { label: "Επικοινωνία", href: "#contact" },
];

export const footerGroups: NavGroup[] = [
  {
    label: "Πρόγραμμα",
    items: [
      { label: "Πρόγραμμα Σπουδών", href: "/programma" },
      { label: "Εισαγωγή & Δικαιολογητικά", href: "/eggrafes" },
      { label: "Διδάσκοντες", href: "/didaskotes" },
      { label: "Δίδακτρα", href: "/eggrafes" },
    ],
  },
  {
    label: "Χρήσιμα",
    items: [
      { label: "Συχνές Ερωτήσεις", href: "/faq" },
      { label: "Νέα & Ανακοινώσεις", href: "/nea" },
      { label: "Καριέρα & Αποκατάσταση", href: "/karieres" },
      { label: "ΔιΠΑΕ", href: "https://www.ihu.gr", isExternal: true },
    ],
  },
  {
    label: "Επικοινωνία",
    items: [
      { label: "pms.cosm@nutr.ihu.gr", href: "mailto:pms.cosm@nutr.ihu.gr" },
      { label: "2310 013444", href: "tel:+302310013444" },
      { label: "2310 791176", href: "tel:+302310791176" },
    ],
  },
];

export const contactInfo = {
  email: "pms.cosm@nutr.ihu.gr",
  phone1: "2310 013444",
  phone2: "2310 791176",
  address: "Γραμματεία ΠΜΣ «Κοσμητολογία»",
  building: "Κτήριο Διατροφής, 1ος Όροφος",
  university: "Διεθνές Πανεπιστήμιο της Ελλάδος",
  campus: "Αλεξάνδρεια Πανεπιστημιούπολη",
  postalCode: "57400 Σίνδος, Θεσσαλονίκη",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.5!2d22.9874!3d40.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzAzLjgiTiAyMsKwNTknMTQuNiJF!5e0!3m2!1sel!2sgr!4v1",
};
