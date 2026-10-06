"use client";

/* ══════════════════════════════════════════════════════════════════════════
   SiteSearch — the navbar's search bar
   ──────────────────────────────────────────────────────────────────────────
   Client feedback 06/10/2026: «Search bar». On desktop a search field sits
   in the navbar; on phones and tablets it folds into an icon next to the
   menu. Either opens a command-palette dialog over the page, as do Ctrl/⌘ K
   and "/" from anywhere. The dialog and its index (src/lib/site-search.ts)
   are loaded on first use — or on hover/focus, just before it — so pages
   don't pay for them up front.
   ══════════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";

const loadDialog = () => import("./SearchDialog");
const SearchDialog = dynamic(loadDialog, { ssr: false });

const noopSubscribe = () => () => {};

/* ⌘ on Apple keyboards, Ctrl elsewhere. Ctrl on the server and during
   hydration, so the markup always matches. */
function useModKey(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad/i.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );
}

function typingInField(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  /* Mount the (lazy) dialog only once it has been asked for. */
  const [wanted, setWanted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mod = useModKey();

  const show = useCallback(() => {
    setWanted(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      } else if (e.key === "/" && !open && !typingInField(e.target)) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={show}
        onPointerEnter={() => void loadDialog()}
        onFocus={() => void loadDialog()}
        aria-label="Αναζήτηση στο site"
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K /"
        className="group relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ihu-green-dark/15 bg-white/75 text-ihu-green-dark shadow-sm backdrop-blur-md transition-all hover:border-ihu-green/50 hover:bg-white hover:shadow-md lg:w-56 lg:justify-start lg:gap-2.5 lg:pl-3.5 lg:pr-2 xl:w-64"
      >
        <Search size={17} className="shrink-0 transition-transform group-hover:scale-110" />
        <span className="hidden flex-1 text-left text-sm text-text-secondary lg:inline">Αναζήτηση…</span>
        <kbd className="hidden h-6 items-center rounded-md border border-ihu-green-dark/15 bg-lachani-mist px-1.5 font-sans text-[11px] font-semibold text-ihu-green-dark/80 lg:inline-flex">
          {mod} K
        </kbd>
      </button>

      {wanted && <SearchDialog open={open} onClose={close} />}
    </>
  );
}

export default SiteSearch;
