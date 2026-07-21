"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ScrollBackdrop
   ──────────────────────────────────────────────────────────────────────────
   The flagship colour engine of the homepage. A single fixed, full-viewport
   layer that sits *behind* every section (-z-10). It starts as a light,
   airy "λαχανί" (chartreuse) and, as the visitor scrolls the page, gently
   fades out toward an even softer, paler λαχανί — easy on the eye.

   How the fade works:
   • A static vivid λαχανί gradient is the base canvas.
   • Animated aurora / morphing blobs add life near the top.
   • A pale veil (#F4F7ED) ramps its opacity with the global scroll progress,
     washing the saturated green out to a soft pastel by the end of the page.
   • Decorative depth layers (dot grid, drifting molecules, grain) also fade
     so the bottom of the page feels calm and airy.

   Because it is a fixed `-z-10` element and fully opaque, it cleanly covers
   the global <body> gradient on the homepage only — no layout changes, other
   routes are untouched.
   ══════════════════════════════════════════════════════════════════════════ */

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useScatter, useReduced, useMounted } from "./lib/hooks";
import { isTouchDevice } from "@/lib/perf";

export function ScrollBackdrop() {
  const mounted = useMounted();
  const reduced = useReduced();
  /* Phones/tablets: shed the blur-heavy decorative layers (see below). Only
     true after mount, so SSR markup stays identical to desktop. */
  const touch = mounted && isTouchDevice();

  // Track the whole document. (No target → window scroll.)
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  /* The pale veil that fades the λαχανί out toward soft pastel.
     Most of the wash happens through the first ~70% of the page so the final
     stretch is already serene. */
  const veilOpacity = useTransform(
    progress,
    [0, 0.18, 0.5, 0.78, 1],
    [0, 0.12, 0.42, 0.68, 0.82],
  );

  /* Aurora & decorative life recede as we scroll. */
  const auroraOpacity = useTransform(progress, [0, 0.35, 0.75, 1], [1, 0.8, 0.4, 0.18]);
  const decoOpacity = useTransform(progress, [0, 0.4, 1], [0.9, 0.55, 0.12]);

  /* Parallax drift for the big morphing blobs. */
  const blobAY = useTransform(progress, [0, 1], [0, reduced ? 0 : -180]);
  const blobBY = useTransform(progress, [0, 1], [0, reduced ? 0 : 220]);
  const blobCY = useTransform(progress, [0, 1], [0, reduced ? 0 : -120]);

  /* A soft top highlight that dims as you leave the hero. */
  const topGlow = useTransform(progress, [0, 0.25], [1, 0]);

  const molecules = useScatter(reduced ? 6 : 16, 4242);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
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

      {/* ── Aurora field (top of page) ──
          On touch devices the three animated 90–110px blur blobs are the single
          biggest compositor cost, so they collapse into one pre-baked, blur-free
          radial gradient that keeps the same λαχανί glow without the per-frame
          GPU raster. Computers keep the live, drifting aurora. ── */}
      <motion.div className="absolute inset-0" style={{ opacity: auroraOpacity }}>
        {touch ? (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(52vw 52vh at 12% 12%, rgba(232,244,170,0.55) 0%, rgba(198,217,140,0.14) 45%, transparent 66%)," +
                "radial-gradient(56vw 56vh at 92% 30%, rgba(174,201,74,0.26) 0%, rgba(141,166,66,0.07) 45%, transparent 66%)," +
                "radial-gradient(46vw 46vh at 40% 76%, rgba(208,229,120,0.32) 0%, rgba(180,201,110,0.09) 45%, transparent 64%)",
            }}
          />
        ) : (
          <>
            <motion.div
              className="absolute -left-[12%] top-[6%] h-[52vh] w-[52vw] rounded-full blur-[90px] animate-lh-aurora"
              style={{
                y: blobAY,
                background:
                  "radial-gradient(circle, rgba(232,244,170,0.6) 0%, rgba(198,217,140,0.16) 55%, transparent 72%)",
              }}
            />
            <motion.div
              className="absolute right-[-10%] top-[26%] h-[56vh] w-[56vw] rounded-full blur-[110px] animate-lh-aurora"
              style={{
                y: blobBY,
                animationDelay: "-6s",
                background:
                  "radial-gradient(circle, rgba(174,201,74,0.28) 0%, rgba(141,166,66,0.08) 55%, transparent 72%)",
              }}
            />
            <motion.div
              className="absolute left-[28%] top-[52%] h-[46vh] w-[46vw] rounded-full blur-[100px] animate-lh-aurora"
              style={{
                y: blobCY,
                animationDelay: "-11s",
                background:
                  "radial-gradient(circle, rgba(208,229,120,0.35) 0%, rgba(180,201,110,0.1) 55%, transparent 72%)",
              }}
            />
          </>
        )}
      </motion.div>

      {/* ── Morphing organic blobs (desktop only — blur + border-radius morph) ── */}
      {!reduced && !touch && (
        <motion.div className="absolute inset-0" style={{ opacity: decoOpacity }}>
          <div
            className="absolute left-[8%] top-[14%] h-40 w-40 opacity-40 blur-md animate-lh-blob-morph"
            style={{ background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6), rgba(174,201,74,0.3))" }}
          />
          <div
            className="absolute right-[12%] top-[64%] h-52 w-52 opacity-30 blur-md animate-lh-blob-morph"
            style={{ animationDelay: "-7s", background: "radial-gradient(circle at 35% 30%, rgba(232,244,170,0.5), rgba(141,166,66,0.22))" }}
          />
        </motion.div>
      )}

      {/* ── Dot grid texture ── */}
      <motion.div className="home-dots absolute inset-0" style={{ opacity: decoOpacity }} />

      {/* ── Drifting molecule silhouettes (desktop only — each is a blurred,
          animated layer) ── */}
      {mounted && !touch && (
        <motion.div className="absolute inset-0" style={{ opacity: decoOpacity }}>
          {molecules.map((m) => (
            <span
              key={m.id}
              className={reduced ? undefined : "animate-drift-a"}
              style={{
                position: "absolute",
                left: `${m.left}%`,
                top: `${m.top}%`,
                width: m.size,
                height: m.size,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.85), rgba(160,183,80,0.4) 70%, transparent 74%)",
                filter: `blur(${(1 - m.depth) * 2}px)`,
                animationDelay: `${m.delay}s`,
                animationDuration: `${m.duration}s`,
                opacity: 0.25 + m.depth * 0.45,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* ── Film grain (desktop only — mix-blend-overlay is an extra GPU pass) ── */}
      {!touch && (
        <div className="home-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      )}

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
          background:
            "linear-gradient(180deg, #F1F6E4 0%, #F4F7ED 55%, #F6F9F0 100%)",
        }}
      />
    </div>
  );
}

export default ScrollBackdrop;
