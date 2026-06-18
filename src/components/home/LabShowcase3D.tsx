"use client";

/* ══════════════════════════════════════════════════════════════════════════
   LabShowcase3D
   ──────────────────────────────────────────────────────────────────────────
   The laboratories & infrastructure. A pointer-tilting 3D photo stack (real
   campus photos floating at different Z depths) beside a list of lab
   capabilities. Scroll parallax drifts the stack for added depth.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { labFeatures } from "./lib/data";
import { Icon, Reveal, SectionHeading, Chip, TiltCard } from "./lib/primitives";
import { useReduced } from "./lib/hooks";

export function LabShowcase3D() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const stackY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 50, reduced ? 0 : -50]);

  return (
    <section ref={ref} id="labs" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 grid grid-cols-1 items-center gap-14 px-4 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: copy + features */}
        <div>
          <SectionHeading
            align="left"
            label="Υποδομές"
            labelIcon="microscope"
            title="Εργαστήρια"
            highlight="αιχμής"
            description="Η μάθηση γίνεται πράξη. Σύγχρονα εργαστήρια παρασκευής, ενόργανης ανάλυσης και αξιολόγησης δέρματος, για εκπαίδευση με βιομηχανικά πρότυπα."
          />

          <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {labFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.08} direction="up">
                <div className="group h-full rounded-2xl glass-lachani p-5 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow">
                      <Icon name={feature.icon} size={18} />
                    </span>
                    <h3 className="font-heading text-sm font-bold text-text-primary">{feature.title}</h3>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">{feature.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {feature.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Link
              href="/ergastiria"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-ihu-green-dark transition-all hover:gap-3"
            >
              Δείτε τις εγκαταστάσεις
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Right: 3D photo stack */}
        <Reveal direction="right">
          <motion.div style={{ y: stackY }} className="relative mx-auto h-[26rem] w-full max-w-xl [perspective:1500px] md:h-[32rem]">
            <TiltCard max={9} glare={false} className="h-full w-full" innerClassName="h-full w-full overflow-visible">
              {/* main photo */}
              <div
                className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.8rem] border-4 border-white shadow-2xl"
                style={{ transform: "translate(-50%,-50%) translateZ(20px)" }}
              >
                <Image src="/images/lab.png" alt="Εργαστήριο Κοσμητολογίας" fill className="object-cover" sizes="(max-width:768px) 80vw, 36vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ihu-green-dark/30 to-transparent" />
              </div>

              {/* floating accent photo top-right */}
              <div
                className="absolute right-0 top-2 h-32 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl"
                style={{ transform: "translateZ(80px)" }}
              >
                <Image src="/images/IMG_1827.jpeg" alt="Φοιτητές στο εργαστήριο" fill className="object-cover" sizes="180px" />
              </div>

              {/* floating accent photo bottom-left */}
              <div
                className="absolute bottom-2 left-0 h-36 w-48 overflow-hidden rounded-2xl border-4 border-white shadow-xl"
                style={{ transform: "translateZ(110px)" }}
              >
                <Image src="/images/IMG_1830.jpeg" alt="Στιγμιότυπο από το ΠΜΣ" fill className="object-cover" sizes="200px" />
              </div>

              {/* glass stat chip */}
              <div
                className="absolute -bottom-3 right-6 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-2.5 shadow-lg backdrop-blur-md"
                style={{ transform: "translateZ(140px)" }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ihu-green/15 text-ihu-green-dark">
                  <Icon name="flask-round" size={18} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ihu-green-dark">Πρακτική</p>
                  <p className="text-sm font-bold text-text-primary">Hands-on εκπαίδευση</p>
                </div>
              </div>

              {/* halo */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-halo-pulse"
                style={{ background: "radial-gradient(circle, rgba(216,236,128,0.7), transparent 65%)", transform: "translate(-50%,-50%) translateZ(-40px)" }}
              />
            </TiltCard>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

export default LabShowcase3D;
