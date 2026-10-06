"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, Bus, TrainFront, Car } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import { contact } from "@/data/program";
import { GlassCard } from "@/components/ui/GlassCard";

const contactCards = [
  {
    icon: Phone,
    title: "Τηλέφωνο",
    lines: [contactInfo.phone1, `Fax ${contactInfo.fax}`],
    href: `tel:+30${contactInfo.phone1.replace(/\s/g, "")}`,
    color: "from-ihu-green to-ihu-green-dark",
  },
  {
    icon: Mail,
    title: "Email",
    lines: [contactInfo.email],
    href: `mailto:${contactInfo.email}`,
    color: "from-lachani to-ihu-green-dark",
  },
  {
    icon: MapPin,
    title: "Διεύθυνση",
    lines: [contactInfo.building, contactInfo.campus, contactInfo.postalCode],
    href: "#map",
    color: "from-ihu-blue to-ihu-blue",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-24 pb-24 pt-12 md:pt-16">
      <div className="section-container grid gap-8 px-4 lg:grid-cols-12 lg:gap-10">
        {/* Contact Cards */}
        <div className="space-y-4 lg:col-span-5">
          {contactCards.map((card, i) => (
            <GlassCard key={card.title} variant="elevated" delay={i * 0.1}>
              <a
                href={card.href}
                className="flex items-start gap-4 group"
              >
                <div className={`flex-shrink-0 h-12 w-12 rounded-md bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
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
          <div className="flex items-center gap-3 border border-border-soft shadow-sm bg-white rounded-md px-4 py-3">
            <Clock className="h-4 w-4 text-ihu-green flex-shrink-0" />
            <p className="text-xs text-text-muted">
              Ωράριο Γραμματείας: <span className="font-medium text-text-secondary">{contact.hours.value}</span>
            </p>
          </div>

          {/* Electronic submission of the application */}
          <GlassCard variant="elevated" delay={0.3}>
            <h3 className="font-heading font-semibold text-sm text-text-primary mb-2">
              Αποστολή αίτησης με email
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Δίνεται η δυνατότητα στους ενδιαφερόμενους να στείλουν σε ηλεκτρονική μορφή μέσω email την αίτηση και τα απαραίτητα δικαιολογητικά, με την απαίτηση να τα προσκομίσουν σε έντυπη μορφή μετά την αποδοχή τους και σε κάθε περίπτωση πριν την ολοκλήρωση της εγγραφής τους στο ΠΜΣ.
            </p>
            <div className="mt-3 flex flex-col gap-1">
              {[contact.email.value, contact.emailAlt.value].map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="text-sm font-semibold text-ihu-green-dark hover:underline break-all"
                >
                  {email}
                </a>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Contact Form (Visual Placeholder) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-border-soft shadow-md bg-white rounded-md p-8"
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
                    className="w-full px-4 py-3 rounded-md bg-white/60 border border-border-soft text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ihu-green/30 focus:border-ihu-green transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-md bg-white/60 border border-border-soft text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ihu-green/30 focus:border-ihu-green transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
                  Θέμα
                </label>
                <select className="w-full px-4 py-3 rounded-md bg-white/60 border border-border-soft text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-ihu-green/30 focus:border-ihu-green transition-all appearance-none cursor-pointer">
                  <option>Γενική Ερώτηση</option>
                  <option>Αίτηση Εγγραφής</option>
                  <option>Πρόγραμμα Σπουδών</option>
                  <option>Δίδακτρα</option>
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
                  className="w-full px-4 py-3 rounded-md bg-white/60 border border-border-soft text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ihu-green/30 focus:border-ihu-green transition-all resize-none"
                />
              </div>

              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-ihu-green to-ihu-green-dark px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-ihu-green/20 hover:shadow-ihu-green/40 hover:scale-[1.02] active:scale-100 transition-all duration-200"
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
            className="mt-6 rounded-md overflow-hidden border border-border-soft shadow-sm bg-white h-64"
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

          {/* Access Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="font-heading text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-ihu-blue" />
              Πρόσβαση στο Campus
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="border border-border-soft shadow-sm bg-white rounded-md p-5 border border-border-soft hover:border-ihu-green/30 transition-colors group shadow-sm hover:shadow-md">
                <div className="h-10 w-10 rounded-md bg-ihu-green-50 text-ihu-green-dark flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Bus className="h-5 w-5" />
                </div>
                <h4 className="font-heading font-semibold text-sm text-text-primary mb-2">
                  ΟΑΣΘ (Γραμμή 52)
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Η γραμμή 52 (Ν.Σ. Σταθμός - ΑΤΕΙ) συνδέει το κέντρο της Θεσσαλονίκης απευθείας με τις εγκαταστάσεις μας στη Σίνδο.
                </p>
              </div>

              <div className="border border-border-soft shadow-sm bg-white rounded-md p-5 border border-border-soft hover:border-lachani/30 transition-colors group shadow-sm hover:shadow-md">
                <div className="h-10 w-10 rounded-md bg-lachani-mist text-ihu-green-dark flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <TrainFront className="h-5 w-5" />
                </div>
                <h4 className="font-heading font-semibold text-sm text-text-primary mb-2">
                  Προαστιακός
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Τακτικά δρομολόγια από τον Ν.Σ. Σταθμό προς τον Σταθμό Σίνδου. Το campus βρίσκεται σε μικρή απόσταση από τον σταθμό.
                </p>
              </div>

              <div className="border border-border-soft shadow-sm bg-white rounded-md p-5 border border-border-soft hover:border-ihu-blue/30 transition-colors group shadow-sm hover:shadow-md">
                <div className="h-10 w-10 rounded-md bg-ihu-blue-50 text-ihu-blue flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Car className="h-5 w-5" />
                </div>
                <h4 className="font-heading font-semibold text-sm text-text-primary mb-2">
                  Εθνική Οδός
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Στο 15ο χλμ. της Ε.Ο. Θεσσαλονίκης - Αθηνών (ΠΑΘΕ). Η πρόσβαση γίνεται εύκολα μέσω της ειδικής εξόδου για Σίνδο.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
