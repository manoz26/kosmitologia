"use client";

/* ══════════════════════════════════════════════════════════════════════════
   FacultyShowcase
   ──────────────────────────────────────────────────────────────────────────
   The teaching body as two drifting ribbons of glass "faculty pills" (gradient
   initials avatar + name + role + institution), pausing on hover, plus a small
   institution legend. Live data from @/data/faculty.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { faculty, type FacultyMember } from "@/data/faculty";
import { Reveal, SectionHeading } from "./lib/primitives";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#879D42,#5F712A)",
  "linear-gradient(135deg,#B9D84A,#7E9636)",
  "linear-gradient(135deg,#5E9A4E,#3E7A4E)",
  "linear-gradient(135deg,#A5BA5F,#6E7C1E)",
  "linear-gradient(135deg,#9FCB4C,#5F712A)",
];

function FacultyPill({ member, index }: { member: FacultyMember; index: number }) {
  return (
    <div className="flex w-[270px] shrink-0 items-center gap-3 rounded-2xl glass-lachani px-4 py-3">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-black text-white shadow"
        style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
      >
        {member.initials}
      </span>
      <div className="min-w-0">
        <p className="truncate font-heading text-sm font-bold text-text-primary">{member.name}</p>
        <p className="truncate text-[11px] text-text-secondary">{member.role}</p>
        <span className="mt-0.5 inline-block rounded-full bg-ihu-green/10 px-2 py-0.5 text-[10px] font-bold text-ihu-green-dark">
          {member.institution}
        </span>
      </div>
    </div>
  );
}

function Ribbon({ items, reverse }: { items: FacultyMember[]; reverse?: boolean }) {
  const track = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden">
      <div
        className={cn(
          "flex min-w-max shrink-0 items-center gap-4 pr-4 [animation-play-state:running] group-hover:[animation-play-state:paused]",
          reverse ? "animate-lh-marquee-rev" : "animate-lh-marquee",
        )}
      >
        {track.map((m, i) => (
          <FacultyPill key={`${m.email}-${i}`} member={m} index={i} />
        ))}
      </div>
    </div>
  );
}

export function FacultyShowcase() {
  const mid = Math.ceil(faculty.length / 2);
  const rowA = faculty.slice(0, mid);
  const rowB = faculty.slice(mid);
  const institutions = Array.from(new Set(faculty.map((f) => f.institution)));

  return (
    <section id="faculty" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Διδάσκοντες"
          labelIcon="users"
          title="Ένα διεπιστημονικό"
          highlight="σώμα ΔΕΠ"
          description={`${faculty.length} μέλη ΔΕΠ και συνεργάτες από ${institutions.length} ιδρύματα και τη βιομηχανία — χημεία, δερματολογία, διατροφή και επιχειρηματικότητα κάτω από μία στέγη.`}
        />
      </div>

      {/* edge-fade marquee */}
      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#ECF2D6]/85 to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#ECF2D6]/85 to-transparent md:w-40" />
        <div className="flex flex-col gap-4">
          <Ribbon items={rowA} />
          <Ribbon items={rowB} reverse />
        </div>
      </div>

      <div className="section-container relative z-10 mt-12 px-4">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {institutions.map((inst) => (
              <span
                key={inst}
                className="rounded-full border border-ihu-green-dark/15 bg-white/55 px-4 py-1.5 text-xs font-bold text-ihu-green-dark backdrop-blur-md"
              >
                {inst}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-8 text-center">
            <Link
              href="/didaskotes"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-ihu-green-dark/30 bg-white/50 px-7 py-3.5 text-sm font-bold text-ihu-green-dark backdrop-blur-md transition-all hover:bg-ihu-green-dark hover:text-white"
            >
              Όλοι οι διδάσκοντες
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FacultyShowcase;
