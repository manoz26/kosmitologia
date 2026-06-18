"use client";

/* ══════════════════════════════════════════════════════════════════════════
   StayInTouch — "Μείνετε ενημερωμένοι"
   ──────────────────────────────────────────────────────────────────────────
   A small band of quick links (news, contact, university) so visitors can keep
   in touch — no forms, no submissions, just clear pathways.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { touchLinks } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";

export function StayInTouch() {
  return (
    <section id="touch" className="relative w-full overflow-hidden py-20 md:py-24">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Επικοινωνία"
          labelIcon="map-pin"
          title="Μείνετε"
          highlight="ενημερωμένοι"
          description="Ακολουθήστε τα νέα του προγράμματος ή επικοινωνήστε απευθείας με τη Γραμματεία."
        />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {touchLinks.map((link, i) => (
            <Reveal key={link.label} delay={i * 0.08} direction="up">
              <Link
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col rounded-3xl glass-lachani p-7 transition-all duration-300 hover:-translate-y-1.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg">
                  <Icon name={link.icon} size={22} />
                </span>
                <h3 className="mt-5 font-heading text-base font-bold text-text-primary">{link.label}</h3>
                <p className="mt-1 flex-1 text-sm text-text-secondary">{link.value}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ihu-green-dark">
                  Μετάβαση
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StayInTouch;
