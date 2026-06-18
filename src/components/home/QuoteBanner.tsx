"use client";

/* ══════════════════════════════════════════════════════════════════════════
   QuoteBanner — rotating pull-quote
   ──────────────────────────────────────────────────────────────────────────
   A calm, full-width band that cycles through short manifesto-style quotes,
   framed by a soap bubble and a radial burst. A breather between dense
   sections.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

import { pullQuotes } from "./lib/data";
import { Divider } from "./lib/primitives";
import { RadialBurst } from "./lib/decorations";
import { SoapBubble } from "./lib/cosmetic3d";
import { useReduced } from "./lib/hooks";

export function QuoteBanner() {
  const reduced = useReduced();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % pullQuotes.length), 5000);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      <RadialBurst className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(135,157,66,0.12)" size={620} />
      <div className="pointer-events-none absolute left-[12%] top-10 hidden opacity-70 md:block">
        <SoapBubble size={80} />
      </div>
      <div className="pointer-events-none absolute right-[14%] bottom-10 hidden opacity-60 md:block">
        <SoapBubble size={56} />
      </div>

      <div className="section-container relative z-10 px-4 text-center">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] glass-lachani-deep px-6 py-12 md:px-16 md:py-16">
          <Quote size={44} className="mx-auto text-ihu-green/40" />
          <div className="relative mt-4 flex min-h-[5.5rem] items-center justify-center md:min-h-[6.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-2xl font-extrabold leading-snug tracking-tight text-text-primary md:text-4xl"
              >
                «{pullQuotes[index]}»
              </motion.p>
            </AnimatePresence>
          </div>
          <Divider className="mt-8" />
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-ihu-green-dark">
            ΠΜΣ Κοσμητολογία · ΔΙΠΑΕ
          </p>
        </div>
      </div>
    </section>
  );
}

export default QuoteBanner;
