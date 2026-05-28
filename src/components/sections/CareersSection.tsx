"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { careerPaths, type CareerPath } from "@/data/careers";
import { cn } from "@/lib/utils";

function CareerIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "flask-conical": LucideIcons.FlaskConical,
    factory: LucideIcons.Factory,
    "heart-handshake": LucideIcons.HeartHandshake,
    rocket: LucideIcons.Rocket,
    "graduation-cap": LucideIcons.GraduationCap,
  };
  const Icon = iconMap[name] || LucideIcons.Briefcase;
  return <Icon className="h-6 w-6" />;
}

const colorMap: Record<CareerPath["color"], { icon: string; bg: string; glow: string }> = {
  lavender: { icon: "from-lavender to-lavender-dark", bg: "bg-lavender-50", glow: "shadow-lavender/20" },
  mint: { icon: "from-mint to-mint-dark", bg: "bg-mint-50", glow: "shadow-mint/20" },
  peach: { icon: "from-peach to-peach-warm", bg: "bg-peach-50", glow: "shadow-peach/20" },
  "peach-warm": { icon: "from-peach-warm to-peach", bg: "bg-peach-50", glow: "shadow-peach-warm/20" },
  "lavender-light": { icon: "from-lavender-light to-lavender", bg: "bg-lavender-50", glow: "shadow-lavender-light/20" },
};

export function CareersSection() {
  return (
    <SectionWrapper
      id="careers"
      title="Επαγγελματικές Προοπτικές"
      subtitle="Καριέρα"
    >
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {careerPaths.map((career, i) => {
          const colors = colorMap[career.color];
          const isLarge = i === 0 || i === 3;
          return (
            <motion.div
              key={career.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 50px rgba(139, 126, 200, 0.12)",
                transition: { duration: 0.25 },
              }}
              className={cn(
                "glass-card-elevated rounded-3xl p-7 cursor-default group",
                isLarge && "md:col-span-2 lg:col-span-1"
              )}
            >
              <div className={cn(
                "h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110",
                colors.icon,
                colors.glow
              )}>
                <CareerIcon name={career.icon} />
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                {career.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {career.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
