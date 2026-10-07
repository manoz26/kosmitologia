/* ══════════════════════════════════════════════════════════════════════════
   ZigZag — a section that sits to one side of the page
   ──────────────────────────────────────────────────────────────────────────
   The client found a page of centred blocks "AI-made" (06/10/2026) and chose
   this layout: on desktop a section's content takes two thirds of the
   SCREEN (not of a centred column) and hugs the left or the right edge; the
   other third holds a photo or a panel (`aside`), or stays empty. Sections
   alternate sides down the page.

   The row is the page row (.section-container: gutters of 5% of the screen,
   at least 2.5rem, up to 1840px wide). On phones and tablets it is one
   column: the content, then the aside.

   Server-safe (no hooks).
   ══════════════════════════════════════════════════════════════════════════ */

import { cn } from "@/lib/utils";

export function ZigZag({
  side = "left",
  aside,
  children,
  className,
  asideClassName,
}: {
  /** Which edge the content hugs; "full" spans the whole row (for figures
      like the career compass), on the same gutters. */
  side?: "left" | "right" | "full";
  /** What goes in the other third — a photo, a panel. Omit for white space. */
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  asideClassName?: string;
}) {
  const right = side === "right";
  return (
    <div
      className={cn(
        "section-container relative grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-x-[clamp(2.5rem,4vw,5rem)]",
        className,
      )}
    >
      <div
        className={cn(
          "min-w-0 lg:row-start-1",
          side === "full" ? "lg:col-span-3" : "lg:col-span-2",
          right ? "lg:col-start-2" : "lg:col-start-1",
        )}
      >
        {children}
      </div>
      {aside && side !== "full" && (
        <aside
          className={cn(
            "min-w-0 lg:row-start-1",
            right ? "lg:col-start-1" : "lg:col-start-3",
            asideClassName,
          )}
        >
          {aside}
        </aside>
      )}
    </div>
  );
}

export default ZigZag;
