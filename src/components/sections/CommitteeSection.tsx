"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Star, Award, UserCheck, ChevronRight, GraduationCap } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface CommitteeMember {
  name: string;
  role: string;
  title: string;
  email: string;
  institution: string;
  initials: string;
  type: "director" | "deputy" | "member";
}

const committee: CommitteeMember[] = [
  {
    name: "Αθανάσιος Παπαδόπουλος",
    role: "Διευθυντής",
    title: "Καθηγητής",
    email: "papadnas@ihu.gr",
    institution: "ΔιΠΑΕ",
    initials: "ΠΑ",
    type: "director",
  },
  {
    name: "Ιορδάνης Παπαδόπουλος",
    role: "Αν. Διευθυντής",
    title: "Αν. Καθηγητής",
    email: "driordanis@ihu.gr",
    institution: "ΔιΠΑΕ",
    initials: "ΠΙ",
    type: "deputy",
  },
  {
    name: "Άννα Γιαννακουδάκη",
    role: "Μέλος",
    title: "Διδάσκουσα Αισθητικής",
    email: "annagianna@live.com",
    institution: "ΔιΠΑΕ",
    initials: "ΓΑ",
    type: "member",
  },
  {
    name: "Ελισάβετ Βαρδάκα",
    role: "Μέλος",
    title: "Επίκουρη Καθηγήτρια",
    email: "evardaka@ihu.gr",
    institution: "ΔιΠΑΕ",
    initials: "ΒΕ",
    type: "member",
  },
  {
    name: "Μαρία Χασαπίδου",
    role: "Μέλος",
    title: "Καθηγήτρια Διατροφής",
    email: "mnhas@ihu.gr",
    institution: "ΔιΠΑΕ",
    initials: "ΧΜ",
    type: "member",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

export function CommitteeSection() {
  const directors = committee.filter((m) => m.type !== "member");
  const members = committee.filter((m) => m.type === "member");

  return (
    <SectionWrapper variant="muted" divider="bold"
      id="committee"
      title="Διοίκηση Π.Μ.Σ."
      subtitle="Συντονιστική Επιτροπή"
    >
      <motion.div 
        className="flex flex-col gap-10 lg:gap-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Directors Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full relative">
          {/* Decorative background element connecting the directors */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-lavender/0 via-lavender/30 to-mint/0 -translate-y-1/2 z-0" />
          
          {directors.map((member, i) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative z-10 overflow-hidden rounded-[2.5rem] p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] group"
            >
              {/* Animated Background Gradients */}
              <div
                className={`absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full opacity-20 bg-gradient-to-br transition-all duration-700 ease-in-out group-hover:scale-[1.8] group-hover:opacity-30 hidden ${
                  member.type === "director"
                    ? "from-lavender via-fuchsia-300 to-mint"
                    : "from-peach via-rose-300 to-lavender"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full opacity-10 bg-gradient-to-tr transition-all duration-700 ease-in-out group-hover:scale-150 group-hover:opacity-20 hidden ${
                  member.type === "director"
                    ? "from-mint to-blue-300"
                    : "from-lavender to-purple-300"
                }`}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 relative group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                  <div
                    className={`h-28 w-28 rounded-[2rem] rotate-3 group-hover:rotate-6 transition-all duration-500 ease-out shadow-sm flex items-center justify-center text-4xl font-black text-white ${
                      member.type === "director"
                        ? "bg-gradient-to-br from-lavender to-lavender-dark shadow-lavender/30"
                        : "bg-gradient-to-br from-peach to-peach-dark shadow-peach/30"
                    }`}
                  >
                    <div className="-rotate-3 group-hover:-rotate-6 transition-transform duration-500">
                      {member.initials}
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 h-10 w-10 rounded-md bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center text-lavender border-2 border-white dark:border-zinc-800 rotate-12 group-hover:rotate-0 transition-all duration-500">
                    {member.type === "director" ? (
                      <Star className="h-5 w-5 fill-lavender text-lavender drop-shadow-sm" />
                    ) : (
                      <Award className="h-5 w-5 text-peach-dark drop-shadow-sm" />
                    )}
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold tracking-wide uppercase mb-4 shadow-sm border ${
                    member.type === "director"
                      ? "bg-lavender/10 text-lavender-dark dark:text-lavender-light border-lavender/20"
                      : "bg-peach/10 text-peach-dark dark:text-peach-light border-peach/20"
                  }`}
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  {member.role}
                </div>

                <h3 className="text-2xl font-heading font-extrabold text-text-primary mb-1.5 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                  {member.name}
                </h3>
                <p className="text-base font-semibold text-text-secondary mb-1">
                  {member.title}
                </p>
                <p className="text-sm font-medium text-text-muted mb-6 px-4 py-1 rounded-md bg-zinc-100/50 dark:bg-zinc-800/50">
                  {member.institution}
                </p>

                <a
                  href={`mailto:${member.email}`}
                  className="group/btn relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-sm font-semibold text-white dark:text-zinc-900 shadow-md hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-lavender/80 to-mint/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <Mail className="h-4 w-4 relative z-10 group-hover/btn:scale-110 transition-transform" />
                  <span className="relative z-10 group-hover/btn:text-white dark:group-hover/btn:text-white transition-colors">Επικοινωνία</span>
                  <ChevronRight className="h-4 w-4 relative z-10 opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-300 group-hover/btn:text-white dark:group-hover/btn:text-white" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-2 opacity-50">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-300 dark:to-zinc-700" />
          <Star className="h-4 w-4 text-zinc-300 dark:text-zinc-700" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-300 dark:to-zinc-700" />
        </div>

        {/* Members Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="border border-border-soft shadow-sm bg-white rounded-2xl p-6 group transition-all duration-500 hover:shadow-sm hover:shadow-mint/10 border border-zinc-200/60 dark:border-zinc-800/60 relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-mint/0 to-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 relative z-10">
                <div className="h-16 w-16 rounded-[1.25rem] rotate-3 group-hover:-rotate-3 transition-transform duration-500 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 font-bold text-xl shadow-sm shrink-0 group-hover:border-mint/30 group-hover:text-mint-dark dark:group-hover:text-mint-light">
                  <div className="-rotate-3 group-hover:rotate-3 transition-transform duration-500">
                    {member.initials}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-mint-dark dark:text-mint-light mb-2 bg-mint/10 dark:bg-mint/20 px-2.5 py-1 rounded-md">
                    <UserCheck className="h-3.5 w-3.5" />
                    {member.role}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-text-primary mb-1 truncate group-hover:text-mint-dark dark:group-hover:text-mint-light transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-text-secondary mb-1 truncate">
                    {member.title}
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-4 uppercase tracking-wider">
                    {member.institution}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 text-xs font-medium text-text-muted hover:text-mint-dark dark:hover:text-mint-light transition-colors group/link p-2 sm:p-0 rounded-lg sm:rounded-none bg-zinc-50 sm:bg-transparent dark:bg-zinc-900/50 sm:dark:bg-transparent"
                  >
                    <Mail className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
                    <span className="truncate">{member.email}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
