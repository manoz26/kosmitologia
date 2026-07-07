"use client";

/* ══════════════════════════════════════════════════════════════════════════
   LightSections — every calm section of the light homepage (/light)
   ──────────────────────────────────────────────────────────────────────────
   The design contract of the light page, applied everywhere here:

     • One "wow" per page — and it's the hero. Everything below is still.
     • Static white / pale background. Λαχανί appears only as an accent
       (kickers, icons, buttons), never as a full section fill.
     • Single-colour headings at a modest size. No gradient text.
     • Every number appears exactly once (the facts strip).
     • Motion is a one-shot 14px fade-rise per block. Nothing loops, nothing
       pins, nothing follows the pointer.

   Content is imported from home/lib/data — same single source of truth as
   the current homepage, so copy stays in sync between the two versions.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Award,
  BookOpen,
  Building2,
  Calendar,
  Check,
  Factory,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Layers,
  MapPin,
  Microscope,
  Rocket,
  ScanFace,
  Sparkles,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  heroFacts,
  journeyStages,
  pillars,
  featuredProfessors,
  careerSnapshots,
  newsItems,
  type IconKey,
} from "@/components/home/lib/data";
import { courses, semesters } from "@/data/courses";
import { BeforeAfterLight } from "./BeforeAfterLight";

/* ────────────────────────────────────────────
   Tiny light primitives
   ──────────────────────────────────────────── */

/* Only the icon keys the light page actually uses. */
const ICONS: Partial<Record<IconKey, LucideIcon>> = {
  calendar: Calendar,
  award: Award,
  layers: Layers,
  users: Users,
  sprout: Sprout,
  flask: FlaskConical,
  microscope: Microscope,
  "heart-pulse": HeartPulse,
  rocket: Rocket,
  factory: Factory,
  "heart-handshake": HeartHandshake,
  "map-pin": MapPin,
  "scan-face": ScanFace,
  building: Building2,
};

function LightIcon({ name, size = 18 }: { name: IconKey; size?: number }) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={1.9} />;
}

/* Small rounded icon chip — the only place λαχανί tints a surface. */
function IconChip({ name }: { name: IconKey }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
      <LightIcon name={name} />
    </span>
  );
}

/* One-shot fade-rise. The only animation below the hero. */
function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-ihu-green-dark">
      {children}
    </p>
  );
}

/* Left-aligned, single-colour section head. */
function SectionHead({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeIn className="max-w-2xl">
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-text-secondary">{description}</p>
      )}
    </FadeIn>
  );
}

const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/* ────────────────────────────────────────────
   1. Facts strip — the numbers, once
   ──────────────────────────────────────────── */

export function FactsStrip() {
  return (
    <section className="border-b border-slate-200/70 bg-[#FAFBFE]">
      <div className={cn(CONTAINER, "grid grid-cols-2 gap-y-10 py-12 md:grid-cols-4")}>
        {heroFacts.map((f, i) => (
          <FadeIn key={f.label} delay={i * 0.06} className="text-center">
            <p className="font-heading text-4xl font-extrabold tracking-tight text-ihu-green-dark">
              {f.value}
            </p>
            <p className="mt-1.5 text-sm font-medium text-text-secondary">{f.label}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   2. Programme — 5 stages, flat; 2 κατευθύνσεις
   ──────────────────────────────────────────── */

export function ProgramSection() {
  return (
    <section className="bg-[#F4F7ED] py-20 md:py-24">
      <div className={CONTAINER}>
        <SectionHead
          kicker="Το Πρόγραμμα Σπουδών"
          title="Από το συστατικό στο προϊόν"
          description="Το πρόγραμμα ακολουθεί την πραγματική διαδρομή ενός καλλυντικού σε πέντε στάδια — και εξειδικεύεται σε δύο κατευθύνσεις."
        />

        {/* The 5 stages — a quiet row instead of a pinned 3D journey */}
        <div className="mt-12 grid gap-8 md:grid-cols-5 md:gap-6">
          {journeyStages.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.07}>
              <div className="flex items-start gap-4 md:block">
                <div className="flex items-center gap-3 md:mb-4">
                  <span className="font-heading text-sm font-extrabold tracking-wide text-ihu-green-dark/60">
                    {s.index}
                  </span>
                  <IconChip name={s.icon} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold leading-snug text-text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">{s.subtitle}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* The 2 specialisations — flat white cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {pillars.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-white p-6 ring-1 ring-slate-200 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-lachani-mist font-heading text-sm font-extrabold text-ihu-green-dark">
                    {p.index}
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">
                    Κατεύθυνση
                  </p>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.description}</p>
                <ul className="mt-4 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b.text} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <Check size={15} className="shrink-0 text-ihu-green-dark" />
                      {b.text}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   2β. Curriculum — the actual courses, per the
       official study guide (Μ2.3, Ιαν. 2024)
   ──────────────────────────────────────────── */

/* Compact degree facts from the study guide — none repeats the facts strip. */
const degreeFacts: { icon: LucideIcon; text: string }[] = [
  { icon: GraduationCap, text: "Δίπλωμα Μεταπτυχιακών Σπουδών με μία από τις δύο ειδικεύσεις" },
  { icon: Calendar, text: "Φοίτηση από 3 έως το πολύ 5 διδακτικά εξάμηνα" },
  { icon: BookOpen, text: "Δυνατότητα συνέχισης για διδακτορικό σε Ελλάδα ή εξωτερικό" },
];

export function CurriculumSection() {
  return (
    <section className="border-t border-slate-200/70 py-20 md:py-24">
      <div className={CONTAINER}>
        <SectionHead
          kicker="Τα Μαθήματα"
          title="Το πρόγραμμα, μάθημα προς μάθημα"
          description="Οι δύο ειδικεύσεις μοιράζονται επτά κοινά μαθήματα και διαφέρουν σε ένα μάθημα ανά εξάμηνο. Κάθε μάθημα διδάσκεται επί 13 εβδομάδες (26 ώρες)."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {semesters.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <p className="font-heading text-base font-bold text-text-primary">{s.label}</p>
                <p className="mt-0.5 text-xs text-text-muted">{s.sublabel}</p>
                <ul className="mt-4">
                  {courses
                    .filter((c) => c.semester === s.id)
                    .map((c) => (
                      <li
                        key={c.code}
                        className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-2.5 last:border-0"
                      >
                        <span className="text-sm leading-snug text-text-primary">
                          {c.track && (
                            <span className="mr-2 rounded bg-lachani-mist px-1.5 py-0.5 text-[10px] font-bold text-ihu-green-dark">
                              {c.track === "preparation" ? "Ι" : "ΙΙ"}
                            </span>
                          )}
                          {c.nameGr}
                        </span>
                        <span className="shrink-0 text-xs font-semibold tabular-nums text-text-muted">
                          {c.ects} ECTS
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-5">
          <p className="text-xs leading-relaxed text-text-muted">
            Ι = μάθημα της ειδίκευσης «Παρασκευή & Αξιολόγηση Καλλυντικών Προϊόντων» · ΙΙ = μάθημα
            της ειδίκευσης «Εφαρμογές της Κοσμητολογίας στη Δερματολογία». Επιλέγετε ένα από τα δύο
            σε κάθε εξάμηνο.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {degreeFacts.map((f, i) => (
            <FadeIn key={f.text} delay={i * 0.06}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
                  <f.icon size={18} strokeWidth={1.9} />
                </span>
                <p className="text-sm leading-snug text-text-secondary">{f.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10">
          <Link
            href="/light/programma"
            className="group inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Αναλυτικά περιγράμματα μαθημάτων
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   3. The School — text + the quiet interactive
   ──────────────────────────────────────────── */

/* Facts from the study guide (Μ2.3, Ιαν. 2024) — «Πληροφορίες για το Ίδρυμα». */
const schoolPoints: { icon: IconKey; text: string }[] = [
  {
    icon: "map-pin",
    text: "Αλεξάνδρεια Πανεπιστημιούπολη, Σίνδος — 17 χλμ. δυτικά της Θεσσαλονίκης, σε ιδιόκτητο campus 1.600 στρεμμάτων",
  },
  {
    icon: "building",
    text: "Μέρος της Σχολής Επιστημών Υγείας του ΔΙΠΑΕ — ένα ίδρυμα με 9 σχολές, 30 τμήματα και περίπου 20.000 φοιτητές στην Πανεπιστημιούπολη",
  },
  { icon: "microscope", text: "Σύγχρονα εργαστήρια παρασκευής & ενόργανης ανάλυσης" },
  { icon: "scan-face", text: "Κλινική & in vivo αξιολόγηση με μετρήσιμα αποτελέσματα" },
];

export function SchoolSection() {
  return (
    <section className="py-20 md:py-24">
      <div className={cn(CONTAINER, "grid items-center gap-12 lg:grid-cols-2 lg:gap-16")}>
        <div>
          <SectionHead
            kicker="Η Σχολή"
            title="Το Τμήμα και το Ίδρυμα"
            description="Το ΠΜΣ λειτουργεί στο Τμήμα Επιστημών Διατροφής & Διαιτολογίας του Διεθνούς Πανεπιστημίου της Ελλάδος. Δεν μένουμε στη θεωρία: η αποτελεσματικότητα τεκμηριώνεται με κλινική και ενόργανη αξιολόγηση."
          />
          <div className="mt-8 space-y-4">
            {schoolPoints.map((p, i) => (
              <FadeIn key={p.text} delay={0.05 + i * 0.06}>
                <div className="flex items-center gap-4">
                  <IconChip name={p.icon} />
                  <p className="text-sm leading-relaxed text-text-secondary">{p.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.18} className="mt-8">
            <p className="text-sm leading-relaxed text-text-secondary">
              Το Τμήμα εκπαιδεύει επιστήμονες από το 1985. Το 2019 εντάχθηκε σε αυτό το Τμήμα
              Αισθητικής & Κοσμητολογίας του ΑΤΕΙΘ, και το ΠΜΣ «Κοσμητολογία» υποδέχεται φοιτητές
              από το ακαδημαϊκό έτος 2021–22.
            </p>
            <p className="mt-3 text-xs text-text-muted">
              Διευθυντής ΠΜΣ: Αθανάσιος Παπαδόπουλος, Καθηγητής · Αν. Διευθυντής: Ιορδάνης
              Παπαδόπουλος, Αν. Καθηγητής
            </p>
          </FadeIn>
          <FadeIn delay={0.24} className="mt-8">
            <Link
              href="/light/sxetika"
              className="group inline-flex items-center gap-2 text-sm font-bold text-ihu-green-dark"
            >
              Περισσότερα για τη Σχολή
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <BeforeAfterLight />
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   4. People & outcomes — two quiet columns
   ──────────────────────────────────────────── */

export function PeopleSection() {
  return (
    <section className="border-t border-slate-200/70 py-20 md:py-24">
      <div className={CONTAINER}>
        <SectionHead
          kicker="Άνθρωποι & Προοπτικές"
          title="Ποιοι διδάσκουν — και πού οδηγεί"
        />

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Faculty */}
          <div>
            <h3 className="font-heading text-lg font-bold text-text-primary">Διδάσκοντες</h3>
            <div className="mt-5 space-y-5">
              {featuredProfessors.map((prof, i) => (
                <FadeIn key={prof.name} delay={i * 0.05}>
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lachani-mist font-heading text-sm font-bold text-ihu-green-dark">
                      {prof.initials}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{prof.name}</p>
                      <p className="text-xs text-text-secondary">
                        {prof.role} · {prof.institution}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.22} className="mt-7">
              <Link
                href="/light/didaskotes"
                className="group inline-flex items-center gap-2 text-sm font-bold text-ihu-green-dark"
              >
                Όλοι οι διδάσκοντες
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </FadeIn>
          </div>

          {/* Careers */}
          <div>
            <h3 className="font-heading text-lg font-bold text-text-primary">
              Επαγγελματικές Προοπτικές
            </h3>
            <div className="mt-5 space-y-5">
              {careerSnapshots.map((c, i) => (
                <FadeIn key={c.title} delay={i * 0.05}>
                  <div className="flex items-start gap-4">
                    <IconChip name={c.icon} />
                    <div>
                      <p className="text-sm font-bold text-text-primary">{c.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                        {c.description}{" "}
                        <span className="text-text-muted">{c.roles.join(" · ")}</span>
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.22} className="mt-7">
              <Link
                href="/light/karieres"
                className="group inline-flex items-center gap-2 text-sm font-bold text-ihu-green-dark"
              >
                Περισσότερα για την καριέρα
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   5. News — text cards, no thumbnails
   ──────────────────────────────────────────── */

export function NewsLight() {
  return (
    <section className="border-t border-slate-200/70 py-20 md:py-24">
      <div className={CONTAINER}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker="Ενημέρωση" title="Τελευταία Νέα" />
          <FadeIn>
            <Link
              href="/light/nea"
              className="group inline-flex items-center gap-2 text-sm font-bold text-ihu-green-dark"
            >
              Όλα τα νέα
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {newsItems.map((n, i) => (
            <FadeIn key={n.title} delay={i * 0.07}>
              <article className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-lachani-mist px-2.5 py-1 text-[11px] font-bold text-ihu-green-dark">
                    {n.tag}
                  </span>
                  <span className="text-xs text-text-muted">{n.date}</span>
                </div>
                <h3 className="mt-3.5 font-heading text-base font-bold leading-snug text-text-primary">
                  {n.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{n.excerpt}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   6. Admissions — the closing section
   Ποιοι γίνονται δεκτοί, πώς γίνεται η επιλογή
   και τι περιλαμβάνει ο φάκελος, κατά τον
   οδηγό σπουδών (Μ2.3, Ιαν. 2024).
   ──────────────────────────────────────────── */

const admissionSteps: { index: string; title: string; text: string }[] = [
  {
    index: "01",
    title: "Αιτήσεις: 10 Ιουνίου – 10 Ιουλίου",
    text: "Η πρόσκληση δημοσιεύεται την άνοιξη κάθε έτους και οι αιτήσεις υποβάλλονται στη Γραμματεία του ΠΜΣ.",
  },
  {
    index: "02",
    title: "Αξιολόγηση φακέλου & συνέντευξη",
    text: "Το πρώτο δεκαπενθήμερο του Σεπτεμβρίου μοριοδοτούνται η συνάφεια και ο βαθμός πτυχίου, η ερευνητική και επαγγελματική εμπειρία, η διπλωματική και οι ξένες γλώσσες.",
  },
  {
    index: "03",
    title: "Απάντηση & εγγραφή",
    text: "Οι επιτυχόντες ενημερώνονται από τη Γραμματεία και απαντούν εντός 10 ημερών· ακολουθεί η εγγραφή τους στο πρόγραμμα.",
  },
];

const dossierItems: string[] = [
  "Έντυπη αίτηση & πλήρες βιογραφικό σημείωμα",
  "Αντίγραφο πτυχίου & πιστοποιητικό αναλυτικής βαθμολογίας",
  "Πιστοποιητικό αγγλικών (τουλάχιστον Lower ή TOEFL 550)",
  "Δύο συστατικές επιστολές",
  "Επιστημονικές δημοσιεύσεις & αποδεικτικά εμπειρίας (εάν υπάρχουν)",
];

export function AdmissionsSection() {
  return (
    <section className="border-t border-slate-200/70 bg-[#F4F7ED] py-20 md:py-24">
      <div className={CONTAINER}>
        <SectionHead
          kicker="Εισαγωγή"
          title="Πώς θα ενταχθείτε στο ΠΜΣ"
          description="Δεκτοί γίνονται πτυχιούχοι ΑΕΙ όλων των επιστημονικών κλάδων, από την Ελλάδα ή αναγνωρισμένα ιδρύματα του εξωτερικού. Η επιλογή γίνεται με μοριοδότηση του φακέλου και συνέντευξη — χωρίς γραπτές εξετάσεις."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* The process */}
          <div className="space-y-7">
            {admissionSteps.map((s, i) => (
              <FadeIn key={s.index} delay={i * 0.07}>
                <div className="flex items-start gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white font-heading text-xs font-extrabold text-ihu-green-dark ring-1 ring-slate-200">
                    {s.index}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{s.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* The dossier */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 md:p-7">
              <h3 className="font-heading text-base font-bold text-text-primary">
                Ο φάκελος υποψηφιότητας
              </h3>
              <ul className="mt-4 space-y-3">
                {dossierItems.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check size={15} className="mt-0.5 shrink-0 text-ihu-green-dark" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-text-muted">
                Αίτηση μπορούν να υποβάλουν και όσοι έχουν ολοκληρώσει επιτυχώς τα μαθήματά τους
                και εκκρεμεί μόνο η ορκωμοσία.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/light/eggrafes"
              className="group inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Αιτήσεις Εισαγωγής
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/light/epikoinonia"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-text-primary ring-1 ring-slate-300 transition-colors hover:bg-slate-50"
            >
              Επικοινωνία με τη Γραμματεία
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Back to top — the only piece of chrome
   ──────────────────────────────────────────── */

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Επιστροφή στην αρχή"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-white text-ihu-green-dark shadow-md ring-1 ring-slate-200 transition-all hover:-translate-y-0.5",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
