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
      { label: "Διδάσκοντες", href: "/sxetika#didaskontes" },
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
  /* Google's keyless embed, pinned on the Department's building (it used to
     point at Αμφιθέα, 18 χλμ. away). */
  mapEmbedUrl: `https://maps.google.com/maps?q=${program.location.value.lat},${program.location.value.lng}&z=16&hl=el&output=embed`,
};
