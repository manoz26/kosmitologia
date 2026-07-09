"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /light/epikoinonia — Επικοινωνία (calm draft)
   ──────────────────────────────────────────────────────────────────────────
   Verified-only: contact details are exactly the ones in the study guide
   («Χρήσιμες Πληροφορίες»), and every FAQ answer is grounded in the guide (no
   tuition figure, since none is stated there).

   Signature moment: an interactive FAQ accordion. Still otherwise.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Mail, MapPin, Phone, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CONTAINER,
  FadeIn,
  GhostLink,
  SectionHead,
  PrimaryLink,
  spanOf,
} from "@/components/home-light/light-kit";

const contacts: {
  icon: React.ElementType;
  label: string;
  lines: string[];
  href?: string;
}[] = [
  {
    icon: MapPin,
    label: "Διεύθυνση",
    lines: [
      "Τμήμα Επιστημών Διατροφής & Διαιτολογίας, ΔΙΠΑΕ",
      "Αλεξάνδρεια Πανεπιστημιούπολη, Τ.Θ. 141",
      "57400 Σίνδος, Θεσσαλονίκη",
    ],
  },
  { icon: Phone, label: "Τηλέφωνο Γραμματείας", lines: ["2310 013444"], href: "tel:+302310013444" },
  { icon: Mail, label: "Email", lines: ["pms.cosm@nutr.ihu.gr"], href: "mailto:pms.cosm@nutr.ihu.gr" },
  { icon: Globe, label: "Ιστότοπος", lines: ["cosm.ihu.gr"], href: "https://cosm.ihu.gr" },
];

/* Every answer is grounded in the study guide. */
const faqs: { q: string; a: string }[] = [
  {
    q: "Πόσο διαρκεί το πρόγραμμα;",
    a: "Η ελάχιστη διάρκεια είναι τρία (3) διδακτικά εξάμηνα και η μέγιστη πέντε (5) διδακτικά εξάμηνα.",
  },
  {
    q: "Ποιοι γίνονται δεκτοί;",
    a: "Πτυχιούχοι ΑΕΙ (Πανεπιστημίων και ΤΕΙ) όλων των επιστημονικών κλάδων, ελληνικών ή αναγνωρισμένων ιδρυμάτων του εξωτερικού. Αίτηση μπορούν να υποβάλουν και όσοι εκκρεμεί μόνο η ορκωμοσία τους.",
  },
  {
    q: "Πώς γίνεται η επιλογή;",
    a: "Με μοριοδότηση του φακέλου υποψηφιότητας και προσωπική συνέντευξη, το πρώτο δεκαπενθήμερο του Σεπτεμβρίου — χωρίς γραπτές εξετάσεις.",
  },
  {
    q: "Χρειάζεται γνώση αγγλικών;",
    a: "Ναι· ως ελάχιστη απαίτηση θεωρείται το δίπλωμα Lower ή βαθμολογία 550 μονάδων TOEFL (ή αντίστοιχοι τίτλοι). Η γνώση επιπλέον ξένης γλώσσας θεωρείται πρόσθετο προσόν.",
  },
  {
    q: "Πόσα ECTS αντιστοιχούν;",
    a: "90 ECTS συνολικά — 30 ανά εξάμηνο. Στο Α' και Β' εξάμηνο τα μαθήματα (κοινός κορμός + ένα της ειδίκευσης), και 30 ECTS για τη διπλωματική ή την πρακτική άσκηση στο Γ'.",
  },
  {
    q: "Υπάρχει δυνατότητα πρακτικής άσκησης;",
    a: "Ναι. Στο Γ' εξάμηνο, εναλλακτικά της διπλωματικής εργασίας, οι φοιτητές μπορούν να επιλέξουν πρακτική άσκηση σε χώρο παρασκευής ή/και αξιολόγησης καλλυντικών.",
  },
  {
    q: "Πόσοι φοιτητές εισάγονται;",
    a: "Ο αριθμός εισακτέων ορίζεται σε σαράντα (40), με δυνατότητα να γίνουν δεκτοί επιπλέον ένας υπότροφος του ΙΚΥ και ένας αλλοδαπός υπότροφος του Ελληνικού κράτους.",
  },
  {
    q: "Μπορώ να συνεχίσω για διδακτορικό;",
    a: "Ναι. Μετά την απόκτηση του διπλώματος, δίνεται η δυνατότητα συνέχισης των σπουδών για διδακτορικό δίπλωμα σε ελληνικά ή ξένα πανεπιστήμια.",
  },
];

function FaqRow({ item, open, onToggle }: { item: { q: string; a: string }; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-heading text-sm font-bold text-text-primary md:text-base">
          {item.q}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-text-muted transition-transform",
            open && "rotate-180 text-ihu-green-dark",
          )}
        />
      </button>
      {open && (
        <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-text-secondary">
          {item.a}
        </p>
      )}
    </div>
  );
}

/* ── Scroll signature: the route to Sindos ──
   A gentle map-like line from the city centre to the Alexandria campus that
   draws itself on scroll — the "17 χλμ." is verified in the study guide. */
function RouteToCampus() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 76%", "end 48%"],
  });

  const route = useTransform(scrollYProgress, (p) => spanOf(p, 0.05, 0.8));
  const startIn = useTransform(scrollYProgress, (p) => spanOf(p, 0, 0.12));
  const kmIn = useTransform(scrollYProgress, (p) => spanOf(p, 0.4, 0.58));
  const endIn = useTransform(scrollYProgress, (p) => spanOf(p, 0.74, 0.9));

  const path = "M 40 250 C 150 245 200 160 300 130 S 480 90 520 52";

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 560 300" fill="none" aria-hidden className="block w-full">
        <path
          d={path}
          stroke="#CBD5E1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 9"
        />
        <motion.path
          d={path}
          stroke="#5F712A"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: route }}
        />
        <motion.circle cx="40" cy="250" r="6" fill="#5F712A" style={{ opacity: startIn, scale: startIn }} />
        <motion.g style={{ opacity: endIn, scale: endIn }}>
          <circle cx="520" cy="52" r="9" fill="#5F712A" />
          <circle cx="520" cy="52" r="3.5" fill="#F4F7ED" />
        </motion.g>
      </svg>

      {/* labels over the drawing */}
      <motion.p
        style={{ opacity: startIn }}
        className="absolute bottom-[8%] left-[2%] rounded-full bg-white px-3 py-1.5 text-xs font-bold text-text-secondary ring-1 ring-slate-200"
      >
        Θεσσαλονίκη · κέντρο
      </motion.p>
      <motion.p
        style={{ opacity: kmIn }}
        className="absolute left-[46%] top-[38%] rounded-full bg-ihu-green-dark px-3 py-1.5 text-xs font-bold text-white"
      >
        ≈ 17 χλμ.
      </motion.p>
      <motion.p
        style={{ opacity: endIn }}
        className="absolute right-[1%] top-[2%] max-w-[220px] rounded-2xl bg-white px-4 py-3 text-xs font-bold leading-snug text-text-primary shadow-sm ring-1 ring-slate-200"
      >
        Αλεξάνδρεια Πανεπιστημιούπολη
        <span className="mt-0.5 block font-medium text-text-secondary">
          Κτήριο Διατροφής, 1ος όροφος
        </span>
      </motion.p>
    </div>
  );
}

export function EpikoinoniaLight() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* Contact details */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Γραμματεία ΠΜΣ"
            title="Πού θα μας βρείτε"
            description="Για αιτήσεις, δικαιολογητικά και πληροφορίες, επικοινωνήστε με τη Γραμματεία του Προγράμματος."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((c, i) => {
              const Inner = (
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition-colors group-hover:ring-ihu-green-light">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
                    <c.icon size={20} strokeWidth={1.9} />
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
                    {c.label}
                  </p>
                  <div className="mt-1.5 space-y-0.5">
                    {c.lines.map((l) => (
                      <p key={l} className="text-sm leading-snug text-text-secondary">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              );
              return (
                <FadeIn key={c.label} delay={i * 0.06}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group block h-full"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div className="group h-full">{Inner}</div>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scroll signature: the route to campus */}
      <section className="border-t border-slate-200/70 bg-white py-20 md:py-24">
        <div className={cn(CONTAINER, "grid items-center gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16")}>
          <div>
            <SectionHead
              kicker="Πρόσβαση"
              title="17 χλμ. από το κέντρο της πόλης"
              description="Το ΠΜΣ στεγάζεται στην Αλεξάνδρεια Πανεπιστημιούπολη του ΔΙΠΑΕ στη Σίνδο — ένα ιδιόκτητο campus 1.600 στρεμμάτων, δυτικά της Θεσσαλονίκης."
            />
            <FadeIn className="mt-8">
              <GhostLink
                external
                href="https://www.google.com/maps/search/?api=1&query=%CE%94%CE%99%CE%A0%CE%91%CE%95+%CE%91%CE%BB%CE%B5%CE%BE%CE%AC%CE%BD%CE%B4%CF%81%CE%B5%CE%B9%CE%B1+%CE%A0%CE%B1%CE%BD%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%B7%CE%BC%CE%B9%CE%BF%CF%8D%CF%80%CE%BF%CE%BB%CE%B7+%CE%A3%CE%AF%CE%BD%CE%B4%CE%BF%CF%82"
              >
                Οδηγίες στους χάρτες
              </GhostLink>
            </FadeIn>
          </div>
          <RouteToCampus />
        </div>
      </section>

      {/* Signature: FAQ accordion */}
      <section className="border-t border-slate-200/70 bg-[#F4F7ED] py-20 md:py-24">
        <div className={cn(CONTAINER, "max-w-3xl")}>
          <SectionHead
            center
            kicker="Συχνές ερωτήσεις"
            title="Ό,τι χρειάζεται να ξέρετε"
          />
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <FadeIn key={f.q} delay={(i % 4) * 0.04}>
                <FaqRow item={f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10 text-center">
            <PrimaryLink href="/light/eggrafes">Ξεκινήστε την αίτησή σας</PrimaryLink>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

export default EpikoinoniaLight;
