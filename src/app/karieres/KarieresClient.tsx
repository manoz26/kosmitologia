"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Briefcase, 
  TrendingUp, 
  Globe, 
  Microscope, 
  Award, 
  Building2, 
  CheckCircle2, 
  Star, 
  FileText, 
  MessageSquare, 
  Network
} from "lucide-react";
import Link from "next/link";

import { CareersSection } from "@/components/sections/CareersSection";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/utils";

// --- HERO SECTION ---
function CareersHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section 
      ref={ref} 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradients & Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-200/40 to-blue-300/40 blur-[120px]"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-emerald-200/30 to-teal-200/30 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
              Κορυφαιες Προοπτικες
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-heading"
          >
            Χτίστε το Μέλλον σας στην <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-teal-500">
              Κοσμητολογία
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Το ΠΜΣ συνδέει άμεσα την ακαδημαϊκή έρευνα με τη βιομηχανία, δημιουργώντας 
            εξειδικευμένους επιστήμονες έτοιμους να ηγηθούν στο χώρο των καλλυντικών 
            και των δερματολογικών εφαρμογών.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#explore" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full text-lg font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
              Εξερευνήστε Ρόλους
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/epikoinonia" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-slate-800 rounded-full text-lg font-bold shadow-md hover:shadow-lg border border-slate-200 hover:-translate-y-1 transition-all duration-300">
              <MessageSquare className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
              Επικοινωνία
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-transparent" />
      </motion.div>
    </section>
  );
}

// --- ADVANTAGES SECTION ---
function AdvantageCard({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/20 group hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      <div className="relative z-10">
        <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          <Icon className="h-7 w-7" />
        </div>
        <div className="text-xl font-extrabold text-slate-900 font-heading mb-3">
          {title}
        </div>
        <div className="text-slate-600 font-medium leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );
}

function AdvantagesSection() {
  return (
    <section className="py-24 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AdvantageCard icon={TrendingUp} title="Άμεση Σύνδεση" description="Πρακτική προσέγγιση που διευκολύνει την ομαλή μετάβαση στη βιομηχανία." delay={0.1} />
          <AdvantageCard icon={Globe} title="Διεθνείς Προοπτικές" description="Δυνατότητα καριέρας σε πολυεθνικές εταιρείες και ερευνητικά κέντρα του εξωτερικού." delay={0.2} />
          <AdvantageCard icon={Microscope} title="Έρευνα & R&D" description="Συμμετοχή σε καινοτόμα projects ανάπτυξης νέων δερμοκαλλυντικών προϊόντων." delay={0.3} />
          <AdvantageCard icon={Award} title="Υψηλή Εξειδίκευση" description="Ανταγωνιστικό πλεονέκτημα στην αγορά εργασίας μέσω της βαθιάς ακαδημαϊκής γνώσης." delay={0.4} />
        </div>
      </div>
    </section>
  );
}

// --- PIPELINE SECTION ---
function PipelineStep({ number, title, description, isLast = false, delay = 0 }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex items-start gap-8 group">
      {!isLast && (
        <div className="absolute left-7 top-14 bottom-[-3rem] w-[2px] bg-gradient-to-b from-primary/30 to-slate-200" />
      )}
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay }}
        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white border-4 border-slate-100 shadow-md group-hover:border-primary/30 transition-colors duration-300"
      >
        <span className="text-xl font-bold text-primary font-heading">{number}</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
        className="pt-2 pb-12"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-300 font-heading">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed text-lg max-w-2xl">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

function CareerPipeline() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Η Πορεία σας προς την <span className="text-primary">Επιτυχία</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Από την πρώτη μέρα στο ΠΜΣ μέχρι την επαγγελματική σας καταξίωση, 
            η δομή του προγράμματος είναι σχεδιασμένη να σας καθοδηγεί.
          </p>
        </div>

        <div className="max-w-4xl mx-auto pl-4 md:pl-12">
          <PipelineStep 
            number="01" 
            title="Ακαδημαϊκή Θεμελίωση" 
            description="Απόκτηση στέρεων θεωρητικών και πρακτικών γνώσεων στα συστατικά, τη μορφοποίηση και την αξιολόγηση των καλλυντικών."
            delay={0.1}
          />
          <PipelineStep 
            number="02" 
            title="Επιλογή Ειδίκευσης" 
            description="Εστίαση είτε στο Σχεδιασμό και Ανάπτυξη νέων προϊόντων, είτε στις Κλινικές Εφαρμογές της Κοσμητολογίας στη Δερματολογία."
            delay={0.2}
          />
          <PipelineStep 
            number="03" 
            title="Διπλωματική Εργασία & Έρευνα" 
            description="Υλοποίηση πρωτότυπης ερευνητικής εργασίας, συχνά σε συνεργασία με κορυφαίες εταιρείες της βιομηχανίας καλλυντικών."
            delay={0.3}
          />
          <PipelineStep 
            number="04" 
            title="Ένταξη στην Αγορά" 
            description="Αξιοποίηση του δικτύου αποφοίτων και συνεργατών του προγράμματος για άμεση απορρόφηση σε θέσεις ευθύνης."
            isLast={true}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

// --- SUPPORT SECTION ---
function SupportCard({ icon: Icon, title, description, items }: any) {
  return (
    <div className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="relative z-10">
        <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-4">
          {items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CareerSupport() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
            Υποστηριξη & Διασυνδεση
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Είμαστε δίπλα σας σε κάθε βήμα
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Το πρόγραμμά μας δεν προσφέρει μόνο γνώση. Προσφέρει ένα ισχυρό δίκτυο 
            και τα εργαλεία για να ξεχωρίσετε στο επαγγελματικό σας ξεκίνημα.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SupportCard 
            icon={FileText}
            title="Προετοιμασία CV & Portfolio"
            description="Εξειδικευμένα σεμινάρια για τη δημιουργία ενός ανταγωνιστικού βιογραφικού που αναδεικνύει τις εργαστηριακές σας δεξιότητες."
            items={[
              "Review Βιογραφικού",
              "Καθοδήγηση Portfolio",
              "Συμβουλευτική Συνέντευξης"
            ]}
          />
          <SupportCard 
            icon={Network}
            title="Δίκτυο Συνεργατών"
            description="Άμεση επαφή με κορυφαίες εταιρείες καλλυντικών, ερευνητικά κέντρα και κλινικές κατά τη διάρκεια των σπουδών."
            items={[
              "Ημέρες Καριέρας",
              "Guest Lectures Εταιρειών",
              "Ευκαιρίες Πρακτικής"
            ]}
          />
          <SupportCard 
            icon={MessageSquare}
            title="Alumni Mentoring"
            description="Σύνδεση με παλαιότερους αποφοίτους που ήδη διαπρέπουν στο χώρο για mentoring και καθοδήγηση στα πρώτα σας βήματα."
            items={[
              "Δίκτυο Αποφοίτων",
              "One-on-One Mentoring",
              "Κοινότητα Αλληλοϋποστήριξης"
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// --- MARQUEE SECTION ---
function MarqueeItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-8 py-4 mx-4 bg-white rounded-full shadow-sm border border-slate-100 whitespace-nowrap">
      <Star className="h-4 w-4 text-primary" />
      <span className="text-lg font-bold text-slate-800">{children}</span>
    </div>
  );
}

function IndustryMarquee() {
  const items = [
    "Βιομηχανίες Καλλυντικών", "Ερευνητικά Κέντρα (R&D)", "Δερματολογικές Κλινικές", 
    "Εταιρείες Πρώτων Υλών", "Εργαστήρια Ποιοτικού Ελέγχου", "Φαρμακευτικές Εταιρείες",
    "Εταιρείες Αξιολόγησης Efficacy", "Regulatory Affairs Agencies", "Startups"
  ];

  return (
    <section className="py-20 bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      <div className="text-center mb-12 relative z-10">
        <h3 className="text-xl font-medium text-slate-300 tracking-wide">
          Συνεργαζόμαστε με κορυφαίους κλάδους της αγοράς
        </h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
          {[...items, ...items, ...items].map((item, i) => (
            <MarqueeItem key={i}>{item}</MarqueeItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- GALLERY SECTION ---
function ImageGallery() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Στιγμές από την <span className="text-primary">Πράξη</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Μια ματιά στην καθημερινότητα των φοιτητών μας κατά τη διάρκεια της έρευνας, 
              των εργαστηρίων και των επισκέψεων σε βιομηχανίες.
            </p>
          </div>
          <Link href="/gallery" className="hidden md:inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300">
            Όλη η Συλλογή <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          <div className="md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden group relative shadow-lg">
            <PlaceholderImage type="lab" label="Έρευνα στο Εργαστήριο" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" aspectRatio="square" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2">Σύνθεση Νέων Φορμουλών</h3>
                <p className="text-white/80 font-medium">Εργαστήρια Ανάπτυξης Προϊόντων</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-[2rem] overflow-hidden group relative shadow-lg">
            <PlaceholderImage type="careers" label="Επίσκεψη σε Βιομηχανία" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" aspectRatio="square" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-lg flex items-center gap-2"><Globe className="h-5 w-5"/> Βιομηχανία</span>
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden group relative shadow-lg">
            <PlaceholderImage type="equipment" label="Ποιοτικός Έλεγχος" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" aspectRatio="square" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-lg flex items-center gap-2"><Microscope className="h-5 w-5"/> Έλεγχος Ποιότητας</span>
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden group relative shadow-lg">
            <PlaceholderImage type="students" label="Παρουσίαση Εργασίας" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" aspectRatio="square" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-lg flex items-center gap-2"><Award className="h-5 w-5"/> Διακρίσεις</span>
            </div>
          </div>

          <div className="md:col-span-2 rounded-[2rem] overflow-hidden group relative shadow-lg">
             <PlaceholderImage type="careers" label="Συνεργασία & Ομαδικότητα" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" aspectRatio="wide" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2">Κλινικές Αξιολογήσεις</h3>
                <p className="text-white/80 font-medium">Δερματολογικές Εφαρμογές</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/gallery" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-800 rounded-full font-bold w-full">
            Όλη η Συλλογή <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- CTA SECTION ---
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-950" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 font-heading">
            Έτοιμοι να ξεκινήσετε την καριέρα σας;
          </h2>
          <p className="text-xl text-indigo-100/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Γίνετε μέλος της επόμενης γενιάς ηγετών στη βιομηχανία της κοσμητολογίας. 
            Οι αιτήσεις για το νέο ακαδημαϊκό έτος έχουν ανοίξει.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/eggrafes" className="px-10 py-5 bg-white text-slate-900 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Διαδικασία Εγγραφής
            </Link>
            <Link href="/programma" className="px-10 py-5 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300">
              Δείτε το Πρόγραμμα
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- PAGE WRAPPER ---
export default function KarieresClient() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Custom Styles for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}} />

      <CareersHero />
      <AdvantagesSection />
      
      {/* The Core Interactive Section without the double title */}
      <div id="explore" className="relative z-20 -mt-10">
        <CareersSection showHeading={false} />
      </div>

      <CareerPipeline />
      <IndustryMarquee />
      <CareerSupport />
      <ImageGallery />
      <CTASection />
    </main>
  );
}
