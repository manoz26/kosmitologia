import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "greek"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ΠΜΣ Κοσμητολογία | Διεθνές Πανεπιστήμιο της Ελλάδος",
    template: "%s | ΠΜΣ Κοσμητολογία",
  },
  description:
    "Μεταπτυχιακό Πρόγραμμα Σπουδών στην Κοσμητολογία — MSc in Cosmetology. Σχεδιασμός, ανάπτυξη και αξιολόγηση καινοτόμων καλλυντικών προϊόντων. Τμήμα Επιστημών Διατροφής & Διαιτολογίας, ΔιΠΑΕ.",
  keywords: [
    "κοσμητολογία",
    "μεταπτυχιακό",
    "ΠΜΣ",
    "ΔιΠΑΕ",
    "IHU",
    "καλλυντικά",
    "cosmetology",
    "MSc",
    "Θεσσαλονίκη",
  ],
  authors: [{ name: "ΠΜΣ Κοσμητολογία — ΔιΠΑΕ" }],
  openGraph: {
    title: "ΠΜΣ Κοσμητολογία | Διεθνές Πανεπιστήμιο της Ελλάδος",
    description:
      "Μεταπτυχιακό Πρόγραμμα Σπουδών στην Κοσμητολογία. Σχεδιασμός, ανάπτυξη και αξιολόγηση καινοτόμων καλλυντικών. 90 ECTS, 3 εξάμηνα, €2.400.",
    url: "https://cosm.ihu.gr",
    siteName: "ΠΜΣ Κοσμητολογία",
    locale: "el_GR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased bg-gradient-to-b from-[#E0F2FE] via-[#E8F5E9] to-[#F4F7ED]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
