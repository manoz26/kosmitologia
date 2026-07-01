"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CinematicScrollHero
   ──────────────────────────────────────────────────────────────────────────
   The full-screen cinematic opener. A tall (250vh) container pins a <canvas>
   to the viewport; as the visitor scrolls, we scrub through a pre-decoded image
   sequence (Apple-style "scroll scrubbing"). This is deliberately a frame
   sequence drawn to canvas rather than seeking a <video> element:

     • <video>.currentTime scrubbing stutters badly on most browsers (MP4 is
       not frame-accurate unless every frame is a keyframe) and is effectively
       broken on iOS Safari.
     • Drawing pre-loaded frames to a canvas is smooth and reliable everywhere,
       desktop and mobile alike.

   A fallback poster (/leaf.jpg) shows until the first frame decodes, the copy
   lifts & fades as you scroll in, and the dark footage melts into the λαχανί
   page below. Users who prefer reduced motion get a static poster instead of
   the scroll-driven scrub. The CTAs live on <HeroLachani3D/> right below, so
   this opener stays purely atmospheric.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown, MousePointer2, Sparkles } from "lucide-react";

const FRAME_COUNT = 50;
const FRAME_PREFIX =
  "/hero-sequence/Wan_Video_Generate__Create a luxurious beauty brand video. First frame_ A breath_";
const FRAME_EXT = ".jpg";
const POSTER = "/leaf.jpg";

function frameSrc(i: number) {
  return `${FRAME_PREFIX}${i.toString().padStart(3, "0")}${FRAME_EXT}`;
}

/* Shared overlay copy — atmospheric, no CTAs (the 3D hero below owns those). */
function HeroCopy() {
  return (
    <>
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white backdrop-blur-md">
        <Sparkles size={15} className="text-[#cfe38a]" />
        <span className="text-xs font-semibold uppercase tracking-[0.22em]">
          ΠΜΣ Κοσμητολογία · ΔΙΠΑΕ
        </span>
      </div>
      <h1 className="mx-auto max-w-4xl font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:text-7xl">
        Η επιστήμη
        <br />
        του <span className="text-[#cfe38a]">ωραίου</span>.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base text-white/85 drop-shadow-md md:text-lg">
        Από τη φύση, στο εργαστήριο, στο δέρμα.
      </p>
    </>
  );
}

export function CinematicScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrame = useRef(-1);
  const [firstReady, setFirstReady] = useState(false);
  const reduced = useReducedMotion();

  // Preload the sequence (skipped for reduced-motion visitors).
  const images = useMemo<HTMLImageElement[]>(() => {
    if (typeof window === "undefined" || reduced) return [];
    return Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i);
      return img;
    });
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Draw a frame with object-fit: cover math against the (DPR-scaled) canvas. */
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = images[index];
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const ratio = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * ratio;
    const h = img.naturalHeight * ratio;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  };

  // Mark ready + paint frame 0 as soon as the first image decodes.
  useEffect(() => {
    if (reduced || images.length === 0) return;
    const first = images[0];
    const onFirst = () => {
      setFirstReady(true);
      lastFrame.current = 0;
      requestAnimationFrame(() => drawFrame(0));
    };
    if (first.complete && first.naturalWidth > 0) onFirst();
    else first.addEventListener("load", onFirst, { once: true });
    return () => first.removeEventListener("load", onFirst);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, reduced]);

  // Size the canvas to the viewport (capped DPR for crispness without waste).
  useEffect(() => {
    if (reduced) return;
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      drawFrame(lastFrame.current < 0 ? 0 : lastFrame.current);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, images]);

  // Scrub: map scroll progress → frame index, redraw only on change.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced) return;
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(p * FRAME_COUNT)));
    if (index === lastFrame.current) return;
    lastFrame.current = index;
    requestAnimationFrame(() => drawFrame(index));
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2, 1], [1, 1, 0, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.2, 1], [0, -90, -90]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const blendOpacity = useTransform(scrollYProgress, [0.78, 1], [0, 1]);

  /* ── Reduced motion: static poster, normal height, no scrub ── */
  if (reduced) {
    return (
      <section className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="section-container absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <HeroCopy />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#EEF3DE]" />
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-[#0a0a0a]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Fallback poster until the first frame decodes */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('${POSTER}')`, opacity: firstReady ? 0 : 1 }}
          aria-hidden
        />

        {/* Canvas that draws the scrubbed frames */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        {/* Copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="section-container absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
        >
          <HeroCopy />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
        >
          <span className="mb-1.5 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
            <MousePointer2 size={12} /> Κυλήστε
          </span>
          <ChevronDown size={20} className="mx-auto animate-bounce text-white/80" />
        </motion.div>

        {/* Blend the dark footage into the λαχανί page below at the very end */}
        <motion.div
          style={{ opacity: blendOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#EEF3DE]"
          aria-hidden
        />
      </div>
    </div>
  );
}

export default CinematicScrollHero;
