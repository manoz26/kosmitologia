"use client";

/* ══════════════════════════════════════════════════════════════════════════
   MarqueeStrip
   ──────────────────────────────────────────────────────────────────────────
   Two infinite keyword ribbons drifting in opposite directions, separating the
   hero from the body of the page. Pure CSS marquee (duplicated track) so it is
   buttery and JS-free; pauses on hover.
   ══════════════════════════════════════════════════════════════════════════ */

import { cn } from "@/lib/utils";
import { marqueePrimary, marqueeSecondary } from "./lib/data";

function Row({
  items,
  reverse,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const track = [...items, ...items];
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex min-w-max shrink-0 items-center gap-3 pr-3 [animation-play-state:running] group-hover:[animation-play-state:paused]",
          reverse ? "animate-lh-marquee-rev" : "animate-lh-marquee",
        )}
      >
        {track.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-flex items-center gap-2.5 whitespace-nowrap text-lg font-bold text-ihu-green-dark/80 md:text-xl"
          >
            {word}
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-ihu-green/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <section aria-hidden className="relative w-full select-none py-6">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#E1EBB8]/80 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#E1EBB8]/80 to-transparent md:w-40" />

      <div className="flex flex-col gap-3 border-y border-white/40 py-5 backdrop-blur-[2px]">
        <Row items={marqueePrimary} />
        <Row items={marqueeSecondary} reverse />
      </div>
    </section>
  );
}

export default MarqueeStrip;
