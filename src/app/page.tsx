import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, GraduationCap, Microscope, Building, Calendar, ArrowUpRight } from "lucide-react";

import ScrollCanvasHero from "@/components/sections/ScrollCanvasHero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollCanvasHero frameCount={50} />

      <div className="bg-gradient-to-b from-[#A5BA5F] to-[#F4F7ED]">
        {/* About Institution & Department */}
        <section className="py-20 relative">
        <div className="section-container px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">Το Τμήμα και το Ίδρυμα</h2>
              <div className="w-20 h-1.5 bg-secondary mb-8 rounded-full"></div>
              
              <p className="text-text-secondary leading-relaxed mb-6 text-lg">
                Το Τμήμα Επιστημών Διατροφής και Διαιτολογίας του ΔΙΠΑΕ λειτουργεί στις εγκαταστάσεις της Αλεξάνδρειας Πανεπιστημιούπολης στη Σίνδο, Θεσσαλονίκης.
              </p>
              
              <p className="text-text-secondary leading-relaxed mb-8">
                Με υπερσύγχρονες ιδιόκτητες εγκαταστάσεις που απλώνονται σε 1.600 στρέμματα, το τμήμα παρέχει το ιδανικό περιβάλλον για την ακαδημαϊκή και ερευνητική ανάπτυξη των φοιτητών. Σκοπός του προγράμματος είναι η άρτια εκπαίδευση επιστημόνων που θα ηγηθούν στον ραγδαία αναπτυσσόμενο κλάδο της Κοσμητολογίας.
              </p>

              <Link href="/sxetika" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Περισσότερα σχετικά με το ΠΜΣ <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4"><Building size={24}/></div>
                  <h4 className="font-bold text-xl text-text-primary">ΔΙΠΑΕ</h4>
                  <p className="text-sm text-text-secondary mt-2">Αλεξάνδρεια Πανεπιστημιούπολη, Σίνδος</p>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center bg-secondary/5 border-secondary/20">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4"><Calendar size={24}/></div>
                  <h4 className="font-bold text-xl text-text-primary">3 Εξάμηνα</h4>
                  <p className="text-sm text-text-secondary mt-2">Ελάχιστη Διάρκεια Σπουδών (90 ECTS)</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center bg-primary/5 border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4"><Microscope size={24}/></div>
                  <h4 className="font-bold text-xl text-text-primary">Εργαστήρια</h4>
                  <p className="text-sm text-text-secondary mt-2">Σύγχρονος εξοπλισμός έρευνας</p>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4"><GraduationCap size={24}/></div>
                  <h4 className="font-bold text-xl text-text-primary">40 Φοιτητές</h4>
                  <p className="text-sm text-text-secondary mt-2">Αριθμός εισακτέων ανά έτος</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations / Curriculum Overview */}
      <section className="py-24 relative overflow-hidden">
          
          <div className="section-container px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">Οι Κατευθύνσεις Σπουδών</h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                Εξειδικευμένη γνώση προσαρμοσμένη στις σύγχρονες απαιτήσεις της βιομηχανίας.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">
                    Παρασκευή & Αξιολόγηση Καλλυντικών Προϊόντων
                  </h3>
                  <p className="text-text-secondary mb-8 leading-relaxed">
                    Εστίαση στη σύνθεση, τα δραστικά συστατικά, τα καινοτόμα προϊόντα φυσικής προέλευσης και τον αυστηρό ποιοτικό και ενόργανο έλεγχο των καλλυντικών.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-text-secondary"><CheckCircle2 size={16} className="text-primary"/> Συστατικά Καλλυντικών</li>
                    <li className="flex items-center gap-2 text-sm text-text-secondary"><CheckCircle2 size={16} className="text-primary"/> Μέθοδοι Ενόργανης Ανάλυσης</li>
                    <li className="flex items-center gap-2 text-sm text-text-secondary"><CheckCircle2 size={16} className="text-primary"/> Παρασκευή & Νομοθεσία</li>
                  </ul>
                </div>
              </div>

              <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">
                    Εφαρμογές της Κοσμητολογίας στη Δερματολογία
                  </h3>
                  <p className="text-text-secondary mb-8 leading-relaxed">
                    Εμβάθυνση στη φυσιολογία και το μικροβίωμα του δέρματος, τη συνέργεια διατροφής και κοσμητολογίας, και την παθοφυσιολογία της αντιγήρανσης.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-text-secondary"><CheckCircle2 size={16} className="text-primary"/> Στοιχεία Δερματολογίας</li>
                    <li className="flex items-center gap-2 text-sm text-text-secondary"><CheckCircle2 size={16} className="text-primary"/> Παθοφυσιολογία Αντιγήρανσης</li>
                    <li className="flex items-center gap-2 text-sm text-text-secondary"><CheckCircle2 size={16} className="text-primary"/> Συνέργεια Διατροφής</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/programma" className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all">
                Δείτε το αναλυτικό Πρόγραμμα Σπουδών
              </Link>
            </div>
          </div>
        </section>

        {/* Careers / Outcomes */}
        <section className="py-20 relative overflow-hidden">
          <div className="section-container px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-text-primary">Επαγγελματικές Προοπτικές</h2>
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  Το προφίλ των αποφοίτων μας αντιστοιχεί σε αυτό των σύγχρονων και άρτια εκπαιδευμένων στελεχών. Οι απόφοιτοι του ΠΜΣ είναι έτοιμοι να στελεχώσουν επιχειρήσεις του ιδιωτικού και δημόσιου τομέα.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">✓</div>
                    <span className="text-text-primary">Παραγωγή καλλυντικών υψηλής προστιθέμενης αξίας</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">✓</div>
                    <span className="text-text-primary">Προώθηση καλλυντικών στην εσωτερική & διεθνή αγορά</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">✓</div>
                    <span className="text-text-primary">Σχεδιασμός και δημιουργία νέων, καινοτόμων σκευασμάτων</span>
                  </li>
                </ul>
                <Link href="/karieres" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
                  Περισσότερα για την Καριέρα <ArrowRight size={18} />
                </Link>
              </div>
              
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-2xl">
                  <BookOpen size={32} className="text-primary mb-4" />
                  <h4 className="font-bold text-xl mb-2 text-text-primary">Έρευνα & R&D</h4>
                  <p className="text-sm text-text-secondary">Στελέχωση εργαστηρίων έρευνας νέων συστατικών.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl mt-8">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  <h4 className="font-bold text-xl mb-2 text-text-primary">Επιχειρηματικότητα</h4>
                  <p className="text-sm text-text-secondary">Ανάπτυξη δικών σας καινοτόμων brands καλλυντικών.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Placeholder */}
        <section className="py-20">
          <div className="section-container px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">Τελευταία Νέα</h2>
                <p className="text-text-secondary">Ανακοινώσεις και εξελίξεις του ΠΜΣ.</p>
              </div>
              <Link href="/nea" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
                Όλα τα νέα <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, i) => (
                <Link href="/nea" key={i} className="glass-card rounded-2xl overflow-hidden group">
                  <div className="h-48 bg-white/40 w-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      ΑΝΑΚΟΙΝΩΣΗ
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      Πρόσκληση Εκδήλωσης Ενδιαφέροντος Ακαδ. Έτους 2024-2025
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      Το Τμήμα Επιστημών Διατροφής και Διαιτολογίας ανακοινώνει την έναρξη του νέου κύκλου σπουδών...
                    </p>
                    <span className="text-primary font-medium text-sm flex items-center gap-1">
                      Διαβάστε περισσότερα <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link href="/nea" className="inline-flex items-center gap-2 text-primary font-medium">
                Όλα τα νέα <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
