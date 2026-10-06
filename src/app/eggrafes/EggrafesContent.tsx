"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /eggrafes — «Εισαγωγή»
   ──────────────────────────────────────────────────────────────────────────
   On the same 12-column grid as the rest of the site:
     • the page title (LachaniPageHeader),
     • dates (7 columns, square-cut ledger) beside the application form
       (5 columns, deep green),
     • the required documents: the heading holds the left four columns
       (sticky on desktop), the list the right eight,
     • the λαχανί band: admission timeline, official documents, FAQ.
   The ids are site-search anchors (#imerominies, #dikaiologitika).
   ══════════════════════════════════════════════════════════════════════════ */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays, FileText, GraduationCap, Download, Mail,
  BookOpen, Languages, Award, Briefcase, User, ShieldCheck,
} from "lucide-react";

import { LachaniSurface } from "@/components/home/LachaniSurface";
import { LachaniPageHeader } from "@/components/home/LachaniPageHeader";
import { AdmissionTimeline3D } from "@/components/home/AdmissionTimeline3D";
import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";
import { DownloadsSection } from "@/components/home/DownloadsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Reveal, SectionHeading } from "@/components/home/lib/primitives";
import { cycleLabel, latestAdmissions as call } from "@/data/announcements";
import { admissionsRule, formatDate, requiredDocuments } from "@/data/program";
import { ADMISSIONS_STATUS_LABEL, useAdmissionsStatus } from "@/lib/use-admissions-status";

const DOC_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  aitisi: FileText,
  ptyxio: GraduationCap,
  vathmologia: BookOpen,
  titloi: Award,
  cv: User,
  glosses: Languages,
  dimosieuseis: FileText,
  empeiria: Briefcase,
  taytotita: ShieldCheck,
  systatikes: Mail,
};

export function EggrafesContent() {
  const status = useAdmissionsStatus();

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Same still λαχανί canvas as the home page */}
      <ScrollBackdrop />

      <LachaniPageHeader
        eyebrow="Εισαγωγή στο ΠΜΣ"
        title="Εγγραφές &"
        highlight="Αιτήσεις"
        intro="Ημερομηνίες υποβολής, έντυπο αίτησης και απαραίτητα δικαιολογητικά για το ΠΜΣ Κοσμητολογία."
      />

      {/* DATES (7) & APPLICATION FORM (5) */}
      <section id="imerominies" className="relative z-10 scroll-mt-28 pb-16">
        <div className="section-container px-4">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Dates — a square-cut ledger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="edge-top glass-lachani p-7 md:p-9 lg:col-span-7"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ihu-green/12 text-ihu-green-dark">
                  <CalendarDays size={24} />
                </span>
                <h2 className="font-heading text-2xl font-bold leading-tight text-text-primary">
                  Ημερομηνίες αιτήσεων
                </h2>
              </div>

              {/* Οι ημερομηνίες έρχονται μόνο από την ανακοίνωση της Γραμματείας */}
              {call ? (
                <dl className="mt-7">
                  <p className="text-sm font-semibold text-ihu-green-dark">
                    Κύκλος {cycleLabel(call.admissions)}
                  </p>
                  <div className="mt-3 flex items-baseline justify-between border-y border-ihu-green-dark/12 py-4">
                    <dt className="text-base font-medium text-text-secondary">Έναρξη</dt>
                    <dd className="font-heading text-2xl font-bold tabular-nums text-text-primary">
                      {formatDate(call.admissions.opens)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-ihu-green-dark/12 py-4">
                    <dt className="text-base font-medium text-text-secondary">Λήξη</dt>
                    <dd className="font-heading text-2xl font-bold tabular-nums text-text-primary">
                      {formatDate(call.admissions.closes)}
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="mt-7 text-lg font-medium text-text-primary">
                  Τις ημερομηνίες κάθε κύκλου τις ανακοινώνει η Γραμματεία.
                </p>
              )}

              <p className="mt-6 text-sm leading-relaxed text-text-secondary">
                {status && <strong className="text-text-primary">{ADMISSIONS_STATUS_LABEL[status]}. </strong>}
                {status === "closed" && "Τις ημερομηνίες του επόμενου κύκλου θα τις ανακοινώσει η Γραμματεία. "}
                Σύμφωνα με τον Οδηγό Σπουδών, οι αιτήσεις υποβάλλονται {admissionsRule.value}.{" "}
                <Link
                  href={call && status !== "closed" ? `/nea#${call.id}` : "/nea"}
                  className="font-semibold text-ihu-green-dark underline-offset-4 hover:underline"
                >
                  Ανακοινώσεις
                </Link>
              </p>
            </motion.div>

            {/* Application form — deep green, square-cut */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative flex flex-col justify-between overflow-hidden p-7 text-white shadow-[0_30px_60px_-30px_rgba(63,82,22,0.75)] md:p-9 lg:col-span-5"
              style={{ background: "linear-gradient(145deg, #4F6321 0%, #5F712A 55%, #6B8230 100%)" }}
            >
              <FileText
                aria-hidden
                size={220}
                strokeWidth={1}
                className="pointer-events-none absolute -bottom-10 -right-10 text-white/[0.06]"
              />
              <div className="relative">
                <h2 className="font-heading text-3xl font-bold">Έντυπο αίτησης</h2>
                <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/90">
                  Το αρχείο της αίτησης (Word) συμπληρώνεται και επισυνάπτεται στα δικαιολογητικά.
                </p>
              </div>
              <a
                href="/aitisi.docx"
                download="aitisi.docx"
                className="group relative mt-8 inline-flex w-full items-center justify-center gap-3 self-start rounded-full bg-[#cfe38a] px-7 py-3.5 text-base font-bold text-ihu-green-dark shadow-lg transition-colors hover:bg-white sm:w-auto"
              >
                <Download size={20} />
                Λήψη .docx
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS — heading left (4), list right (8) */}
      <section id="dikaiologitika" className="relative z-10 scroll-mt-28 py-16 md:py-20">
        <div className="section-container grid gap-10 px-4 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                label="Δικαιολογητικά"
                labelIcon="book"
                title="Διαδικασία υποβολής"
                highlight="αιτήσεων"
                description="Η αίτηση γίνεται με την κατάθεση από μέρους των ενδιαφερομένων των παρακάτω δικαιολογητικών."
              />
            </div>
          </div>

          <Reveal direction="up" className="lg:col-span-8">
            <ul className="edge-top glass-lachani">
              {requiredDocuments.map((doc) => {
                const Icon = DOC_ICONS[doc.id] ?? FileText;
                return (
                  <li
                    key={doc.id}
                    className="group flex items-start gap-5 border-b border-ihu-green-dark/10 p-6 transition-colors last:border-0 hover:bg-lachani-mist/70 sm:p-7"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ihu-green/10 text-ihu-green-dark transition-colors group-hover:bg-ihu-green-dark group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="flex flex-wrap items-center gap-2 text-lg font-bold text-text-primary">
                        {doc.title}
                        {doc.optional && (
                          <span className="rounded-full bg-ihu-green/12 px-2.5 py-0.5 text-xs font-semibold text-ihu-green-dark">
                            Προαιρετικό
                          </span>
                        )}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary sm:text-base">
                        {doc.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Λαχανί band: admission timeline, documents & FAQ ── */}
      <LachaniSurface>
        <AdmissionTimeline3D />
        <DownloadsSection />
        <FaqSection />
      </LachaniSurface>
    </main>
  );
}
