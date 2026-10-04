"use client";

/* ══════════════════════════════════════════════════════════════════════════
   GraduateCareers — «Πού εργάζονται οι απόφοιτοι»
   ──────────────────────────────────────────────────────────────────────────
   The employer sectors the department listed (01/10/2026), grouped into the
   five career paths as a bento of tilting cards: one deep-green feature
   (industry) and four light glass tiles. Each tile names the sectors and two
   typical roles, so a prospective student sees at a glance where the degree
   leads. The full career paths live on /programma#karieres.
   Data: src/data/careers.ts (employerGroups) — no named employers until the
   client approves them (docs/email-pros-pelati.md).
   ══════════════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { careerPaths, careerStats, employerGroups, type EmployerGroup } from "@/data/careers";
import { cn } from "@/lib/utils";
import { Icon, Reveal, SectionHeading, TiltCard } from "./lib/primitives";

const rolesOf = (g: EmployerGroup) => careerPaths.find((p) => p.id === g.pathId)?.roles.slice(0, 2) ?? [];

const stats = careerStats.filter((s) => s.suffix === "+");

/* ── The deep-green feature tile (industry) ── */
function FeatureCard({ group, index }: { group: EmployerGroup; index: number }) {
  return (
    <div
      className="relative flex h-full flex-col gap-8 overflow-hidden rounded-3xl p-7 text-white md:p-9 lg:flex-row lg:items-stretch lg:gap-10"
      style={{ background: `linear-gradient(145deg, ${group.from} 0%, #5F712A 55%, ${group.to} 100%)` }}
    >
      {/* soft light + oversized watermark icon — still, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 100% 0%, rgba(255,255,255,0.16), transparent 55%)" }}
      />
      <Icon
        name={group.icon}
        size={230}
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-10 -right-8 text-white/[0.05]"
      />

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
            <Icon name={group.icon} size={26} />
          </span>
          <span className="font-heading text-sm font-bold tabular-nums tracking-widest text-white/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-6 font-heading text-2xl font-extrabold leading-tight md:text-3xl">{group.title}</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 md:text-base">{group.blurb}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {rolesOf(group).map((role) => (
            <span
              key={role}
              className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <ul className="relative flex flex-1 flex-col justify-center gap-3 lg:max-w-xs">
        {group.sectors.map((s) => (
          <li
            key={s}
            className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 text-sm font-semibold ring-1 ring-white/20 backdrop-blur-[2px]"
          >
            <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-lachani-bright" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── A light glass tile ── */
function SectorCard({ group, index }: { group: EmployerGroup; index: number }) {
  const grad = (deg: number) => `linear-gradient(${deg}deg, ${group.from}, ${group.to})`;
  return (
    <div className="relative flex h-full flex-col p-6 md:p-7">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: grad(90) }} />

      <div className="flex items-start justify-between">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
          style={{ background: grad(140) }}
        >
          <Icon name={group.icon} size={22} />
        </span>
        <span className="font-heading text-3xl font-black tabular-nums text-ihu-green-dark/15">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-text-primary">{group.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{group.blurb}</p>

      <ul className="mt-5 divide-y divide-ihu-green-dark/10 border-y border-ihu-green-dark/10">
        {group.sectors.map((s) => (
          <li key={s} className="flex items-center gap-3 py-2.5 text-sm font-semibold text-text-primary">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: group.accent }} />
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {rolesOf(group).map((role) => (
          <span
            key={role}
            className="rounded-full bg-lachani-mist/80 px-2.5 py-1 text-[11px] font-semibold text-ihu-green-dark ring-1 ring-ihu-green-dark/10"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}

export function GraduateCareers() {
  return (
    <section id="apofoitoi" className="relative w-full overflow-hidden py-24 md:py-28">
      <div className="section-container relative z-10 px-4">
        <SectionHeading
          label="Καριέρα"
          labelIcon="briefcase"
          title="Πού εργάζονται"
          highlight="οι απόφοιτοι"
          description="Πέντε κατευθύνσεις, από τη βιομηχανία και την έρευνα έως την κλινική πράξη και τη δική σου επιχείρηση."
        />

        <ul className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-6">
          {employerGroups.map((group, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={group.pathId}
                as="li"
                delay={(i % 3) * 0.08}
                direction="up"
                className={cn(featured ? "md:col-span-2 lg:col-span-4" : "lg:col-span-2")}
              >
                <TiltCard
                  max={featured ? 3 : 5}
                  glare={!featured}
                  className={cn("h-full", featured && "rounded-3xl shadow-[0_26px_50px_-26px_rgba(63,82,22,0.7)]")}
                  innerClassName={cn("h-full rounded-3xl", !featured && "glass-lachani")}
                >
                  {featured ? <FeatureCard group={group} index={i} /> : <SectorCard group={group} index={i} />}
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>

        {/* The two numbers the department kept + the way to the full paths */}
        <Reveal delay={0.1} direction="up" className="mx-auto mt-6 max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl glass-lachani-deep px-6 py-5 md:flex-row md:px-9">
            <dl className="flex items-center gap-8 sm:gap-10">
              {stats.map((s, i) => (
                <div key={s.label} className={cn("flex items-center gap-3", i > 0 && "border-l border-ihu-green-dark/15 pl-8 sm:pl-10")}>
                  <dd className="font-heading text-3xl font-extrabold tabular-nums text-ihu-green-dark">
                    {s.value}
                    {s.suffix}
                  </dd>
                  <dt className="max-w-[7rem] text-xs font-semibold leading-snug text-text-secondary">{s.label}</dt>
                </div>
              ))}
            </dl>
            <Link
              href="/programma#karieres"
              className="group inline-flex items-center gap-2 rounded-full bg-ihu-green-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:gap-3"
            >
              Δες τα μονοπάτια καριέρας
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default GraduateCareers;
