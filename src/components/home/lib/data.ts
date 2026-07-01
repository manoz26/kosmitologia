/* ══════════════════════════════════════════════════════════════════════════
   home/lib/data — content for the λαχανί homepage
   ──────────────────────────────────────────────────────────────────────────
   All copy lives here (Greek, on-brand ΔΙΠΑΕ voice) so the section components
   stay purely presentational. Icons are referenced by string key and resolved
   through `getIcon` in primitives.tsx.
   ══════════════════════════════════════════════════════════════════════════ */

export type IconKey =
  | "sprout"
  | "flask"
  | "flask-round"
  | "microscope"
  | "heart-pulse"
  | "rocket"
  | "sparkles"
  | "atom"
  | "droplets"
  | "droplet"
  | "dna"
  | "shield"
  | "gauge"
  | "leaf"
  | "test-tubes"
  | "scale"
  | "apple"
  | "stethoscope"
  | "pill"
  | "scan-face"
  | "graduation"
  | "search"
  | "briefcase"
  | "factory"
  | "heart-handshake"
  | "beaker"
  | "brain"
  | "award"
  | "users"
  | "building"
  | "calendar"
  | "clock"
  | "euro"
  | "map-pin"
  | "book"
  | "lightbulb"
  | "target"
  | "trending"
  | "check"
  | "quote"
  | "star"
  | "layers"
  | "wand"
  | "gem"
  | "palette"
  | "globe"
  | "sun"
  | "waves"
  | "hexagon"
  | "orbit";

/* ────────────────────────────────────────────
   Hero — headline rotation + quick facts
   ──────────────────────────────────────────── */

export const heroRotatingWords: string[] = [
  "καλλυντικού.",
  "δέρματος.",
  "φυσικού συστατικού.",
  "ποιοτικού ελέγχου.",
  "αντιγήρανσης.",
  "ωραίου που έχει βάση.",
];

export interface HeroFact {
  icon: IconKey;
  value: string;
  label: string;
}

export const heroFacts: HeroFact[] = [
  { icon: "calendar", value: "3", label: "Εξάμηνα σπουδών" },
  { icon: "award", value: "90", label: "Πιστωτικές ECTS" },
  { icon: "layers", value: "2", label: "Κατευθύνσεις" },
  { icon: "users", value: "40", label: "Φοιτητές / έτος" },
];

/* ────────────────────────────────────────────
   Marquee keyword strips
   ──────────────────────────────────────────── */

export const marqueePrimary: string[] = [
  "Κοσμητολογία",
  "Σχεδιασμός Φορμουλών",
  "Δερματολογία",
  "Ενόργανη Ανάλυση",
  "Φυσικά Συστατικά",
  "Ποιοτικός Έλεγχος",
  "Αντιγήρανση",
  "Καινοτομία",
  "Βιωσιμότητα",
  "R&D",
];

export const marqueeSecondary: string[] = [
  "HPLC",
  "Μικροβίωμα Δέρματος",
  "Πεπτίδια",
  "Encapsulation",
  "Ρεολογία",
  "Νομοθεσία 1223/2009",
  "Πράσινη Χημεία",
  "Branding",
  "Clinical Cosmetology",
  "Nutricosmetics",
];

/* ────────────────────────────────────────────
   Institution / identity highlights
   ──────────────────────────────────────────── */

export interface IdentityHighlight {
  icon: IconKey;
  title: string;
  value: string;
  description: string;
}

export const identityHighlights: IdentityHighlight[] = [
  {
    icon: "building",
    title: "ΔΙΠΑΕ",
    value: "Αλεξάνδρεια Πανεπιστημιούπολη",
    description:
      "Το ΠΜΣ λειτουργεί στις ιδιόκτητες εγκαταστάσεις της Σίνδου Θεσσαλονίκης, σε ένα campus 1.600 στρεμμάτων.",
  },
  {
    icon: "microscope",
    title: "Εργαστήρια",
    value: "Σύγχρονος εξοπλισμός",
    description:
      "Πλήρως εξοπλισμένα εργαστήρια χημείας, ενόργανης ανάλυσης και παρασκευής καλλυντικών για πρακτική εκπαίδευση.",
  },
  {
    icon: "calendar",
    title: "Διάρκεια",
    value: "3 εξάμηνα · 90 ECTS",
    description:
      "Πλήρης φοίτηση τριών εξαμήνων, με δυνατότητα μερικής φοίτησης έως πέντε εξάμηνα για εργαζόμενους.",
  },
  {
    icon: "euro",
    title: "Δίδακτρα",
    value: "€2.400",
    description:
      "Συνολικά δίδακτρα για ολόκληρο το πρόγραμμα, με δυνατότητα απαλλαγής έως 30% των φοιτητών (Ν. 4957/2022).",
  },
];

/* ────────────────────────────────────────────
   The two specialisation pillars
   ──────────────────────────────────────────── */

export interface Pillar {
  id: string;
  index: string;
  icon: IconKey;
  title: string;
  subtitle: string;
  description: string;
  bullets: { icon: IconKey; text: string }[];
  from: string;
  to: string;
  glow: string;
  accent: string;
}

export const pillars: Pillar[] = [
  {
    id: "preparation",
    index: "Α",
    icon: "flask",
    title: "Παρασκευή & Αξιολόγηση Καλλυντικών",
    subtitle: "Preparation & Evaluation of Cosmetic Products",
    description:
      "Εστίαση στη σύνθεση, τα δραστικά συστατικά, τα καινοτόμα προϊόντα φυσικής προέλευσης και τον αυστηρό ποιοτικό και ενόργανο έλεγχο των καλλυντικών.",
    bullets: [
      { icon: "droplets", text: "Συστατικά & φυσικά εκχυλίσματα" },
      { icon: "microscope", text: "Μέθοδοι ενόργανης ανάλυσης" },
      { icon: "scale", text: "Παρασκευή & Νομοθεσία" },
    ],
    from: "#5F712A",
    to: "#B9D84A",
    glow: "rgba(165,186,95,0.55)",
    accent: "#879D42",
  },
  {
    id: "dermatology",
    index: "Β",
    icon: "heart-pulse",
    title: "Κοσμητολογία στη Δερματολογία",
    subtitle: "Applications of Cosmetology in Dermatology",
    description:
      "Εμβάθυνση στη φυσιολογία και το μικροβίωμα του δέρματος, τη συνέργεια διατροφής και κοσμητολογίας, και την παθοφυσιολογία της αντιγήρανσης.",
    bullets: [
      { icon: "scan-face", text: "Στοιχεία δερματολογίας" },
      { icon: "heart-pulse", text: "Παθοφυσιολογία αντιγήρανσης" },
      { icon: "apple", text: "Συνέργεια διατροφής" },
    ],
    from: "#3A6B2E",
    to: "#9FCB4C",
    glow: "rgba(135,157,66,0.5)",
    accent: "#5F712A",
  },
];

/* ────────────────────────────────────────────
   The 5-stage journey of a cosmetic (green theme)
   ──────────────────────────────────────────── */

export interface JourneyStage {
  id: string;
  index: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  points: { icon: IconKey; text: string }[];
  tags: string[];
  icon: IconKey;
  from: string;
  to: string;
  glow: string;
  accent: string;
}

export const journeyStages: JourneyStage[] = [
  {
    id: "research",
    index: "01",
    kicker: "Στάδιο 01 · Πρώτες ύλες",
    title: "Έρευνα & Πρώτες Ύλες",
    subtitle: "Από τη φύση στο εργαστήριο",
    description:
      "Κάθε καλλυντικό ξεκινά από τη βαθιά γνώση των συστατικών του. Μελετάμε δραστικά συστατικά φυσικής προέλευσης, την προέλευση και τη βιοδραστικότητά τους, και τον τρόπο που αλληλεπιδρούν με το δέρμα.",
    points: [
      { icon: "sprout", text: "Δραστικά συστατικά & εκχυλίσματα φυσικής προέλευσης" },
      { icon: "dna", text: "Βιοδιαθεσιμότητα & μηχανισμοί δράσης στο δέρμα" },
      { icon: "shield", text: "Βιωσιμότητα & υπεύθυνη προμήθεια πρώτων υλών" },
    ],
    tags: ["Φυτικά εκχυλίσματα", "Πεπτίδια", "Αντιοξειδωτικά"],
    icon: "sprout",
    from: "#4F6321",
    to: "#A5BA5F",
    glow: "rgba(135,157,66,0.55)",
    accent: "#7E9636",
  },
  {
    id: "formulation",
    index: "02",
    kicker: "Στάδιο 02 · Σύνθεση",
    title: "Σχεδιασμός & Παρασκευή",
    subtitle: "Η χημεία της σύνθεσης",
    description:
      "Μετατρέπουμε τα συστατικά σε σταθερά, λειτουργικά σκευάσματα. Γαλακτώματα, gels και ορότες σχεδιάζονται με ακρίβεια ώστε να συνδυάζουν αποτελεσματικότητα, σταθερότητα και αισθητηριακή εμπειρία.",
    points: [
      { icon: "droplets", text: "Γαλακτώματα, ορότες & συστήματα μεταφοράς" },
      { icon: "gauge", text: "Σταθερότητα, ρεολογία & συντήρηση" },
      { icon: "sparkles", text: "Αισθητηριακός σχεδιασμός υφής & αρώματος" },
    ],
    tags: ["Γαλακτώματα", "Ρεολογία", "Encapsulation"],
    icon: "flask",
    from: "#5C7726",
    to: "#B9D84A",
    glow: "rgba(165,186,95,0.55)",
    accent: "#879D42",
  },
  {
    id: "analysis",
    index: "03",
    kicker: "Στάδιο 03 · Έλεγχος",
    title: "Ενόργανη Ανάλυση & Ποιοτικός Έλεγχος",
    subtitle: "Η απόδειξη πίσω από τον ισχυρισμό",
    description:
      "Κάθε σκεύασμα περνά από αυστηρό ενόργανο έλεγχο. Με σύγχρονες αναλυτικές τεχνικές πιστοποιούμε την ταυτότητα, την καθαρότητα και τη σταθερότητα, μετατρέποντας τα δεδομένα σε εγγύηση ποιότητας.",
    points: [
      { icon: "microscope", text: "Φασματοσκοπία & χρωματογραφικές τεχνικές" },
      { icon: "gauge", text: "Έλεγχος pH, ιξώδους & μικροβιακού φορτίου" },
      { icon: "check", text: "Μελέτες σταθερότητας & διάρκειας ζωής" },
    ],
    tags: ["HPLC", "Φασματοσκοπία", "Quality Control"],
    icon: "microscope",
    from: "#3F6B3A",
    to: "#8FC06A",
    glow: "rgba(122,176,96,0.52)",
    accent: "#5E9A4E",
  },
  {
    id: "clinical",
    index: "04",
    kicker: "Στάδιο 04 · Αξιολόγηση",
    title: "Κλινική & Δερματολογική Αξιολόγηση",
    subtitle: "Στο επίκεντρο, το δέρμα",
    description:
      "Συνδέουμε την κοσμητολογία με τη δερματολογία. Μελετάμε τη φυσιολογία και το μικροβίωμα του δέρματος, την παθοφυσιολογία της γήρανσης και τεκμηριώνουμε in vivo την αποτελεσματικότητα και την ασφάλεια.",
    points: [
      { icon: "heart-pulse", text: "Φυσιολογία & μικροβίωμα του δέρματος" },
      { icon: "dna", text: "Παθοφυσιολογία & μηχανισμοί αντιγήρανσης" },
      { icon: "gauge", text: "Μετρήσεις ενυδάτωσης, ελαστικότητας & in vivo δοκιμές" },
    ],
    tags: ["Μικροβίωμα", "Αντιγήρανση", "In vivo"],
    icon: "heart-pulse",
    from: "#356B4E",
    to: "#7FC79A",
    glow: "rgba(110,180,140,0.5)",
    accent: "#3E9466",
  },
  {
    id: "market",
    index: "05",
    kicker: "Στάδιο 05 · Αγορά",
    title: "Καινοτομία & Αγορά",
    subtitle: "Από το concept στο ράφι",
    description:
      "Το τελικό προϊόν συναντά την αγορά. Συνδυάζουμε νομοθεσία, ασφάλεια, branding και επιχειρηματικότητα, ώστε οι απόφοιτοι να δημιουργούν καινοτόμα, ασφαλή και ανταγωνιστικά προϊόντα υψηλής προστιθέμενης αξίας.",
    points: [
      { icon: "shield", text: "Ευρωπαϊκή νομοθεσία & φάκελος ασφάλειας" },
      { icon: "rocket", text: "Branding, marketing & επιχειρηματικότητα" },
      { icon: "sparkles", text: "Καινοτομία υψηλής προστιθέμενης αξίας" },
    ],
    tags: ["Νομοθεσία", "Branding", "Startup"],
    icon: "rocket",
    from: "#6E7C1E",
    to: "#C8E25E",
    glow: "rgba(200,226,94,0.5)",
    accent: "#9DAE2E",
  },
];

/* ────────────────────────────────────────────
   Programme statistics (constellation)
   ──────────────────────────────────────────── */

export interface ProgramStat {
  icon: IconKey;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
}

export const programStats: ProgramStat[] = [
  { icon: "calendar", value: 3, label: "Εξάμηνα", sub: "Ελάχιστη διάρκεια σπουδών" },
  { icon: "award", value: 90, suffix: " ECTS", label: "Πιστωτικές μονάδες", sub: "Πλήρες πρόγραμμα" },
  { icon: "layers", value: 2, label: "Κατευθύνσεις", sub: "Εξειδικευμένη γνώση" },
  { icon: "users", value: 40, label: "Φοιτητές / έτος", sub: "Μικρά, εστιασμένα τμήματα" },
  { icon: "book", value: 14, label: "Μαθήματα", sub: "Κορμού & ειδίκευσης" },
  { icon: "euro", value: 2400, prefix: "€", label: "Δίδακτρα", sub: "Με δυνατότητα απαλλαγής 30%" },
];

/* ────────────────────────────────────────────
   Why choose us
   ──────────────────────────────────────────── */

export interface Reason {
  icon: IconKey;
  title: string;
  description: string;
}

export const reasons: Reason[] = [
  {
    icon: "flask-round",
    title: "Εργαστηριακή Πρακτική",
    description:
      "Πραγματική παρασκευή και ενόργανη ανάλυση καλλυντικών σε σύγχρονα εργαστήρια — όχι μόνο θεωρία.",
  },
  {
    icon: "users",
    title: "Διεπιστημονικό Σώμα ΔΕΠ",
    description:
      "Καθηγητές από ΔΙΠΑΕ, ΑΠΘ, ΠΑΔΑ και τη βιομηχανία, που γεφυρώνουν χημεία, δερματολογία και επιχειρηματικότητα.",
  },
  {
    icon: "scale",
    title: "Κανονιστική Επάρκεια",
    description:
      "Βαθιά γνώση του Ευρωπαϊκού Κανονισμού 1223/2009, GMP και του φακέλου ασφάλειας προϊόντος.",
  },
  {
    icon: "trending",
    title: "Επαγγελματική Απορρόφηση",
    description:
      "Προφίλ αποφοίτου έτοιμο για R&D, ποιοτικό έλεγχο, κλινική κοσμητολογία και δική του επιχείρηση.",
  },
  {
    icon: "clock",
    title: "Ευέλικτο Πρόγραμμα",
    description:
      "Μαθήματα Παρασκευή–Κυριακή και δυνατότητα μερικής φοίτησης για εργαζόμενους φοιτητές.",
  },
  {
    icon: "globe",
    title: "Δίκτυο & Διασυνδέσεις",
    description:
      "Συνεργασίες με εταιρείες του κλάδου για πρακτική άσκηση, διπλωματικές και ευκαιρίες σταδιοδρομίας.",
  },
];

/* ────────────────────────────────────────────
   Labs & infrastructure
   ──────────────────────────────────────────── */

export interface LabFeature {
  icon: IconKey;
  title: string;
  description: string;
  tags: string[];
}

export const labFeatures: LabFeature[] = [
  {
    icon: "test-tubes",
    title: "Εργαστήριο Παρασκευής",
    description:
      "Σχεδιασμός και παρασκευή γαλακτωμάτων, gels, ορότων και στερεών μορφών με βιομηχανικά πρότυπα.",
    tags: ["Γαλακτώματα", "Ομογενοποίηση", "GMP"],
  },
  {
    icon: "microscope",
    title: "Ενόργανη Ανάλυση",
    description:
      "HPLC, GC-MS, UV-Vis και φασματοσκοπικές τεχνικές για ταυτοποίηση και ποιοτικό έλεγχο.",
    tags: ["HPLC", "GC-MS", "UV-Vis"],
  },
  {
    icon: "scan-face",
    title: "Αξιολόγηση Δέρματος",
    description:
      "Μη επεμβατικές μετρήσεις ενυδάτωσης, ελαστικότητας και φραγμού για in vivo τεκμηρίωση.",
    tags: ["Corneometry", "In vivo", "Biophysics"],
  },
  {
    icon: "dna",
    title: "Μικροβιολογία & Ασφάλεια",
    description:
      "Έλεγχος μικροβιακού φορτίου, challenge tests και μελέτες σταθερότητας για ασφαλή προϊόντα.",
    tags: ["Challenge test", "Σταθερότητα", "Ασφάλεια"],
  },
];

/* ────────────────────────────────────────────
   Admission timeline
   ──────────────────────────────────────────── */

export interface AdmissionStep {
  index: string;
  icon: IconKey;
  title: string;
  description: string;
}

export const admissionSteps: AdmissionStep[] = [
  {
    index: "01",
    icon: "calendar",
    title: "Πρόσκληση Εκδήλωσης Ενδιαφέροντος",
    description:
      "Παρακολουθήστε τις ανακοινώσεις για την έναρξη υποβολής αιτήσεων του νέου ακαδημαϊκού κύκλου.",
  },
  {
    index: "02",
    icon: "book",
    title: "Προετοιμασία Φακέλου",
    description:
      "Συγκεντρώστε πτυχίο, αναλυτική βαθμολογία, βιογραφικό, πιστοποιητικά γλωσσομάθειας και 2 συστατικές επιστολές.",
  },
  {
    index: "03",
    icon: "search",
    title: "Υποβολή Αίτησης",
    description:
      "Καταθέστε ηλεκτρονικά την αίτηση και τα δικαιολογητικά εντός της προθεσμίας της προκήρυξης.",
  },
  {
    index: "04",
    icon: "scale",
    title: "Αξιολόγηση Υποψηφιότητας",
    description:
      "Χωρίς γραπτές εξετάσεις — αξιολόγηση φακέλου με μόρια σε συνάφεια πτυχίου, βαθμό και εμπειρία.",
  },
  {
    index: "05",
    icon: "graduation",
    title: "Εγγραφή & Έναρξη",
    description:
      "Οι επιτυχόντες εγγράφονται και ξεκινούν το ταξίδι τους στην επιστήμη της κοσμητολογίας.",
  },
];

export const evaluationCriteria: { label: string; weight: number }[] = [
  { label: "Συνάφεια πτυχίου", weight: 10 },
  { label: "Βαθμός πτυχίου", weight: 20 },
  { label: "Βαθμοί σε σχετικά μαθήματα", weight: 10 },
  { label: "Επαγγελματική / ερευνητική εμπειρία", weight: 35 },
  { label: "Συστατικές επιστολές & συνέντευξη", weight: 25 },
];

/* ────────────────────────────────────────────
   Testimonials
   ──────────────────────────────────────────── */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Πέρασα από τη θεωρία στο πραγματικό εργαστήριο. Σήμερα σχεδιάζω φόρμουλες σε τμήμα R&D — το ΠΜΣ μου έδωσε ακριβώς αυτή τη γέφυρα.",
    name: "Δήμητρα Κ.",
    role: "R&D Formulator, Βιομηχανία Καλλυντικών",
    initials: "ΔΚ",
    accent: "#879D42",
  },
  {
    quote:
      "Η συνέργεια δερματολογίας και κοσμητολογίας άλλαξε τον τρόπο που προσεγγίζω τους ασθενείς μου στην κλινική αισθητική.",
    name: "Νίκος Π.",
    role: "Clinical Skincare Specialist",
    initials: "ΝΠ",
    accent: "#5F712A",
  },
  {
    quote:
      "Από την ενόργανη ανάλυση μέχρι τη νομοθεσία, απέκτησα όλα τα εργαλεία για να λανσάρω το δικό μου brand φυσικών καλλυντικών.",
    name: "Ελένη Μ.",
    role: "Founder, Natural Cosmetics Startup",
    initials: "ΕΜ",
    accent: "#9DAE2E",
  },
  {
    quote:
      "Το μικρό μέγεθος των τμημάτων σημαίνει πραγματική επαφή με τους καθηγητές. Ένιωσα μέλος μιας ερευνητικής ομάδας.",
    name: "Γιώργος Α.",
    role: "Quality Control Manager",
    initials: "ΓΑ",
    accent: "#3E9466",
  },
];

/* ────────────────────────────────────────────
   Latest news (placeholder cards)
   ──────────────────────────────────────────── */

export interface NewsItem {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}

export const newsItems: NewsItem[] = [
  {
    tag: "Ανακοίνωση",
    date: "Σεπτέμβριος 2025",
    title: "Πρόσκληση Εκδήλωσης Ενδιαφέροντος Ακαδ. Έτους 2025-2026",
    excerpt:
      "Το Τμήμα Επιστημών Διατροφής και Διαιτολογίας ανακοινώνει την έναρξη του νέου κύκλου σπουδών του ΠΜΣ «Κοσμητολογία».",
  },
  {
    tag: "Εκδήλωση",
    date: "Οκτώβριος 2025",
    title: "Ημερίδα: Καινοτομία στα Φυσικά Καλλυντικά",
    excerpt:
      "Ανοιχτή ημερίδα με ομιλητές από τον ακαδημαϊκό χώρο και τη βιομηχανία για τις νέες τάσεις στα προϊόντα φυσικής προέλευσης.",
  },
  {
    tag: "Έρευνα",
    date: "Νοέμβριος 2025",
    title: "Νέα συνεργασία για διπλωματικές εργασίες",
    excerpt:
      "Διεύρυνση του δικτύου συνεργαζόμενων εταιρειών για εκπόνηση διπλωματικών και πρακτική άσκηση φοιτητών.",
  },
];

/* ────────────────────────────────────────────
   Career snapshot (used on the home overview)
   ──────────────────────────────────────────── */

export interface CareerSnapshot {
  icon: IconKey;
  title: string;
  description: string;
  roles: string[];
}

export const careerSnapshots: CareerSnapshot[] = [
  {
    icon: "flask",
    title: "Έρευνα & Ανάπτυξη",
    description: "Σχεδιασμός φορμουλών και αξιολόγηση καινοτόμων προϊόντων σε τμήματα R&D.",
    roles: ["R&D Scientist", "Formulator"],
  },
  {
    icon: "factory",
    title: "Βιομηχανία",
    description: "Ποιοτικός έλεγχος, διασφάλιση ποιότητας και κανονιστική συμμόρφωση.",
    roles: ["QC Manager", "Regulatory Affairs"],
  },
  {
    icon: "heart-handshake",
    title: "Υγεία & Αισθητική",
    description: "Κλινική κοσμητολογία και συνεργασία με δερματολόγους.",
    roles: ["Skincare Specialist", "Dermo Consultant"],
  },
  {
    icon: "rocket",
    title: "Επιχειρηματικότητα",
    description: "Δημιουργία brand καλλυντικών και B2B consulting.",
    roles: ["Founder", "Brand Manager"],
  },
];

/* ────────────────────────────────────────────
   Active ingredients — 3D rotating showcase
   ──────────────────────────────────────────── */

export interface Ingredient {
  id: string;
  name: string;
  inci: string;
  benefit: string;
  description: string;
  icon: IconKey;
  from: string;
  to: string;
  accent: string;
  fact: string;
}

export const ingredients: Ingredient[] = [
  {
    id: "ha",
    name: "Υαλουρονικό Οξύ",
    inci: "Sodium Hyaluronate",
    benefit: "Βαθιά ενυδάτωση",
    description:
      "Συγκρατεί έως και 1000 φορές το βάρος του σε νερό, γεμίζοντας το δέρμα με υγρασία και βελτιώνοντας την ελαστικότητα.",
    icon: "droplets",
    from: "#7E9636",
    to: "#B9D84A",
    accent: "#879D42",
    fact: "1g δεσμεύει έως 6 λίτρα νερού",
  },
  {
    id: "niacinamide",
    name: "Νιασιναμίδη",
    inci: "Niacinamide (Vitamin B3)",
    benefit: "Φραγμός & λάμψη",
    description:
      "Ενισχύει τον δερματικό φραγμό, ρυθμίζει το σμήγμα και ομοιομορφοποιεί τον τόνο, μειώνοντας τις κηλίδες.",
    icon: "sparkles",
    from: "#5E9A4E",
    to: "#9FCB4C",
    accent: "#5E9A4E",
    fact: "Δραστική σε συγκέντρωση 2–5%",
  },
  {
    id: "retinol",
    name: "Ρετινόλη",
    inci: "Retinol (Vitamin A)",
    benefit: "Κυτταρική ανανέωση",
    description:
      "Επιταχύνει την ανανέωση των κυττάρων και διεγείρει το κολλαγόνο — χρυσό πρότυπο της αντιγήρανσης.",
    icon: "dna",
    from: "#6E7C1E",
    to: "#C8E25E",
    accent: "#9DAE2E",
    fact: "Μετατρέπεται σε ρετινοϊκό οξύ",
  },
  {
    id: "vitc",
    name: "Βιταμίνη C",
    inci: "Ascorbic Acid",
    benefit: "Αντιοξειδωτική θωράκιση",
    description:
      "Εξουδετερώνει τις ελεύθερες ρίζες, φωτίζει την επιδερμίδα και υποστηρίζει τη σύνθεση κολλαγόνου.",
    icon: "sun",
    from: "#8A9A24",
    to: "#D4E26A",
    accent: "#9DAE2E",
    fact: "Ασταθής — απαιτεί σταθεροποίηση",
  },
  {
    id: "peptides",
    name: "Πεπτίδια",
    inci: "Palmitoyl Peptides",
    benefit: "Σύνθεση κολλαγόνου",
    description:
      "Μικρές αλυσίδες αμινοξέων που «σηματοδοτούν» στο δέρμα να παράγει περισσότερο κολλαγόνο και ελαστίνη.",
    icon: "atom",
    from: "#4F6321",
    to: "#A5BA5F",
    accent: "#7E9636",
    fact: "Δρουν ως αγγελιοφόροι κυττάρων",
  },
  {
    id: "bha",
    name: "Σαλικυλικό Οξύ",
    inci: "Salicylic Acid (BHA)",
    benefit: "Απολέπιση πόρων",
    description:
      "Λιποδιαλυτό οξύ που εισχωρεί στους πόρους, διαλύει το σμήγμα και εξομαλύνει την υφή του δέρματος.",
    icon: "beaker",
    from: "#3F6B3A",
    to: "#8FC06A",
    accent: "#5E9A4E",
    fact: "Ιδανικό για λιπαρές επιδερμίδες",
  },
  {
    id: "ceramides",
    name: "Κεραμίδια",
    inci: "Ceramide NP",
    benefit: "Ενίσχυση φραγμού",
    description:
      "Λιπίδια που «κολλούν» τα κύτταρα της επιδερμίδας, αποτρέποντας την απώλεια υγρασίας και τους ερεθισμούς.",
    icon: "shield",
    from: "#356B4E",
    to: "#7FC79A",
    accent: "#3E9466",
    fact: "Φυσικό «τσιμέντο» της επιδερμίδας",
  },
  {
    id: "greentea",
    name: "Εκχύλισμα Πράσινου Τσαγιού",
    inci: "Camellia Sinensis",
    benefit: "Αντιφλεγμονώδες",
    description:
      "Πλούσιο σε πολυφαινόλες (EGCG) με ισχυρή αντιοξειδωτική και καταπραϋντική δράση για ευαίσθητες επιδερμίδες.",
    icon: "leaf",
    from: "#4F6321",
    to: "#9FCB4C",
    accent: "#5F712A",
    fact: "Φυσικής προέλευσης πολυφαινόλες",
  },
];

/* ────────────────────────────────────────────
   Skills the graduate masters
   ──────────────────────────────────────────── */

export interface Skill {
  label: string;
  level: number; // 0..100
  icon: IconKey;
  category: string;
}

export const skills: Skill[] = [
  { label: "Σχεδιασμός Φορμουλών", level: 92, icon: "flask", category: "R&D" },
  { label: "Ενόργανη Ανάλυση", level: 88, icon: "microscope", category: "Ανάλυση" },
  { label: "Δερματολογική Αξιολόγηση", level: 85, icon: "scan-face", category: "Κλινική" },
  { label: "Ποιοτικός Έλεγχος", level: 90, icon: "gauge", category: "QC" },
  { label: "Κανονιστική Συμμόρφωση", level: 80, icon: "scale", category: "Regulatory" },
  { label: "Μικροβιολογική Ασφάλεια", level: 78, icon: "dna", category: "Ασφάλεια" },
  { label: "Έρευνα & Μεθοδολογία", level: 86, icon: "search", category: "Έρευνα" },
  { label: "Βιωσιμότητα & Πράσινη Χημεία", level: 82, icon: "leaf", category: "Sustainability" },
  { label: "Επιχειρηματικότητα", level: 75, icon: "rocket", category: "Business" },
  { label: "Branding & Marketing", level: 72, icon: "palette", category: "Business" },
];

/* ────────────────────────────────────────────
   Skin science — cross-section layers
   ──────────────────────────────────────────── */

export interface SkinLayer {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  depth: string;
  icon: IconKey;
  from: string;
  to: string;
  accent: string;
}

export const skinLayers: SkinLayer[] = [
  {
    id: "epidermis",
    name: "Επιδερμίδα",
    subtitle: "Stratum corneum & φραγμός",
    description:
      "Το εξωτερικό προστατευτικό στρώμα. Εδώ δρα ο δερματικός φραγμός — στόχος των ενυδατικών και των κεραμιδίων.",
    depth: "0,1–1,5 mm",
    icon: "shield",
    from: "#8A9A24",
    to: "#C8E25E",
    accent: "#9DAE2E",
  },
  {
    id: "dermis",
    name: "Χόριο (Δερμίδα)",
    subtitle: "Κολλαγόνο & ελαστίνη",
    description:
      "Το «σκελετικό» στρώμα με κολλαγόνο, ελαστίνη και υαλουρονικό. Εδώ παίζεται η μάχη της αντιγήρανσης.",
    depth: "1,5–4 mm",
    icon: "dna",
    from: "#5E9A4E",
    to: "#9FCB4C",
    accent: "#5E9A4E",
  },
  {
    id: "hypodermis",
    name: "Υποδόριος Ιστός",
    subtitle: "Λιπώδες στρώμα",
    description:
      "Το βαθύτερο στρώμα με λιποκύτταρα — θερμομόνωση, αποθήκευση ενέργειας και στήριξη της δομής του δέρματος.",
    depth: "> 4 mm",
    icon: "heart-pulse",
    from: "#3E7A4E",
    to: "#7FC79A",
    accent: "#3E9466",
  },
];

/* ────────────────────────────────────────────
   Partners / network ribbon
   ──────────────────────────────────────────── */

export const partners: string[] = [
  "Βιομηχανία Καλλυντικών",
  "Φαρμακοβιομηχανία",
  "Ερευνητικά Κέντρα",
  "Δερματολογικές Κλινικές",
  "Εταιρείες Πρώτων Υλών",
  "Startups Ομορφιάς",
  "Εργαστήρια Ποιοτικού Ελέγχου",
  "Κέντρα Ιατρικής Αισθητικής",
  "ΑΠΘ",
  "ΠΑΔΑ",
  "UNIC",
  "ΙΕΚ & ΚΔΒΜ",
];

/* ────────────────────────────────────────────
   Campus facts (map section)
   ──────────────────────────────────────────── */

export interface CampusFact {
  icon: IconKey;
  label: string;
  value: string;
}

export const campusFacts: CampusFact[] = [
  { icon: "building", label: "Ίδρυμα", value: "Διεθνές Πανεπιστήμιο της Ελλάδος" },
  { icon: "map-pin", label: "Διεύθυνση", value: "Αλεξάνδρεια Πανεπιστημιούπολη, 57400 Σίνδος" },
  { icon: "globe", label: "Έκταση", value: "1.600 στρέμματα ιδιόκτητων εγκαταστάσεων" },
  { icon: "graduation", label: "Τμήμα", value: "Επιστημών Διατροφής & Διαιτολογίας" },
];

/* ────────────────────────────────────────────
   Scroll-spy navigation dock
   ──────────────────────────────────────────── */

export interface NavTarget {
  id: string;
  label: string;
  icon: IconKey;
}

/* Targets mirror the lean homepage section order (page.tsx). Sections that now
   live on dedicated pages are no longer listed here. */
export const navTargets: NavTarget[] = [
  { id: "top", label: "Αρχή", icon: "sparkles" },
  { id: "journey", label: "Διαδρομή", icon: "orbit" },
  { id: "sxoli", label: "Η Σχολή", icon: "building" },
  { id: "mentors", label: "Διδάσκοντες", icon: "users" },
  { id: "careers", label: "Καριέρα", icon: "trending" },
  { id: "news", label: "Νέα", icon: "book" },
];

/* ────────────────────────────────────────────
   Value highlights (intro band)
   ──────────────────────────────────────────── */

export interface ValueHighlight {
  icon: IconKey;
  title: string;
  text: string;
}

export const valueHighlights: ValueHighlight[] = [
  { icon: "flask-round", title: "Πρακτική", text: "Hands-on εργαστήρια" },
  { icon: "users", title: "Μέντορες", text: "19 μέλη ΔΕΠ" },
  { icon: "scale", title: "Νομοθεσία", text: "EU 1223/2009" },
  { icon: "trending", title: "Καριέρα", text: "5 μονοπάτια" },
];

/* ────────────────────────────────────────────
   Programme spec sheet — "με μια ματιά"
   ──────────────────────────────────────────── */

export interface ProgramFact {
  icon: IconKey;
  label: string;
  value: string;
  note: string;
}

export const programFacts: ProgramFact[] = [
  { icon: "graduation", label: "Τίτλος", value: "MSc Κοσμητολογία", note: "Μεταπτυχιακό Δίπλωμα Ειδίκευσης" },
  { icon: "calendar", label: "Διάρκεια", value: "3 εξάμηνα", note: "Πλήρης φοίτηση (έως 5 μερική)" },
  { icon: "award", label: "Πιστωτικές", value: "90 ECTS", note: "30 + 30 + 30 ανά εξάμηνο" },
  { icon: "euro", label: "Δίδακτρα", value: "€2.400", note: "Απαλλαγή έως 30% (Ν.4957/2022)" },
  { icon: "layers", label: "Κατευθύνσεις", value: "2", note: "Παρασκευή & Δερματολογία" },
  { icon: "users", label: "Εισακτέοι", value: "40 / έτος", note: "Μικρά, εστιασμένα τμήματα" },
  { icon: "globe", label: "Γλώσσα", value: "Ελληνικά", note: "Αγγλική βιβλιογραφία" },
  { icon: "clock", label: "Μορφή", value: "Υβριδική", note: "Παρασκευή – Κυριακή" },
];

/* ────────────────────────────────────────────
   Weekly rhythm — "πώς λειτουργεί"
   ──────────────────────────────────────────── */

export interface RhythmDay {
  day: string;
  time: string;
  focus: string;
  icon: IconKey;
}

export const weeklyRhythm: RhythmDay[] = [
  { day: "Παρασκευή", time: "Απόγευμα", focus: "Διαλέξεις & θεωρία", icon: "book" },
  { day: "Σάββατο", time: "Πρωί – Απόγευμα", focus: "Εργαστήρια & σεμινάρια", icon: "flask-round" },
  { day: "Κυριακή", time: "Πρωί", focus: "Μελέτες περίπτωσης & παρουσιάσεις", icon: "users" },
];

export interface LearningFormat {
  icon: IconKey;
  title: string;
  description: string;
}

export const learningFormats: LearningFormat[] = [
  {
    icon: "users",
    title: "Διά ζώσης διδασκαλία",
    description: "Άμεση επαφή με τους καθηγητές σε μικρά τμήματα, με έμφαση στη συζήτηση και την κριτική σκέψη.",
  },
  {
    icon: "flask-round",
    title: "Εργαστηριακή πρακτική",
    description: "Πραγματική παρασκευή και ενόργανη ανάλυση καλλυντικών σε πλήρως εξοπλισμένα εργαστήρια.",
  },
  {
    icon: "globe",
    title: "Εξ αποστάσεως συνιστώσα",
    description: "Επιλεγμένα μαθήματα και υλικό διαθέσιμα εξ αποστάσεως, για ευελιξία στους εργαζόμενους φοιτητές.",
  },
];

/* ────────────────────────────────────────────
   Research areas — έρευνα & διπλωματικές
   ──────────────────────────────────────────── */

export interface ResearchArea {
  icon: IconKey;
  title: string;
  description: string;
  from: string;
  to: string;
}

export const researchAreas: ResearchArea[] = [
  {
    icon: "leaf",
    title: "Φυσικά Συστατικά & Πράσινη Χημεία",
    description: "Εκχύλιση, χαρακτηρισμός και αξιοποίηση βιοδραστικών συστατικών φυσικής προέλευσης.",
    from: "#4F6321",
    to: "#A5BA5F",
  },
  {
    icon: "gauge",
    title: "Σταθερότητα Σκευασμάτων",
    description: "Μελέτες ρεολογίας, σταθερότητας και διάρκειας ζωής γαλακτωμάτων και ορότων.",
    from: "#5C7726",
    to: "#B9D84A",
  },
  {
    icon: "heart-pulse",
    title: "Αντιγήρανση & Μηχανισμοί",
    description: "Παθοφυσιολογία της γήρανσης, οξειδωτικό στρες και τεκμηρίωση αντιγηραντικής δράσης.",
    from: "#356B4E",
    to: "#7FC79A",
  },
  {
    icon: "dna",
    title: "Μικροβίωμα Δέρματος",
    description: "Ο ρόλος του δερματικού μικροβιώματος στην υγεία και η επίδραση των καλλυντικών σε αυτό.",
    from: "#3F6B3A",
    to: "#8FC06A",
  },
  {
    icon: "atom",
    title: "Συστήματα Μεταφοράς & Νανοτεχνολογία",
    description: "Encapsulation, λιποσώματα και νανοϋλικά για στοχευμένη μεταφορά δραστικών ουσιών.",
    from: "#5E9A4E",
    to: "#9FCB4C",
  },
  {
    icon: "shield",
    title: "Ασφάλεια & Κανονιστικά",
    description: "Τοξικολογική αξιολόγηση, φάκελος ασφάλειας και συμμόρφωση με τον Κανονισμό 1223/2009.",
    from: "#6E7C1E",
    to: "#C8E25E",
  },
];

export interface ThesisStep {
  index: string;
  title: string;
  icon: IconKey;
}

export const thesisSteps: ThesisStep[] = [
  { index: "01", title: "Επιλογή θέματος & επιβλέποντα", icon: "lightbulb" },
  { index: "02", title: "Βιβλιογραφική & πειραματική έρευνα", icon: "search" },
  { index: "03", title: "Συγγραφή & τεκμηρίωση", icon: "book" },
  { index: "04", title: "Δημόσια υποστήριξη", icon: "graduation" },
];

/* ────────────────────────────────────────────
   Useful downloads / documents
   ──────────────────────────────────────────── */

export interface DownloadItem {
  icon: IconKey;
  title: string;
  description: string;
  href: string;
  type: string;
  external?: boolean;
}

export const downloads: DownloadItem[] = [
  {
    icon: "book",
    title: "Έντυπο Αίτησης",
    description: "Συμπληρώστε και υποβάλετε την αίτηση υποψηφιότητας.",
    href: "/aitisi.docx",
    type: "DOCX",
  },
  {
    icon: "layers",
    title: "Πρόγραμμα Σπουδών",
    description: "Αναλυτικά μαθήματα, ECTS και μαθησιακά αποτελέσματα.",
    href: "/programma",
    type: "Σελίδα",
  },
  {
    icon: "users",
    title: "Διδάσκοντες",
    description: "Το σώμα ΔΕΠ και οι επιστημονικοί συνεργάτες του ΠΜΣ.",
    href: "/didaskotes",
    type: "Σελίδα",
  },
  {
    icon: "scale",
    title: "Εισαγωγή & Δικαιολογητικά",
    description: "Προϋποθέσεις, κριτήρια και απαιτούμενα δικαιολογητικά.",
    href: "/eggrafes",
    type: "Σελίδα",
  },
];

/* ────────────────────────────────────────────
   Accreditation / quality badges
   ──────────────────────────────────────────── */

export interface Accreditation {
  icon: IconKey;
  title: string;
  subtitle: string;
}

export const accreditations: Accreditation[] = [
  { icon: "award", title: "90 ECTS", subtitle: "Πλήρως πιστοποιημένες μονάδες" },
  { icon: "globe", title: "Bologna", subtitle: "Εναρμόνιση με τον Ευρωπαϊκό Χώρο" },
  { icon: "scale", title: "EU 1223/2009", subtitle: "Κανονιστικό πλαίσιο καλλυντικών" },
  { icon: "shield", title: "Ν. 4957/2022", subtitle: "Θεσμικό πλαίσιο ΠΜΣ" },
];

/* ────────────────────────────────────────────
   Glossary — "Λεξικό Κοσμητολογίας"
   ──────────────────────────────────────────── */

export interface GlossaryTerm {
  term: string;
  acronym?: string;
  definition: string;
  icon: IconKey;
}

export const glossary: GlossaryTerm[] = [
  {
    term: "Κοσμητολογία",
    definition:
      "Η επιστήμη που μελετά τη σύνθεση, παρασκευή, αξιολόγηση και δράση των καλλυντικών προϊόντων στο δέρμα και τα εξαρτήματά του.",
    icon: "sparkles",
  },
  {
    term: "INCI",
    acronym: "International Nomenclature of Cosmetic Ingredients",
    definition:
      "Το διεθνές σύστημα ονοματολογίας των συστατικών των καλλυντικών, υποχρεωτικό στην ετικέτα κάθε προϊόντος.",
    icon: "book",
  },
  {
    term: "Γαλάκτωμα",
    definition:
      "Σύστημα δύο μη αναμείξιμων φάσεων (π.χ. λάδι σε νερό) σταθεροποιημένο με γαλακτωματοποιητές — η πιο κοινή μορφή κρέμας.",
    icon: "droplets",
  },
  {
    term: "Δραστικό Συστατικό",
    definition:
      "Το συστατικό μιας φόρμουλας που ευθύνεται για την κύρια δράση (π.χ. ενυδάτωση, αντιγήρανση) του προϊόντος.",
    icon: "atom",
  },
  {
    term: "Έκδοχο",
    definition:
      "Συστατικό χωρίς δραστική δράση που υποστηρίζει τη φόρμουλα — διαλύτης, πυκνωτικό, συντηρητικό ή ρυθμιστής pH.",
    icon: "beaker",
  },
  {
    term: "Ρεολογία",
    definition:
      "Η μελέτη της ροής και της παραμόρφωσης της ύλης — καθορίζει την υφή, την άπλωση και τη σταθερότητα ενός σκευάσματος.",
    icon: "gauge",
  },
  {
    term: "GMP",
    acronym: "Good Manufacturing Practice",
    definition:
      "Οι ορθές πρακτικές παρασκευής που διασφαλίζουν ότι τα προϊόντα παράγονται σταθερά και ελέγχονται με βάση πρότυπα ποιότητας.",
    icon: "shield",
  },
  {
    term: "Διαδερμική Απορρόφηση",
    definition:
      "Η διαδικασία με την οποία μια ουσία διαπερνά τα στρώματα του δέρματος — κρίσιμη για την αποτελεσματικότητα και την ασφάλεια.",
    icon: "scan-face",
  },
  {
    term: "Μικροβίωμα",
    definition:
      "Το σύνολο των μικροοργανισμών που ζουν στο δέρμα. Η ισορροπία του συνδέεται με την υγεία και την άμυνα της επιδερμίδας.",
    icon: "dna",
  },
  {
    term: "Encapsulation",
    definition:
      "Τεχνική εγκλεισμού δραστικών ουσιών σε μικροσκοπικούς φορείς (π.χ. λιποσώματα) για στοχευμένη και ελεγχόμενη απελευθέρωση.",
    icon: "orbit",
  },
  {
    term: "Nutricosmetics",
    definition:
      "Συμπληρώματα διατροφής με στόχο την ομορφιά «από μέσα» — η συνέργεια διατροφής και κοσμητολογίας.",
    icon: "apple",
  },
  {
    term: "Cosmeceutical",
    definition:
      "Υβριδική κατηγορία μεταξύ καλλυντικού και φαρμάκου, με τεκμηριωμένη βιολογική δράση πέρα από την απλή περιποίηση.",
    icon: "pill",
  },
];

/* ────────────────────────────────────────────
   Student lifecycle — semester by semester
   ──────────────────────────────────────────── */

export interface LifecyclePhase {
  semester: string;
  title: string;
  summary: string;
  ects: string;
  icon: IconKey;
  milestones: string[];
  from: string;
  to: string;
  accent: string;
}

export const lifecycle: LifecyclePhase[] = [
  {
    semester: "Α' Εξάμηνο",
    title: "Θεμέλια & Κορμός",
    summary:
      "Χτίζετε τις βάσεις: μεθοδολογία έρευνας, δερματολογία, συστατικά καλλυντικών και επιχειρηματικότητα.",
    ects: "30 ECTS",
    icon: "book",
    milestones: ["5 υποχρεωτικά μαθήματα κορμού", "Μεθοδολογία & στατιστική", "Πρώτη επαφή με τα εργαστήρια"],
    from: "#7E9636",
    to: "#B9D84A",
    accent: "#879D42",
  },
  {
    semester: "Β' Εξάμηνο",
    title: "Εξειδίκευση",
    summary:
      "Επιλέγετε κατεύθυνση — Παρασκευή & Αξιολόγηση ή Εφαρμογές στη Δερματολογία — και εμβαθύνετε.",
    ects: "30 ECTS",
    icon: "layers",
    milestones: ["Επιλογή κατεύθυνσης", "Εξειδικευμένα εργαστήρια", "Μελέτες περίπτωσης"],
    from: "#5E9A4E",
    to: "#9FCB4C",
    accent: "#5E9A4E",
  },
  {
    semester: "Γ' Εξάμηνο",
    title: "Διπλωματική & Πρακτική",
    summary:
      "Εκπονείτε πρωτότυπη ερευνητική εργασία ή πρακτική άσκηση σε φορέα του κλάδου και αποφοιτάτε.",
    ects: "30 ECTS",
    icon: "graduation",
    milestones: ["Διπλωματική ή πρακτική άσκηση", "Υπό επίβλεψη μέλους ΔΕΠ", "Δημόσια υποστήριξη"],
    from: "#3E7A4E",
    to: "#7FC79A",
    accent: "#3E9466",
  },
];

/* ────────────────────────────────────────────
   Stay-in-touch links (no form submission)
   ──────────────────────────────────────────── */

export interface TouchLink {
  icon: IconKey;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const touchLinks: TouchLink[] = [
  { icon: "book", label: "Νέα & Ανακοινώσεις", value: "Δείτε τα τελευταία νέα", href: "/nea" },
  { icon: "map-pin", label: "Επικοινωνία", value: "Γραμματεία ΠΜΣ", href: "/epikoinonia" },
  { icon: "globe", label: "ΔΙΠΑΕ", value: "www.ihu.gr", href: "https://www.ihu.gr", external: true },
];

/* ────────────────────────────────────────────
   Sustainability commitments — πράσινη χημεία
   ──────────────────────────────────────────── */

export interface Commitment {
  icon: IconKey;
  title: string;
  text: string;
}

export const commitments: Commitment[] = [
  {
    icon: "leaf",
    title: "Φυσικά & βιοδιασπώμενα συστατικά",
    text: "Έμφαση σε δραστικά φυσικής προέλευσης με χαμηλό περιβαλλοντικό αποτύπωμα και τεκμηριωμένη ασφάλεια.",
  },
  {
    icon: "sprout",
    title: "Υπεύθυνη προμήθεια πρώτων υλών",
    text: "Διαφανείς αλυσίδες εφοδιασμού, σεβασμός στη βιοποικιλότητα και αρχές πράσινης χημείας στην επιλογή υλικών.",
  },
  {
    icon: "droplet",
    title: "Μείωση αποβλήτων & νερού",
    text: "Σχεδιασμός φορμουλών και εργαστηριακών διαδικασιών με στόχο τη μικρότερη δυνατή κατανάλωση πόρων.",
  },
  {
    icon: "shield",
    title: "Cruelty-free αξιολόγηση",
    text: "Σύγχρονες in vitro και in vivo (σε εθελοντές) μέθοδοι αξιολόγησης, χωρίς δοκιμές σε ζώα.",
  },
  {
    icon: "globe",
    title: "Βιώσιμη συσκευασία",
    text: "Κατανόηση των αρχών ανακυκλωσιμότητας και επαναχρησιμοποίησης στη συσκευασία καλλυντικών.",
  },
  {
    icon: "trending",
    title: "Κυκλική οικονομία",
    text: "Αξιοποίηση παραπροϊόντων και upcycling συστατικών — η αξία που κρύβεται στα «απόβλητα».",
  },
];

/* ────────────────────────────────────────────
   Scientific methodology pipeline
   ──────────────────────────────────────────── */

export interface MethodStep {
  index: string;
  title: string;
  description: string;
  icon: IconKey;
}

export const methodSteps: MethodStep[] = [
  {
    index: "01",
    title: "Ερευνητικό Ερώτημα",
    description: "Εντοπίζουμε ένα σαφές, μετρήσιμο πρόβλημα στην κοσμητολογία ή τη δερματολογία.",
    icon: "lightbulb",
  },
  {
    index: "02",
    title: "Βιβλιογραφική Ανασκόπηση",
    description: "Χαρτογραφούμε την υπάρχουσα γνώση με συστηματική αναζήτηση σε επιστημονικές βάσεις.",
    icon: "search",
  },
  {
    index: "03",
    title: "Υπόθεση & Σχεδιασμός",
    description: "Διατυπώνουμε υπόθεση και σχεδιάζουμε ελεγχόμενο πείραμα με κατάλληλους μάρτυρες.",
    icon: "target",
  },
  {
    index: "04",
    title: "Πειραματική Εργασία",
    description: "Παρασκευή, ενόργανη ανάλυση και μετρήσεις στο εργαστήριο, με τήρηση πρωτοκόλλων.",
    icon: "flask-round",
  },
  {
    index: "05",
    title: "Στατιστική Ανάλυση",
    description: "Επεξεργαζόμαστε τα δεδομένα με στατιστικά εργαλεία για να εξάγουμε αξιόπιστα συμπεράσματα.",
    icon: "gauge",
  },
  {
    index: "06",
    title: "Συμπεράσματα & Διάχυση",
    description: "Τεκμηριώνουμε, παρουσιάζουμε και δημοσιεύουμε τα ευρήματα — η γνώση γίνεται κοινό αγαθό.",
    icon: "graduation",
  },
];

/* ────────────────────────────────────────────
   Pull quotes
   ──────────────────────────────────────────── */

export const pullQuotes: string[] = [
  "Η ομορφιά που έχει βάση ξεκινά πάντα από την επιστήμη.",
  "Κάθε ισχυρισμός χρειάζεται απόδειξη — κι εδώ μαθαίνουμε να τη χτίζουμε.",
  "Από το μόριο στο ράφι: γεφυρώνουμε το εργαστήριο με την αγορά.",
];

/* ────────────────────────────────────────────
   Milestones — ορόσημα του προγράμματος
   ──────────────────────────────────────────── */

export interface Milestone {
  period: string;
  title: string;
  description: string;
  icon: IconKey;
}

export const milestones: Milestone[] = [
  {
    period: "Ίδρυση",
    title: "Δημιουργία του ΠΜΣ",
    description: "Το πρόγραμμα ιδρύεται στο Τμήμα Επιστημών Διατροφής & Διαιτολογίας του ΔΙΠΑΕ.",
    icon: "sprout",
  },
  {
    period: "Υποδομές",
    title: "Σύγχρονα Εργαστήρια",
    description: "Εξοπλισμός εργαστηρίων παρασκευής, ενόργανης ανάλυσης και αξιολόγησης δέρματος.",
    icon: "microscope",
  },
  {
    period: "Δίκτυο",
    title: "Διεπιστημονικές Συνεργασίες",
    description: "Σύμπραξη μελών ΔΕΠ από ΔΙΠΑΕ, ΑΠΘ, ΠΑΔΑ και στελεχών της βιομηχανίας.",
    icon: "users",
  },
  {
    period: "Σήμερα",
    title: "Νέος Κύκλος Σπουδών",
    description: "Συνεχής ανανέωση του προγράμματος με τις τελευταίες εξελίξεις του κλάδου.",
    icon: "rocket",
  },
];

/* ────────────────────────────────────────────
   Featured faculty (subset highlighted)
   ──────────────────────────────────────────── */

export interface FeaturedProfessor {
  initials: string;
  name: string;
  role: string;
  institution: string;
  expertise: string;
  from: string;
  to: string;
}

export const featuredProfessors: FeaturedProfessor[] = [
  {
    initials: "ΒΑ",
    name: "Βαρβαρέσου Αθανασία",
    role: "Καθηγήτρια Κοσμητολογίας",
    institution: "ΠΑΔΑ",
    expertise: "Σύνθεση & αξιολόγηση καλλυντικών",
    from: "#7E9636",
    to: "#B9D84A",
  },
  {
    initials: "ΠΙ",
    name: "Παπαδόπουλος Ιορδάνης",
    role: "Καθηγητής Δερματολογίας",
    institution: "ΔιΠΑΕ",
    expertise: "Δερματολογία & αντιγήρανση",
    from: "#5E9A4E",
    to: "#9FCB4C",
  },
  {
    initials: "ΜΙ",
    name: "Μουρτζίνος Ιωάννης",
    role: "Καθηγητής Χημείας Τροφίμων",
    institution: "ΑΠΘ",
    expertise: "Φυσικά συστατικά & εκχύλιση",
    from: "#3E7A4E",
    to: "#7FC79A",
  },
  {
    initials: "ΚΝ",
    name: "Καλογιούρη Νατάσα",
    role: "Επίκουρη Καθηγήτρια Χημείας",
    institution: "ΔιΠΑΕ",
    expertise: "Ενόργανη ανάλυση & ποιοτικός έλεγχος",
    from: "#6E7C1E",
    to: "#C8E25E",
  },
];
