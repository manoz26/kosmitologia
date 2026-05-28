import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border-soft pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 blob-blue opacity-50 pointer-events-none rounded-full blur-3xl"></div>
      
      <div className="section-container px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-2">
          <div className="relative w-56 h-14 mb-6">
            <Image 
              src="/logo.png" 
              alt="ΔΙΠΑΕ Κοσμητολογία" 
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-text-secondary text-sm max-w-sm">
            Πρόγραμμα Μεταπτυχιακών Σπουδών «Κοσμητολογία» του Τμήματος Επιστημών Διατροφής και Διαιτολογίας. Υψηλού επιπέδου κατάρτιση στην επιστήμη της κοσμητολογίας.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-text-primary mb-6 text-lg">Επικοινωνία</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-text-secondary text-sm">
              <MapPin className="text-secondary shrink-0 mt-0.5" size={18} />
              <span>Διεθνές Πανεπιστήμιο της Ελλάδος<br />Αλεξάνδρεια Πανεπιστημιούπολη<br />Τ.Θ. 141, 57400, Σίνδος, Θεσσαλονίκη</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary text-sm">
              <Phone className="text-secondary shrink-0" size={18} />
              <span>2310 013444</span>
            </li>
            <li className="flex items-center gap-3 text-text-secondary text-sm">
              <Mail className="text-secondary shrink-0" size={18} />
              <a href="mailto:pms.cosm@nutr.ihu.gr" className="hover:text-primary transition-colors">
                pms.cosm@nutr.ihu.gr
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-text-primary mb-6 text-lg">Γρήγοροι Σύνδεσμοι</h3>
          <ul className="space-y-3">
            <li><Link href="/" className="text-text-secondary text-sm hover:text-primary transition-colors">Αρχική</Link></li>
            <li><Link href="/sxetika" className="text-text-secondary text-sm hover:text-primary transition-colors">Σχετικά με το ΠΜΣ</Link></li>
            <li><Link href="/programma" className="text-text-secondary text-sm hover:text-primary transition-colors">Πρόγραμμα Σπουδών</Link></li>
            <li><Link href="/eisagogi" className="text-text-secondary text-sm hover:text-primary transition-colors">Εισαγωγή</Link></li>
            <li><Link href="/karieres" className="text-text-secondary text-sm hover:text-primary transition-colors">Καριέρες & Απόφοιτοι</Link></li>
            <li><Link href="/faq" className="text-text-secondary text-sm hover:text-primary transition-colors">Συχνές Ερωτήσεις</Link></li>
          </ul>
        </div>
      </div>

      <div className="section-container px-4 mt-16 pt-8 border-t border-border-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} ΠΜΣ Κοσμητολογία, ΔΙΠΑΕ. Με την επιφύλαξη παντός δικαιώματος.
        </p>
      </div>
    </footer>
  );
}
