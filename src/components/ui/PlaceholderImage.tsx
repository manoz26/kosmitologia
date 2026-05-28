import { cn } from "@/lib/utils";
import { 
  Beaker, 
  BookOpen, 
  GraduationCap, 
  Microscope, 
  Users, 
  Building2, 
  Laptop, 
  Briefcase 
} from "lucide-react";

type PlaceholderType = 
  | "lab" 
  | "classroom" 
  | "students" 
  | "professor" 
  | "equipment" 
  | "campus" 
  | "careers"
  | "generic";

interface PlaceholderImageProps {
  type?: PlaceholderType;
  label?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
}

const typeConfig = {
  lab: { icon: Microscope, defaultLabel: "Φωτογραφία: Εργαστήριο", color: "from-blue-500/10 to-indigo-500/10 text-blue-600" },
  classroom: { icon: BookOpen, defaultLabel: "Φωτογραφία: Αίθουσα Διδασκαλίας / Αμφιθέατρο", color: "from-emerald-500/10 to-teal-500/10 text-emerald-600" },
  students: { icon: Users, defaultLabel: "Φωτογραφία: Φοιτητές σε Πείραμα/Μάθημα", color: "from-amber-500/10 to-orange-500/10 text-amber-600" },
  professor: { icon: GraduationCap, defaultLabel: "Φωτογραφία: Καθηγητής/Διδάσκων", color: "from-purple-500/10 to-fuchsia-500/10 text-purple-600" },
  equipment: { icon: Beaker, defaultLabel: "Φωτογραφία: Εργαστηριακός Εξοπλισμός/Όργανα", color: "from-cyan-500/10 to-sky-500/10 text-cyan-600" },
  campus: { icon: Building2, defaultLabel: "Φωτογραφία: Εγκαταστάσεις/Κτίριο", color: "from-slate-500/10 to-gray-500/10 text-slate-600" },
  careers: { icon: Briefcase, defaultLabel: "Φωτογραφία: Επαγγελματική Αποκατάσταση", color: "from-rose-500/10 to-pink-500/10 text-rose-600" },
  generic: { icon: Laptop, defaultLabel: "Φωτογραφία (Placeholder)", color: "from-zinc-500/10 to-neutral-500/10 text-zinc-600" },
};

const aspectRatios = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function PlaceholderImage({ 
  type = "generic", 
  label, 
  className,
  aspectRatio = "video"
}: PlaceholderImageProps) {
  const config = typeConfig[type] || typeConfig.generic;
  const Icon = config.icon;
  const displayLabel = label || config.defaultLabel;

  return (
    <div 
      className={cn(
        "w-full flex flex-col items-center justify-center rounded-xl overflow-hidden border border-dashed border-zinc-200 dark:border-zinc-800 bg-gradient-to-br transition-colors",
        config.color,
        aspectRatios[aspectRatio],
        className
      )}
    >
      <Icon className="w-12 h-12 mb-4 opacity-75" strokeWidth={1.5} />
      <span className="text-sm font-medium tracking-wide opacity-90 px-6 text-center">
        {displayLabel}
      </span>
    </div>
  );
}
