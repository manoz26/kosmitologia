"use client";

/* ══════════════════════════════════════════════════════════════════════════
   AdmissionsStrip — «πού βρίσκονται οι αιτήσεις» right under the hero
   ──────────────────────────────────────────────────────────────────────────
   One calm glass band: cycle, dates, live status, and the way in. Fed by the
   admissions config in src/data/program.ts — never by the current year. The
   status (upcoming/open/closed) appears after hydration; the server render
   shows the neutral date range, so a stale build can't show a wrong status.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { admissions, formatDateLong } from "@/data/program";
import { useAdmissionsStatus } from "@/lib/use-admissions-status";
import { Reveal } from "./lib/primitives";

const opens = formatDateLong(admissions.opens);
const closes = formatDateLong(admissions.closes);

export function AdmissionsStrip() {
  const status = useAdmissionsStatus();

  const headline =
    status === "open"
      ? `Οι αιτήσεις είναι ανοιχτές έως ${closes}`
      : status === "closed"
        ? "Οι αιτήσεις του κύκλου έκλεισαν"
        : status === "upcoming"
          ? `Οι αιτήσεις ανοίγουν ${opens}`
          : `Αιτήσεις: ${opens} – ${closes}`;

  return (
    <section id="aitiseis" aria-label="Κατάσταση αιτήσεων" className="relative z-10 px-4 pt-10 md:pt-14">
      <Reveal direction="up">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 rounded-3xl glass-lachani-deep p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
              <CalendarDays size={22} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ihu-green-dark">
                Κύκλος σπουδών {admissions.cycle}
              </p>
              <p className="mt-1 font-heading text-lg font-bold leading-snug text-text-primary md:text-xl">
                {headline}
              </p>
              {admissions.indicative && (
                <p className="mt-1 text-sm text-text-secondary">
                  Ενδεικτικές ημερομηνίες, σύμφωνα με τον Οδηγό Σπουδών. Η επίσημη ανακοίνωση βγαίνει την άνοιξη.
                </p>
              )}
            </div>
          </div>

          <Link
            href="/eggrafes"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
          >
            Δικαιολογητικά & αίτηση
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default AdmissionsStrip;
