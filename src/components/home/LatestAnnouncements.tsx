"use client";

/* ══════════════════════════════════════════════════════════════════════════
   LatestAnnouncements — «Ανακοινώσεις», right under the hero
   ──────────────────────────────────────────────────────────────────────────
   The first thing after the hero is what the Secretariat has announced
   (client feedback 06/10/2026: a clear «Ανακοινώσεις» heading over the
   admissions card). Left: the latest admissions call — cycle, live status,
   its window as a two-date bar, the way in. Right: the newest of the other
   announcements as calendar rows. The full list is /nea; the home page shows
   the news only here.

   Everything comes from src/data/announcements.ts — dates are never typed by
   hand, and with no call the card only says that the Secretariat announces
   them. The live status and the bar fill appear after hydration, so a stale
   build can't show a wrong status.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";

import {
  announcements,
  cycleLabel,
  formatPublished,
  latestAdmissions as call,
  publishedParts,
  type AdmissionsStatus,
} from "@/data/announcements";
import { formatDate, formatDateLong } from "@/data/program";
import { useAdmissionsProgress, useAdmissionsStatus } from "@/lib/use-admissions-status";
import { Reveal, SectionHeading } from "./lib/primitives";

const NEXT_CYCLE_NOTE = "Τις ημερομηνίες του επόμενου κύκλου θα τις ανακοινώσει η Γραμματεία.";

/* The call has its own card, so the list shows the others. */
const latestNews = announcements.filter((a) => a.id !== call?.id).slice(0, 3);

const STATUS_CHIP: Record<AdmissionsStatus, { label: string; dot: string; live?: boolean }> = {
  open: { label: "Ανοιχτές", dot: "#C8E25E", live: true },
  upcoming: { label: "Ανοίγουν σύντομα", dot: "#F2D46B" },
  closed: { label: "Έκλεισαν", dot: "rgba(255,255,255,0.6)" },
};

const DEEP_GREEN = "linear-gradient(145deg, #4F6321 0%, #5F712A 55%, #6B8230 100%)";

/* ── The admissions call ── */
function AdmissionsCard() {
  const status = useAdmissionsStatus();
  const progress = useAdmissionsProgress();

  if (!call) {
    return (
      <article
        className="relative flex h-full flex-col justify-center overflow-hidden p-7 text-white md:p-9"
        style={{ background: DEEP_GREEN }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#cfe38a]">Αιτήσεις</p>
        <h3 className="mt-2 font-heading text-2xl font-extrabold leading-tight">
          Τις ημερομηνίες των αιτήσεων τις ανακοινώνει η Γραμματεία
        </h3>
        <Link
          href="/eggrafes"
          className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#cfe38a] px-6 py-3 text-sm font-bold text-ihu-green-dark shadow-lg transition-all hover:gap-3 hover:bg-white"
        >
          Δικαιολογητικά & αίτηση
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </article>
    );
  }

  const opens = formatDateLong(call.admissions.opens);
  const closes = formatDateLong(call.admissions.closes);
  const headline =
    status === "open"
      ? `Οι αιτήσεις είναι ανοιχτές έως ${closes}`
      : status === "closed"
        ? `Οι αιτήσεις έκλεισαν στις ${closes}`
        : status === "upcoming"
          ? `Οι αιτήσεις ανοίγουν ${opens}`
          : `Αιτήσεις: ${opens} – ${closes}`;
  const chip = status ? STATUS_CHIP[status] : null;

  return (
    <article
      className="relative flex h-full flex-col overflow-hidden p-7 text-white shadow-[0_30px_60px_-30px_rgba(63,82,22,0.75)] md:p-10"
      style={{ background: DEEP_GREEN }}
    >
      {/* soft light + watermark — still, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(110% 80% at 100% 0%, rgba(255,255,255,0.18), transparent 55%)" }}
      />
      <CalendarDays
        aria-hidden
        size={230}
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-12 -right-10 text-white/[0.06]"
      />

      <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ring-1 ring-white/25">
          {call.tag}
        </span>
        <span className="text-xs font-medium text-white/70">{formatPublished(call.published)}</span>
        {chip && (
          <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-black/15 px-3 py-1 text-xs font-bold ring-1 ring-white/20">
            <span className="relative flex h-2 w-2">
              {chip.live && (
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none"
                  style={{ background: chip.dot }}
                />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: chip.dot }} />
            </span>
            {chip.label}
          </span>
        )}
      </div>

      <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#cfe38a]">
        Κύκλος σπουδών {cycleLabel(call.admissions)}
      </p>
      <h3 className="relative mt-2 font-heading text-2xl font-extrabold leading-tight md:text-[1.75rem]">
        {headline}
      </h3>

      {/* The window: both dates and how much of it has passed */}
      <div className="relative mt-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Έναρξη</p>
            <p className="mt-0.5 font-heading text-base font-bold tabular-nums">{formatDate(call.admissions.opens)}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Λήξη</p>
            <p className="mt-0.5 font-heading text-base font-bold tabular-nums">{formatDate(call.admissions.closes)}</p>
          </div>
        </div>
        <div className="relative mt-3 h-2 rounded-full bg-white/15">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#eef7c4] to-[#cfe38a]"
            initial={{ width: "0%" }}
            whileInView={{ width: `${(progress ?? 0) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: status === "closed" ? 0.55 : 1 }}
          >
            {status === "open" && (
              <span className="absolute -right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_4px_rgba(207,227,138,0.85)]" />
            )}
          </motion.div>
        </div>
      </div>

      {status === "closed" && <p className="relative mt-4 text-sm leading-relaxed text-white/80">{NEXT_CYCLE_NOTE}</p>}

      <div className="relative mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
        <Link
          href="/eggrafes"
          className="group inline-flex items-center gap-2 rounded-full bg-[#cfe38a] px-6 py-3 text-sm font-bold text-ihu-green-dark shadow-lg transition-all hover:gap-3 hover:bg-white"
        >
          Δικαιολογητικά & αίτηση
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href={`/nea#${call.id}`}
          className="text-sm font-semibold text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          Η ανακοίνωση
        </Link>
      </div>
    </article>
  );
}

/* ── The newest other announcements ── */
function NewsList() {
  return (
    <div className="flex h-full flex-col edge-top glass-lachani px-2 md:px-3">
      <ul className="flex-1 divide-y divide-ihu-green-dark/10">
        {latestNews.map((n) => {
          const d = publishedParts(n.published);
          return (
            <li key={n.id}>
              <Link
                href={`/nea#${n.id}`}
                className="group flex items-start gap-4 px-3 py-5 transition-colors hover:bg-lachani-mist/90 md:px-4 md:py-6"
              >
                {/* calendar leaf */}
                <span
                  aria-hidden
                  className="flex w-14 shrink-0 flex-col items-center overflow-hidden rounded-xl bg-white text-center shadow-sm ring-1 ring-ihu-green-dark/10 transition-transform duration-300 group-hover:-rotate-3"
                >
                  <span className="w-full bg-gradient-to-br from-ihu-green to-ihu-green-dark py-0.5 text-[10px] font-bold tracking-[0.12em] text-white">
                    {d.month}
                  </span>
                  <span className="py-1.5 font-heading text-sm font-extrabold leading-none text-ihu-green-dark">
                    {d.day ?? d.year}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="sr-only">{formatPublished(n.published)} · </span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ihu-green">{n.tag}</span>
                  <span className="mt-0.5 block font-heading text-[15px] font-bold leading-snug text-text-primary transition-colors group-hover:text-ihu-green-dark">
                    {n.title}
                  </span>
                  <span className="mt-1 line-clamp-1 text-xs text-text-secondary">{n.text}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-ihu-green-dark/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ihu-green-dark"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function LatestAnnouncements() {
  return (
    <section id="anakoinoseis" aria-label="Ανακοινώσεις" className="relative z-10 w-full py-20 md:py-24">
      <div className="section-container relative px-4">
        <SectionHeading
          label="Ενημέρωση"
          labelIcon="megaphone"
          title={null}
          highlight="Ανακοινώσεις"
          description="Αιτήσεις, εκδηλώσεις και νέα του ΠΜΣ, όπως τα ανακοινώνει η Γραμματεία."
          action={{ href: "/nea", label: "Όλες οι ανακοινώσεις" }}
        />

        {/* The call carries the weight (7 of 12 columns), the news list the rest */}
        <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-12 lg:gap-6">
          <Reveal direction="up" delay={0.04} className="h-full lg:col-span-7">
            <AdmissionsCard />
          </Reveal>
          {latestNews.length > 0 && (
            <Reveal direction="up" delay={0.12} className="h-full lg:col-span-5">
              <NewsList />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export default LatestAnnouncements;
