"use client";

/* ══════════════════════════════════════════════════════════════════════════
   DownloadsSection — "Επίσημα έγγραφα"
   ──────────────────────────────────────────────────────────────────────────
   The programme's official files (application form, study guide) as a
   square-cut register: one row per file, what it is on the left, its format
   and the download on the right. The list lives in src/data/program.ts
   (officialDocuments) — only files that really exist in public/ are listed.
   ══════════════════════════════════════════════════════════════════════════ */

import { Download } from "lucide-react";

import { officialDocuments } from "@/data/program";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";

export function DownloadsSection() {
  return (
    <section id="downloads" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Έγγραφα"
          labelIcon="book"
          title="Επίσημα"
          highlight="έγγραφα"
          description="Το έντυπο της αίτησης και ο Οδηγός Σπουδών του ΠΜΣ, όπως τα εκδίδει η Γραμματεία."
        />

        <Reveal direction="up">
          <ul className="mt-10 edge-top glass-lachani md:mt-12">
            {officialDocuments.map((doc) => (
              <li key={doc.href} className="border-b border-ihu-green-dark/10 last:border-0">
                <a
                  href={doc.href}
                  download
                  className="group grid items-center gap-4 p-6 transition-colors hover:bg-lachani-mist/70 sm:grid-cols-[auto_1fr_auto] sm:gap-6 md:px-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                    <Icon name="book" size={22} />
                  </span>
                  <span>
                    <span className="block font-heading text-lg font-bold text-text-primary">{doc.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-text-secondary">{doc.description}</span>
                  </span>
                  <span className="flex items-center gap-4 sm:justify-end">
                    <span className="text-xs font-semibold text-text-secondary">
                      {doc.format} · {doc.size}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-5 py-2.5 text-sm font-bold text-white shadow transition-all group-hover:gap-3">
                      <Download size={15} />
                      Λήψη
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default DownloadsSection;
