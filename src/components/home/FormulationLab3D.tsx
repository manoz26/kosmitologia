"use client";

/* ══════════════════════════════════════════════════════════════════════════
   FormulationLab3D — "Φτιάξτε τον δικό σας ορό"
   ──────────────────────────────────────────────────────────────────────────
   A playful, interactive mini-formulator. The visitor picks up to three active
   ingredients from a palette; a live 3D serum orb blends their colours, lists
   the resulting benefits and shows a "potency" read-out. Purely illustrative —
   a hands-on taste of what formulation feels like.
   ══════════════════════════════════════════════════════════════════════════ */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Beaker, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ingredients } from "./lib/data";
import { Icon, Reveal, SectionHeading } from "./lib/primitives";
import { IngredientOrb, OrbitRing } from "./lib/cosmetic3d";

const MAX = 3;

export function FormulationLab3D() {
  const [selected, setSelected] = useState<string[]>(["ha", "niacinamide"]);

  const toggle = (id: string) => {
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= MAX) return cur; // capped
      return [...cur, id];
    });
  };

  const chosen = useMemo(() => ingredients.filter((i) => selected.includes(i.id)), [selected]);

  const orbFrom = chosen[0]?.from ?? "#D6E9C8";
  const orbTo = chosen[chosen.length - 1]?.to ?? "#A5BA5F";
  const potency = Math.round((selected.length / MAX) * 100);
  const potencyLabel =
    selected.length === 0
      ? "Επιλέξτε συστατικά"
      : selected.length === 1
      ? "Απλή φόρμουλα"
      : selected.length === 2
      ? "Ισορροπημένο σύμπλεγμα"
      : "Ισχυρό active complex";

  return (
    <section id="formulate" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Διαδραστικό"
          labelIcon="flask-round"
          title="Φτιάξτε τον"
          highlight="δικό σας ορό"
          description="Διαλέξτε έως τρία δραστικά συστατικά και δείτε ζωντανά πώς συνθέτουν μια φόρμουλα. Έτσι μοιάζει η δουλειά ενός formulator."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* palette */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-text-primary">
                Δραστικά συστατικά{" "}
                <span className="font-normal text-text-secondary">
                  ({selected.length}/{MAX})
                </span>
              </p>
              <button
                onClick={() => setSelected([])}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/55 px-3 py-1.5 text-xs font-bold text-ihu-green-dark transition-colors hover:bg-white/80"
              >
                <RotateCcw size={13} /> Καθαρισμός
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              {ingredients.map((ing) => {
                const isOn = selected.includes(ing.id);
                const disabled = !isOn && selected.length >= MAX;
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggle(ing.id)}
                    disabled={disabled}
                    className={cn(
                      "group relative flex items-center gap-3 overflow-hidden rounded-2xl p-3 text-left transition-all duration-300",
                      isOn ? "glass-lachani-deep ring-2 ring-ihu-green" : "glass-lachani hover:-translate-y-0.5",
                      disabled && "cursor-not-allowed opacity-40",
                    )}
                  >
                    <span className="relative shrink-0">
                      <IngredientOrb size={38} from={ing.from} to={ing.to} float={false} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-text-primary">{ing.name}</span>
                      <span className="block truncate text-[11px] text-text-secondary">{ing.benefit}</span>
                    </span>
                    {isOn && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ihu-green-dark text-white">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* result */}
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-[2rem] glass-lachani-deep p-8 text-center md:p-10">
              <OrbitRing size={300} className="left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 opacity-40" duration={40} />
              <div className="relative mx-auto flex h-44 items-center justify-center">
                <motion.div
                  key={orbFrom + orbTo + selected.length}
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 16 }}
                >
                  <IngredientOrb size={150} from={orbFrom} to={orbTo} />
                </motion.div>
                <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/30 text-white ring-1 ring-white/40 backdrop-blur-md">
                  <Beaker size={22} />
                </span>
              </div>

              <p className="mt-5 font-heading text-lg font-extrabold text-text-primary">{potencyLabel}</p>

              {/* potency meter */}
              <div className="mx-auto mt-3 h-2.5 max-w-xs overflow-hidden rounded-full bg-ihu-green-dark/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-ihu-green-light to-ihu-green-dark"
                  animate={{ width: `${potency}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>

              {/* chosen benefits */}
              <div className="mt-6 min-h-[4.5rem]">
                <AnimatePresence mode="popLayout">
                  {chosen.length === 0 ? (
                    <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-text-secondary">
                      Διαλέξτε συστατικά για να ξεκινήσετε.
                    </motion.p>
                  ) : (
                    <motion.ul key={chosen.map((c) => c.id).join("-")} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-wrap justify-center gap-2">
                      {chosen.map((c) => (
                        <li key={c.id} className="inline-flex items-center gap-1.5 rounded-full bg-white/55 px-3 py-1.5 text-xs font-semibold text-ihu-green-dark ring-1 ring-ihu-green-dark/10">
                          <Icon name={c.icon} size={13} /> {c.benefit}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default FormulationLab3D;
