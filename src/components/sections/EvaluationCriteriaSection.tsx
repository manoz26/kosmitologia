"use client";

import { motion } from "framer-motion";
import { 
  Award, 
  Users, 
  BookMarked, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Microscope, 
  Briefcase, 
  Languages 
} from "lucide-react";

export function EvaluationCriteriaSection() {
  return (
    <section className="py-16 relative z-10 bg-surface/50 border-y border-border-soft">
      <div className="section-container px-4 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* EXCLUSIVITY BANNER */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 border border-border-soft shadow-lg shadow-black/5 relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Award size={120} />
              </div>
              
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              
              <h2 className="font-heading font-bold text-3xl text-text-primary mb-4 leading-tight">
                Περιορισμένος Αριθμός Εισακτέων
              </h2>
              
              <div className="mb-6 flex items-baseline gap-2 text-primary">
                <span className="text-5xl font-extrabold tracking-tighter">40</span>
                <span className="text-lg font-bold uppercase tracking-wider">Φοιτητες</span>
              </div>
              
              <p className="text-text-secondary text-lg leading-relaxed">
                Το ΠΜΣ «Κοσμητολογία» είναι ένα <strong>ολιγομελές και εξειδικευμένο</strong> πρόγραμμα, το οποίο δέχεται αυστηρά έως <strong>σαράντα (40) φοιτητές</strong> ανά κύκλο σπουδών, εξασφαλίζοντας υψηλό επίπεδο εκπαίδευσης, προσωπική καθοδήγηση και αποτελεσματική εργαστηριακή άσκηση.
              </p>
            </motion.div>
          </div>

          {/* EVALUATION CRITERIA */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="font-heading font-bold text-3xl text-text-primary mb-3">
                  Κριτήρια Αξιολόγησης
                </h2>
                <p className="text-text-secondary text-lg">
                  Η επιλογή των υποψηφίων γίνεται μέσω ειδικού αλγορίθμου μοριοδότησης που λαμβάνει υπόψη τα παρακάτω προσόντα:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Συνάφεια Πτυχίου", desc: "Με την επιστημονική περιοχή του ΠΜΣ", icon: BookMarked },
                  { title: "Βαθμός Πτυχίου", desc: "Γενικός βαθμός του βασικού πτυχίου", icon: GraduationCap },
                  { title: "Συναφή Μαθήματα", desc: "Βαθμολογία σε προπτυχιακά μαθήματα", icon: BookOpen },
                  { title: "Διπλωματική", desc: "Επίδοση στην πτυχιακή εργασία", icon: FileText },
                  { title: "Ερευνητικό Έργο", desc: "Συναφής ερευνητική δραστηριότητα", icon: Microscope },
                  { title: "Εμπειρία", desc: "Επαγγελματική δραστηριότητα στο χώρο", icon: Briefcase },
                  { title: "Ξένες Γλώσσες", desc: "Γνώση επιπλέον γλωσσών (πλην Αγγλικών)", icon: Languages },
                  { title: "Συνέντευξη", desc: "Προσωπική αξιολόγηση ικανοτήτων", icon: Users }
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-border-soft rounded-2xl p-4 flex gap-4 hover:border-primary/30 transition-colors shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm mb-0.5">{item.title}</h4>
                      <p className="text-text-secondary text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
