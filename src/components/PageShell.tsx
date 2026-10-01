"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollBackdrop } from "@/components/home/ScrollBackdrop";

interface PageShellProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageShell({ title, subtitle, children, className }: PageShellProps) {
  return (
    <div className={cn("relative pt-28 pb-20", className)}>
      {/* The same still λαχανί canvas as the home page, so these pages are
          never bare white. */}
      <ScrollBackdrop />

      {/* Header */}
      <div className="mesh-gradient">
        <div className="section-container px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-ihu-green transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Αρχική
            </Link>
            <span className="block text-sm font-semibold text-ihu-green-dark mb-3">
              {subtitle}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              {title}
            </h1>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-[3px] w-8 rounded-full bg-ihu-green" />
              <span className="h-[3px] w-16 rounded-md bg-gradient-to-r from-ihu-green via-lachani to-ihu-blue" />
              <span className="h-[3px] w-8 rounded-full bg-lachani" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container px-4 sm:px-6 lg:px-8 py-12">
        {children || (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-border-soft shadow-md bg-white rounded-md p-12 text-center max-w-2xl mx-auto"
          >
            <div className="h-16 w-16 rounded-md bg-ihu-green-50 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚧</span>
            </div>
            <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
              Σελίδα υπό κατασκευή
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Η σελίδα αυτή βρίσκεται υπό ανάπτυξη. Σύντομα θα είναι διαθέσιμη
              με πλήρες περιεχόμενο.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
