"use client";

/* ══════════════════════════════════════════════════════════════════════════
   AdmissionTimeline3D
   ──────────────────────────────────────────────────────────────────────────
   The path to admission as a scroll-linked vertical 3D timeline (a glowing
   rail fills as you scroll past each step) beside a glass panel of evaluation
   criteria with animated weight bars and the key facts.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

import { admissionSteps, evaluationCriteria } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative">
      {/* rail */}
      <div className="absolute left-[27px] top-2 bottom-2 w-1 rounded-full bg-ihu-green-dark/12 md:left-[31px]" aria-hidden />
      <motion.div
        className="absolute left-[27px] top-2 w-1 origin-top rounded-full bg-gradient-to-b from-ihu-green-light to-ihu-green-dark md:left-[31px]"
        style={{ scaleY: fill, height: "calc(100% - 1rem)" }}
        aria-hidden
      />

      <ol className="space-y-7">
        {admissionSteps.map((step, i) => (
          <Reveal as="li" key={step.index} delay={i * 0.05} direction="right" className="relative flex gap-5">
            <div className="relative z-10 shrink-0">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-lg ring-4 ring-[#cfe07f]/40"
                style={{ transform: "translateZ(0)" }}
              >
                <Icon name={step.icon} size={24} />
              </span>
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-black text-ihu-green-dark shadow">
                {step.index}
              </span>
            </div>
            <div className="flex-1 rounded-2xl glass-lachani p-5">
              <h3 className="font-heading text-base font-bold text-text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function CriteriaPanel() {
  return (
    <div className="rounded-[2rem] glass-lachani-deep p-7 md:p-8">
      <h3 className="font-heading text-xl font-bold text-text-primary">Κριτήρια Αξιολόγησης</h3>
      <p className="mt-1.5 text-sm text-text-secondary">
        Χωρίς γραπτές εξετάσεις — αξιολόγηση φακέλου υποψηφιότητας με μόρια.
      </p>

      <div className="mt-6 space-y-4">
        {evaluationCriteria.map((c, i) => (
          <div key={c.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-text-primary">{c.label}</span>
              <span className="font-heading font-bold text-ihu-green-dark">{c.weight}%</span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-ihu-green-dark/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-ihu-green-light to-ihu-green-dark"
                initial={{ width: 0 }}
                whileInView={{ width: `${c.weight}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-3 gap-3 border-t border-ihu-green-dark/10 pt-6 text-center">
        {[
          { value: "€2.400", label: "Δίδακτρα" },
          { value: "40", label: "Εισακτέοι" },
          { value: "0", label: "Εξετάσεις" },
        ].map((f) => (
          <div key={f.label}>
            <p className="font-heading text-2xl font-extrabold text-ihu-green-dark">{f.value}</p>
            <p className="mt-0.5 text-[11px] text-text-secondary">{f.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/eggrafes"
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ihu-green-dark px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
        >
          Κάντε αίτηση
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href="/aitisi.docx"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ihu-green-dark/25 bg-white/55 px-5 py-3 text-sm font-bold text-ihu-green-dark backdrop-blur-md transition-all hover:bg-white/80"
        >
          <FileText size={16} /> Έντυπο αίτησης
        </a>
      </div>
    </div>
  );
}

export function AdmissionTimeline3D() {
  return (
    <section id="admission" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Εισαγωγή"
          labelIcon="graduation"
          title="Πέντε βήματα"
          highlight="προς την εγγραφή"
          description="Από την πρόσκληση εκδήλωσης ενδιαφέροντος μέχρι την έναρξη των μαθημάτων — μια ξεκάθαρη, χωρίς εξετάσεις διαδικασία."
        />

        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] [perspective:1400px]">
          <Timeline />
          <div className="lg:sticky lg:top-28">
            <Reveal direction="left">
              <CriteriaPanel />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdmissionTimeline3D;
