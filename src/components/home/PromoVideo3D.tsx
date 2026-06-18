"use client";

/* ══════════════════════════════════════════════════════════════════════════
   PromoVideo3D — "Δείτε το ΠΜΣ"
   ──────────────────────────────────────────────────────────────────────────
   The programme's promo clip in a pointer-tilting 3D glass frame. Autoplays
   muted on loop (browser-friendly); a sound toggle and a play/pause control
   give the visitor control. Uses the existing /video.mp4 asset.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal, SectionHeading, TiltCard } from "./lib/primitives";
import { GlowOrb } from "./lib/decorations";

export function PromoVideo3D() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="video" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="left-1/2 top-10 -translate-x-1/2" size={460} color="rgba(216,236,128,0.4)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Δείτε το ΠΜΣ"
          labelIcon="sparkles"
          title="Μια ματιά στην"
          highlight="εμπειρία"
          description="Ένα σύντομο βίντεο που αποτυπώνει την αισθητική και το πνεύμα του προγράμματος."
        />

        <Reveal direction="scale">
          <div className="relative mx-auto mt-14 max-w-4xl [perspective:1600px]">
            <TiltCard max={6} glare={false} innerClassName="rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
              <div className="relative aspect-video w-full bg-ihu-green-dark/20">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src="/video.mp4"
                  poster="/leaf.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                {/* subtle tint */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ihu-green-dark/30 via-transparent to-transparent" />

                {/* controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-ihu-green-dark shadow backdrop-blur-md">
                    ΠΜΣ Κοσμητολογία · ΔΙΠΑΕ
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      aria-label={playing ? "Παύση" : "Αναπαραγωγή"}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ihu-green-dark shadow backdrop-blur-md transition-colors hover:bg-white"
                    >
                      {playing ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button
                      onClick={toggleSound}
                      aria-label={muted ? "Ενεργοποίηση ήχου" : "Σίγαση"}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full shadow backdrop-blur-md transition-colors",
                        muted ? "bg-white/80 text-ihu-green-dark hover:bg-white" : "bg-ihu-green-dark text-white",
                      )}
                    >
                      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PromoVideo3D;
