"use client";

/* ══════════════════════════════════════════════════════════════════════════
   DownloadsSection — "Χρήσιμα έγγραφα & σύνδεσμοι"
   ──────────────────────────────────────────────────────────────────────────
   Quick access to the application form and key pages, as glass link cards with
   a file-type pill and a hover-revealed arrow.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

import { downloads } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";

export function DownloadsSection() {
  return (
    <section id="downloads" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Πόροι"
          labelIcon="book"
          title="Χρήσιμα"
          highlight="έγγραφα & σύνδεσμοι"
          description="Ό,τι χρειάζεστε για να ξεκινήσετε — από το έντυπο αίτησης μέχρι το αναλυτικό πρόγραμμα σπουδών."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {downloads.map((item, i) => {
            const isFile = item.type === "DOCX";
            return (
              <Reveal key={item.title} delay={i * 0.08} direction="up">
                <Link
                  href={item.href}
                  {...(isFile ? { download: true } : {})}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-lachani p-6 transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <span className="rounded-full bg-ihu-green/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ihu-green-dark">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-base font-bold text-text-primary">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ihu-green-dark">
                    {isFile ? <Download size={15} /> : <ArrowUpRight size={15} />}
                    {isFile ? "Λήψη" : "Άνοιγμα"}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DownloadsSection;
