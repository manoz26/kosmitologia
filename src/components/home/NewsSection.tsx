"use client";

/* ══════════════════════════════════════════════════════════════════════════
   NewsSection
   ──────────────────────────────────────────────────────────────────────────
   The latest announcements as glass news cards with a gradient masthead strip,
   reveal-on-scroll and a hover lift. Links through to the full news page.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";

import { newsItems } from "./lib/data";
import { Reveal } from "./lib/primitives";

export function NewsSection() {
  return (
    <section id="news" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ihu-green-dark/15 bg-white/55 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ihu-green-dark backdrop-blur-md">
                <CalendarDays size={14} /> Ενημέρωση
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
                Τελευταία Νέα
              </h2>
              <p className="mt-2 text-text-secondary">Ανακοινώσεις και εξελίξεις του ΠΜΣ.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/nea"
              className="group inline-flex items-center gap-2 font-semibold text-ihu-green-dark transition-all hover:gap-3"
            >
              Όλα τα νέα
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {newsItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} direction="up">
              <Link
                href="/nea"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-lachani transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* masthead */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-ihu-green to-ihu-green-dark">
                  <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/20 blur-md opacity-0 transition-opacity duration-700 group-hover:animate-lh-sheen group-hover:opacity-100" />
                  <div className="home-dots absolute inset-0 opacity-30" />
                  <span className="absolute bottom-3 left-4 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-ihu-green-dark shadow-sm">
                    {item.tag}
                  </span>
                  <span className="absolute right-4 top-3 text-xs font-medium text-white/80">{item.date}</span>
                </div>
                {/* body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold leading-snug text-text-primary transition-colors group-hover:text-ihu-green-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">{item.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ihu-green-dark">
                    Διαβάστε περισσότερα
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
