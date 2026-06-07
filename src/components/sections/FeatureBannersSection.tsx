import Image from "next/image";
import Link from "next/link";

export function FeatureBannersSection() {
  return (
    <section className="w-full border-y-[6px] border-foreground overflow-hidden flex flex-col lg:flex-row">
      {/* Left Block - Lab */}
      <div className="w-full lg:w-1/2 flex flex-col md:flex-row border-b-[6px] lg:border-b-0 lg:border-r-[6px] border-foreground">
        {/* Image Half */}
        <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-[450px]">
          <Image
            src="/images/lab.png"
            alt="Εργαστήρια Κοσμητολογίας"
            fill
            className="object-cover"
          />
        </div>
        {/* Content Half */}
        <div className="w-full md:w-1/2 bg-[#4863A0] p-12 lg:p-16 flex flex-col justify-center text-white">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase mb-6 leading-tight">
            ΣΥΓΧΡΟΝΑ &<br />
            ΠΛΗΡΩΣ ΕΞΟΠΛΙΣΜΕΝΑ ΕΡΓΑΣΤΗΡΙΑ
          </h2>
          <p className="text-base text-white/95 mb-10 leading-relaxed max-w-md">
            Προετοιμάζουμε στοχευμένα τους φοιτητές μας για τις απαιτητικές
            συνθήκες της βιομηχανίας καλλυντικών, με πρακτική άσκηση σε
            τελευταίας τεχνολογίας εξοπλισμό.
          </p>
          <div>
            <Link
              href="/ergastiria"
              className="inline-block border-2 border-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-primary transition-colors"
            >
              ΕΓΚΑΤΑΣΤΑΣΕΙΣ
            </Link>
          </div>
        </div>
      </div>

      {/* Right Block - Careers */}
      <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row">
        {/* Content Half */}
        <div className="w-full md:w-1/2 bg-[#64748B] p-12 lg:p-16 flex flex-col justify-center text-white">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase mb-6 leading-tight">
            ΕΠΑΓΓΕΛΜΑΤΙΚΗ<br />
            ΠΡΟΟΠΤΙΚΗ
          </h2>
          <p className="text-base text-white/95 mb-10 leading-relaxed max-w-md">
            Χτίζουμε το μέλλον σου μαζί. Μέσα από εξειδικευμένη γνώση,
            από τη σύλληψη της ιδέας ενός καλλυντικού μέχρι την κλινική του
            αξιολόγηση, χαρτογραφούμε τις επαγγελματικές σου κλίσεις.
          </p>
          <div>
            <Link
              href="/karieres"
              className="inline-block bg-secondary border-2 border-secondary px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-transparent hover:text-secondary transition-colors"
            >
              ΜΑΘΕ ΠΕΡΙΣΣΟΤΕΡΑ
            </Link>
          </div>
        </div>
        {/* Image Half */}
        <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-[450px]">
          <Image
            src="/images/hero-bg.png"
            alt="Επαγγελματική Προοπτική"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
