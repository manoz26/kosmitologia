/* ══════════════════════════════════════════════════════════════════════════
   program.ts — η ΜΙΑ πηγή αλήθειας για τα στοιχεία του ΠΜΣ.
   ──────────────────────────────────────────────────────────────────────────
   Κάθε στοιχείο που εμφανίζεται στο site (αριθμοί, ημερομηνίες, επαφές,
   έγγραφα) ζει ΕΔΩ, μαζί με την πηγή του (`source`). Τα sections διαβάζουν
   από αυτό το αρχείο αντί να γράφουν τιμές με το χέρι.

   Κανόνας: ό,τι δεν έχει πηγή δεν μπαίνει στο site. Νέο στοιχείο από τον
   πελάτη → προσθήκη εδώ με source π.χ. «email πελάτη 03/10/2026».

   Πηγές:
   • GUIDE = «Μ2.3 Οδηγός Σπουδών του ΠΜΣ ΚΟΣΜΗΤΟΛΟΓΙΑ» (Ιανουάριος 2024),
     public/odigos-spoudon.pdf — οι σελίδες αναφέρονται με την αρίθμηση
     «Σελίδα N» του εγγράφου.
   • FORM  = το επίσημο έντυπο αίτησης, public/aitisi.docx.
   ══════════════════════════════════════════════════════════════════════════ */

export interface Fact<T> {
  value: T;
  source: string;
}

const GUIDE = "Οδηγός Σπουδών (Ιαν. 2024)";
const FORM = "Έντυπο αίτησης (aitisi.docx)";
const CONFIRMED = "Επιβεβαίωση 01/10/2026 — δεν αναφέρεται στον Οδηγό";

/* ── Βασικά στοιχεία ─────────────────────────────────────────────────────── */

export const program = {
  title: { value: "ΠΜΣ «Κοσμητολογία»", source: `${GUIDE}, εξώφυλλο` },
  department: {
    value: "Τμήμα Επιστημών Διατροφής και Διαιτολογίας",
    source: `${GUIDE}, εξώφυλλο`,
  },
  university: { value: "Διεθνές Πανεπιστήμιο της Ελλάδος", source: `${GUIDE}, εξώφυλλο` },
  degree: {
    value: "Δίπλωμα Μεταπτυχιακών Σπουδών",
    source: `${GUIDE}, σ.6`,
  },
  firstCohort: { value: "2021–22", source: `${GUIDE}, σ.6` },
  specializations: { value: 2, source: `${GUIDE}, σ.6` },
  courses: { value: 11, source: `${GUIDE}, σ.10–11 (COSM1001–COSM1011)` },
  /** 30 + 30 + 30 ανά ειδίκευση — άθροισμα των ECTS των πινάκων μαθημάτων. */
  ects: { value: 90, source: `${GUIDE}, σ.10–11` },
  semesters: { value: { min: 3, max: 5 }, source: `${GUIDE}, σ.6` },
  intake: { value: 40, source: `${GUIDE}, σ.7` },
  /** Επιπλέον των 40: ένας υπότροφος ΙΚΥ και ένας αλλοδαπός υπότροφος. */
  extraScholars: { value: 2, source: `${GUIDE}, σ.7` },
  tuition: { value: 2400, source: CONFIRMED },
  /** Ελάχιστη απόδειξη γνώσης Αγγλικών. */
  englishMinimum: { value: "Lower ή TOEFL 550", source: `${GUIDE}, σ.8` },
  /** Ποσοστά που εμφανίζονται στο FAQ. Ο Οδηγός απαριθμεί 8 κριτήρια χωρίς ποσοστά. */
  selectionWeights: {
    value: { relevance: 10, degreeGrade: 20, relevantCourses: 10 },
    source: CONFIRMED,
  },
  /** Σε στρέμματα. */
  campusArea: { value: 1600, source: `${GUIDE}, σ.3` },
  campusDistance: { value: "17 χλμ. από τη Θεσσαλονίκη", source: `${GUIDE}, σ.3` },
} satisfies Record<string, Fact<unknown>>;

/* ── Συντονιστική Επιτροπή ───────────────────────────────────────────────────
   Ονόματα & ρόλοι από τον Οδηγό (σ.1). Οι βαθμίδες ΔΕΝ μπαίνουν εδώ: ο Οδηγός
   και το faculty.ts διαφέρουν — εκκρεμεί ενημερωμένη λίστα από τον πελάτη. */

export const committeeSource = `${GUIDE}, σ.1`;

export const committee: { name: string; role: "Διευθυντής" | "Αν. Διευθυντής" | "Μέλος"; email: string }[] = [
  { name: "Αθανάσιος Παπαδόπουλος", role: "Διευθυντής", email: "papadnas@ihu.gr" },
  { name: "Ιορδάνης Παπαδόπουλος", role: "Αν. Διευθυντής", email: "driordanis@ihu.gr" },
  { name: "Μαρία Χασαπίδου", role: "Μέλος", email: "mnhas@ihu.gr" },
  { name: "Ελισάβετ Βαρδάκα", role: "Μέλος", email: "evardaka@ihu.gr" },
  { name: "Άννα Γιαννακουδάκη", role: "Μέλος", email: "annagianna@live.com" },
];

/** 1600 → "1.600" */
export function formatNumber(n: number) {
  return n.toLocaleString("el-GR");
}

/** 2400 → "€2.400" */
export function formatEuro(n: number) {
  return `€${formatNumber(n)}`;
}

/* ── Επικοινωνία ─────────────────────────────────────────────────────────── */

const OLD_SITE = "Παλαιότερη έκδοση του site — ανεπιβεβαίωτο";

export const contact = {
  email: { value: "pms.cosm@nutr.ihu.gr", source: `${GUIDE}, σ.2` },
  phone: { value: "2310 013444", source: `${GUIDE}, σ.2` },
  office: { value: "Γραμματεία ΠΜΣ «Κοσμητολογία»", source: `${GUIDE}, σ.2` },
  campus: { value: "Αλεξάνδρεια Πανεπιστημιούπολη", source: `${GUIDE}, σ.2` },
  poBox: { value: "Τ.Θ. 141", source: `${GUIDE}, σ.2` },
  postalCode: { value: "57400 Σίνδος, Θεσσαλονίκη", source: `${GUIDE}, σ.2` },
  /* ── ανεπιβεβαίωτα (εμφανίζονταν ήδη· εκκρεμεί απάντηση πελάτη) ── */
  /** Το παλιό site το έδειχνε αλλού ως 2ο τηλέφωνο κι αλλού ως Fax. */
  fax: { value: "2310 791176", source: OLD_SITE },
  /** Το /eggrafes έγραφε «Κτήριο Σχολής Επιστημών Υγείας, Ισόγειο» — αντίφαση. */
  building: { value: "Κτήριο Διατροφής, 1ος Όροφος", source: OLD_SITE },
  emailAlt: { value: "pms.cosm@gmail.com", source: OLD_SITE },
  hours: { value: "Δευτέρα – Παρασκευή, 09:00 – 15:00", source: OLD_SITE },
} satisfies Record<string, Fact<string>>;

/** `tel:` href από ελληνικό αριθμό με κενά. */
export function telHref(phone: string) {
  return `tel:+30${phone.replace(/\s+/g, "")}`;
}

/* ── Κύκλος αιτήσεων ─────────────────────────────────────────────────────────
   Ο Οδηγός (σ.8) ορίζει υποβολή «από τις 10 Ιουνίου μέχρι τις 10 Ιουλίου κάθε
   έτους», εκτός αν η Συντονιστική Επιτροπή αποφασίσει διαφορετικά. Η ΣΕ
   αποφασίζει τον Απρίλιο (σ.7). Μέχρι τότε οι ημερομηνίες είναι ΕΝΔΕΙΚΤΙΚΕΣ.

   Για νέο κύκλο: αλλάζεις cycle/opens/closes και, μόλις βγει η επίσημη
   ανακοίνωση, `indicative: false`. Το site δεν βγάζει ποτέ μόνο του χρονιά από
   την τρέχουσα ημερομηνία. */

export const admissions = {
  cycle: "2027–2028",
  /** ISO ημερομηνίες (ώρα Ελλάδας). */
  opens: "2027-06-10",
  closes: "2027-07-10",
  indicative: true,
  source: `${GUIDE}, σ.7–8 — «από τις 10 Ιουνίου μέχρι τις 10 Ιουλίου κάθε έτους»`,
};

export type AdmissionsStatus = "upcoming" | "open" | "closed";

/** Κατάσταση των αιτήσεων σε μια δεδομένη στιγμή. Η προθεσμία μετρά ως το τέλος της ημέρας. */
export function admissionsStatus(now: Date): AdmissionsStatus {
  const opens = new Date(`${admissions.opens}T00:00:00+03:00`);
  const closes = new Date(`${admissions.closes}T23:59:59+03:00`);
  if (now < opens) return "upcoming";
  if (now <= closes) return "open";
  return "closed";
}

/** "2027-07-10" → "10/07/2027" */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

const MONTHS_GEN = [
  "Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου",
  "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου",
];

/** "2027-07-10" → "10 Ιουλίου 2027" */
export function formatDateLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_GEN[m - 1]} ${y}`;
}

/* ── Επίσημα έγγραφα ─────────────────────────────────────────────────────────
   Μόνο όσα υπάρχουν πραγματικά στο public/. Εκκρεμούν από τον πελάτη:
   ΦΕΚ ίδρυσης του ΠΜΣ, Κανονισμός Μεταπτυχιακών Σπουδών. */

export interface OfficialDocument {
  title: string;
  description: string;
  href: string;
  /** Τύπος αρχείου όπως εμφανίζεται στο κουμπί. */
  format: "PDF" | "DOCX";
  size: string;
}

export const officialDocuments: OfficialDocument[] = [
  {
    title: "Έντυπο αίτησης",
    description: "Συμπληρώνεται, υπογράφεται και κατατίθεται μαζί με τα δικαιολογητικά.",
    href: "/aitisi.docx",
    format: "DOCX",
    size: "112 KB",
  },
  {
    title: "Οδηγός Σπουδών",
    description: "Το επίσημο κείμενο: δομή, μαθήματα, ECTS, εισαγωγή και αξιολόγηση.",
    href: "/odigos-spoudon.pdf",
    format: "PDF",
    size: "645 KB",
  },
];

/* ── Δικαιολογητικά ──────────────────────────────────────────────────────────
   Αυτούσια από το επίσημο έντυπο αίτησης (FORM). Ο Οδηγός (σ.7–8) δίνει
   σχεδόν την ίδια λίστα. */

export interface RequiredDocument {
  id: string;
  title: string;
  description: string;
  optional?: boolean;
}

export const requiredDocumentsSource = FORM;

export const requiredDocuments: RequiredDocument[] = [
  {
    id: "aitisi",
    title: "Έντυπο αίτησης",
    description: "Συμπληρωμένο και υπογεγραμμένο.",
  },
  {
    id: "ptyxio",
    title: "Αντίγραφο πτυχίου",
    description:
      "Για τίτλο από την αλλοδαπή, μαζί με πιστοποιητικό ισοτιμίας και αντιστοιχίας από τον ΔΟΑΤΑΠ. Όσοι δεν έχουν ορκιστεί ακόμη: βεβαίωση της Γραμματείας του Τμήματός τους ότι περάτωσαν τις σπουδές και εκκρεμεί μόνο η ορκωμοσία.",
  },
  {
    id: "vathmologia",
    title: "Πιστοποιητικό αναλυτικής βαθμολογίας",
    description: "Από τη Γραμματεία του Τμήματος αποφοίτησης.",
  },
  {
    id: "titloi",
    title: "Λοιποί τίτλοι σπουδών",
    description: "Αντίγραφα επιπλέον τίτλων, εάν υπάρχουν.",
    optional: true,
  },
  {
    id: "cv",
    title: "Σύντομο βιογραφικό σημείωμα",
    description: "Και σε ψηφιακή μορφή (το έντυπο αναφέρει CD).",
  },
  {
    id: "glosses",
    title: "Πιστοποιητικά ξένων γλωσσών",
    description:
      "Καλή γνώση Αγγλικών (ελάχιστο: Lower ή TOEFL 550) ή/και άλλων γλωσσών. Για αλλοδαπούς, και επάρκεια Ελληνικών.",
  },
  {
    id: "dimosieuseis",
    title: "Επιστημονικές δημοσιεύσεις ή διακρίσεις",
    description: "Εάν υπάρχουν.",
    optional: true,
  },
  {
    id: "empeiria",
    title: "Αποδεικτικά επαγγελματικής ή ερευνητικής εμπειρίας",
    description: "Εάν υπάρχουν.",
    optional: true,
  },
  {
    id: "taytotita",
    title: "Αντίγραφο ταυτότητας ή διαβατηρίου",
    description: "Φωτοαντίγραφο αστυνομικού δελτίου ταυτότητας ή διαβατηρίου.",
  },
  {
    id: "systatikes",
    title: "Δύο συστατικές επιστολές",
    description:
      "Σε φάκελο σφραγισμένο και υπογεγραμμένο από τον συντάκτη. Από τον ακαδημαϊκό ή τον επαγγελματικό χώρο.",
  },
];

/* ── Ανεπιβεβαίωτα ───────────────────────────────────────────────────────────
   ΔΕΝ εμφανίζονται στο site μέχρι να τα επιβεβαιώσει ο πελάτης:
   • «μερική φοίτηση» (ο Οδηγός λέει μόνο: ελάχιστο 3, μέγιστο 5 εξάμηνα)
   • καταβολή διδάκτρων σε δόσεις
   • «Ν. 4957/2022» ως θεσμικό πλαίσιο (ο Οδηγός αναφέρει τον ν.4485/2017)
   • «εργαστήρια αιχμής» / συγκεκριμένος εξοπλισμός
   • δεύτερο τηλέφωνο & κτήριο/όροφος Γραμματείας (βλ. contact)
   • βαθμίδες διδασκόντων στο faculty.ts — ο Οδηγός (σ.1) δίνει άλλες για
     μέλη της Συντονιστικής (π.χ. Βαρδάκα «Καθηγήτρια», Γιαννακουδάκη «Λέκτορας»)
   ══════════════════════════════════════════════════════════════════════════ */
