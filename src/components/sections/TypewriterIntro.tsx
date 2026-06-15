import { Typewriter } from "@/components/ui/typewriter";

export function TypewriterIntro() {
  return (
    <section className="relative overflow-hidden bg-ihu-blue py-24 md:py-32">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-ihu-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-ihu-blue-light/30 blur-3xl" />

      <div className="section-container px-4 relative z-10 text-center">
        <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-ihu-green-light mb-6">
          ΠΜΣ Κοσμητολογία · ΔΙΠΑΕ
        </span>

        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
          <span className="block mb-2">Σπουδάζουμε την επιστήμη του</span>
          <Typewriter
            text={[
              "καλλυντικού.",
              "δέρματος.",
              "φυσικού συστατικού.",
              "ποιοτικού ελέγχου.",
              "ωραίου που έχει βάση.",
            ]}
            speed={70}
            className="text-gradient-green"
            waitTime={1800}
            deleteSpeed={40}
            cursorChar={"_"}
            cursorClassName="ml-1 text-ihu-green-light"
          />
        </h2>

        <p className="mt-8 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Από τη σύνθεση και τα δραστικά συστατικά μέχρι την κλινική αξιολόγηση —
          εκπαιδεύουμε τους επιστήμονες που θα ηγηθούν στον κλάδο της Κοσμητολογίας.
        </p>
      </div>
    </section>
  );
}
