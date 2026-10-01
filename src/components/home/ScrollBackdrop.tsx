"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ScrollBackdrop
   ──────────────────────────────────────────────────────────────────────────
   The colour engine of the homepage and the λαχανί subpages. A single fixed,
   full-viewport layer that sits *behind* every section (-z-10). It starts as
   a light, airy "λαχανί" (chartreuse) and, as the visitor scrolls, gently
   fades toward an even softer, paler λαχανί — easy on the eye.

   How it works:
   • A static λαχανί gradient is the base canvas.
   • Three soft glows give it depth. They are plain radial gradients — still,
     no blur filter, no parallax — so nothing behind the content moves.
   • A pale veil ramps its opacity with the scroll progress, washing the
     green out to a soft pastel by the end of the page.

   It used to carry drifting molecule "bubbles", animated blurred auroras,
   morphing blobs and a mix-blend film grain. The client found the moving
   background distracting, and those layers repainted the whole viewport
   every frame while the hero film was scrubbing on top of them — a big part
   of the film's stutter. They are gone; the look is the same at rest.
   ══════════════════════════════════════════════════════════════════════════ */

import { useScroll, useTransform, motion } from "framer-motion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Piecewise-linear map of p through (input, output) stops. */
function through(p: number, inputs: number[], outputs: number[]): number {
  if (p <= inputs[0]) return outputs[0];
  for (let i = 1; i < inputs.length; i++) {
    if (p <= inputs[i]) {
      const t = (p - inputs[i - 1]) / (inputs[i] - inputs[i - 1]);
      return outputs[i - 1] + t * (outputs[i] - outputs[i - 1]);
    }
  }
  return outputs[outputs.length - 1];
}

export function ScrollBackdrop() {
  // Track the whole document. (No target → window scroll.)
  const { scrollYProgress } = useScroll();

  /* Function-based on purpose: range-based scroll transforms become native
     WAAPI animations that desync on these pages (see CinematicScrollHero). */
  const veilOpacity = useTransform(scrollYProgress, (p) =>
    through(p, [0, 0.18, 0.5, 0.78, 1], [0, 0.12, 0.42, 0.68, 0.82]),
  );
  const glowOpacity = useTransform(scrollYProgress, (p) =>
    through(p, [0, 0.35, 0.75, 1], [1, 0.8, 0.4, 0.18]),
  );
  const topGlow = useTransform(scrollYProgress, (p) => 1 - clamp01(p / 0.25));
  const dotsOpacity = useTransform(scrollYProgress, (p) => through(p, [0, 0.4, 1], [0.9, 0.55, 0.12]));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* ── Base light λαχανί canvas ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #E3EFB4 0%, #DEE9B4 30%, #E4EEC8 62%, #EEF4DC 100%)",
        }}
      />

      {/* ── Top hero highlight ── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[90vh]"
        style={{
          opacity: topGlow,
          background:
            "radial-gradient(120% 80% at 50% -12%, rgba(244,250,214,0.9) 0%, rgba(226,240,168,0.3) 38%, transparent 64%)",
        }}
      />

      {/* ── Soft, still glows ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(52vw 52vh at 12% 12%, rgba(232,244,170,0.55) 0%, rgba(198,217,140,0.14) 45%, transparent 66%)," +
            "radial-gradient(56vw 56vh at 92% 30%, rgba(174,201,74,0.26) 0%, rgba(141,166,66,0.07) 45%, transparent 66%)," +
            "radial-gradient(46vw 46vh at 40% 76%, rgba(208,229,120,0.32) 0%, rgba(180,201,110,0.09) 45%, transparent 64%)",
        }}
      />

      {/* ── Dot grid texture ── */}
      <motion.div className="home-dots absolute inset-0" style={{ opacity: dotsOpacity }} />

      {/* ── Edge vignette to ground the content ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 110% at 50% 40%, transparent 55%, rgba(95,113,42,0.07) 100%)",
        }}
      />

      {/* ── The pale veil that performs the fade-out ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: veilOpacity,
          background: "linear-gradient(180deg, #F1F6E4 0%, #F4F7ED 55%, #F6F9F0 100%)",
        }}
      />
    </div>
  );
}

export default ScrollBackdrop;
