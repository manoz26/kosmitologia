"use client";

/* Tags <html> with `perf-lite` on low-end devices so globals.css can switch
   off the expensive decorative work (huge blurred aurora layers, morphing
   blobs, deep backdrop-filters). Renders nothing; runs once after mount so
   server HTML is identical for everyone. */

import { useEffect } from "react";
import { isLowEndDevice } from "@/lib/perf";

export function PerfLite() {
  useEffect(() => {
    if (isLowEndDevice()) document.documentElement.classList.add("perf-lite");
  }, []);
  return null;
}
