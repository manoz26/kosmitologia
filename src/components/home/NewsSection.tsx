"use client";

/* ══════════════════════════════════════════════════════════════════════════
   NewsSection
   ──────────────────────────────────────────────────────────────────────────
   The /nea archive: every announcement (src/data/announcements.ts), newest
   first, as a square-cut register like a university news archive — the date
   holds the left column, the title and text the middle, the category the
   right. Each row carries its id, so the home page and /eggrafes can link to
   /nea#id. An admissions call also shows its window, read from the
   announcement itself. The page title (LachaniPageHeader) is the heading.
   ══════════════════════════════════════════════════════════════════════════ */

import { announcements, cycleLabel, formatPublished, publishedParts } from "@/data/announcements";
import { formatDate } from "@/data/program";
import { Reveal } from "./lib/primitives";

export function NewsSection() {
  return (
    <section id="news" aria-label="Όλες οι ανακοινώσεις" className="relative w-full overflow-hidden pb-24 pt-4 md:pb-32">
      <div className="section-container relative z-10 px-4">
        <ol className="edge-top glass-lachani">
          {announcements.map((item, i) => {
            const d = publishedParts(item.published);
            return (
              <Reveal key={item.id} as="li" delay={Math.min(i, 5) * 0.05} direction="up">
                <article
                  id={item.id}
                  className="grid scroll-mt-28 gap-4 border-b border-ihu-green-dark/10 p-6 md:grid-cols-12 md:gap-8 md:p-8"
                >
                  {/* date */}
                  <p className="flex items-baseline gap-2 md:col-span-2 md:block">
                    <span className="sr-only">{formatPublished(item.published)}</span>
                    <span aria-hidden className="font-heading text-4xl font-extrabold leading-none tabular-nums text-ihu-green-dark">
                      {d.day ?? d.month}
                    </span>
                    <span aria-hidden className="text-sm font-semibold text-text-secondary md:mt-2 md:block">
                      {d.day ? `${d.month} ${d.year}` : d.year}
                    </span>
                  </p>

                  {/* the announcement */}
                  <div className="md:col-span-8">
                    <h2 className="font-heading text-xl font-bold leading-snug text-text-primary md:text-2xl">{item.title}</h2>
                    {item.admissions && (
                      <dl className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-l-2 border-ihu-green pl-4 text-sm">
                        <dt className="font-semibold text-ihu-green-dark">Κύκλος {cycleLabel(item.admissions)}</dt>
                        <dd className="font-semibold text-text-primary">
                          Αιτήσεις: {formatDate(item.admissions.opens)} – {formatDate(item.admissions.closes)}
                        </dd>
                      </dl>
                    )}
                    <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-text-secondary">{item.text}</p>
                  </div>

                  {/* category */}
                  <p className="md:col-span-2 md:text-right">
                    <span className="inline-block rounded-full bg-ihu-green/12 px-3 py-1 text-xs font-semibold text-ihu-green-dark">
                      {item.tag}
                    </span>
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default NewsSection;
