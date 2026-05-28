"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { faculty } from "@/data/faculty";

const gradients = [
  "from-lavender to-lavender-light",
  "from-mint to-mint-light",
  "from-peach to-peach-light",
  "from-lavender-dark to-lavender",
  "from-mint-dark to-mint",
  "from-peach-warm to-peach",
];

export function FacultySection() {
  return (
    <SectionWrapper
      id="faculty"
      title="Διδάσκοντες"
      subtitle="Ακαδημαϊκή Ομάδα"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {faculty.map((member, i) => (
          <motion.div
            key={member.email}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card rounded-2xl p-5 group cursor-default"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br ${
                  gradients[i % gradients.length]
                } flex items-center justify-center text-white font-heading font-bold text-sm shadow-md`}
              >
                {member.initials}
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-semibold text-sm text-text-primary truncate">
                  {member.name}
                </h3>
                <p className="text-[11px] text-text-muted font-medium">
                  {member.institution}
                </p>
              </div>
            </div>
            <p className="text-xs text-text-secondary mb-3 line-clamp-1">
              {member.role}
            </p>
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-lavender hover:text-lavender-dark transition-colors group/link"
            >
              <Mail className="h-3 w-3" />
              <span className="truncate max-w-[180px]">{member.email}</span>
            </a>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
