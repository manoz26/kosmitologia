"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ChemistryBackdrop — ambient chemistry layer for the scientific /light pages
   ──────────────────────────────────────────────────────────────────────────
   A fixed, viewport-sized decorative layer used behind /light/ergastiria,
   /light/programma and /light/sxetika: a faint λαχανί wash, a slowly pulsing
   molecule constellation, and one or two floating CSS-3D lab props themed to
   the page. Content scrolls over it, giving cheap depth without scroll-linked
   transforms.

   This deliberately relaxes the light-kit "nothing loops" rule for the three
   science-flavoured pages only: motion stays slow, faint and
   pointer-transparent. Props are desktop-only; reduced-motion and perf-lite
   freezes still apply via globals.css.

   Must sit inside a `relative isolate` page wrapper — the negative z-index
   keeps it above the wrapper's tint but below all in-flow content.
   ══════════════════════════════════════════════════════════════════════════ */

import { ConstellationField } from "@/components/home/lib/decorations";
import {
  Capsule,
  DnaHelix,
  Droplet3D,
  Molecule3D,
  Pipette,
  TestTubeRack,
} from "@/components/home/lib/cosmetic3d";

export type ChemistryVariant = "method" | "lab" | "dna";

export function ChemistryBackdrop({ variant }: { variant: ChemistryVariant }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* faint λαχανί washes — LachaniSurface glow at roughly quarter strength */}
      <div
        className="absolute -left-28 -top-20 h-[46vh] w-[46vh] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(200,226,94,0.22), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -right-20 h-[52vh] w-[52vh] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(135,157,66,0.18), transparent 70%)" }}
      />

      {/* molecule net — dots breathe slowly */}
      <ConstellationField count={14} seed={42} color="rgba(95,113,42,0.22)" />

      {/* floating lab props, themed per page — desktop only */}
      <div className="hidden lg:block">
        {variant === "method" && (
          <>
            <div className="absolute right-[4%] top-[18%] opacity-60">
              <Capsule size={120} />
            </div>
            <div className="absolute bottom-[16%] left-[3%] opacity-50">
              <Molecule3D size={110} />
            </div>
          </>
        )}
        {variant === "lab" && (
          <>
            <div className="absolute right-[3%] top-[20%] opacity-60">
              <TestTubeRack size={140} />
            </div>
            <div className="absolute bottom-[14%] left-[3%] -rotate-12 opacity-50">
              <Pipette size={64} />
            </div>
          </>
        )}
        {variant === "dna" && (
          <>
            <div className="absolute bottom-[12%] right-[4%] opacity-60">
              <DnaHelix size={120} />
            </div>
            <div className="absolute left-[3%] top-[22%] opacity-50">
              <Droplet3D size={80} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChemistryBackdrop;
