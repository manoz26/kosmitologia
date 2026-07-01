"use client";

/* ══════════════════════════════════════════════════════════════════════════
   HomeChrome
   ──────────────────────────────────────────────────────────────────────────
   The page's interactive scaffolding:
   • a slim scroll-progress bar pinned to the very top,
   • a vertical scroll-spy dock (desktop) that highlights the section in view
     and lets the visitor jump between sections,
   • a back-to-top button that fades in once scrolled.
   All overlay UI — nothing affects document flow.
   ══════════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { navTargets } from "./lib/data";
import { Icon } from "./lib/primitives";

/* A handful of key targets surfaced in the compact mobile dock. */
const MOBILE_TARGETS = ["top", "journey", "sxoli", "careers", "news"] as const;

function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

export function HomeChrome() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const [active, setActive] = useState("top");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setShowTop(y > 700);

        const mid = y + window.innerHeight * 0.42;
        let current = "top";
        for (const target of navTargets) {
          if (target.id === "top") continue;
          const el = document.getElementById(target.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= mid) current = target.id;
        }
        if (y < 300) current = "top";
        setActive((prev) => (prev === current ? prev : current));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = useCallback((id: string) => scrollToId(id), []);

  return (
    <>
      {/* progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-ihu-green-light via-ihu-green to-ihu-green-dark"
        style={{ scaleX: bar }}
        aria-hidden
      />

      {/* scroll-spy dock */}
      <nav
        aria-label="Πλοήγηση ενοτήτων"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <ul className="flex flex-col items-center gap-2 rounded-full border border-white/50 bg-white/40 p-2 shadow-lg backdrop-blur-md">
          {navTargets.map((target) => {
            const isActive = active === target.id;
            return (
              <li key={target.id} className="group relative">
                <button
                  onClick={() => handleClick(target.id)}
                  aria-label={target.label}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow-md"
                      : "text-ihu-green-dark/60 hover:bg-white/70 hover:text-ihu-green-dark",
                  )}
                >
                  <Icon name={target.icon} size={isActive ? 16 : 15} />
                </button>
                {/* tooltip */}
                <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-ihu-green-dark px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {target.label}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* mobile bottom dock */}
      <nav
        aria-label="Γρήγορη πλοήγηση"
        className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 xl:hidden"
      >
        <ul className="mx-auto flex max-w-md items-center justify-between rounded-2xl border border-white/50 bg-white/65 p-1.5 shadow-xl backdrop-blur-md">
          {MOBILE_TARGETS.map((id) => {
            const target = navTargets.find((t) => t.id === id);
            if (!target) return null;
            const isActive = active === target.id;
            return (
              <li key={target.id} className="flex-1">
                <button
                  onClick={() => handleClick(target.id)}
                  aria-label={target.label}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex w-full flex-col items-center gap-0.5 rounded-xl px-1 py-2 transition-all duration-300",
                    isActive ? "bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white shadow" : "text-ihu-green-dark/70",
                  )}
                >
                  <Icon name={target.icon} size={18} />
                  <span className="text-[9px] font-bold leading-none">{target.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            onClick={() => scrollToId("top")}
            aria-label="Επιστροφή στην κορυφή"
            className="fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-ihu-green-dark text-white shadow-xl transition-transform hover:-translate-y-0.5 xl:flex"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default HomeChrome;
