"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CtaFinale3D
   ──────────────────────────────────────────────────────────────────────────
   The closing call-to-action, landing on the soft pale-λαχανί end of the page.
   A pointer-tilting 3D panel framed by floating cosmetic props and orbit rings,
   with the primary conversions and contact details.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Sparkles } from "lucide-react";

import { TiltCard } from "./lib/primitives";
import { SerumBottle, Droplet3D, Leaf3D, Molecule3D, OrbitRing } from "./lib/cosmetic3d";
import { useReduced } from "./lib/hooks";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function CtaFinale3D() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Function-based — range-based scroll transforms desync via WAAPI (see CinematicScrollHero).
  const propA = useTransform(scrollYProgress, (p) => (reduced ? 0 : 70 - 120 * clamp01(p)));
  const propB = useTransform(scrollYProgress, (p) => (reduced ? 0 : -50 + 120 * clamp01(p)));

  return (
    <section ref={ref} id="cta" className="relative w-full overflow-hidden py-24 md:py-36">
      {/* floating props */}
      <motion.div style={{ y: propA }} className="pointer-events-none absolute left-[6%] top-16 hidden opacity-80 md:block">
        <SerumBottle size={130} />
      </motion.div>
      <motion.div style={{ y: propB }} className="pointer-events-none absolute right-[8%] top-24 hidden opacity-70 md:block">
        <Leaf3D size={110} />
      </motion.div>
      <motion.div style={{ y: propA }} className="pointer-events-none absolute bottom-16 left-[12%] hidden opacity-60 lg:block">
        <Molecule3D size={100} />
      </motion.div>
      <motion.div style={{ y: propB }} className="pointer-events-none absolute bottom-24 right-[14%] hidden opacity-70 lg:block">
        <Droplet3D size={64} />
      </motion.div>
      <OrbitRing size={560} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25" duration={70} dash="2 16" />

      <div className="section-container relative z-10 px-4 [perspective:1500px]">
        <TiltCard max={6} glare={false} className="mx-auto max-w-4xl" innerClassName="glass-lachani-deep rounded-[2.5rem] px-6 py-14 text-center md:px-16 md:py-20">
          {/* halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-halo-pulse"
            style={{ background: "radial-gradient(circle, rgba(216,236,128,0.9), transparent 65%)" }}
          />

          <span
            className="inline-flex items-center gap-2 rounded-full border border-ihu-green-dark/15 bg-white/55 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ihu-green-dark backdrop-blur-md"
            style={{ transform: "translateZ(40px)" }}
          >
            <Sparkles size={14} /> Νέος Κύκλος Σπουδών 2025–2026
          </span>

          <h2
            className="mx-auto mt-6 max-w-2xl font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-text-primary md:text-5xl"
            style={{ transform: "translateZ(30px)" }}
          >
            Ξεκινήστε το ταξίδι σας στην{" "}
            <span className="text-gradient-fresh">επιστήμη της ομορφιάς</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            Γίνετε μέλος μιας κοινότητας που γεφυρώνει την έρευνα, τη βιομηχανία και
            την κλινική πράξη. Οι αιτήσεις για τον νέο κύκλο σπουδών είναι ανοιχτές.
          </p>

          <div
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ transform: "translateZ(50px)" }}
          >
            <Link
              href="/eggrafes"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ihu-green-dark px-8 py-4 text-sm font-bold text-white shadow-xl shadow-ihu-green-dark/30 transition-all hover:-translate-y-0.5 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Αιτήσεις Εισαγωγής
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/epikoinonia"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ihu-green-dark/25 bg-white/60 px-8 py-4 text-sm font-bold text-ihu-green-dark backdrop-blur-md transition-all hover:bg-white/80 sm:w-auto"
            >
              Επικοινωνία
            </Link>
          </div>

          {/* contact line */}
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 border-t border-ihu-green-dark/10 pt-8 text-sm text-text-secondary sm:flex-row sm:gap-7">
            <a href="mailto:pms.cosm@nutr.ihu.gr" className="inline-flex items-center gap-2 transition-colors hover:text-ihu-green-dark">
              <Mail size={16} className="text-ihu-green" /> pms.cosm@nutr.ihu.gr
            </a>
            <a href="tel:+302310013444" className="inline-flex items-center gap-2 transition-colors hover:text-ihu-green-dark">
              <Phone size={16} className="text-ihu-green" /> 2310 013444
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-ihu-green" /> Σίνδος, Θεσσαλονίκη
            </span>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

export default CtaFinale3D;
