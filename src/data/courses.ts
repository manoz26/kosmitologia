export interface Course {
  code: string;
  nameGr: string;
  nameEn: string;
  description: string;
  semester: 1 | 2 | 3;
  track?: "preparation" | "dermatology";
  ects: number;
  icon: string;
  outcomes?: string[];
  professors?: string[];
  books?: string[];
}

export const semesters = [
  { id: 1, label: "Α' Εξάμηνο", sublabel: "Υποχρεωτικά Μαθήματα Κορμού" },
  { id: 2, label: "Β' Εξάμηνο", sublabel: "Μαθήματα Εξειδίκευσης" },
  { id: 3, label: "Γ' Εξάμηνο", sublabel: "Διπλωματική Εργασία" },
] as const;

export const tracks = [
  {
    id: "preparation" as const,
    nameGr: "Παρασκευή & Αξιολόγηση Καλλυντικών Προϊόντων",
    nameEn: "Preparation & Evaluation of Cosmetic Products",
    color: "mint",
  },
  {
    id: "dermatology" as const,
    nameGr: "Εφαρμογές της Κοσμητολογίας στη Δερματολογία",
    nameEn: "Applications of Cosmetology in Dermatology",
    color: "peach",
  },
] as const;

export const courses: Course[] = [
  // ── Semester 1: Core ──
  {
    code: "COSM1001",
    nameGr: "Μεθοδολογία Έρευνας – Στοιχεία Φυσικών Επιστημών",
    nameEn: "Research Methodology – Elements of Physical Sciences",
    description: "Εισαγωγή στις μεθόδους επιστημονικής έρευνας, στατιστική ανάλυση δεδομένων και βασικές αρχές φυσικών επιστημών εφαρμοσμένες στην κοσμητολογία.",
    semester: 1,
    ects: 8, // Fixed from 6 to 8 based on PDF
    icon: "search",
    professors: ["Παπαδόπουλος Αθανάσιος (Καθηγητής)", "Κοκοκύρης Λάμπρος (Αν. Καθηγητής)"],
    outcomes: ["Σχεδιασμός και σύνταξη ερευνητικής πρότασης", "Συλλογή και αρχειοθέτηση επιστημονικών δεδομένων - στατιστική ανάλυση (SPSS)", "Μεθοδολογία της επιστημονικής έρευνας στις επιστήμες υγείας"],
    books: ["Αρχές Αποδεικτικής Ιατρικής (Ιωαννίδης Ι.)", "Μεθοδολογία επιστημονικής έρευνας (Παρασκευόπουλος)"]
  },
  {
    code: "COSM1002",
    nameGr: "Στοιχεία Δερματολογίας και Μικροβιολογίας",
    nameEn: "Elements of Dermatology and Microbiology",
    description: "Ανατομία και φυσιολογία του δέρματος, δερματικό φραγμό, ανοσολογία δέρματος και μικροβιολογικές βάσεις για την ασφάλεια καλλυντικών.",
    semester: 1,
    ects: 8, // Fixed from 6 to 8
    icon: "microscope",
    professors: ["Ελισάβετ Βαρδάκα", "Ιορδάνης Παπαδόπουλος"],
    outcomes: ["Αξιολόγηση δράσης κοσμητολογικών προϊόντων σε δερματοπάθειες", "Στοιχεία παθοφυσιολογίας δερματοπαθειών", "Μικροβίωμα του δέρματος"],
    books: ["Τέχνη και Επιστήμη στις εφαρμογές Laser στην αισθητική (Εκδόσεις Ροτόντα)"]
  },
  {
    code: "COSM1003",
    nameGr: "Επιχειρηματικότητα και Κοσμητολογία",
    nameEn: "Entrepreneurship and Cosmetology",
    description: "Ανάπτυξη επιχειρηματικού σχεδίου στον κλάδο καλλυντικών, marketing, branding και στρατηγικές εμπορικής αξιοποίησης καινοτόμων προϊόντων.",
    semester: 1,
    ects: 7, // Fixed from 6 to 7
    icon: "briefcase",
    professors: [],
    outcomes: ["Αναζήτηση χρηματοδότησης για υλοποίηση επιχειρηματικών πλάνων", "Προοπτικές αξιοποίησης της ανάπτυξης νέων προϊόντων", "Ορθή πρακτική προώθησης καλλυντικών"],
    books: ["New Cosmetic Science (T. Mitsui)"]
  },
  {
    code: "COSM1004",
    nameGr: "Συστατικά Καλλυντικών Προϊόντων",
    nameEn: "Cosmetic Product Ingredients",
    description: "Μελέτη πρώτων υλών, ενεργών συστατικών, φυσικών εκχυλισμάτων και νανοϋλικών που χρησιμοποιούνται στη σύγχρονη κοσμητολογία.",
    semester: 1,
    ects: 7, // Fixed from 6 to 7
    icon: "flask-conical",
    professors: ["Γιαννακουδάκη Άννα", "Παπαδόπουλος Αθανάσιος", "Καλογιάννης Σταύρος", "Μουρτζίνος Ιωάννης", "Τερζίδης Μιχαήλ", "Καλογιούρη Νατάσα"],
    outcomes: ["Δραστικά συστατικά και έκδοχα σε διάφορες καλλυντικοτεχνικές μορφές", "Συστατικά φυσικής προέλευσης", "Αντιηλιακά φίλτρα, χρωστικές, συντηρητικά"],
    books: ["Chemistry and Technology of the Cosmetics and Toiletries Industry", "Formulas, Ingredients and Production of Cosmetics"]
  },
  {
    code: "COSM1005",
    nameGr: "Ειδικά Θέματα Κοσμητολογίας",
    nameEn: "Special Topics in Cosmetology",
    description: "Σύγχρονες τάσεις, καινοτομίες και εξειδικευμένα θέματα στον τομέα της κοσμητολογίας, με έμφαση στην έρευνα και ανάπτυξη.",
    semester: 1,
    ects: 7, // Fixed from 6 to 7
    icon: "sparkles",
  },

  // ── Semester 2: Track 1 – Preparation & Evaluation ──
  {
    code: "COSM1007",
    nameGr: "Καινοτόμα Καλλυντικά και Προϊόντα Φυσικής Προέλευσης",
    nameEn: "Innovative Cosmetics and Natural-Origin Products",
    description: "Σχεδιασμός και ανάπτυξη καινοτόμων καλλυντικών, φυσικά και βιολογικά καλλυντικά, βιώσιμη ανάπτυξη στη βιομηχανία ομορφιάς.",
    semester: 2,
    track: "preparation",
    ects: 7,
    icon: "leaf",
    professors: ["Γιαννακουδάκη Άννα", "Μουρτζίνος Ιωάννης"],
    outcomes: ["Αναζήτηση, ανάλυση και σύνθεση δεδομένων και πληροφοριών", "Αξιολόγηση ενός καλλυντικού προϊόντος με κριτήριο τα συστατικά που περιέχει"],
    books: ["New Cosmetic Science (T. Mitsui)", "Handbook of Cosmetic Science and Technology"]
  },
  {
    code: "COSM1008",
    nameGr: "Παρασκευή Καλλυντικών και Στοιχεία Νομοθεσίας",
    nameEn: "Cosmetics Preparation and Elements of Legislation",
    description: "Εργαστηριακή παρασκευή καλλυντικών μορφών, Ευρωπαϊκός Κανονισμός 1223/2009, GMP και ρυθμιστικό πλαίσιο κυκλοφορίας.",
    semester: 2,
    track: "preparation",
    ects: 7,
    icon: "scale",
    professors: ["Γιαννακουδάκη Άννα", "Τζίμας Γεώργιος"],
    outcomes: ["Να γνωρίζει πού θα αναζητήσει πληροφορίες για τις υποχρεώσεις και τα δικαιώματά του", "Να λειτουργεί υπό καθεστώς νομιμότητας και να αποφεύγει κινδύνους", "Προσαρμογή στις απαιτήσεις των Οργανισμών Ελέγχου"],
    books: ["Chemistry and Technology of the Cosmetics and Toiletries Industry", "New Cosmetic Science"]
  },
  {
    code: "COSM1009",
    nameGr: "Ποιοτικός Έλεγχος Καλλυντικών Προϊόντων",
    nameEn: "Quality Control of Cosmetic Products",
    description: "Μέθοδοι ενόργανης ανάλυσης (HPLC, GC-MS, UV-Vis), φυσικοχημικοί έλεγχοι σταθερότητας και μικροβιολογικοί έλεγχοι ασφάλειας.",
    semester: 2,
    track: "preparation",
    ects: 8,
    icon: "test-tubes",
    professors: ["Τερζίδης Μιχαήλ", "Παπαδόπουλος Αθανάσιος", "Καλογιάννης Σταύρος", "Μουρτζίνος Ιωάννης", "Γιαννακουδάκη Άννα", "Καλογιούρη Νατάσα"],
    outcomes: ["Εντοπισμός ενόργανων τεχνικών και μεθόδων για τον ποιοτικό έλεγχο", "Σχεδιασμός συστήματος ελέγχου της γραμμής παραγωγής", "Ταχεία ταυτοποίηση πρώτων υλών με χρήση φυσικοχημικών μεθόδων"],
    books: ["Handbook of Cosmetic Science and Technology", "Cosmeceuticals, Drugs vs. Cosmetics"]
  },
  {
    code: "COSM1010",
    nameGr: "Παθοφυσιολογία στην Αντιγήρανση",
    nameEn: "Pathophysiology in Anti-aging",
    description: "Μηχανισμοί γήρανσης δέρματος, οξειδωτικό στρες, τελομερή, και σύγχρονες αντιγηραντικές προσεγγίσεις στην κοσμητολογία.",
    semester: 2,
    track: "preparation",
    ects: 8,
    icon: "heart-pulse",
    professors: ["Ιορδάνης Παπαδόπουλος"],
    outcomes: ["Κατανόηση της διαδικασίας της γήρανσης και της παθοφυσιολογίας αυτής", "Αξιολόγηση της δράσης των τοπικών κοσμητολογικών προϊόντων στην αντιγήρανση"],
    books: ["Εκπαιδευτικές σημειώσεις / Ερευνητικά Άρθρα"]
  },

  // ── Semester 2: Track 2 – Dermatology Applications ──
  {
    code: "COSM1006",
    nameGr: "Συνέργεια Διατροφής & Κοσμητολογίας σε Δερματολογικές Παθήσεις",
    nameEn: "Synergy of Nutrition and Cosmetology in Dermatological Conditions",
    description: "Διερεύνηση της σχέσης διατροφής-δέρματος, νουτρικοσμητολογία, διαιτητικές παρεμβάσεις σε δερματοπάθειες.",
    semester: 2,
    track: "dermatology",
    ects: 8,
    icon: "apple",
    professors: ["Μαρία Χασαπίδου", "Ιορδάνης Παπαδόπουλος"],
    outcomes: ["Κατανόηση του ρόλου της διατροφής σε ορισμένες δερματοπάθειες", "Συνεπικουρία στη θεραπεία δερματοπαθειών μέσω διατροφής και κοσμητολογίας"],
    books: ["Εκπαιδευτικές σημειώσεις / Ερευνητικά Άρθρα"]
  },
  {
    code: "COSM1012",
    nameGr: "Κλινική Κοσμητολογία",
    nameEn: "Clinical Cosmetology",
    description: "Κλινική αξιολόγηση δέρματος, εξατομικευμένες κοσμητολογικές τεχνικές και πρωτόκολλα θεραπειών σε κλινικό περιβάλλον.",
    semester: 2,
    track: "dermatology",
    ects: 6,
    icon: "stethoscope",
    professors: ["Μέλη ΔΕΠ και Επιστημονικοί Συνεργάτες"],
    outcomes: ["Εξατομικευμένη προσέγγιση σε πρωτόκολλα θεραπειών", "Κλινική αξιολόγηση και παρακολούθηση δέρματος"]
  },
  {
    code: "COSM1013",
    nameGr: "Δερμοφαρμακολογία",
    nameEn: "Dermopharmacology",
    description: "Φαρμακολογία δερματικών σκευασμάτων, διαδερμική απορρόφηση, σύγχρονα συστήματα μεταφοράς δραστικών ουσιών.",
    semester: 2,
    track: "dermatology",
    ects: 6,
    icon: "pill",
    professors: ["Μέλη ΔΕΠ και Επιστημονικοί Συνεργάτες"],
    outcomes: ["Ανάλυση των συστημάτων μεταφοράς δραστικών ουσιών", "Κατανόηση της διαδερμικής απορρόφησης"]
  },
  {
    code: "COSM1014",
    nameGr: "Αισθητική Δερματολογία",
    nameEn: "Aesthetic Dermatology",
    description: "Σύγχρονες μη-επεμβατικές τεχνικές, laser, χημικά peelings, ενέσιμα σκευάσματα και η συνέργειά τους με καλλυντικά προϊόντα.",
    semester: 2,
    track: "dermatology",
    ects: 6,
    icon: "scan-face",
    professors: ["Μέλη ΔΕΠ και Επιστημονικοί Συνεργάτες"],
    outcomes: ["Γνώση σύγχρονων μη-επεμβατικών τεχνικών (laser, peelings)", "Συνεργασία αισθητικών παρεμβάσεων με κοσμητολογικά προϊόντα"]
  },

  // ── Semester 3 ──
  {
    code: "COSM1011",
    nameGr: "Διπλωματική Εργασία / Πρακτική Άσκηση",
    nameEn: "Master's Thesis / Internship",
    description: "Εκπόνηση πρωτότυπης ερευνητικής εργασίας ή πρακτική άσκηση σε φορέα/εταιρεία του κλάδου, υπό την επίβλεψη μέλους ΔΕΠ.",
    semester: 3,
    ects: 30,
    icon: "graduation-cap",
    professors: ["Παπαδόπουλος Αθανάσιος", "Παπαδόπουλος Ιορδάνης", "Γιαννακουδάκη Άννα"],
    outcomes: ["Σχεδιασμός έργων και καθορισμός προτεραιοτήτων", "Συγγραφή, τεκμηρίωση και παρουσίαση ολοκληρωμένης επιστημονικής μελέτης", "Αυτόνομη και ομαδική ερευνητική εργασία"]
  },
];

export function getCoursesBySemester(semester: 1 | 2 | 3) {
  return courses.filter((c) => c.semester === semester);
}

export function getCoursesByTrack(track: "preparation" | "dermatology") {
  return courses.filter((c) => c.track === track);
}
