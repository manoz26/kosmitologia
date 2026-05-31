import Link from "next/link";
import { ArrowRight, FileQuestion } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell title="404 - Σφάλμα" subtitle="Η σελίδα δεν βρέθηκε">
      <div className="section-container px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-8">
          <FileQuestion size={48} />
        </div>
        
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mb-6">
          Ουπς! Η σελίδα χάθηκε...
        </h2>
        
        <p className="text-text-secondary text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Φαίνεται πως η σελίδα που προσπαθείτε να επισκεφθείτε δεν υπάρχει πλέον, 
          έχει μετονομαστεί ή μεταφέρθηκε σε άλλη διεύθυνση.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          Επιστροφή στην Αρχική
          <ArrowRight size={18} />
        </Link>
      </div>
    </PageShell>
  );
}
