"use client";

/* ══════════════════════════════════════════════════════════════════════════
   SkinScience3D
   ──────────────────────────────────────────────────────────────────────────
   The bridge between cosmetology and dermatology: an interactive 3D
   cross-section of the skin. Hovering (or focusing) a layer card lifts and
   highlights the matching stratum in the cross-section, with connector lines
   and a floating DNA helix for flavour.
   ══════════════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { skinLayers } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { SkinCrossSection, DnaHelix } from "./lib/cosmetic3d";
import { GlowOrb } from "./lib/decorations";

export function SkinScience3D() {
  const [active, setActive] = useState(0);

  return (
    <section id="skin" className="relative w-full overflow-hidden py-24 md:py-32">
      <GlowOrb className="-left-20 top-20" size={360} color="rgba(216,236,128,0.45)" />
      <GlowOrb className="-right-24 bottom-10" size={420} color="rgba(135,157,66,0.4)" />

      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Επιστήμη του δέρματος"
          labelIcon="scan-face"
          title="Στο επίκεντρο,"
          highlight="το δέρμα"
          description="Η κατεύθυνση της δερματολογίας ξεκινά από τη βαθιά κατανόηση της δομής του δέρματος. Περιηγηθείτε στα τρία στρώματα και δείτε πού δρα κάθε συστατικό."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] [perspective:1500px]">
          {/* cross-section visual */}
          <Reveal direction="left">
            <div className="relative mx-auto w-full max-w-sm">
              <motion.div
                className="relative mx-auto [transform-style:preserve-3d]"
                animate={{ rotateY: 0, rotateX: 4 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <SkinCrossSection size={300} activeLayer={active} className="mx-auto shadow-2xl" />
              </motion.div>

              {/* floating helix */}
              <div className="pointer-events-none absolute -right-6 top-6 opacity-80">
                <DnaHelix size={70} />
              </div>

              {/* depth label */}
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-xl bg-white/80 px-3 py-2 text-xs font-bold text-ihu-green-dark shadow-lg backdrop-blur-md"
              >
                {skinLayers[active].depth}
              </motion.div>
            </div>
          </Reveal>

          {/* layer cards */}
          <div className="flex flex-col gap-4">
            {skinLayers.map((layer, i) => {
              const isActive = i === active;
              return (
                <Reveal key={layer.id} delay={i * 0.08} direction="right">
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group w-full overflow-hidden rounded-3xl p-6 text-left transition-all duration-300",
                      isActive ? "glass-lachani-deep -translate-y-0.5 scale-[1.01]" : "glass-lachani hover:-translate-y-0.5",
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                        style={{ background: `linear-gradient(140deg, ${layer.from}, ${layer.to})` }}
                      >
                        <Icon name={layer.icon} size={26} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-heading text-lg font-bold text-text-primary">{layer.name}</h3>
                          <span
                            className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors", isActive ? "text-white" : "text-ihu-green-dark")}
                            style={isActive ? { background: layer.accent } : { background: "rgba(135,157,66,0.12)" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: layer.accent }}>
                          {layer.subtitle}
                        </p>
                        <motion.p
                          initial={false}
                          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                          className="overflow-hidden text-sm leading-relaxed text-text-secondary"
                        >
                          <span className="block pt-2">{layer.description}</span>
                        </motion.p>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkinScience3D;
