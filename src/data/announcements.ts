/* ══════════════════════════════════════════════════════════════════════════
   announcements.ts — οι ανακοινώσεις του ΠΜΣ
   ──────────────────────────────────────────────────────────────────────────
   Οι ημερομηνίες αιτήσεων ΔΕΝ γράφονται πουθενά στο site με το χέρι. Τις
   φέρνει μια ανακοίνωση της Γραμματείας με πεδίο `admissions`, και η αρχική,
   το /eggrafes και το /nea διαβάζουν την πιο πρόσφατη τέτοια ανακοίνωση.
   Χωρίς ανακοίνωση, το site γράφει μόνο ότι τις ημερομηνίες τις ανακοινώνει
   η Γραμματεία.

   Νέος κύκλος = νέα ανακοίνωση στην αρχή της λίστας. Τίποτε άλλο δεν αλλάζει.

   Προσωρινή πηγή: αυτό το αρχείο. Εκκρεμεί η απόφαση για το πώς θα γράφουν
   η Γραμματεία και ο Διευθυντής τις ανακοινώσεις (email 06/10/2026). Όταν
   αποφασιστεί, η λίστα θα έρχεται από εκεί με το ίδιο σχήμα.
   ══════════════════════════════════════════════════════════════════════════ */

const OLD_SITE_REGISTER = "cosm.ihu.gr/register/ (ενημέρωση 21/08/2026)";
const KEPT_PLACEHOLDER = "Placeholder — διατηρήθηκε με απόφαση 01/10/2026";

export interface AdmissionsWindow {
  /** π.χ. "2026–2027" */
  cycle: string;
  /** π.χ. "β΄ κύκλος", όταν η χρονιά έχει δεύτερη πρόσκληση. */
  round?: string;
  /** ISO ημερομηνίες (ώρα Ελλάδας). Η λήξη μετρά ως το τέλος της ημέρας. */
  opens: string;
  closes: string;
}

export interface Announcement {
  /** Μοναδικό, με λατινικούς χαρακτήρες: γίνεται anchor στο /nea#id. */
  id: string;
  /** "YYYY-MM-DD", ή "YYYY-MM" όταν δεν ξέρουμε τη μέρα. */
  published: string;
  tag: string;
  title: string;
  /** Το κείμενο. Οι ημερομηνίες αιτήσεων μπαίνουν στο `admissions`, όχι εδώ. */
  text: string;
  /** Μόνο στις προσκλήσεις: το διάστημα υποβολής αιτήσεων. */
  admissions?: AdmissionsWindow;
  source: string;
}

const list: Announcement[] = [
  {
    id: "aitiseis-2026-27-b",
    published: "2026-08",
    tag: "Αιτήσεις",
    title: "Αιτήσεις για το 2026–2027 (β΄ κύκλος)",
    text: "Ο φάκελος με τα δικαιολογητικά κατατίθεται στη Γραμματεία του ΠΜΣ.",
    admissions: { cycle: "2026–2027", round: "β΄ κύκλος", opens: "2026-08-20", closes: "2026-09-15" },
    source: OLD_SITE_REGISTER,
  },
  {
    id: "prosklisi-2025-26",
    published: "2025-09",
    tag: "Ανακοίνωση",
    title: "Πρόσκληση Εκδήλωσης Ενδιαφέροντος Ακαδ. Έτους 2025-2026",
    text: "Το Τμήμα Επιστημών Διατροφής και Διαιτολογίας ανακοινώνει την έναρξη του νέου κύκλου σπουδών του ΠΜΣ «Κοσμητολογία».",
    source: KEPT_PLACEHOLDER,
  },
  {
    id: "imerida-fysika-kallyntika",
    published: "2025-10",
    tag: "Εκδήλωση",
    title: "Ημερίδα: Καινοτομία στα Φυσικά Καλλυντικά",
    text: "Ανοιχτή ημερίδα με ομιλητές από τον ακαδημαϊκό χώρο και τη βιομηχανία για τις νέες τάσεις στα προϊόντα φυσικής προέλευσης.",
    source: KEPT_PLACEHOLDER,
  },
  {
    id: "synergasia-diplomatikes",
    published: "2025-11",
    tag: "Έρευνα",
    title: "Νέα συνεργασία για διπλωματικές εργασίες",
    text: "Διεύρυνση του δικτύου συνεργαζόμενων εταιρειών για εκπόνηση διπλωματικών και πρακτική άσκηση φοιτητών.",
    source: KEPT_PLACEHOLDER,
  },
];

/** Νεότερη πρώτη. */
export const announcements = [...list].sort((a, b) => b.published.localeCompare(a.published));

export type AdmissionsAnnouncement = Announcement & { admissions: AdmissionsWindow };

/** Η πιο πρόσφατη πρόσκληση, ή null αν η Γραμματεία δεν έχει βγάλει καμία. */
export const latestAdmissions =
  (announcements.find((a) => a.admissions) as AdmissionsAnnouncement | undefined) ?? null;

export type AdmissionsStatus = "upcoming" | "open" | "closed";

export function admissionsStatus(w: AdmissionsWindow, now: Date): AdmissionsStatus {
  const opens = new Date(`${w.opens}T00:00:00+03:00`);
  const closes = new Date(`${w.closes}T23:59:59+03:00`);
  if (now < opens) return "upcoming";
  if (now <= closes) return "open";
  return "closed";
}

/** Πόσο από το διάστημα υποβολής έχει περάσει: 0 πριν ανοίξει, 1 μετά τη λήξη. */
export function admissionsProgress(w: AdmissionsWindow, now: Date): number {
  const opens = new Date(`${w.opens}T00:00:00+03:00`).getTime();
  const closes = new Date(`${w.closes}T23:59:59+03:00`).getTime();
  return Math.min(1, Math.max(0, (now.getTime() - opens) / (closes - opens)));
}

/** "2026–2027" ή "2026–2027 · β΄ κύκλος" */
export function cycleLabel(w: AdmissionsWindow) {
  return w.round ? `${w.cycle} · ${w.round}` : w.cycle;
}

const MONTHS_NOM = [
  "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
  "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος",
];

/** "2026-08-21" → "21/08/2026" · "2025-09" → "Σεπτέμβριος 2025" */
export function formatPublished(p: string) {
  const [y, m, d] = p.split("-");
  return d ? `${d}/${m}/${y}` : `${MONTHS_NOM[Number(m) - 1]} ${y}`;
}

const MONTHS_SHORT = ["ΙΑΝ", "ΦΕΒ", "ΜΑΡ", "ΑΠΡ", "ΜΑΪ", "ΙΟΥΝ", "ΙΟΥΛ", "ΑΥΓ", "ΣΕΠ", "ΟΚΤ", "ΝΟΕ", "ΔΕΚ"];

/** Για το «ημερολόγιο» δίπλα σε κάθε ανακοίνωση: "2025-11" → { month: "ΝΟΕ", year: "2025" }. */
export function publishedParts(p: string): { day?: string; month: string; year: string } {
  const [y, m, d] = p.split("-");
  return { day: d ? String(Number(d)) : undefined, month: MONTHS_SHORT[Number(m) - 1], year: y };
}
