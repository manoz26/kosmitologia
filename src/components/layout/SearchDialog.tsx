"use client";

/* ══════════════════════════════════════════════════════════════════════════
   SearchDialog — the command palette behind the navbar search
   ──────────────────────────────────────────────────────────────────────────
   One field, instant results grouped by kind (pages, sections, courses,
   teachers, announcements, FAQ, documents, careers, contact), matched words
   highlighted. ↑/↓ moves a highlight that glides between rows, Enter opens,
   Esc closes. Before anything is typed it offers quick links and a few
   suggested searches; with no match it points to the Secretariat.

   Opening a result is a router navigation to its anchor, so Next.js scrolls
   there and keeps the URL in step; on the current page the sections also
   get an event, since pushState fires no hashchange — that's how a course
   or an FAQ answer opens itself (useHashTarget). Teachers, announcements and
   answers get a short highlight where they land.
   Lazy-loaded by SiteSearch together with the index (src/lib/site-search.ts).
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  CircleHelp,
  CornerDownLeft,
  ExternalLink,
  FileDown,
  Hash,
  LayoutGrid,
  Mail,
  Megaphone,
  Search,
  SearchX,
  User,
  X,
  type LucideIcon,
} from "lucide-react";

import { contact } from "@/data/program";
import {
  KIND_LABEL,
  QUICK_LINKS,
  SEARCH_ENTRY_COUNT,
  SUGGESTIONS,
  search,
  type SearchEntry,
  type SearchKind,
} from "@/lib/site-search";
import { announceHashTarget } from "@/lib/use-hash-target";
import { cn } from "@/lib/utils";

const KIND_ICON: Record<SearchKind, LucideIcon> = {
  page: LayoutGrid,
  section: Hash,
  course: BookOpen,
  person: User,
  news: Megaphone,
  faq: CircleHelp,
  document: FileDown,
  career: Briefcase,
  contact: Mail,
};

/* Results that land on a small card get a short highlight there. */
const FLASH: ReadonlySet<SearchKind> = new Set<SearchKind>(["person", "news", "faq"]);

function flashTarget(id: string) {
  let tries = 0;
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("search-flash");
      void el.offsetWidth; // restart the animation
      el.classList.add("search-flash");
      window.setTimeout(() => el.classList.remove("search-flash"), 2600);
      return;
    }
    if (++tries < 80) window.setTimeout(tick, 50);
  };
  window.setTimeout(tick, 350);
}

interface Row {
  entry: SearchEntry;
  ranges: [number, number][];
}

function Highlight({ text, ranges }: { text: string; ranges: [number, number][] }) {
  if (!ranges.length) return <>{text}</>;
  const parts: React.ReactNode[] = [];
  let at = 0;
  ranges.forEach(([s, e], i) => {
    if (s > at) parts.push(text.slice(at, s));
    parts.push(
      <mark key={i} className="rounded-[4px] bg-lachani-soft px-0.5 text-ihu-green-dark">
        {text.slice(s, e)}
      </mark>,
    );
    at = e;
  });
  if (at < text.length) parts.push(text.slice(at));
  return <>{parts}</>;
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-ihu-green-dark/15 bg-white px-1 font-sans text-[10px] font-semibold text-ihu-green-dark/80">
      {children}
    </kbd>
  );
}

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const uid = useId().replace(/:/g, "");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => search(query), [query]);
  const typed = query.trim().length > 0;

  /* Rows in the order they're shown: grouped by kind, groups ordered by
     their best result. Quick links before anything is typed. */
  const groups = useMemo(() => {
    if (!typed) return [{ key: "quick", label: "Γρήγορη πρόσβαση", rows: QUICK_LINKS.map((entry) => ({ entry, ranges: [] })) }];
    const out: { key: string; label: string; rows: Row[] }[] = [];
    for (const r of results) {
      let g = out.find((x) => x.key === r.entry.kind);
      if (!g) {
        g = { key: r.entry.kind, label: KIND_LABEL[r.entry.kind], rows: [] };
        out.push(g);
      }
      g.rows.push({ entry: r.entry, ranges: r.ranges });
    }
    return out;
  }, [results, typed]);
  const rows = useMemo(() => groups.flatMap((g) => g.rows), [groups]);
  const optionId = (i: number) => `${uid}-opt-${i}`;

  /* Lock the page while open. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Keep the highlighted row in view. */
  useEffect(() => {
    if (open) document.getElementById(`${uid}-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, uid]);

  const updateQuery = (q: string) => {
    setQuery(q);
    setActive(0);
  };

  const go = (entry: SearchEntry, newTab = false) => {
    if (newTab) {
      window.open(entry.href, "_blank", "noopener");
      return;
    }
    onClose();
    if (entry.external) {
      if (/^(mailto|tel):/.test(entry.href)) window.location.href = entry.href;
      else window.open(entry.href, "_blank", "noopener");
      return;
    }
    const [path, hash] = entry.href.split("#");
    const samePage = (path || "/") === pathname;
    if (!samePage) {
      /* The new page scrolls to #hash itself and opens what it names. */
      router.push(entry.href);
    } else if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      /* Same page: the router scrolls (under the navbar, see
         scroll-padding-top); the sections hear about it from the event. */
      if (window.location.hash === `#${hash}`) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(entry.href);
      }
      window.setTimeout(() => announceHashTarget(hash), 0);
    }
    if (hash && FLASH.has(entry.kind)) flashTarget(hash);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && rows.length) {
      e.preventDefault();
      setActive((a) => (a + 1) % rows.length);
    } else if (e.key === "ArrowUp" && rows.length) {
      e.preventDefault();
      setActive((a) => (a - 1 + rows.length) % rows.length);
    } else if (e.key === "Enter" && rows[active]) {
      e.preventDefault();
      go(rows[active].entry, e.ctrlKey || e.metaKey);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  /* Tab stays inside the dialog. */
  const trapTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>("input, button, [href]:not([tabindex='-1'])");
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  let index = -1;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="site-search"
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div aria-hidden className="absolute inset-0 bg-[#1f2b0d]/35 backdrop-blur-[3px]" onClick={onClose} />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Αναζήτηση στο site"
            onKeyDown={trapTab}
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-3 flex max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-2xl flex-col overflow-hidden rounded-3xl bg-white/95 shadow-[0_40px_120px_-30px_rgba(31,45,10,0.6)] ring-1 ring-ihu-green-dark/10 backdrop-blur-xl sm:mt-[9vh] sm:max-h-[min(78dvh,640px)]"
          >
            <div aria-hidden className="h-1 w-full shrink-0 bg-gradient-to-r from-lachani-bright via-ihu-green to-ihu-green-dark" />

            {/* the field */}
            <div className="flex shrink-0 items-center gap-3 border-b border-ihu-green-dark/10 px-4 py-3 sm:px-5">
              <Search size={20} className="shrink-0 text-ihu-green" />
              <input
                ref={inputRef}
                autoFocus
                type="search"
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                onKeyDown={onInputKey}
                onFocus={(e) => e.currentTarget.select()}
                placeholder="Μαθήματα, διδάσκοντες, αιτήσεις…"
                aria-label="Αναζήτηση"
                role="combobox"
                aria-expanded={rows.length > 0}
                aria-controls={`${uid}-list`}
                aria-activedescendant={rows.length ? optionId(active) : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="go"
                className="h-10 min-w-0 flex-1 bg-transparent text-base text-text-primary placeholder:text-text-muted focus:outline-none sm:text-lg [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    updateQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Καθαρισμός"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-lachani-mist hover:text-ihu-green-dark"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full px-2 py-1 text-xs font-semibold text-ihu-green-dark transition-colors hover:bg-lachani-mist sm:px-1"
              >
                <span className="sm:hidden">Κλείσιμο</span>
                <span className="hidden sm:inline-flex">
                  <Kbd>Esc</Kbd>
                </span>
              </button>
            </div>

            {/* results */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2 sm:px-3">
              <p className="sr-only" aria-live="polite">
                {typed ? `${results.length} αποτελέσματα` : ""}
              </p>

              {rows.length > 0 && (
                <div role="listbox" id={`${uid}-list`} aria-label="Αποτελέσματα">
                  {groups.map((g) => (
                    <div key={g.key} role="group" aria-labelledby={`${uid}-g-${g.key}`} className="pb-1">
                      <p
                        id={`${uid}-g-${g.key}`}
                        className="px-3 pb-1.5 pt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ihu-green"
                      >
                        {g.label}
                      </p>
                      {g.rows.map((row) => {
                        index += 1;
                        const i = index;
                        const on = i === active;
                        const RowIcon = KIND_ICON[row.entry.kind];
                        const body = (
                          <>
                            {on && (
                              <motion.span
                                layoutId={`${uid}-active`}
                                aria-hidden
                                className="absolute inset-0 rounded-2xl bg-lachani-mist ring-1 ring-ihu-green/25"
                                transition={{ type: "spring", stiffness: 520, damping: 42 }}
                              />
                            )}
                            <span
                              className={cn(
                                "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 transition-colors",
                                on
                                  ? "bg-gradient-to-br from-ihu-green to-ihu-green-dark text-white ring-transparent"
                                  : "bg-white text-ihu-green-dark ring-ihu-green-dark/10",
                              )}
                            >
                              <RowIcon size={16} />
                            </span>
                            <span className="relative min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-text-primary">
                                <Highlight text={row.entry.title} ranges={row.ranges} />
                              </span>
                              {row.entry.hint && (
                                <span className="block truncate text-xs text-text-secondary">{row.entry.hint}</span>
                              )}
                            </span>
                            <span className="relative shrink-0 text-ihu-green-dark/60">
                              {row.entry.external ? (
                                <ExternalLink size={15} />
                              ) : on ? (
                                <CornerDownLeft size={15} />
                              ) : null}
                            </span>
                          </>
                        );
                        const common = {
                          id: optionId(i),
                          role: "option" as const,
                          "aria-selected": on,
                          tabIndex: -1,
                          onMouseMove: () => !on && setActive(i),
                          onClick: (e: React.MouseEvent) => {
                            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                            e.preventDefault();
                            go(row.entry);
                          },
                          className: "relative flex items-center gap-3 rounded-2xl px-3 py-2.5 outline-none",
                        };
                        return row.entry.external ? (
                          <a key={row.entry.id} href={row.entry.href} {...common}>
                            {body}
                          </a>
                        ) : (
                          <Link key={row.entry.id} href={row.entry.href} prefetch={false} {...common}>
                            {body}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}

              {typed && rows.length === 0 && (
                <div className="flex flex-col items-center px-6 py-10 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lachani-mist text-ihu-green-dark">
                    <SearchX size={22} />
                  </span>
                  <p className="mt-4 font-heading text-base font-bold text-text-primary">
                    Δεν βρέθηκε κάτι για «{query.trim()}»
                  </p>
                  <p className="mt-1 max-w-sm text-sm text-text-secondary">
                    Δοκιμάστε μια άλλη λέξη ή ρωτήστε τη Γραμματεία στο{" "}
                    <a
                      href={`mailto:${contact.email.value}`}
                      className="font-semibold text-ihu-green-dark underline-offset-4 hover:underline"
                    >
                      {contact.email.value}
                    </a>
                    .
                  </p>
                </div>
              )}

              {(!typed || rows.length === 0) && (
                <div className="px-3 pb-3 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ihu-green">Δημοφιλείς αναζητήσεις</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          updateQuery(s);
                          inputRef.current?.focus();
                        }}
                        className="rounded-full bg-lachani-mist px-3 py-1.5 text-xs font-semibold text-ihu-green-dark ring-1 ring-ihu-green-dark/10 transition-colors hover:bg-lachani-soft"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* key hints */}
            <div className="hidden shrink-0 items-center justify-between gap-4 border-t border-ihu-green-dark/10 bg-lachani-mist/60 px-5 py-2.5 text-[11px] text-text-secondary sm:flex">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd> επιλογή
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>↵</Kbd> άνοιγμα
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>Esc</Kbd> κλείσιμο
                </span>
              </span>
              <span>{SEARCH_ENTRY_COUNT} σελίδες, ενότητες, μαθήματα & πρόσωπα</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
