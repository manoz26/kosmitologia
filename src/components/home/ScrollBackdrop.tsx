"use client";

/* ══════════════════════════════════════════════════════════════════════════
   ScrollBackdrop
   ──────────────────────────────────────────────────────────────────────────
   The flagship colour engine of the homepage. A single fixed, full-viewport
   layer that sits *behind* every section (-z-10). It starts as a vivid
   "λαχανί" (chartreuse) and, as the visitor scrolls the page, gently fades
   out toward a very soft, pale λαχανί — exactly the brief.

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

export function ScrollBackdrop() {
  const mounted = useMounted();
  const reduced = useReduced();

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
    [0, 0.16, 0.52, 0.78, 0.9],
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
      {/* ── Base vivid λαχανί canvas ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #B9D84A 0%, #A8C24A 32%, #A5BA5F 60%, #B6CC6A 100%)",
        }}
      />

      {/* ── Top hero highlight ── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[90vh]"
        style={{
          opacity: topGlow,
          background:
            "radial-gradient(120% 80% at 50% -12%, rgba(216,236,128,0.95) 0%, rgba(201,226,94,0.35) 38%, transparent 64%)",
        }}
      />

      {/* ── Animated aurora field (top of page) ── */}
      <motion.div className="absolute inset-0" style={{ opacity: auroraOpacity }}>
        <motion.div
          className="absolute -left-[12%] top-[6%] h-[52vh] w-[52vw] rounded-full blur-[90px] animate-lh-aurora"
          style={{
            y: blobAY,
            background:
              "radial-gradient(circle, rgba(216,236,128,0.85) 0%, rgba(165,186,95,0.2) 55%, transparent 72%)",
          }}
        />
        <motion.div
          className="absolute right-[-10%] top-[26%] h-[56vh] w-[56vw] rounded-full blur-[110px] animate-lh-aurora"
          style={{
            y: blobBY,
            animationDelay: "-6s",
            background:
              "radial-gradient(circle, rgba(135,157,66,0.7) 0%, rgba(95,113,42,0.18) 55%, transparent 72%)",
          }}
        />
        <motion.div
          className="absolute left-[28%] top-[52%] h-[46vh] w-[46vw] rounded-full blur-[100px] animate-lh-aurora"
          style={{
            y: blobCY,
            animationDelay: "-11s",
            background:
              "radial-gradient(circle, rgba(185,216,74,0.55) 0%, rgba(165,186,95,0.12) 55%, transparent 72%)",
          }}
        />
      </motion.div>

      {/* ── Morphing organic blobs ── */}
      {!reduced && (
        <motion.div className="absolute inset-0" style={{ opacity: decoOpacity }}>
          <div
            className="absolute left-[8%] top-[14%] h-40 w-40 opacity-40 blur-md animate-lh-blob-morph"
            style={{ background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6), rgba(135,157,66,0.4))" }}
          />
          <div
            className="absolute right-[12%] top-[64%] h-52 w-52 opacity-30 blur-md animate-lh-blob-morph"
            style={{ animationDelay: "-7s", background: "radial-gradient(circle at 35% 30%, rgba(216,236,128,0.6), rgba(95,113,42,0.35))" }}
          />
        </motion.div>
      )}

      {/* ── Dot grid texture ── */}
      <motion.div className="home-dots absolute inset-0" style={{ opacity: decoOpacity }} />

      {/* ── Drifting molecule silhouettes ── */}
      {mounted && (
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
                  "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.85), rgba(135,157,66,0.5) 70%, transparent 74%)",
                filter: `blur(${(1 - m.depth) * 2}px)`,
                animationDelay: `${m.delay}s`,
                animationDuration: `${m.duration}s`,
                opacity: 0.25 + m.depth * 0.45,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* ── Film grain ── */}
      <div className="home-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      {/* ── Edge vignette to ground the content ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 110% at 50% 40%, transparent 55%, rgba(95,113,42,0.18) 100%)",
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
