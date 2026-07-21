"use client";

/* ══════════════════════════════════════════════════════════════════════════
   BeforeAfterLight — the calm variant of the "science" visual
   ──────────────────────────────────────────────────────────────────────────
   Same interactive 3D hyaluronic-acid model as the main home page, presented
   as a quiet white card: no glass, no glow. It idles with a slow auto-spin
   (calm) instead of the livelier one — interactive-but-still, adding life to
   the light page without shouting.
   ══════════════════════════════════════════════════════════════════════════ */

import { MoleculeViewer } from "@/components/home/lib/MoleculeViewer";

export function BeforeAfterLight() {
  return (
    <div>
      <div className="rounded-3xl bg-white p-2.5 shadow-sm ring-1 ring-slate-200">
        <MoleculeViewer calm />
      </div>
      <p className="mt-3 text-center text-xs font-medium text-text-secondary">
        Υαλουρονικό οξύ — το μόριο-κλειδί της ενυδάτωσης. Σύρετε για να το περιστρέψετε.
      </p>
    </div>
  );
}

export default BeforeAfterLight;
