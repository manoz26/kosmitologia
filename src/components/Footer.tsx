import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { footerGroups, contactInfo } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="relative bg-text-primary text-white overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lavender to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blob-lavender opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blob-mint opacity-10 pointer-events-none" />

      <div className="relative section-container px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 overflow-hidden rounded-xl bg-gradient-to-br from-lavender to-mint p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-text-primary">
                  <Image
                    src="/images/logo.png"
                    alt="ΠΜΣ Κοσμητολογία"
                    width={28}
                    height={28}
                    className="object-contain brightness-200"
                  />
                </div>
              </div>
              <div>
                <div className="font-heading text-lg font-bold">Κοσμητολογία</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">
                  Μεταπτυχιακό Πρόγραμμα
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Πρόγραμμα Μεταπτυχιακών Σπουδών «Κοσμητολογία» του Τμήματος
              Επιστημών Διατροφής & Διαιτολογίας, Σχολή Επιστημών Υγείας,
              Διεθνές Πανεπιστήμιο της Ελλάδος.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-white/60 hover:text-lavender-light transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:+30${contactInfo.phone1.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-white/60 hover:text-lavender-light transition-colors"
              >
                <Phone className="h-4 w-4" />
                {contactInfo.phone1}
              </a>
              <span className="flex items-center gap-2 text-white/60">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">{contactInfo.campus}, {contactInfo.postalCode}</span>
              </span>
            </div>
          </div>

          {/* Link Groups */}
          {footerGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">
                {group.label}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      {...(item.isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-center gap-1.5 text-sm text-white/50 hover:text-lavender-light transition-colors"
                    >
                      {item.label}
                      {item.isExternal && (
                        <ExternalLink className="h-3 w-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ΠΜΣ Κοσμητολογία — Διεθνές
            Πανεπιστήμιο της Ελλάδος. Με επιφύλαξη παντός δικαιώματος.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <span>Σχεδιασμός &</span>
            <span>Ανάπτυξη</span>
            <span className="text-lavender-light font-medium ml-1">
              με ❤️
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
