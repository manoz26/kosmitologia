"use client";

/* ══════════════════════════════════════════════════════════════════════════
   /light/nea — Νέα & Ανακοινώσεις (calm draft)
   ──────────────────────────────────────────────────────────────────────────
   There is no fabricated "news" here: the page presents the programme's real,
   recurring annual cycle (dates straight from the study guide) and points to
   the official site for live announcements.

   Signature moment: a date-aware annual-cycle view that highlights the phase
   we're currently in. Still otherwise.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CONTAINER,
  FadeIn,
  LightIcon,
  SectionHead,
  MoreLink,
  spanOf,
} from "@/components/home-light/light-kit";

/* Annual cycle — months are 0-based (Jan = 0). Every phase is verified. */
const phases: { icon: string; window: string; title: string; text: string; months: number[] }[] = [
  {
    icon: "calendar",
    window: "Άνοιξη",
    title: "Πρόσκληση εκδήλωσης ενδιαφέροντος",
    text: "Η Συντονιστική Επιτροπή αποφασίζει και δημοσιεύει την πρόσκληση προς τους υποψηφίους.",
    months: [3, 4],
  },
  {
    icon: "book",
    window: "10 Ιουνίου – 10 Ιουλίου",
    title: "Υποβολή αιτήσεων",
    text: "Οι αιτήσεις και τα δικαιολογητικά υποβάλλονται στη Γραμματεία του ΠΜΣ.",
    months: [5, 6],
  },
  {
    icon: "scale",
    window: "Α' δεκαπενθήμερο Σεπτεμβρίου",
    title: "Αξιολόγηση & συνέντευξη",
    text: "Μοριοδότηση των φακέλων και προσωπική συνέντευξη των υποψηφίων.",
    months: [8],
  },
  {
    icon: "graduation",
    window: "Σεπτέμβριος – Οκτώβριος",
    title: "Εγγραφές & έναρξη",
    text: "Οι επιτυχόντες εγγράφονται και ξεκινούν το χειμερινό εξάμηνο.",
    months: [8, 9],
  },
];

/* ── Scroll signature: the cycle rail ──
   A thin line above the four phases that fills with scroll; each phase's dot
   lights up as the fill passes it, walking the visitor through the year. */
function CycleDot({ progress, pos }: { progress: MotionValue<number>; pos: number }) {
  const t = useTransform(progress, (p) => spanOf(p, pos - 0.06, pos + 0.06));
  const bg = useTransform(t, (v) => (v > 0.5 ? "#5F712A" : "#CBD5E1"));
  return (
    <motion.span
      className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ring-4 ring-white"
      style={{ left: `${pos * 100}%`, x: "-50%", backgroundColor: bg, scale: useTransform(t, (v) => 0.8 + 0.35 * v) }}
    />
  );
}

export function NeaLight() {
  // Which phase we're in now — computed after mount to avoid hydration drift.
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  useEffect(() => setActiveMonth(new Date().getMonth()), []);

  const cycleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cycleRef,
    offset: ["start 72%", "end 58%"],
  });
  const fill = useTransform(scrollYProgress, (p) => `${spanOf(p, 0.04, 0.92) * 100}%`);

  return (
    <>
      {/* Annual cycle — signature */}
      <section className="py-20 md:py-24">
        <div className={CONTAINER}>
          <SectionHead
            kicker="Ο ετήσιος κύκλος"
            title="Τι να περιμένετε, και πότε"
            description="Το πρόγραμμα ακολουθεί έναν σταθερό ετήσιο ρυθμό. Οι ζωντανές ανακοινώσεις δημοσιεύονται στον επίσημο ιστότοπο."
          />

          <div ref={cycleRef}>
            {/* the scroll-filled rail (desktop) */}
            <div className="relative mt-12 hidden h-[3px] rounded-full bg-slate-200 lg:block">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-ihu-green-dark"
                style={{ width: fill }}
              />
              {[0.125, 0.375, 0.625, 0.875].map((pos) => (
                <CycleDot key={pos} progress={scrollYProgress} pos={pos} />
              ))}
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-9 lg:grid-cols-4">
            {phases.map((p, i) => {
              const active = activeMonth !== null && p.months.includes(activeMonth);
              return (
                <FadeIn key={p.title} delay={i * 0.06}>
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-2xl p-6 ring-1 transition-colors",
                      active
                        ? "bg-white ring-ihu-green-dark"
                        : "bg-white ring-slate-200",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
                        <LightIcon name={p.icon} size={20} />
                      </span>
                      {active && (
                        <span className="rounded-full bg-ihu-green-dark px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          Τώρα
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ihu-green-dark">
                      {p.window}
                    </p>
                    <h3 className="mt-1 font-heading text-base font-bold leading-snug text-text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{p.text}</p>
                  </div>
                </FadeIn>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Stay informed */}
      <section className="border-t border-slate-200/70 bg-[#F4F7ED] py-20 md:py-24">
        <div className={cn(CONTAINER, "grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16")}>
          <SectionHead
            kicker="Μείνετε ενημερωμένοι"
            title="Οι επίσημες ανακοινώσεις"
            description="Προκηρύξεις, εκδηλώσεις και τα τελευταία νέα του προγράμματος δημοσιεύονται στον ιστότοπο του ΠΜΣ και ανακοινώνονται από τη Γραμματεία."
          />
          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 md:p-7">
              <a
                href="https://cosm.ihu.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition-colors hover:border-ihu-green-light hover:bg-lachani-mist/40"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-lachani-mist text-ihu-green-dark">
                    <LightIcon name="globe" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-text-primary">cosm.ihu.gr</p>
                    <p className="text-xs text-text-secondary">Επίσημος ιστότοπος του ΠΜΣ</p>
                  </div>
                </div>
                <ExternalLink
                  size={17}
                  className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <div className="mt-4">
                <MoreLink href="/light/epikoinonia">Επικοινωνία με τη Γραμματεία</MoreLink>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

export default NeaLight;
