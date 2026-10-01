/* ══════════════════════════════════════════════════════════════════════════
   BeforeAfterSkin — «Η επιστήμη» (on /sxetika)
   ──────────────────────────────────────────────────────────────────────────
   On the left, an interactive 3D model of hyaluronic acid (drawn on canvas —
   no stock photos, no invented "metrics") that the visitor can rotate. On the
   right, the science behind it as four ruled rows, each tied to a real course
   of the programme (src/data/courses.ts, study guide). On desktop the model is
   sticky so it stays in view. Transparent — floats over <ScrollBackdrop/>.
   ══════════════════════════════════════════════════════════════════════════ */

import { courses } from "@/data/courses";
import { SectionHeading, GlassPanel, Reveal, IconBadge } from "./lib/primitives";
import { MoleculeViewer } from "./lib/MoleculeViewer";
import type { IconKey } from "./lib/data";

const courseName = (code: string) => courses.find((c) => c.code === code)?.nameGr ?? "";

/* The science, row by row — every row names the course that teaches it. */
const scienceRows: { icon: IconKey; title: string; text: string; course: string }[] = [
  {
    icon: "atom",
    title: "Από το μόριο",
    text: "Η χημεία των δραστικών συστατικών και πώς δρουν στο δέρμα.",
    course: courseName("COSM1004"),
  },
  {
    icon: "scan-face",
    title: "Στο δέρμα",
    text: "Η φυσιολογία του δέρματος, το μικροβίωμα και οι παθήσεις του.",
    course: courseName("COSM1002"),
  },
  {
    icon: "flask",
    title: "Στο προϊόν",
    text: "Σχεδιασμός και παρασκευή καλλυντικών, μέσα στο ευρωπαϊκό νομοθετικό πλαίσιο.",
    course: courseName("COSM1008"),
  },
  {
    icon: "microscope",
    title: "Με μετρήσεις",
    text: "Ποιοτικός έλεγχος με φασματοσκοπία και χρωματογραφία (HPLC, GC).",
    course: courseName("COSM1009"),
  },
];

export function BeforeAfterSkin() {
  return (
    <section id="epistimi" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container px-4">
        <SectionHeading
          label="Η επιστήμη"
          labelIcon="sparkles"
          title="Η διαφορά που κάνει η"
          highlight="γνώση"
          description="Από τη μοριακή δομή ενός συστατικού μέχρι τον ποιοτικό έλεγχο του τελικού προϊόντος, όπως τα διδάσκει το πρόγραμμα."
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

          {/* ── Right: the science, tied to the courses that teach it ── */}
          <div className="space-y-5">
            {/* One panel with ruled rows instead of four stacked cards */}
            <Reveal direction="up">
              <GlassPanel className="divide-y divide-ihu-green-dark/10 px-5">
                {scienceRows.map((f) => (
                  <div key={f.title} className="flex items-start gap-4 py-5">
                    <IconBadge icon={f.icon} size="sm" />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-text-primary">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                        {f.text}
                      </p>
                      <p className="mt-1.5 text-xs font-semibold text-ihu-green-dark">Μάθημα: {f.course}</p>
                    </div>
                  </div>
                ))}
              </GlassPanel>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterSkin;
