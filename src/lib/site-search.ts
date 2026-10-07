/* ══════════════════════════════════════════════════════════════════════════
   site-search — the index and the matcher behind the navbar search
   ──────────────────────────────────────────────────────────────────────────
   Built at module load from the same data files the pages render, so there
   is no second copy of anything: pages and sections, the 11 courses, the
   teachers, the announcements, the FAQ, the official documents, the career
   directions and the Secretariat's contacts. Every entry links to where the
   thing lives — #mathima-<code> opens the course, #faq-<n> opens the answer,
   #didaskon-<…> lands on the teacher's card.

   Matching: accent- and case-insensitive (ά = α, ς = σ); every word of the
   query has to match somewhere; a word that doesn't is retried without its
   ending (αίτηση → αιτήσεις). Latin input also tries Greeklish ("aitisi",
   "spoudes") and the wrong keyboard layout ("aithsh" → «αιτηση»).
   Only loaded when the search dialog opens (SearchDialog is lazy).
   ══════════════════════════════════════════════════════════════════════════ */

import { announcements, cycleLabel, formatPublished, latestAdmissions } from "@/data/announcements";
import { careerPaths, employerGroups } from "@/data/careers";
import { courses, specializations, type Course } from "@/data/courses";
import { faculty, facultyAnchor, facultyInstitutionsText } from "@/data/faculty";
import { faqItems } from "@/data/faq";
import {
  committee,
  contact,
  directorMessage,
  formatDate,
  formatEuro,
  officialDocuments,
  program,
  requiredDocuments,
  telHref,
} from "@/data/program";

export type SearchKind =
  | "page"
  | "section"
  | "course"
  | "person"
  | "news"
  | "faq"
  | "document"
  | "career"
  | "contact";

/** Group headings, in the order groups are listed when scores tie. */
export const KIND_LABEL: Record<SearchKind, string> = {
  page: "Σελίδες",
  section: "Ενότητες",
  course: "Μαθήματα",
  person: "Διδάσκοντες",
  news: "Ανακοινώσεις",
  faq: "Συχνές ερωτήσεις",
  document: "Έγγραφα",
  career: "Επαγγελματική αποκατάσταση",
  contact: "Επικοινωνία",
};

const KIND_ORDER = Object.keys(KIND_LABEL) as SearchKind[];
const KIND_WEIGHT: Record<SearchKind, number> = {
  page: 3,
  section: 2,
  course: 2,
  person: 2,
  document: 2,
  news: 1,
  faq: 1,
  career: 1,
  contact: 1,
};

export interface SearchEntry {
  id: string;
  kind: SearchKind;
  title: string;
  /** The context line under the title. */
  hint?: string;
  href: string;
  /** Files, mailto: and tel: links — not a page of the site. */
  external?: boolean;
  /** Extra words that should find the entry (synonyms, codes, body text). Not shown. */
  keywords?: string;
}

/* ────────────────────────────────────────────
   Text folding
   ──────────────────────────────────────────── */

const MARKS = /[̀-ͯ]/g;

/** "Αίτηση" → "αιτηση", "σπουδές" → "σπουδεσ". */
export function fold(s: string): string {
  return s.normalize("NFD").replace(MARKS, "").toLowerCase().replace(/ς/g, "σ");
}

/* Folded text plus, for every folded character, the index of the original
   character it came from — so matches can be highlighted in the original. */
function foldWithMap(s: string): { text: string; map: number[] } {
  let text = "";
  const map: number[] = [];
  for (let i = 0; i < s.length; i++) {
    const f = fold(s[i]);
    for (let j = 0; j < f.length; j++) {
      text += f[j];
      map.push(i);
    }
  }
  return { text, map };
}

const GR_TO_LATIN: Record<string, string> = {
  α: "a", β: "v", γ: "g", δ: "d", ε: "e", ζ: "z", η: "i", θ: "th", ι: "i", κ: "k", λ: "l", μ: "m",
  ν: "n", ξ: "ks", ο: "o", π: "p", ρ: "r", σ: "s", τ: "t", υ: "i", φ: "f", χ: "x", ψ: "ps", ω: "o",
};

/** Folded Greek → Latin letters (ου → ou, αυ/ευ → av/ev). */
function greeklish(folded: string): string {
  let out = "";
  for (let i = 0; i < folded.length; i++) {
    const c = folded[i];
    if (c === "υ") {
      const prev = folded[i - 1];
      out += prev === "ο" ? "u" : prev === "α" || prev === "ε" ? "v" : "i";
    } else {
      out += GR_TO_LATIN[c] ?? c;
    }
  }
  return out;
}

/* One spelling for the many ways Greeklish is typed: th/8 → θ, h/y → ι,
   w → ο, ai → e, ei/oi → i, a lone u → ou, double letters → single. Applied
   to both the index and the query, so they meet in the middle. */
function canon(latin: string): string {
  return latin
    .replace(/th/g, "8")
    .replace(/ch/g, "x")
    .replace(/ph/g, "f")
    .replace(/h/g, "i")
    .replace(/y/g, "i")
    .replace(/w/g, "o")
    .replace(/b/g, "v")
    .replace(/eu/g, "ev")
    .replace(/au/g, "av")
    .replace(/(^|[^o])u/g, "$1ou")
    .replace(/ai/g, "e")
    .replace(/[eo]i/g, "i")
    .replace(/(.)\1+/g, "$1");
}

/* Latin keys typed while the keyboard was meant to be Greek. */
const LAYOUT: Record<string, string> = {
  a: "α", b: "β", c: "ψ", d: "δ", e: "ε", f: "φ", g: "γ", h: "η", i: "ι", j: "ξ", k: "κ", l: "λ", m: "μ",
  n: "ν", o: "ο", p: "π", q: "", r: "ρ", s: "σ", t: "τ", u: "θ", v: "ω", w: "σ", x: "χ", y: "υ", z: "ζ", ";": "",
};

const HAS_LATIN = /[a-z]/;

/* ────────────────────────────────────────────
   The index
   ──────────────────────────────────────────── */

const SEMESTER = ["Α΄", "Β΄", "Γ΄"];

function streamLabel(c: Course): string {
  if (c.stream === "core") return "Κοινός κορμός";
  const spec = specializations.find((s) => s.id === c.stream);
  return spec ? `Ειδίκευση ${spec.numeral}` : "";
}

function committeeRole(email: string): string | null {
  const m = committee.find((c) => c.email === email);
  if (!m) return null;
  return m.role === "Μέλος" ? "Μέλος Συντονιστικής Επιτροπής" : `${m.role} ΠΜΣ`;
}

const tuitionFaq = faqItems.findIndex((q) => fold(q.question).includes("διδακτρα"));

function buildEntries(): SearchEntry[] {
  const pages: SearchEntry[] = [
    { id: "p-home", kind: "page", title: "Αρχική", hint: "ΠΜΣ Κοσμητολογία · ΔΙΠΑΕ", href: "/", keywords: "αρχική σελίδα μεταπτυχιακό πρόγραμμα σπουδών" },
    {
      id: "p-spoudes",
      kind: "page",
      title: "Σπουδές",
      hint: `${program.specializations.value} ειδικεύσεις, ${program.courses.value} μαθήματα, καριέρα`,
      href: "/programma",
      keywords: "πρόγραμμα σπουδών μαθήματα εξάμηνα ects ειδικεύσεις",
    },
    { id: "p-eisagogi", kind: "page", title: "Εισαγωγή", hint: "Αιτήσεις, δικαιολογητικά, κριτήρια, δίδακτρα", href: "/eggrafes", keywords: "εγγραφές αιτήσεις υποβολή αίτησης προθεσμία" },
    { id: "p-tmima", kind: "page", title: "Το Τμήμα", hint: "Ταυτότητα, ιστορία, διδάσκοντες, εργαστήρια, πανεπιστημιούπολη", href: "/sxetika", keywords: "σχετικά ίδρυμα ιστορία ΔΙΠΑΕ" },
    { id: "p-epikoinonia", kind: "page", title: "Επικοινωνία", hint: "Γραμματεία, τηλέφωνο, email, χάρτης", href: "/epikoinonia", keywords: "γραμματεία τηλέφωνο email διεύθυνση χάρτης ωράριο" },
    { id: "p-nea", kind: "page", title: "Νέα & ανακοινώσεις", hint: "Όλες οι ανακοινώσεις του ΠΜΣ", href: "/nea", keywords: "ειδήσεις εκδηλώσεις" },
  ];

  const call = latestAdmissions;
  const sections: SearchEntry[] = [
    { id: "s-anakoinoseis", kind: "section", title: "Ανακοινώσεις", hint: "Αρχική · αιτήσεις και τελευταία νέα", href: "/#anakoinoseis", keywords: "νέα ενημέρωση" },
    {
      id: "s-imerominies",
      kind: "section",
      title: "Ημερομηνίες αιτήσεων",
      hint: call
        ? `Κύκλος ${cycleLabel(call.admissions)}: ${formatDate(call.admissions.opens)} – ${formatDate(call.admissions.closes)}`
        : "Τις ανακοινώνει η Γραμματεία",
      href: "/eggrafes#imerominies",
      keywords: "προθεσμία πότε ανοίγουν κλείνουν αιτήσεις έναρξη λήξη κύκλος",
    },
    {
      id: "s-dikaiologitika",
      kind: "section",
      title: "Δικαιολογητικά",
      hint: `${requiredDocuments.length} έγγραφα για τον φάκελο υποψηφιότητας`,
      href: "/eggrafes#dikaiologitika",
      keywords: `φάκελος έγγραφα ${requiredDocuments.map((d) => d.title).join(" ")}`,
    },
    { id: "s-vimata", kind: "section", title: "Πέντε βήματα προς την εγγραφή", hint: "Εισαγωγή · από την πρόσκληση ως την έναρξη", href: "/eggrafes#admission", keywords: "διαδικασία επιλογή συνέντευξη αξιολόγηση" },
    { id: "s-diadikasia", kind: "section", title: "Διαδικασία αίτησης", hint: "Αρχική · 3 βήματα, δίδακτρα, θέσεις", href: "/#aitisi", keywords: "βήματα υποβολή αιτήσεις" },
    {
      id: "x-didaktra",
      kind: "section",
      title: `Δίδακτρα: ${formatEuro(program.tuition.value)}`,
      hint: "Για ολόκληρο το πρόγραμμα",
      href: tuitionFaq >= 0 ? `/eggrafes#faq-${tuitionFaq}` : "/eggrafes#faq",
      keywords: "κόστος τιμή πληρωμή",
    },
    {
      id: "x-theseis",
      kind: "section",
      title: `Θέσεις: ${program.intake.value} φοιτητές`,
      hint: "Ανά κύκλο σπουδών",
      href: "/#aitisi",
      keywords: "εισακτέοι πόσοι γίνονται δεκτοί",
    },
    { id: "s-eggrafa", kind: "section", title: "Επίσημα έγγραφα", hint: "Οδηγός Σπουδών και έντυπο αίτησης", href: "/eggrafes#downloads", keywords: "λήψη κατέβασμα pdf docx" },
    { id: "s-faq", kind: "section", title: "Συχνές ερωτήσεις", hint: "Διάρκεια, δίδακτρα, δικαιολογητικά, επιλογή", href: "/eggrafes#faq", keywords: "faq απαντήσεις" },
    {
      id: "s-eidikefseis",
      kind: "section",
      title: "Ειδικεύσεις & μαθήματα",
      hint: `Κοινός κορμός, ${program.specializations.value} ειδικεύσεις, ${program.courses.value} μαθήματα`,
      href: "/programma#specializations",
      keywords: "πρόγραμμα σπουδών εξάμηνα κορμός ects",
    },
    ...specializations.map<SearchEntry>((s) => ({
      id: `s-spec-${s.id}`,
      kind: "section",
      title: `Ειδίκευση ${s.numeral}: ${s.nameGr}`,
      hint: s.tagline,
      href: "/programma#specializations",
      keywords: s.nameEn,
    })),
    { id: "s-rhythm", kind: "section", title: "Θεωρία και εργαστήριο", hint: "Σπουδές · πώς διεξάγεται το πρόγραμμα", href: "/programma#rhythm", keywords: "διδασκαλία εργαστήρια διαλέξεις παρακολούθηση" },
    {
      id: "s-didaskontes",
      kind: "section",
      title: "Διδάσκοντες",
      hint: `${faculty.length} διδάσκοντες από ${facultyInstitutionsText()}`,
      href: "/sxetika#didaskontes",
      keywords: "καθηγητές ακαδημαϊκό προσωπικό συντονιστική επιτροπή",
    },
    { id: "s-karieres", kind: "section", title: "Μονοπάτια σταδιοδρομίας", hint: "Σπουδές · πέντε μονοπάτια", href: "/programma#karieres", keywords: "καριέρα επαγγέλματα θέσεις εργασίας" },
    {
      id: "s-apokatastasi",
      kind: "section",
      title: "Επαγγελματική αποκατάσταση",
      hint: "Πού εργάζονται οι απόφοιτοι",
      href: "/#apofoitoi",
      keywords: "απόφοιτοι εργασία δουλειά καριέρα εργοδότες κλάδοι",
    },
    { id: "s-minima", kind: "section", title: "Μήνυμα του Διευθυντή", hint: directorMessage.signedBy.name, href: "/#minima", keywords: "διευθυντής" },
    { id: "s-tautotita", kind: "section", title: "Το Τμήμα και το Ίδρυμα", hint: program.department.value, href: "/sxetika#about", keywords: "τμήμα ίδρυμα πανεπιστήμιο" },
    { id: "s-orosima", kind: "section", title: "Ορόσημα διαδρομής", hint: "Το Τμήμα · η ιστορία του", href: "/sxetika#milestones", keywords: "ιστορία" },
    { id: "s-epistimi", kind: "section", title: "Η διαφορά που κάνει η γνώση", hint: "Το Τμήμα · η επιστήμη πίσω από κάθε προϊόν", href: "/sxetika#epistimi", keywords: "επιστήμη" },
    { id: "s-journey", kind: "section", title: "Από το συστατικό στο προϊόν", hint: "Το Τμήμα · το ταξίδι ενός καλλυντικού", href: "/sxetika#journey", keywords: "ταξίδι καλλυντικού" },
    { id: "s-ergastiria", kind: "section", title: "Εργαστήρια του Τμήματος", hint: "Παρασκευή, ενόργανη ανάλυση, αξιολόγηση δέρματος", href: "/sxetika#ergastiria", keywords: "εργαστήριο υποδομές" },
    {
      id: "s-campus",
      kind: "section",
      title: "Πού διεξάγονται τα μαθήματα",
      hint: `${contact.campus.value}, Σίνδος`,
      href: "/sxetika#campus",
      keywords: "τοποθεσία πανεπιστημιούπολη σίνδος θεσσαλονίκη",
    },
  ];

  const courseEntries = courses.map<SearchEntry>((c) => ({
    id: `c-${c.code}`,
    kind: "course",
    title: c.nameGr,
    hint: `${c.code} · ${SEMESTER[c.semester - 1]} εξάμηνο · ${c.ects} ECTS · ${streamLabel(c)}`,
    href: `/programma#mathima-${c.code}`,
    keywords: [c.nameEn, c.description, ...(c.content ?? []), ...(c.professors ?? [])].join(" "),
  }));

  const people = faculty.map<SearchEntry>((f) => {
    const role = committeeRole(f.email);
    return {
      id: `f-${f.email}`,
      kind: "person",
      title: f.name,
      hint: [role, f.role, f.institution].filter(Boolean).join(" · "),
      href: `/sxetika#${facultyAnchor(f)}`,
      keywords: `${f.email} καθηγητής καθηγήτρια διδάσκων διδάσκουσα`,
    };
  });

  const news = announcements.map<SearchEntry>((n) => ({
    id: `n-${n.id}`,
    kind: "news",
    title: n.title,
    hint: `${n.tag} · ${formatPublished(n.published)}`,
    href: `/nea#${n.id}`,
    keywords: n.admissions ? `${n.text} αιτήσεις κύκλος ${cycleLabel(n.admissions)}` : n.text,
  }));

  const faq = faqItems.map<SearchEntry>((q, i) => ({
    id: `q-${i}`,
    kind: "faq",
    title: q.question,
    hint: q.answer,
    href: `/eggrafes#faq-${i}`,
  }));

  const documents = officialDocuments.map<SearchEntry>((d) => ({
    id: `d-${d.href}`,
    kind: "document",
    title: d.title,
    hint: `${d.format} · ${d.size} — ${d.description}`,
    href: d.href,
    external: true,
    keywords: `${d.format} λήψη κατέβασμα αρχείο`,
  }));

  const careers: SearchEntry[] = [
    /* The same five directions live twice — the home's horseshoe (sectors)
       and the paths on /programma (roles, skills) — so the hint says where. */
    ...employerGroups.map<SearchEntry>((g) => ({
      id: `e-${g.pathId}`,
      kind: "career",
      title: g.title,
      hint: `Αρχική · ${g.sectors.join(" · ")}`,
      href: "/#apofoitoi",
      keywords: [g.blurb, ...(careerPaths.find((p) => p.id === g.pathId)?.roles ?? [])].join(" "),
    })),
    ...careerPaths.map<SearchEntry>((p) => ({
      id: `cp-${p.id}`,
      kind: "career",
      title: p.title,
      hint: `Σπουδές · ${p.shortDescription}`,
      href: "/programma#karieres",
      keywords: [...p.skills, ...p.opportunities, ...p.roles].join(" "),
    })),
  ];

  const contacts: SearchEntry[] = [
    {
      id: "k-email",
      kind: "contact",
      title: "Email Γραμματείας",
      hint: contact.email.value,
      href: `mailto:${contact.email.value}`,
      external: true,
      keywords: "ηλεκτρονικό ταχυδρομείο επικοινωνία γραμματεία",
    },
    {
      id: "k-tel",
      kind: "contact",
      title: "Τηλέφωνο Γραμματείας",
      hint: contact.phone.value,
      href: telHref(contact.phone.value),
      external: true,
      keywords: "κλήση επικοινωνία γραμματεία",
    },
    {
      id: "k-address",
      kind: "contact",
      title: "Διεύθυνση",
      hint: `${contact.campus.value}, ${contact.poBox.value}, ${contact.postalCode.value}`,
      href: "/epikoinonia#map",
      keywords: "ταχυδρομική διεύθυνση πού βρίσκεται χάρτης",
    },
  ];

  return [...pages, ...sections, ...courseEntries, ...people, ...news, ...faq, ...documents, ...careers, ...contacts];
}

interface Indexed {
  entry: SearchEntry;
  title: { text: string; map: number[] };
  rest: string;
  latinTitle: string;
  latinRest: string;
}

const INDEX: Indexed[] = buildEntries().map((entry) => {
  const title = foldWithMap(entry.title);
  const rest = fold(`${entry.hint ?? ""} ${entry.keywords ?? ""}`);
  return {
    entry,
    title,
    rest,
    latinTitle: canon(greeklish(title.text)),
    latinRest: canon(greeklish(rest)),
  };
});

export const SEARCH_ENTRY_COUNT = INDEX.length;

/** Quick links shown before anything is typed. */
export const QUICK_LINKS: SearchEntry[] = ["p-eisagogi", "s-imerominies", "s-dikaiologitika", "p-spoudes", "s-didaskontes", "d-/odigos-spoudon.pdf"]
  .map((id) => INDEX.find((x) => x.entry.id === id)?.entry)
  .filter((e): e is SearchEntry => Boolean(e));

/** Suggested queries, as chips. */
export const SUGGESTIONS = ["αιτήσεις", "δίδακτρα", "δικαιολογητικά", "μαθήματα", "διδάσκοντες", "καριέρα"];

/* ────────────────────────────────────────────
   Matching
   ──────────────────────────────────────────── */

const SPLIT = /[\s,.;:!?«»"'()[\]{}\-–—/·|]+/;
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordStartCache = new Map<string, RegExp>();

function atWordStart(hay: string, tok: string): boolean {
  let re = wordStartCache.get(tok);
  if (!re) {
    re = new RegExp(`(?:^|[^\\p{L}\\p{N}])${escapeRe(tok)}`, "u");
    if (wordStartCache.size > 400) wordStartCache.clear();
    wordStartCache.set(tok, re);
  }
  return re.test(hay);
}

/* How well one query word matches: title beats the rest, the start of a
   word beats the middle of one. 0 = no match. */
function tokenScore(tok: string, title: string, rest: string): number {
  if (title.includes(tok)) {
    if (atWordStart(title, tok)) return tok === title ? 14 : 10;
    if (tok.length >= 3) return 6;
  }
  if (rest.includes(tok)) {
    if (atWordStart(rest, tok)) return 4;
    if (tok.length >= 4) return 2;
  }
  return 0;
}

/* A word that doesn't match is tried again without its ending — Greek
   inflects: αίτηση/αιτήσεις, μάθημα/μαθήματα. Only as a word start. */
function stemScore(tok: string, title: string, rest: string): number {
  for (const cut of [1, 2]) {
    const stem = tok.slice(0, -cut);
    if (stem.length < 4) break;
    if (atWordStart(title, stem)) return 7;
    if (atWordStart(rest, stem)) return 3;
  }
  return 0;
}

function scoreTokens(tokens: string[], title: string, rest: string): number {
  let total = 0;
  for (const tok of tokens) {
    const s = tokenScore(tok, title, rest) || (tok.length >= 5 ? stemScore(tok, title, rest) : 0);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

function tokensOf(s: string): string[] {
  return s.split(SPLIT).filter(Boolean);
}

export interface SearchResult {
  entry: SearchEntry;
  score: number;
  /** [start, end) ranges of the title to highlight. */
  ranges: [number, number][];
}

function highlightRanges(item: Indexed, tokens: string[]): [number, number][] {
  const { text, map } = item.title;
  const marks: [number, number][] = [];
  for (const tok of tokens) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(tok, from);
      if (at < 0) break;
      marks.push([map[at], map[at + tok.length - 1] + 1]);
      from = at + tok.length;
    }
  }
  marks.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const m of marks) {
    const last = merged[merged.length - 1];
    if (last && m[0] <= last[1]) last[1] = Math.max(last[1], m[1]);
    else merged.push([m[0], m[1]]);
  }
  return merged;
}

export function search(query: string, limit = 12): SearchResult[] {
  const q = fold(query.trim());
  if (!q) return [];
  const direct = tokensOf(q);
  if (direct.length === 0) return [];

  const latin = HAS_LATIN.test(q);
  const layout = latin ? tokensOf(fold(q.split("").map((c) => LAYOUT[c] ?? c).join(""))) : null;
  const greeklishTokens = latin ? tokensOf(canon(q)) : null;

  const results: SearchResult[] = [];
  for (const item of INDEX) {
    const t = item.title.text;
    let score = scoreTokens(direct, t, item.rest);
    let ranges = score > 0 ? highlightRanges(item, direct) : [];

    if (layout && layout.length) {
      const s = scoreTokens(layout, t, item.rest) * 0.9;
      if (s > score) {
        score = s;
        ranges = highlightRanges(item, layout);
      }
    }
    if (greeklishTokens && greeklishTokens.length) {
      const s = scoreTokens(greeklishTokens, item.latinTitle, item.latinRest) * 0.8;
      if (s > score) {
        score = s;
        ranges = [];
      }
    }
    if (score <= 0) continue;

    if (t === q) score += 12;
    else if (t.startsWith(q)) score += 6;
    score += KIND_WEIGHT[item.entry.kind];
    results.push({ entry: item.entry, score, ranges });
  }

  return results
    .sort(
      (a, b) =>
        b.score - a.score ||
        KIND_ORDER.indexOf(a.entry.kind) - KIND_ORDER.indexOf(b.entry.kind) ||
        a.entry.title.localeCompare(b.entry.title, "el"),
    )
    .slice(0, limit);
}
