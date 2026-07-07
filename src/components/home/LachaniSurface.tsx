/* ══════════════════════════════════════════════════════════════════════════
   LachaniSurface
   ──────────────────────────────────────────────────────────────────────────
   A self-contained "λαχανί band" used to host the transparent, glass-based 3D
   home sections when they live on a subpage built around the lighter PageShell
   look. It paints a light λαχανί canvas (so `glass-lachani` cards read with the
   right contrast) and softly fades at the top & bottom edges so the band blends
   into the neighbouring pale sections instead of cutting hard.

   Purely presentational — no hooks — so it can be rendered from server or
   client components alike.
   ══════════════════════════════════════════════════════════════════════════ */

import { cn } from "@/lib/utils";

export function LachaniSurface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative isolate w-full overflow-hidden", className)}>
      {/* light λαχανί base */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(168deg, #DFEBAC 0%, #DAE6A9 32%, #DEE8B6 60%, #E7F0C8 100%)",
        }}
      />
      {/* soft halftone texture */}
      <div aria-hidden className="home-dots absolute inset-0 -z-10 opacity-40" />
      {/* edge fades that blend into the pale λαχανί of adjacent sections */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-[#EEF3DE] to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-[#EEF3DE] to-transparent"
      />
      {children}
    </div>
  );
}

export default LachaniSurface;
