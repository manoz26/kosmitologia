"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Αρχική" },
  {
    label: "Το Πρόγραμμα",
    subLinks: [
      { href: "/sxetika", label: "Σχετικά με το ΠΜΣ" },
      { href: "/programma", label: "Πρόγραμμα Σπουδών" },
      { href: "/didaskotes", label: "Διδάσκοντες" },
      { href: "/ergastiria", label: "Εργαστήρια & Υποδομές" },
    ]
  },
  { href: "/karieres", label: "Απόφοιτοι & Καριέρα" },
  { href: "/eggrafes", label: "Εγγραφές" },
  { href: "/faq", label: "Συχνές Ερωτήσεις" },
  { href: "/epikoinonia", label: "Επικοινωνία" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="section-container px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <div className="relative w-56 h-14">
            <Image 
              src="/logo.png" 
              alt="ΔΙΠΑΕ Κοσμητολογία" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((item, idx) => (
            item.subLinks ? (
              <div 
                key={idx} 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                  item.subLinks.some(sub => pathname === sub.href) ? "text-primary" : "text-text-secondary"
                }`}>
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white border border-border-soft shadow-xl rounded-xl overflow-hidden py-2"
                    >
                      {item.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className={`block px-4 py-2 text-sm transition-colors hover:bg-muted ${
                            pathname === subLink.href ? "text-primary font-semibold bg-primary/5" : "text-text-secondary"
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-text-secondary"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden relative z-10 p-2 text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md absolute top-full left-0 right-0 border-b border-border-soft shadow-lg"
      >
        <nav className="flex flex-col p-4 gap-2">
          {navLinks.map((item, idx) => (
            item.subLinks ? (
              <div key={idx} className="flex flex-col">
                <button 
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="flex items-center justify-between p-3 rounded-md text-sm font-medium text-text-secondary hover:bg-muted"
                >
                  {item.label}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col pl-4 border-l-2 border-border-soft ml-4 mt-1"
                    >
                      {item.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`p-2 text-sm ${
                            pathname === subLink.href ? "text-primary font-semibold" : "text-text-secondary"
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
