"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /light/karieres — Επαγγελματικές Προοπτικές (calm draft)
   ──────────────────────────────────────────────────────────────────────────
   Verified-only: the graduate profile is taken from the study guide's «Στόχοι
   του Π.Μ.Σ.» and «Προφίλ αποφοίτων». The five fields describe where graduates
   work; no fabricated placement statistics and no invented testimonials.

   Signature moment: an interactive explorer of the five career fields. Still
   otherwise.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";
import { careerPaths } from "@/data/careers";
import {
  CONTAINER,
  FadeIn,
  LightIcon,
  SectionHead,
  PrimaryLink,
  spanOf,
} from "@/components/home-light/light-kit";

/* Graduate profile — study guide, «Γενική Περιγραφή του Προγράμματος». */
const profilePoints: { icon: string; text: string }[] = [
  { icon: "factory", text: "Στελέχη επιχειρήσεων ιδιωτικού & δημόσιου τομέα στην παραγωγή καλλυντικών υψηλής προστιθέμενης αξίας" },
  { icon: "flask", text: "Σχεδιασμός και δημιουργία νέων καλλυντικών σκευασμάτων" },
  { icon: "search", text: "Ανάπτυξη και προώθηση της έρευνας σε όλα τα πεδία της κοσμητολογίας" },
  { icon: "briefcase", text: "Ελεύθεροι επαγγελματίες και σύμβουλοι του κλάδου" },
];

function CareerExplorer() {
  const [active, setActive] = useState(careerPaths[0].id);
  const path = careerPaths.find((p) => p.id === active) ?? careerPaths[0];

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-10">
      {/* selector */}
      <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {careerPaths.map((p) => {
          const on = p.id === active;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-2xl p-4 text-left transition-colors lg:w-full",
                on
                  ? "bg-ihu-green-dark text-white shadow-sm"
                  : "bg-white text-text-primary ring-1 ring-slate-200 hover:ring-ihu-green-light",
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                  on ? "bg-white/15 text-white" : "bg-lachani-mist text-ihu-green-dark",
                )}
              >
                <LightIcon name={p.icon} size={19} />
              </span>
              <span className="text-sm font-bold leading-snug">{p.title}</span>
            </button>
          );
        })}
      </div>

      {/* detail */}
      <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:p-8">
        <h3 className="font-heading text-xl font-extrabold text-text-primary">{path.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{path.fullDescription}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ihu-green-dark">
              Δεξιότητες
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {path.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-lachani-mist px-2.5 py-1 text-[11px] font-semibold text-ihu-green-dark"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ihu-green-dark">
              Ενδεικτικοί ρόλοι
            </p>
            <ul className="mt-3 space-y-1.5">
              {path.roles.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ihu-green-dark" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ihu-green-dark">
            Πού
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {path.opportunities.map((o) => (
              <span
                key={o}
                className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-text-secondary ring-1 ring-slate-200"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Scroll signature: the ascent after graduation ──
   A stepped path that draws itself as you scroll, with four grounded
   milestones — no fabricated statistics, just the trajectory the study guide
   describes (profession, specialisation, doctoral continuation). */

const ascentSteps: { title: string; text: string }[] = [
  { title: "Δίπλωμα ΜΣ", text: "«Κοσμητολογία» — 90 ECTS, μία από τις δύο ειδικεύσεις" },
  { title: "Είσοδος στον κλάδο", text: "Έρευνα & ανάπτυξη, ποιοτικός έλεγχος, κλινική κοσμητολογία" },
  { title: "Εξέλιξη", text: "Εξειδικευμένα στελέχη, σύμβουλοι, δικά σας σκευάσματα" },
  { title: "Διδακτορικό", text: "Συνέχιση σπουδών σε ελληνικά ή ξένα πανεπιστήμια" },
];

/* Milestone dot positions along the staircase (720×260 viewBox). */
const ascentDots = [
  { x: 90, y: 240 },
  { x: 270, y: 178 },
  { x: 450, y: 116 },
  { x: 630, y: 54 },
];

function AscentDot({
  progress,
  index,
  x,
  y,
}: {
  progress: MotionValue<number>;
  index: number;
  x: number;
  y: number;
}) {
  const t = useTransform(progress, (p) => spanOf(p, 0.14 + index * 0.19, 0.26 + index * 0.19));
  return (
    <>
      <motion.circle cx={x} cy={y} r="7" fill="#5F712A" style={{ opacity: t, scale: t }} />
      <motion.circle cx={x} cy={y} r="3" fill="#F4F7ED" style={{ opacity: t }} />
    </>
  );
}

function AscentPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 52%"],
  });

  const line = useTransform(scrollYProgress, (p) => spanOf(p, 0.04, 0.9));
  const labelsIn = useTransform(scrollYProgress, (p) => spanOf(p, 0.3, 0.75));

  const stair = "M 10 240 H 180 V 178 H 360 V 116 H 540 V 54 H 710";

  return (
    <div ref={ref} className="mt-12">
      <svg viewBox="0 0 720 260" fill="none" aria-hidden className="block w-full">
        <path d={stair} stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
        <motion.path
          d={stair}
          stroke="#5F712A"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: line }}
        />
        {ascentDots.map((d, i) => (
          <AscentDot key={d.x} progress={scrollYProgress} index={i} x={d.x} y={d.y} />
        ))}
      </svg>

      <motion.ol
        style={{ opacity: labelsIn }}
        className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4"
      >
        {ascentSteps.map((s, i) => (
          <li key={s.title}>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ihu-green-dark">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 font-heading text-sm font-bold text-text-primary">{s.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary">{s.text}</p>
          </li>
        ))}
      </motion.ol>
    </div>
  );
}

export function KarieresLight() {
  return (
    <>
      {/* Graduate profile */}
      <section className="py-20 md:py-24">
        <div className={cn(CONTAINER, "grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16")}>
          <SectionHead
            kicker="Το προφίλ του αποφοίτου"
            title="Έτοιμοι για τον κλάδο"
            description="Το ΠΜΣ καταρτίζει επιστήμονες υψηλού επιπέδου, ικανούς να αναπτυχθούν και να εργαστούν στον τομέα της κοσμητολογίας — στον ιδιωτικό και τον δημόσιο τομέα, αλλά και ως ελεύθεροι επαγγελματίες."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {profilePoints.map((p, i) => (
              <FadeIn key={p.text} delay={i * 0.06}>
                <div className="flex h-full items-start gap-3.5 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
                    <LightIcon name={p.icon} />
                  </span>
                  <p className="text-sm leading-relaxed text-text-secondary">{p.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Signature: career explorer */}
      <section className="border-t border-slate-200/70 bg-[#F4F7ED] py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Πέντε μονοπάτια"
            title="Πού οδηγεί το δίπλωμα"
            description="Από την έρευνα και τη βιομηχανία μέχρι την κλινική αισθητική, την επιχειρηματικότητα και την εκπαίδευση. Επιλέξτε ένα πεδίο."
          />
          <CareerExplorer />
        </div>
      </section>

      {/* Scroll signature: the ascent */}
      <section className="border-t border-slate-200/70 bg-white py-20 md:py-24">
        <div className={cn(CONTAINER, "max-w-4xl")}>
          <SectionHead
            center
            kicker="Η εξέλιξη"
            title="Βήμα βήμα μετά την αποφοίτηση"
            description="Από το δίπλωμα στον πρώτο ρόλο, και από εκεί στην εξειδίκευση ή στη συνέχιση για διδακτορικό — η πορεία που ανοίγει το πρόγραμμα."
          />
          <AscentPath />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className={cn(CONTAINER, "flex flex-wrap items-center gap-x-6 gap-y-3")}>
          <PrimaryLink href="/light/eggrafes">Κάντε αίτηση</PrimaryLink>
        </div>
      </section>
    </>
  );
}

export default KarieresLight;
