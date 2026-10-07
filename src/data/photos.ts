/* ══════════════════════════════════════════════════════════════════════════
   photos — every photo frame on the site, in one place
   ──────────────────────────────────────────────────────────────────────────
   Each frame (<PhotoSlot/>, <PhotoBand/>) reads its photo from here. While
   `src` is null the frame shows a placeholder that says what belongs in it
   and the size it needs. To add a photo:

     1. put the file in public/images/ (JPG or WebP),
     2. set `src` below, e.g. src: "/images/ktirio.jpg".

   `position` is the CSS object-position of the crop (e.g. "50% 30%" keeps
   the top of a building in a wide band).
   ══════════════════════════════════════════════════════════════════════════ */

export interface PhotoSpec {
  /** Path under public/, e.g. "/images/ktirio.jpg". null → placeholder. */
  src: string | null;
  /** Describes the photo for screen readers (and search engines). */
  alt: string;
  /** What belongs in the frame — printed on the placeholder. */
  label: string;
  /** The size/orientation the frame needs — printed on the placeholder. */
  hint: string;
  /** object-position of the crop. */
  position?: string;
}

export const photos = {
  /* Home — beside «Ανακοινώσεις» (right third; a tall crop on desktop) */
  homeEvents: {
    src: null,
    alt: "Φοιτητές και διδάσκοντες του ΠΜΣ σε εκδήλωση του Τμήματος",
    label: "Φωτογραφία φοιτητών ή εκδήλωσης",
    hint: "Κάθετη ή τετράγωνη, τουλάχιστον 1200 × 1500 px",
  },

  /* Home — beside «Πρόγραμμα σπουδών» (left third; a tall crop on desktop) */
  homeLab: {
    src: null,
    alt: "Φοιτητές του ΠΜΣ σε εργαστηριακή άσκηση",
    label: "Φωτογραφία εργαστηρίου",
    hint: "Κάθετη ή τετράγωνη, τουλάχιστον 1200 × 1500 px",
  },

  /* Home — the director's letter */
  director: {
    src: "/nasos.jpg",
    alt: "Αθανάσιος Παπαδόπουλος, Διευθυντής του ΠΜΣ",
    label: "Πορτρέτο Διευθυντή",
    hint: "Κάθετη 4:5, τουλάχιστον 800 × 1000 px",
    position: "50% 30%",
  },

  /* /sxetika — under the page title */
  building: {
    src: null,
    alt: "Το κτίριο του Τμήματος στην Αλεξάνδρεια Πανεπιστημιούπολη, Σίνδος",
    label: "Φωτογραφία κτιρίου του Τμήματος",
    hint: "Οριζόντια, τουλάχιστον 2400 × 1000 px",
  },

  /* /programma — under the page title */
  classroom: {
    src: null,
    alt: "Αίθουσα διδασκαλίας του ΠΜΣ Κοσμητολογία",
    label: "Φωτογραφία αίθουσας ή αμφιθεάτρου",
    hint: "Οριζόντια, τουλάχιστον 2400 × 1000 px",
  },

  /* /programma — «Θεωρία και εργαστήριο» */
  labPractice: {
    src: null,
    alt: "Εργαστηριακή άσκηση στην παρασκευή καλλυντικών",
    label: "Φωτογραφία εργαστηριακής άσκησης",
    hint: "Οριζόντια 16:10, τουλάχιστον 1600 × 1000 px",
  },
} satisfies Record<string, PhotoSpec>;

export type PhotoKey = keyof typeof photos;
