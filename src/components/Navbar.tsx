"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { mainNavItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          isScrolled
            ? "glass-nav shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-lavender to-mint p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white/90 backdrop-blur-sm">
                  <Image
                    src="/images/logo.png"
                    alt="ΠΜΣ Κοσμητολογία"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold text-text-primary group-hover:text-lavender transition-colors leading-tight">
                  Κοσμητολογία
                </span>
                <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                  ΠΜΣ • ΔιΠΑΕ
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-lavender transition-colors group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-lavender to-mint rounded-full transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/eggrafes"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lavender to-lavender-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-lavender/20 hover:shadow-lavender/40 hover:scale-105 active:scale-100 transition-all duration-200"
              >
                Υποβολή Αίτησης
                <ChevronRight className="h-4 w-4" />
              </Link>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden relative z-[110] flex h-11 w-11 items-center justify-center rounded-xl hover:bg-lavender-50 transition-colors"
                aria-label={isMobileOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
              >
                <AnimatePresence mode="wait">
                  {isMobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6 text-text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6 text-text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-text-primary/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[95] w-[85%] max-w-sm bg-white shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                <nav className="flex flex-col gap-1">
                  {mainNavItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center justify-between py-3.5 px-4 text-base font-medium text-text-primary hover:text-lavender hover:bg-lavender-50 rounded-xl transition-colors"
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4 text-text-muted" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto">
                  <Link
                    href="/eggrafes"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-lavender to-lavender-dark px-6 py-4 text-base font-bold text-white shadow-lg shadow-lavender/25"
                  >
                    Υποβολή Αίτησης
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                  <p className="mt-4 text-center text-xs text-text-muted">
                    ΠΜΣ Κοσμητολογία • ΔιΠΑΕ
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
