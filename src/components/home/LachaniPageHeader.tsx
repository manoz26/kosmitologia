/* ══════════════════════════════════════════════════════════════════════════
   LachaniPageHeader
   ──────────────────────────────────────────────────────────────────────────
   The title block of every subpage (they render <ScrollBackdrop/> under it).
   It sits on the same 12-column grid as the sections: a breadcrumb, then a
   rule with the page's title on the left and its intro on the right — the
   intro on the title's baseline — and, optionally, a full-width photo band
   (src/data/photos.ts) under it.

   Server component; the photo band is a client island.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { PhotoKey } from "@/data/photos";
import { PhotoBand } from "@/components/ui/PhotoSlot";

export function LachaniPageHeader({
  eyebrow,
  title,
  highlight,
  intro,
  photo,
  photoCaption,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  intro?: string;
  /** A full-width photo band under the title. */
  photo?: PhotoKey;
  photoCaption?: string;
}) {
  const pageName = [title, highlight].filter(Boolean).join(" ");
  return (
    <>
      <header className="section-container px-4 pb-12 pt-32 md:pb-16 md:pt-36">
        <nav aria-label="Διαδρομή" className="text-sm">
          <ol className="flex items-center gap-1.5 text-text-secondary">
            <li>
              <Link href="/" className="font-medium transition-colors hover:text-ihu-green-dark">
                Αρχική
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} className="text-text-secondary/60" />
            </li>
            <li aria-current="page" className="font-semibold text-ihu-green-dark">
              {pageName}
            </li>
          </ol>
        </nav>

        <div className="relative mt-8 border-t border-ihu-green-dark/20 pt-8 md:mt-10 md:pt-10">
          <span aria-hidden className="absolute -top-px left-0 h-[3px] w-12 bg-ihu-green-dark" />
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <h1 className="font-heading text-[2.6rem] font-extrabold leading-[1] tracking-[-0.03em] text-text-primary sm:text-6xl lg:col-span-7 lg:text-7xl">
              {title}
              {highlight && (
                <>
                  {" "}
                  <span className="text-gradient-fresh">{highlight}</span>
                </>
              )}
            </h1>

            {(eyebrow || intro) && (
              <div className="lg:col-span-5 lg:pb-2 xl:col-span-4 xl:col-start-9">
                {eyebrow && <p className="text-sm font-semibold text-ihu-green-dark">{eyebrow}</p>}
                {intro && (
                  <p className="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">{intro}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {photo && <PhotoBand photo={photo} caption={photoCaption} className="mb-4" />}
    </>
  );
}

export default LachaniPageHeader;
