"use client";

/* ══════════════════════════════════════════════════════════════════════════
   DirectorMessage — «Μήνυμα του Διευθυντή»
   ──────────────────────────────────────────────────────────────────────────
   A short letter between "where graduates work" and "who teaches": the one
   place on the home page where the programme speaks in a person's voice.
   Laid out like a letter rather than another info block — the heading and
   the signature hold the left column, the quote and two short paragraphs
   the right; on phones it reads top to bottom, signature last.

   The single motion moment: the quote inks in word by word as it scrolls
   through the viewport (function-based transforms, see the WAAPI note in
   memory); with reduced motion it is simply printed. Greek guillemets («)
   are the mark, not an English “.

   Data: directorMessage in src/data/program.ts — a DRAFT pending the
   director's approval. The portrait is src/data/photos.ts → director;
   without one, initials stand in (same convention as FacultyStrip).
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { directorMessage, program } from "@/data/program";
import { initialsOf } from "@/data/faculty";
import { photos } from "@/data/photos";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { useReduced } from "./lib/hooks";

/* How many word-slots each word takes to ink in — >1 overlaps neighbours,
   so the quote darkens as a soft wave instead of word-by-word ticks. */
const INK_SPREAD = 4;
const INK_FLOOR = 0.16;

function InkWord({
  progress,
  index,
  count,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  children: string;
}) {
  const opacity = useTransform(progress, (v) => {
    const t = Math.min(1, Math.max(0, (v * (count + INK_SPREAD) - index) / INK_SPREAD));
    return INK_FLOOR + (1 - INK_FLOOR) * t;
  });
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

function InkQuote({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReduced();
  /* Fully inked once the quote's last line reaches mid-screen. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-[clamp(1.45rem,2.5vw,2.3rem)] font-light leading-[1.32] tracking-[-0.012em] text-text-primary"
    >
      {reduced
        ? text
        : words.map((word, i) => (
            <span key={i}>
              <InkWord progress={scrollYProgress} index={i} count={words.length}>
                {word}
              </InkWord>
              {i < words.length - 1 && " "}
            </span>
          ))}
    </p>
  );
}

function Signature() {
  const { name } = directorMessage.signedBy;
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end lg:flex-col lg:items-start">
      {/* The portrait (src/data/photos.ts → director); initials until there is one */}
      {photos.director.src ? (
        <PhotoSlot photo="director" drift={false} sizes="160px" className="aspect-[4/5] w-32 shrink-0 shadow-[0_18px_40px_-24px_rgba(63,79,24,0.6)] md:w-36" />
      ) : (
        <span
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark font-heading text-lg font-bold text-white shadow-md"
        >
          {initialsOf(name)}
        </span>
      )}
      <div className="min-w-0">
        <p className="font-heading text-base font-bold leading-snug text-text-primary">{name}</p>
        <p className="mt-0.5 text-sm font-semibold text-ihu-green-dark">
          Διευθυντής του ΠΜΣ «Κοσμητολογία»
        </p>
        <p className="mt-0.5 text-sm leading-snug text-text-secondary">
          {program.department.value}, ΔΙΠΑΕ
        </p>
      </div>
    </div>
  );
}

export function DirectorMessage() {
  return (
    <section
      id="minima"
      aria-labelledby="minima-title"
      className="relative w-full overflow-hidden py-24 md:py-28"
    >
      <div className="section-container relative z-10 px-4">
        <article className="glass-lachani grid grid-cols-1 gap-y-10 edge-top px-6 py-10 sm:px-10 md:px-14 md:py-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10">
          {/* left column, top */}
          <h2
            id="minima-title"
            className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-text-primary md:text-3xl lg:col-span-4 lg:col-start-1 lg:row-start-1"
          >
            Μήνυμα του Διευθυντή
          </h2>

          {/* right column, full height */}
          <div className="lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1">
            <span
              aria-hidden
              className="-ml-1 block select-none font-heading text-[4.5rem] font-extrabold leading-[0.7] text-ihu-green md:text-[6rem]"
            >
              «
            </span>
            <blockquote className="mt-4 md:mt-6">
              <InkQuote text={directorMessage.quote} />
            </blockquote>

            <div className="mt-10 max-w-[62ch] space-y-4 border-t border-ihu-green-dark/15 pt-8 text-base leading-relaxed text-text-secondary md:text-[1.0625rem]">
              {directorMessage.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {/* left column, bottom — after the letter on phones */}
          <div className="border-t border-ihu-green-dark/15 pt-8 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:self-end lg:border-t-0 lg:pt-0">
            <Signature />
          </div>
        </article>
      </div>
    </section>
  );
}

export default DirectorMessage;
