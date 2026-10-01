import { contact, program, telHref } from "./program";

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
  { label: "Σπουδές", href: "/programma" },
  { label: "Εισαγωγή", href: "/eggrafes" },
  { label: "Το Τμήμα", href: "/sxetika" },
  { label: "Επικοινωνία", href: "/epikoinonia" },
];

export const homeScrollLinks: NavItem[] = [
  { label: "Σχετικά", href: "#about" },
  { label: "Πρόγραμμα", href: "#curriculum" },
  { label: "Διδάσκοντες", href: "#faculty" },
  { label: "Εισαγωγή", href: "#admission" },
  { label: "Καριέρα", href: "#careers" },
  { label: "Επικοινωνία", href: "#contact" },
];

export const footerGroups: NavGroup[] = [
  {
    label: "Πρόγραμμα",
    items: [
      { label: "Σπουδές", href: "/programma" },
      { label: "Διδάσκοντες", href: "/programma#didaskontes" },
      { label: "Εισαγωγή & Δικαιολογητικά", href: "/eggrafes" },
    ],
  },
  {
    label: "Χρήσιμα",
    items: [
      { label: "Νέα & Ανακοινώσεις", href: "/nea" },
      { label: "Καριέρα", href: "/programma#karieres" },
      { label: "ΔιΠΑΕ", href: "https://www.ihu.gr", isExternal: true },
    ],
  },
  {
    label: "Επικοινωνία",
    items: [
      { label: contact.email.value, href: `mailto:${contact.email.value}` },
      { label: contact.phone.value, href: telHref(contact.phone.value) },
    ],
  },
];

export const contactInfo = {
  email: contact.email.value,
  phone1: contact.phone.value,
  fax: contact.fax.value,
  address: contact.office.value,
  building: contact.building.value,
  university: program.university.value,
  campus: contact.campus.value,
  postalCode: contact.postalCode.value,
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.5!2d22.9874!3d40.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzAzLjgiTiAyMsKwNTknMTQuNiJF!5e0!3m2!1sel!2sgr!4v1",
};
