"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ChevronDown, 
  User,
  Building,
  AtSign,
  Info,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data ---

const INFO_CARDS = [
  {
    id: "address",
    title: "Διεύθυνση",
    icon: MapPin,
    details: [
      "Διεθνές Πανεπιστήμιο της Ελλάδος (ΔΙ.ΠΑ.Ε.)",
      "Κτήριο Διατροφής, 1ος Όροφος",
      "ΤΘ 141, Σίνδος, 57400, Θεσσαλονίκη"
    ],
    color: "lavender"
  },
  {
    id: "phone",
    title: "Τηλέφωνα",
    icon: Phone,
    details: [
      "+30 2310 013444 (Γραμματεία)",
      "+30 2310 791176 (Fax)"
    ],
    color: "mint"
  },
  {
    id: "email",
    title: "Email",
    icon: Mail,
    details: [
      "pms.cosm@nutr.ihu.gr"
    ],
    color: "peach"
  },
  {
    id: "hours",
    title: "Ωράριο Λειτουργίας",
    icon: Clock,
    details: [
      "Δευτέρα - Παρασκευή",
      "09:00 - 15:00"
    ],
    color: "lavender"
  }
];

const FAQS = [
  {
    question: "Πού ακριβώς βρίσκεται η Γραμματεία του ΠΜΣ;",
    answer: "Η γραμματεία βρίσκεται στο κτήριο Διατροφής (1ος Όροφος) στο campus του ΔΙ.ΠΑ.Ε. στη Σίνδο Θεσσαλονίκης."
  },
  {
    question: "Ποιες είναι οι ώρες κοινού;",
    answer: "Η γραμματεία εξυπηρετεί το κοινό καθημερινά από Δευτέρα έως Παρασκευή, από τις 09:00 έως τις 15:00."
  },
  {
    question: "Πόσος χρόνος χρειάζεται για να λάβω απάντηση στο email μου;",
    answer: "Καταβάλλουμε κάθε δυνατή προσπάθεια να απαντάμε σε όλα τα emails εντός 1-2 εργάσιμων ημερών."
  },
  {
    question: "Μπορώ να στείλω έγγραφα μέσω Fax;",
    answer: "Ναι, μπορείτε να αποστείλετε τα έγγραφά σας στο Fax της Γραμματείας: 2310 791176. Παρακαλούμε να αναγράφετε σαφώς τα στοιχεία αποστολέα."
  }
];

// --- Sharp Animations ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const } // Sharp, snappy ease
  }
};

const abstractShapeVariants = {
  animate: {
    scale: [1, 1.05, 1],
    x: [0, 10, -10, 0],
    transition: {
      duration: 10,
      ease: "linear" as const,
      repeat: Infinity,
    }
  }
};

// --- Sub-components ---

function InfoCard({ card, index }: { card: typeof INFO_CARDS[0], index: number }) {
  const Icon = card.icon;
  
  const colorStyles = {
    lavender: "text-lavender bg-lavender-50 border-lavender/40",
    mint: "text-mint-dark bg-mint-50 border-mint/40",
    peach: "text-peach-foreground bg-peach-50 border-peach/40",
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-md border border-border-soft p-6 relative group transition-colors hover:border-text-primary/20"
      // Sharp corners: removed rounded-3xl, kept default (sharp)
    >
      <div className="absolute top-0 left-0 w-1 h-0 bg-text-primary transition-all duration-300 group-hover:h-full" />
      
      <div className={cn("w-12 h-12 flex items-center justify-center mb-6 border", colorStyles[card.color as keyof typeof colorStyles])}>
        <Icon className="w-5 h-5" />
      </div>
      
      <h3 className="font-heading text-lg font-bold text-text-primary mb-4 uppercase tracking-wider text-sm">
        {card.title}
      </h3>
      
      <div className="space-y-1 relative z-10">
        {card.details.map((detail, i) => (
          <p key={i} className="text-text-secondary text-[14px] leading-relaxed">
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Fake API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md border border-border-soft p-8 lg:p-12 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lavender via-mint to-peach" />
      
      <div className="mb-10">
        <h2 className="font-heading text-3xl font-bold text-text-primary mb-2 uppercase tracking-tight">
          Επικοινωνηστε μαζι μασ
        </h2>
        <p className="text-text-secondary">
          Συμπληρώστε την παρακάτω φόρμα. Όλα τα πεδία είναι υποχρεωτικά.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-start justify-center py-16"
          >
            <div className="w-16 h-16 bg-mint-50 border border-mint flex items-center justify-center mb-6 text-mint-dark">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-2 uppercase tracking-tight">
              Το μηνυμα εσταλη
            </h3>
            <p className="text-text-secondary max-w-md">
              Η επικοινωνία σας καταχωρήθηκε επιτυχώς. Θα επικοινωνήσουμε μαζί σας άμεσα.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="mt-8 px-8 py-3 bg-text-primary text-white font-medium hover:bg-lavender transition-colors flex items-center gap-2 uppercase tracking-wider text-sm"
            >
              Νεο Μηνυμα <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2 group">
                <label className="text-[11px] uppercase tracking-widest font-bold text-text-primary flex items-center gap-2">
                  Ονοματεπωνυμο
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="ΜΑΡΙΑ ΠΑΠΑΔΟΠΟΥΛΟΥ"
                  className="w-full bg-surface border border-border-soft px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-primary transition-colors"
                />
              </div>
              
              {/* Email Input */}
              <div className="space-y-2 group">
                <label className="text-[11px] uppercase tracking-widest font-bold text-text-primary flex items-center gap-2">
                  Email
                </label>
                <input 
                  required
                  type="email" 
                  placeholder="EMAIL@EXAMPLE.COM"
                  className="w-full bg-surface border border-border-soft px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-primary transition-colors"
                />
              </div>
            </div>

            {/* Subject Input */}
            <div className="space-y-2 group">
              <label className="text-[11px] uppercase tracking-widest font-bold text-text-primary flex items-center gap-2">
                Θεμα
              </label>
              <input 
                required
                type="text" 
                placeholder="ΛΟΓΟΣ ΕΠΙΚΟΙΝΩΝΙΑΣ"
                className="w-full bg-surface border border-border-soft px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-primary transition-colors"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2 group">
              <label className="text-[11px] uppercase tracking-widest font-bold text-text-primary flex items-center gap-2">
                Μηνυμα
              </label>
              <textarea 
                required
                rows={5}
                placeholder="ΤΟ ΜΗΝΥΜΑ ΣΑΣ..."
                className="w-full bg-surface border border-border-soft px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-primary transition-colors resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group bg-text-primary text-white py-4 px-8 font-medium transition-all hover:bg-lavender disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 w-full md:w-auto uppercase tracking-wider text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Αποστολη...</span>
                </>
              ) : (
                <>
                  <span>Αποστολη Μηνυματος</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQItem({ faq, isOpen, onClick }: { faq: typeof FAQS[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-border-soft bg-white/40 transition-colors hover:bg-white/80">
      <button 
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-medium text-text-primary pr-8">{faq.question}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-border-soft text-text-primary"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-border-soft pt-4 text-sm">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div variants={itemVariants} className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-2 uppercase tracking-tight">
          Συχνες Ερωτησεις
        </h2>
        <div className="h-[2px] w-12 bg-text-primary mb-4" />
      </div>

      <div className="space-y-0 border-t border-border-soft">
        {FAQS.map((faq, index) => (
          <div key={index} className="border-b border-border-soft">
            <FAQItem 
              faq={faq} 
              isOpen={openIndex === index} 
              onClick={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AbstractMapVisual() {
  return (
    <motion.div variants={itemVariants} className="w-full h-full min-h-[400px] bg-text-primary p-8 relative overflow-hidden flex flex-col justify-between border border-border-soft">
      {/* Geometric abstract map background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Sharp moving abstract blocks */}
      <motion.div 
        variants={abstractShapeVariants}
        animate="animate"
        className="absolute top-20 -right-10 w-48 h-64 bg-lavender/20 border border-lavender/30 mix-blend-screen transform rotate-12"
      />
      <motion.div 
        variants={abstractShapeVariants}
        animate="animate"
        style={{ animationDelay: '-5s' }}
        className="absolute bottom-10 -left-10 w-64 h-32 bg-mint/20 border border-mint/30 mix-blend-screen transform -rotate-6"
      />

      <div className="relative z-10 flex items-start gap-4">
        <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
          <Building className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-white uppercase tracking-wider text-sm mb-1">Campus ΔΙ.ΠΑ.Ε.</h3>
          <p className="text-xs text-white/70 tracking-widest uppercase">Σινδος, Θεσσαλονικη</p>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-md">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Πλοηγηση</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Το Κτήριο Διατροφής βρίσκεται στο βορειοδυτικό τμήμα της πανεπιστημιούπολης. Η πρόσβαση γίνεται εύκολα μέσω της κεντρικής πύλης.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Export ---

export default function ContactContent() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-16 lg:space-y-24 pb-12"
    >
      {/* Top Grid: Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {INFO_CARDS.map((card, index) => (
          <InfoCard key={card.id} card={card} index={index} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Form taking 7 columns on large screens */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        
        {/* Visual Map taking 5 columns on large screens */}
        <div className="lg:col-span-5">
          <AbstractMapVisual />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="font-heading text-4xl font-bold text-text-primary uppercase tracking-tighter leading-none mb-4">
            ΕΧΕΤΕ<br/>ΑΠΟΡΙΕΣ;
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Βρείτε γρήγορα απαντήσεις σε κοινά ερωτήματα σχετικά με τη γραμματεία και την επικοινωνία. Αν δεν βρείτε αυτό που ψάχνετε, χρησιμοποιήστε τη φόρμα επικοινωνίας.
          </p>
        </div>
        <div className="lg:col-span-8">
          <FAQSection />
        </div>
      </div>
    </motion.div>
  );
}
