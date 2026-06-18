/* ══════════════════════════════════════════════════════════════════════════
   LachaniPageHeader
   ──────────────────────────────────────────────────────────────────────────
   The title block for subpages that have been fully converted to the λαχανί
   look (they render <ScrollBackdrop/> instead of <PageShell/>). It mirrors the
   homepage typography: an eyebrow, a heading with an optional gradient
   highlight and a short intro, plus a back-to-home link.

   Uses only CSS utilities (no hooks), so it stays a server component.
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LachaniPageHeader({
  eyebrow,
  title,
  highlight,
  intro,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  intro?: string;
}) {
  return (
    <header className="section-container px-4 sm:px-6 lg:px-8 pt-32 pb-4 md:pt-36">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ihu-green-dark/80 transition-colors hover:text-ihu-green-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        Αρχική
      </Link>

      {eyebrow && (
        <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-ihu-green-dark">
          {eyebrow}
        </span>
      )}

      <h1 className="font-heading text-4xl font-extrabold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient-fresh">{highlight}</span>
          </>
        )}
      </h1>

      {intro && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {intro}
        </p>
      )}
    </header>
  );
}

export default LachaniPageHeader;
