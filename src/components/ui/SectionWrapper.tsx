"use client";

import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "plain" | "gradient" | "mesh";
  title?: string;
  subtitle?: string;
  centered?: boolean;
}

const bgVariants = {
  plain: "",
  gradient: "bg-gradient-to-b from-surface via-lavender-50/30 to-surface",
  mesh: "mesh-gradient",
};

export function SectionWrapper({
  id,
  children,
  className,
  variant = "plain",
  title,
  subtitle,
  centered = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative section-padding scroll-mt-24 overflow-hidden",
        bgVariants[variant],
        className
      )}
    >
      <div className="section-container">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn("mb-16", centered && "text-center")}
          >
            {subtitle && (
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-lavender mb-4">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                {title}
              </h2>
            )}
            <div className="mt-6 mx-auto flex items-center gap-2 justify-center">
              <span className="h-[3px] w-8 rounded-full bg-lavender" />
              <span className="h-[3px] w-16 rounded-full bg-gradient-to-r from-lavender via-mint to-peach" />
              <span className="h-[3px] w-8 rounded-full bg-mint" />
            </div>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
