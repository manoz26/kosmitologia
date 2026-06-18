"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CompareTracks3D — "Συγκρίνετε τις κατευθύνσεις"
   ──────────────────────────────────────────────────────────────────────────
   A side-by-side comparison of the two 2nd-semester specialisation tracks and
   their courses. On desktop both tracks sit next to each other; on mobile a
   segmented control flips between them.
   ══════════════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { courses, tracks } from "@/data/courses";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import type { IconKey } from "./lib/data";

const TRACK_META: Record<string, { icon: IconKey; from: string; to: string; accent: string }> = {
  preparation: { icon: "flask", from: "#5F712A", to: "#B9D84A", accent: "#879D42" },
  dermatology: { icon: "heart-pulse", from: "#3A6B2E", to: "#9FCB4C", accent: "#5F712A" },
};

const COURSE_ICON: Record<string, IconKey> = {
  leaf: "leaf",
  scale: "scale",
  "test-tubes": "test-tubes",
  "heart-pulse": "heart-pulse",
  apple: "apple",
  stethoscope: "stethoscope",
  pill: "pill",
  "scan-face": "scan-face",
};

function TrackColumn({ trackId }: { trackId: "preparation" | "dermatology" }) {
  const track = tracks.find((t) => t.id === trackId)!;
  const meta = TRACK_META[trackId];
  const list = courses.filter((c) => c.track === trackId);
  const totalEcts = list.reduce((s, c) => s + c.ects, 0);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.8rem] glass-lachani">
      <div className="relative overflow-hidden p-6" style={{ background: `linear-gradient(140deg, ${meta.from}, ${meta.to})` }}>
        <div className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/2 -skew-x-12 bg-white/20 blur-md animate-lh-sheen" />
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md">
          <Icon name={meta.icon} size={26} />
        </span>
        <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-white">{track.nameGr}</h3>
        <p className="mt-1 text-xs italic text-white/80">{track.nameEn}</p>
        <span className="mt-3 inline-block rounded-full bg-black/15 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md">
          {list.length} μαθήματα · {totalEcts} ECTS
        </span>
      </div>
      <ul className="flex flex-1 flex-col gap-2 p-5">
        {list.map((c) => (
          <li key={c.code} className="flex items-center gap-3 rounded-2xl bg-white/45 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})` }}>
              <Icon name={COURSE_ICON[c.icon] ?? "sparkles"} size={16} />
            </span>
            <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">{c.nameGr}</span>
            <span className="shrink-0 rounded-full bg-ihu-green/10 px-2 py-0.5 text-[11px] font-bold text-ihu-green-dark">{c.ects}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CompareTracks3D() {
  const [mobileTrack, setMobileTrack] = useState<"preparation" | "dermatology">("preparation");

  return (
    <section id="compare" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Σύγκριση"
          labelIcon="scale"
          title="Δύο κατευθύνσεις,"
          highlight="δίπλα δίπλα"
          description="Στο Β' εξάμηνο επιλέγετε εξειδίκευση. Συγκρίνετε τα μαθήματα των δύο κατευθύνσεων για να βρείτε αυτή που σας ταιριάζει."
        />

        {/* desktop: side by side */}
        <div className="mt-14 hidden grid-cols-2 gap-6 lg:grid">
          <Reveal direction="left">
            <TrackColumn trackId="preparation" />
          </Reveal>
          <Reveal direction="right">
            <TrackColumn trackId="dermatology" />
          </Reveal>
        </div>

        {/* mobile: toggle */}
        <div className="mt-12 lg:hidden">
          <div className="mx-auto mb-6 grid max-w-sm grid-cols-2 gap-2 rounded-full bg-white/45 p-1.5">
            {tracks.map((t) => {
              const active = mobileTrack === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setMobileTrack(t.id)}
                  className={cn("rounded-full px-3 py-2 text-xs font-bold transition-all duration-300", active ? "bg-ihu-green-dark text-white shadow" : "text-ihu-green-dark")}
                >
                  {t.id === "preparation" ? "Παρασκευή" : "Δερματολογία"}
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileTrack}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <TrackColumn trackId={mobileTrack} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default CompareTracks3D;
