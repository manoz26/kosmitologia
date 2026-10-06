"use client";

/* ══════════════════════════════════════════════════════════════════════════
   PhotoSlot / PhotoBand — the site's photo frames
   ──────────────────────────────────────────────────────────────────────────
   A frame takes its photo from src/data/photos.ts by key. Until that entry
   has a `src`, the frame shows a placeholder — a hatched λαχανί field with
   crop marks, saying which photo belongs there and what size it needs — so
   the layout is final today and the photos drop in later without touching
   any component.

   Frames are sharp-cornered on purpose: photos and other "information"
   surfaces are square-cut, while the things a visitor handles (3D cards,
   buttons) stay rounded.

   • PhotoSlot — a frame of any size; the caller sets it with className
     (an aspect ratio or a height).
   • PhotoBand — a full-width band with an optional caption row under it,
     aligned to the page grid.

   The photo drifts a few percent against the scroll (function-based
   transforms — see the WAAPI note in CinematicScrollHero). Touch devices and
   reduced-motion visitors get a still photo.
   ══════════════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ImagePlus } from "lucide-react";

import { photos, type PhotoKey } from "@/data/photos";
import { isTouchDevice } from "@/lib/perf";
import { cn } from "@/lib/utils";
import { useMounted, useReduced } from "@/components/home/lib/hooks";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* How far (in % of the moving layer) the photo drifts each way. The layer
   overhangs the frame by 8% top and bottom, so the drift never shows an
   edge. */
const DRIFT = 6;

function CropMarks() {
  const mark = "absolute h-5 w-5 border-ihu-green-dark/45";
  return (
    <>
      <span className={cn(mark, "left-4 top-4 border-l-[1.5px] border-t-[1.5px]")} />
      <span className={cn(mark, "right-4 top-4 border-r-[1.5px] border-t-[1.5px]")} />
      <span className={cn(mark, "bottom-4 left-4 border-b-[1.5px] border-l-[1.5px]")} />
      <span className={cn(mark, "bottom-4 right-4 border-b-[1.5px] border-r-[1.5px]")} />
    </>
  );
}

function PlaceholderLabel({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/75 text-ihu-green-dark ring-1 ring-ihu-green-dark/15">
        <ImagePlus size={18} strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold leading-snug text-ihu-green-dark">{label}</p>
        <p className="mt-0.5 text-xs leading-snug text-ihu-green-dark/70">{hint}</p>
      </div>
    </div>
  );
}

function Placeholder({ label, hint, contained }: { label: string; hint: string; contained: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 bg-[#E1EAC0]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(95,113,42,0.09) 0 1px, transparent 1px 14px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 0% 0%, rgba(255,255,255,0.6), transparent 62%)" }}
      />
      <CropMarks />
      {/* In a full-width band the label lines up with the page grid. */}
      {contained ? (
        <div className="absolute inset-x-0 bottom-0">
          <div className="section-container px-4 pb-8 md:pb-10">
            <PlaceholderLabel label={label} hint={hint} />
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 p-7 md:p-8">
          <PlaceholderLabel label={label} hint={hint} />
        </div>
      )}
    </div>
  );
}

export function PhotoSlot({
  photo: key,
  className,
  sizes = "100vw",
  priority = false,
  drift = true,
  contained = false,
  children,
}: {
  photo: PhotoKey;
  /** Size of the frame — an aspect ratio or a height. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Let the photo drift against the scroll. */
  drift?: boolean;
  /** Align the placeholder label to the page grid (full-width bands). */
  contained?: boolean;
  /** Anything laid over the photo. */
  children?: React.ReactNode;
}) {
  const spec = photos[key];
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const mounted = useMounted();
  const moving = drift && !reduced && mounted && !isTouchDevice();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, (p) => `${(0.5 - clamp01(p)) * 2 * DRIFT}%`);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {spec.src ? (
        <motion.div
          className={cn("absolute inset-x-0", moving ? "-inset-y-[8%]" : "inset-y-0")}
          style={moving ? { y } : undefined}
        >
          <Image
            src={spec.src}
            alt={spec.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={spec.position ? { objectPosition: spec.position } : undefined}
          />
        </motion.div>
      ) : (
        <Placeholder label={spec.label} hint={spec.hint} contained={contained} />
      )}
      {children}
    </div>
  );
}

export function PhotoBand({
  photo,
  caption,
  aside,
  className,
  frameClassName = "h-[clamp(300px,58vh,680px)]",
}: {
  photo: PhotoKey;
  /** Left of the caption row: what the photo shows. */
  caption?: React.ReactNode;
  /** Right of the caption row: usually a link. */
  aside?: React.ReactNode;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <figure className={cn("relative w-full", className)}>
      <PhotoSlot photo={photo} contained className={cn("w-full", frameClassName)} />
      {(caption || aside) && (
        <figcaption className="section-container flex flex-col gap-2 px-4 pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          {caption && <span className="text-sm leading-snug text-text-secondary">{caption}</span>}
          {aside}
        </figcaption>
      )}
    </figure>
  );
}

export default PhotoSlot;
