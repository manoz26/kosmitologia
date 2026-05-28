"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { contactInfo } from "@/data/navigation";
import { GlassCard } from "@/components/ui/GlassCard";

const contactCards = [
  {
    icon: Phone,
    title: "Τηλέφωνο",
    lines: [contactInfo.phone1, contactInfo.phone2],
    href: `tel:+30${contactInfo.phone1.replace(/\s/g, "")}`,
    color: "from-lavender to-lavender-dark",
  },
  {
    icon: Mail,
    title: "Email",
    lines: [contactInfo.email],
    href: `mailto:${contactInfo.email}`,
    color: "from-mint to-mint-dark",
  },
  {
    icon: MapPin,
    title: "Διεύθυνση",
    lines: [contactInfo.building, contactInfo.campus, contactInfo.postalCode],
    href: "#map",
    color: "from-peach to-peach-warm",
  },
];

export function ContactSection() {
  return (
    <SectionWrapper
      id="contact"
      variant="mesh"
      title="Επικοινωνία"
      subtitle="Γραμματεία ΠΜΣ"
    >
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Contact Cards */}
        <div className="lg:col-span-2 space-y-4">
          {contactCards.map((card, i) => (
            <GlassCard key={card.title} variant="elevated" delay={i * 0.1}>
              <a
                href={card.href}
                className="flex items-start gap-4 group"
              >
                <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-text-primary mb-1">
                    {card.title}
                  </h3>
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-sm text-text-secondary">
                      {line}
                    </p>
                  ))}
                </div>
              </a>
            </GlassCard>
          ))}

          {/* Hours */}
          <div className="flex items-center gap-3 glass-card rounded-xl px-4 py-3">
            <Clock className="h-4 w-4 text-lavender flex-shrink-0" />
            <p className="text-xs text-text-muted">
              Ωράριο Γραμματείας: <span className="font-medium text-text-secondary">Δευτ-Παρ 09:00-15:00</span>
            </p>
          </div>
        </div>

        {/* Contact Form (Visual Placeholder) */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card-elevated rounded-3xl p-8"
          >
            <h3 className="font-heading text-lg font-bold text-text-primary mb-6">
              Στείλτε μας μήνυμα
            </h3>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
                    Ονοματεπώνυμο
                  </label>
                  <input
                    type="text"
                    placeholder="π.χ. Μαρία Παπαδοπούλου"
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-border-soft text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-lavender/30 focus:border-lavender transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-border-soft text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-lavender/30 focus:border-lavender transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
                  Θέμα
                </label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/60 border border-border-soft text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-lavender/30 focus:border-lavender transition-all appearance-none cursor-pointer">
                  <option>Γενική Ερώτηση</option>
                  <option>Αίτηση Εγγραφής</option>
                  <option>Πρόγραμμα Σπουδών</option>
                  <option>Δίδακτρα & Απαλλαγές</option>
                  <option>Άλλο</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
                  Μήνυμα
                </label>
                <textarea
                  rows={4}
                  placeholder="Γράψτε το μήνυμά σας εδώ..."
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-border-soft text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-lavender/30 focus:border-lavender transition-all resize-none"
                />
              </div>

              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lavender to-lavender-dark px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-lavender/20 hover:shadow-lavender/40 hover:scale-[1.02] active:scale-100 transition-all duration-200"
              >
                <Send className="h-4 w-4" />
                Αποστολή Μηνύματος
              </button>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            id="map"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 rounded-2xl overflow-hidden glass-card h-64"
          >
            <iframe
              src={contactInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Χάρτης ΔιΠΑΕ"
            />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
