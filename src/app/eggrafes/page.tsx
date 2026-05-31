"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  CalendarDays, FileText, GraduationCap, Download, Mail, MapPin, 
  BookOpen, Languages, Award, Briefcase, User, ShieldCheck,
  Users, BookMarked, Microscope
} from "lucide-react";

const DOCUMENTS = [
  {
    title: "Έντυπο Αίτησης",
    desc: "Έντυπο της αίτησης συμπληρωμένο και υπογεγραμμένο.",
    icon: FileText,
  },
  {
    title: "Αντίγραφο Πτυχίου",
    desc: "(στην περίπτωση που ο τίτλος έχει αποκτηθεί στην αλλοδαπή, θα πρέπει να συνοδεύεται από αντίγραφο πιστοποιητικού ισοτιμίας και αντιστοιχίας από τον ΔΟΑΤΑΠ) ή βεβαίωση της γραμματείας του Τμήματος στο οποίο φοιτούν η οποία θα αναφέρει ότι ο υποψήφιος έχει περατώσει τις σπουδές του και εκκρεμεί μόνο η διαδικασία της ορκωμοσίας",
    icon: GraduationCap,
  },
  {
    title: "Αναλυτική Βαθμολογία",
    desc: "Πιστοποιητικό αναλυτικής βαθμολογίας.",
    icon: BookOpen,
  },
  {
    title: "Λοιποί Τίτλοι Σπουδών",
    desc: "Αντίγραφα επιπλέον τίτλων σπουδών.",
    icon: Award,
    optional: true,
  },
  {
    title: "Βιογραφικό Σημείωμα",
    desc: "Σύντομο βιογραφικό σημείωμα (και σε CD)",
    icon: User,
  },
  {
    title: "Πιστοποιητικά Γλωσσών",
    desc: "Πιστοποιητικά τεκμηρίωσης καλής γνώσης της Αγγλικής γλώσσας ή /και άλλων ξένων γλωσσών (και για τους αλλοδαπούς επάρκεια γνώσης της Ελληνικής γλώσσας)",
    icon: Languages,
  },
  {
    title: "Επιστημονικές Δημοσιεύσεις",
    desc: "Επιστημονικές δημοσιεύσεις ή διακρίσεις.",
    icon: FileText,
    optional: true,
  },
  {
    title: "Επαγγελματική Εμπειρία",
    desc: "Αποδεικτικά επαγγελματικής ή/και ερευνητικής εμπειρίας.",
    icon: Briefcase,
    optional: true,
  },
  {
    title: "Αστυνομική Ταυτότητα",
    desc: "Φωτοαντίγραφο αστυνομικού δελτίου ταυτότητας ή διαβατηρίου",
    icon: ShieldCheck,
  },
  {
    title: "Συστατικές Επιστολές",
    desc: "Δύο (2) συστατικές επιστολές σε φάκελο σφραγισμένο και υπογεγραμμένο από τον συντάκτη της επιστολής. Οι συστατικές επιστολές μπορεί να προέρχονται είτε από τον ακαδημαϊκό χώρο, είτε από τον επαγγελματικό χώρο.",
    icon: Mail,
  }
];

export default function EggrafesPage() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <main className="min-h-screen flex flex-col pt-24">
      
      {/* HEADER SECTION */}
      <section className="py-16 lg:py-24">
        <div className="section-container px-4 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-4 block" suppressHydrationWarning>Κύκλος Σπουδών {currentYear}-{nextYear}</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text-primary mb-6">
              Εγγραφές & Αιτήσεις
            </h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Ενημερωθείτε για τις σημαντικές ημερομηνίες, κατεβάστε την αίτηση και συγκεντρώστε τα απαραίτητα δικαιολογητικά για το ΠΜΣ Κοσμητολογία.
            </p>
          </motion.div>
        </div>
      </section>

      {/* DATES & DOWNLOAD INFO (SIDE BY SIDE) */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="section-container px-4 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* DATES CARD */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="bg-white rounded-3xl p-8 md:p-10 border border-border-soft shadow-lg shadow-black/5 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <CalendarDays size={28} />
                </div>
                <h2 className="font-heading font-bold text-2xl text-text-primary leading-tight">
                  Ημερομηνίες Αιτήσεων
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border-soft pb-6">
                  <p className="text-text-secondary text-lg font-medium">Έναρξη</p>
                  <p className="text-text-primary font-bold text-xl bg-surface px-4 py-1.5 rounded-full border border-border-soft" suppressHydrationWarning>10/06/{currentYear}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-text-secondary text-lg font-medium">Λήξη</p>
                  <p className="text-text-primary font-bold text-xl bg-surface px-4 py-1.5 rounded-full border border-border-soft" suppressHydrationWarning>10/07/{currentYear}</p>
                </div>
              </div>
            </motion.div>

            {/* DOWNLOAD CARD */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-gradient-to-br from-primary to-[#7a8f3c] rounded-3xl p-8 md:p-10 shadow-lg shadow-primary/20 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 text-center md:text-left flex flex-col h-full justify-between">
                <div>
                  <h2 className="font-heading font-bold text-3xl mb-4">
                    Έντυπο Αίτησης
                  </h2>
                  <p className="text-white/90 mb-8 max-w-sm mx-auto md:mx-0 text-lg leading-relaxed">
                    Κατεβάστε το αρχείο της αίτησης (Word), συμπληρώστε το και επισυνάψτε το στα δικαιολογητικά σας.
                  </p>
                </div>
                <a 
                  href="/aitisi.docx" 
                  download="aitisi.docx"
                  className="inline-flex items-center justify-center md:justify-start gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-surface transition-colors shadow-lg self-start w-full md:w-auto text-lg"
                >
                  <Download size={22} />
                  Λήψη .docx
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DOCUMENTS LIST */}
      <section className="py-16 relative z-10">
        <div className="section-container px-4 max-w-4xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Διαδικασία Υποβολής Αιτήσεων
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto md:mx-0 mb-6 rounded-full"></div>
            <p className="text-text-secondary text-lg">
              Η διαδικασία της αίτησης γίνεται με την κατάθεση από μέρους των ενδιαφερομένων των κάτωθι δικαιολογητικών:
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-border-soft overflow-hidden shadow-lg shadow-black/5">
            {DOCUMENTS.map((doc, idx) => {
              const Icon = doc.icon;
              return (
                <div key={idx} className="group border-b border-border-soft last:border-0 p-6 sm:p-8 flex items-start gap-6 hover:bg-primary/5 transition-colors">
                  <div className="w-12 h-12 bg-surface border border-border-soft text-text-secondary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary text-lg mb-2 group-hover:text-primary transition-colors flex items-center flex-wrap gap-2">
                      {doc.title}
                      {doc.optional && (
                        <span className="text-xs font-bold bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Προαιρετικο
                        </span>
                      )}
                    </h3>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUBMISSION INFO */}
      <section className="py-24 relative z-10">
        <div className="section-container px-4 max-w-4xl mx-auto text-center">
          
          <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
            <Mail size={36} />
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-8">
            Επικοινωνία & Αποστολή
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-3xl mx-auto leading-relaxed">
            Δίνεται η δυνατότητα στους ενδιαφερόμενους να στείλουν σε ηλεκτρονική μορφή μέσω email την αίτηση και τα απαραίτητα δικαιολογητικά, με την απαίτηση να τα προσκομίσουν σε έντυπη μορφή μετά την αποδοχή τους και σε κάθε περίπτωση πριν την ολοκλήρωση της εγγραφής τους στο ΠΜΣ.
          </p>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 text-left">
            <div className="bg-surface p-8 md:p-10 rounded-3xl border border-border-soft flex-1 flex flex-col">
              <h3 className="font-bold text-xl text-text-primary mb-4 flex items-center gap-3">
                <MapPin className="text-primary" size={24} /> 
                Διεύθυνση Γραμματείας
              </h3>
              <address className="not-italic text-text-secondary leading-relaxed font-medium mt-auto">
                ΔΙ.ΠΑ.Ε Σίνδος<br/>
                Κτήριο Σχολής Επιστημών Υγείας, Ισόγειο<br/>
                Τηλ. 2310 013444
              </address>
            </div>

            <div className="bg-surface p-8 md:p-10 rounded-3xl border border-border-soft flex-1 flex flex-col">
              <h3 className="font-bold text-xl text-text-primary mb-4 flex items-center gap-3">
                <Mail className="text-primary" size={24} />
                Αποστολή Email
              </h3>
              <p className="text-text-secondary mb-6 font-medium">
                Για αποστολή δικαιολογητικών ή πληροφορίες:
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <a href="mailto:pms.cosm@nutr.ihu.gr" className="text-primary font-bold text-lg hover:underline inline-flex items-center gap-2">
                  pms.cosm@nutr.ihu.gr
                </a>
                <a href="mailto:pms.cosm@gmail.com" className="text-primary font-bold text-lg hover:underline inline-flex items-center gap-2">
                  pms.cosm@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
