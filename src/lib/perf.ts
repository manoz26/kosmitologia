/* Shared device heuristics. Client-only signals — callers must run them
   after mount (or behind a `typeof window` guard) so SSR output never depends
   on them.

   Client requirement: desktop computers ALWAYS get the full experience, no
   matter how old — perf trimming is only ever applied to touch devices
   (phones/tablets), where the big blurred aurora layers and the full
   120-frame hero film are what make scrolling stutter. */

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

export function connectionInfo(): NetworkInformation | undefined {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

export function isSlowConnection(): boolean {
  const conn = connectionInfo();
  return Boolean(
    conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g",
  );
}

/* Phones and tablets — the primary input is a coarse (touch) pointer. */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/* A touch device weak enough to also lose the smaller decorative animations
   (≤4 cores or ≤4GB). Never true on a computer, by design. */
export function isLowEndDevice(): boolean {
  if (typeof window === "undefined" || !isTouchDevice()) return false;
  const cores = navigator.hardwareConcurrency || 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return isSlowConnection() || cores <= 4 || memory <= 4;
}
