"use client";

import { useEffect, useRef } from "react";

const HASH_TARGET_EVENT = "hash-target";

/* Runs `onMatch(rest)` whenever the page is asked to show `#<prefix><rest>`:
   on mount (arriving from another page, e.g. /programma#mathima-COSM1004),
   on native hash changes, and when the site search announces an in-page
   target it reached through the router (router.push fires no hashchange).
   Used to open a course or an FAQ answer from a link. */
export function useHashTarget(prefix: string, onMatch: (rest: string) => void) {
  const handler = useRef(onMatch);
  useEffect(() => {
    handler.current = onMatch;
  });

  useEffect(() => {
    const run = (hash: string) => {
      if (hash.startsWith(prefix)) handler.current(hash.slice(prefix.length));
    };
    const fromUrl = () => run(decodeURIComponent(window.location.hash.slice(1)));
    const fromEvent = (e: Event) => run((e as CustomEvent<string>).detail);
    fromUrl();
    window.addEventListener("hashchange", fromUrl);
    window.addEventListener(HASH_TARGET_EVENT, fromEvent);
    return () => {
      window.removeEventListener("hashchange", fromUrl);
      window.removeEventListener(HASH_TARGET_EVENT, fromEvent);
    };
  }, [prefix]);
}

/** Tells the mounted sections that `#hash` was just navigated to in-page —
    also when the URL already had that hash, so the same link reopens it. */
export function announceHashTarget(hash: string) {
  window.dispatchEvent(new CustomEvent(HASH_TARGET_EVENT, { detail: hash }));
}
