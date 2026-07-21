/* ══════════════════════════════════════════════════════════════════════════
   BeforeAfterSkin
   ──────────────────────────────────────────────────────────────────────────
   The "science with results" section. On the left, an interactive 3D model of
   hyaluronic acid (drawn on canvas — no stock photos, no invented "metrics")
   that the visitor can rotate. On the right, facts about the School reveal one
   by one on scroll. On desktop the model is sticky so it stays in view while
   the story scrolls past. Transparent — floats over <ScrollBackdrop/>.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  SectionHeading,
  GlassPanel,
  Reveal,
  IconBadge,
  MiniStat,
} from "./lib/primitives";
import { MoleculeViewer } from "./lib/MoleculeViewer";
import type { IconKey } from "./lib/data";

/* ── Content: what the visitor learns about the School while scrolling ── */
const schoolFacts: { icon: IconKey; title: string; text: string }[] = [
  {
    icon: "building",
    title: "Το Τμήμα & το Ίδρυμα",
    text: "Τμήμα Επιστημών Διατροφής & Διαιτολογίας του Διεθνούς Πανεπιστημίου της Ελλάδος — Αλεξάνδρεια Πανεπιστημιούπολη, Σίνδος Θεσσαλονίκης.",
  },
  {
    icon: "map-pin",
    title: "1.600 στρέμματα campus",
    text: "Υπερσύγχρονες ιδιόκτητες εγκαταστάσεις — το ιδανικό περιβάλλον για την ακαδημαϊκή και ερευνητική ανάπτυξη των φοιτητών.",
  },
  {
    icon: "microscope",
    title: "Σύγχρονα εργαστήρια",
    text: "Εξοπλισμός ενόργανης ανάλυσης & αξιολόγησης — από τη φασματοσκοπία και τη χρωματογραφία μέχρι τις in vivo μετρήσεις δέρματος.",
  },
  {
    icon: "scan-face",
    title: "Επιστήμη με μετρήσιμο αποτέλεσμα",
    text: "Δεν μένουμε στους ισχυρισμούς: πιστοποιούμε την αποτελεσματικότητα με κλινική & ενόργανη αξιολόγηση — από τη μοριακή δομή ως το τελικό προϊόν.",
  },
];

export function BeforeAfterSkin() {
  return (
    <section id="sxoli" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container px-4">
        <SectionHeading
          label="Η Σχολή & η Επιστήμη"
          labelIcon="sparkles"
          title="Η διαφορά που κάνει η"
          highlight="γνώση"
          description="Στο ΠΜΣ Κοσμητολογία δεν σταματάμε στη θεωρία. Ξεκινάμε από τη μοριακή δομή των δραστικών συστατικών και φτάνουμε ως την κλινική & ενόργανη αξιολόγηση του τελικού προϊόντος."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── Left: interactive 3D molecule (sticky on desktop) ── */}
          <div className="lg:sticky lg:top-24">
            <GlassPanel className="p-2.5">
              <MoleculeViewer />
            </GlassPanel>
            <p className="mt-3 text-center text-xs font-medium text-text-secondary">
              Υαλουρονικό οξύ — το μόριο-κλειδί της ενυδάτωσης. Σύρετε για να το περιστρέψετε σε 3D.
            </p>
          </div>

          {/* ── Right: the story about the School, revealed on scroll ── */}
          <div className="space-y-5">
            {schoolFacts.map((f, i) => (
              <Reveal key={f.title} direction="up" delay={i * 0.05}>
                <GlassPanel className="flex items-start gap-4 p-5">
                  <IconBadge icon={f.icon} />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-text-primary">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {f.text}
                    </p>
                  </div>
                </GlassPanel>
              </Reveal>
            ))}

            <Reveal direction="up">
              <GlassPanel className="p-5">
                <div className="grid grid-cols-3 gap-2">
                  <MiniStat value="3" label="Εξάμηνα" />
                  <MiniStat value="90" label="ECTS" />
                  <MiniStat value="40" label="Φοιτητές / έτος" />
                </div>
              </GlassPanel>
            </Reveal>

            <Reveal direction="up">
              <Link
                href="/sxetika"
                className="group inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg shadow-ihu-green-dark/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Περισσότερα για τη Σχολή
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterSkin;
