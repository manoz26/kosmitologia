"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "elevated" | "colored";
  delay?: number;
}

const variantStyles = {
  default: "glass-card",
  elevated: "glass-card-elevated",
  colored:
    "glass-card-elevated bg-gradient-to-br from-white/70 via-white/60 to-lavender-50/50",
};

export function GlassCard({
  children,
  className,
  hover = true,
  variant = "default",
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 16px 48px rgba(139, 126, 200, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06)",
              transition: { duration: 0.25 },
            }
          : undefined
      }
      className={cn(
        "rounded-2xl p-6 transition-colors duration-300",
        variantStyles[variant],
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
