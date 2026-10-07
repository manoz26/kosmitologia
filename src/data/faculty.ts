export interface FacultyMember {
  name: string;
  email: string;
  role: string;
  institution: string;
  initials: string;
}

export const faculty: FacultyMember[] = [
  { name: "Βαρβαρέσου Αθανασία", email: "avarvares@uniwa.gr", role: "Καθηγήτρια Κοσμητολογίας", institution: "ΠΑΔΑ", initials: "ΒΑ" },
  { name: "Βαρδάκα Ελισάβετ", email: "evardaka@ihu.gr", role: "Επίκουρη Καθηγήτρια", institution: "ΔιΠΑΕ", initials: "ΒΕ" },
  { name: "Βασιλοπούλου Αιμιλία", email: "vassilopoulouemilia@gmail.com", role: "Διδάσκουσα Βιοχημείας", institution: "ΔιΠΑΕ", initials: "ΒΑ" },
  { name: "Βογιατζής Χρήστος", email: "chtvogiatzis@hotmail.com", role: "Ειδικός Δερματολόγος", institution: "ΔιΠΑΕ", initials: "ΒΧ" },
  { name: "Γιαννακουδάκη Άννα", email: "annagianna@live.com", role: "Διδάσκουσα Αισθητικής", institution: "ΔιΠΑΕ", initials: "ΓΑ" },
  { name: "Ιωαννίδης Δημήτρης", email: "dem@auth.gr", role: "Καθηγητής Φαρμακολογίας", institution: "ΑΠΘ", initials: "ΙΔ" },
  { name: "Καλογιούρη Νατάσα", email: "kalogiourin@gmail.com", role: "Επίκουρη Καθηγήτρια Χημείας", institution: "ΔιΠΑΕ", initials: "ΚΝ" },
  { name: "Κοκοκύρης Λάμπρος", email: "lamprosk@ihu.gr", role: "Αναπληρωτής Καθηγητής", institution: "ΔιΠΑΕ", initials: "ΚΛ" },
  { name: "Λεονταρίδου Ιωάννα", email: "joanleont@gmail.com", role: "Διδάσκουσα Κλινικής Κοσμητολογίας", institution: "ΔιΠΑΕ", initials: "ΛΙ" },
  { name: "Μαμαλής Σπυρίδων", email: "mamalis@econ.auth.gr", role: "Καθηγητής Επιχειρηματικότητας", institution: "ΑΠΘ", initials: "ΜΣ" },
  { name: "Μουρτζίνος Ιωάννης", email: "mourtzinos@agro.auth.gr", role: "Καθηγητής Χημείας Τροφίμων", institution: "ΑΠΘ", initials: "ΜΙ" },
  { name: "Παγκάλος Ιωάννης", email: "ipagkalos@ihu.gr", role: "Επίκουρος Καθηγητής", institution: "ΔιΠΑΕ", initials: "ΠΙ" },
  { name: "Παπαγεωργίου Σπυρίδων", email: "spapage@uniwa.gr", role: "Καθηγητής Κοσμητολογίας", institution: "ΠΑΔΑ", initials: "ΠΣ" },
  { name: "Παπαδόπουλος Αθανάσιος", email: "papadnas@ihu.gr", role: "Αναπληρωτής Καθηγητής Διατροφής", institution: "ΔιΠΑΕ", initials: "ΠΑ" },
  { name: "Παπαδόπουλος Ιορδάνης", email: "driordanis@ihu.gr", role: "Καθηγητής Δερματολογίας", institution: "ΔιΠΑΕ", initials: "ΠΙ" },
  { name: "Ριτζούλης Χρήστος", email: "critzou@ihu.gr", role: "Καθηγητής Φυσικοχημείας", institution: "ΔιΠΑΕ", initials: "ΡΧ" },
  { name: "Σαρηγιάννης Ιωάννης", email: "sarigiannis.i@unic.ac.cy", role: "Καθηγητής Τοξικολογίας", institution: "UNIC", initials: "ΣΙ" },
  { name: "Τζίμας Γεώργιος", email: "gtzimas@tzimas-cosmetics.gr", role: "Ειδικός Παρασκευής Καλλυντικών", institution: "Βιομηχανία", initials: "ΤΓ" },
  { name: "Χασαπίδου Μαρία", email: "mnhas@ihu.gr", role: "Καθηγήτρια Διατροφής", institution: "ΔιΠΑΕ", initials: "ΧΜ" },
];

/* "ΔιΠΑΕ, ΑΠΘ, ΠΑΔΑ, UNIC και τη βιομηχανία" — the home institution first,
   industry last, in the order they appear otherwise. */
export function facultyInstitutionsText(): string {
  const all = Array.from(new Set(faculty.map((f) => f.institution)));
  const academic = all.filter((i) => i !== "Βιομηχανία").sort((a, b) => (a === "ΔιΠΑΕ" ? -1 : b === "ΔιΠΑΕ" ? 1 : 0));
  const hasIndustry = all.includes("Βιομηχανία");
  return hasIndustry ? `${academic.join(", ")} και τη βιομηχανία` : academic.join(", ");
}

/** Anchor of a teacher's card on /sxetika — the landing spot of the site
    search. Built from the email's local part: Latin, unique, stable. */
export function facultyAnchor(f: Pick<FacultyMember, "email">): string {
  return `didaskon-${f.email.split("@")[0].replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
}

/** Initials without Greek accents: "Άννα Γιαννακουδάκη" → "ΑΓ". */
export function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
