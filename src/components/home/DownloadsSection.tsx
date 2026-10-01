"use client";

/* ══════════════════════════════════════════════════════════════════════════
   DownloadsSection — "Επίσημα έγγραφα"
   ──────────────────────────────────────────────────────────────────────────
   The programme's official files (application form, study guide) as glass
   download cards. The list lives in src/data/program.ts (officialDocuments) —
   only files that really exist in public/ are listed there.
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

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          {officialDocuments.map((doc, i) => (
            <Reveal key={doc.href} delay={i * 0.08} direction="up">
              <a
                href={doc.href}
                download
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-lachani p-6 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                    <Icon name="book" size={22} />
                  </span>
                  <span className="rounded-full bg-ihu-green/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ihu-green-dark">
                    {doc.format} · {doc.size}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-base font-bold text-text-primary">{doc.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{doc.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ihu-green-dark">
                  <Download size={15} />
                  Λήψη
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DownloadsSection;
