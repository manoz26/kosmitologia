"use client";

/* Tags <html> with `perf-lite` on every TOUCH device (phones & tablets) so
   globals.css can switch off the expensive decorative work — huge blurred
   aurora layers, morphing blobs, deep backdrop-filters — that pushes mobile
   WebKit past its per-tab memory budget and makes it reload the page mid-scroll.

   Why touch, not `isLowEndDevice()`: iOS (every browser there is WebKit)
   exposes neither `deviceMemory` nor `navigator.connection`, so the low-end
   heuristic silently reads "high-end" on the exact phones that crash. Coarse
   pointer is the one reliable signal. Computers (fine pointer) always keep the
   full experience, per the client. Renders nothing; runs once after mount so
   server HTML is identical for everyone. */

import { useEffect } from "react";
import { isTouchDevice } from "@/lib/perf";

export function PerfLite() {
  useEffect(() => {
    if (isTouchDevice()) document.documentElement.classList.add("perf-lite");
  }, []);
  return null;
}
