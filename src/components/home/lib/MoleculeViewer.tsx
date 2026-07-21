"use client";

/* ══════════════════════════════════════════════════════════════════════════
   MoleculeViewer — interactive, scientifically-accurate hyaluronic acid
   ──────────────────────────────────────────────────────────────────────────
   Renders the repeating disaccharide unit of hyaluronan (hyaluronic acid):

       →4)-β-D-GlcA-(1→3)-β-D-GlcNAc-(1→

   i.e. D-glucuronic acid β(1→3)-linked to N-acetyl-D-glucosamine. Both sugars
   are drawn as real ⁴C₁ chair pyranose rings (five carbons + one ring oxygen),
   with substituents placed at genuine tetrahedral/equatorial directions:
     • glucuronic acid  → carboxyl (–COOH) on C6, hydroxyls on C2/C3/C4
     • GlcNAc           → N-acetyl (–NH–CO–CH₃) on C2, CH₂OH on C6, OH on C4
     • a bridging glycosidic oxygen joins GlcA C1 to GlcNAc C3

   Atoms are coloured by element (element-CPK convention, muted to the λαχανί
   palette): carbon = charcoal-olive, oxygen = brick, nitrogen = slate.
   Hydrogens are omitted, as in a standard heavy-atom ball-and-stick figure.

   Geometry is computed once at module load (deterministic — no hydration
   risk; the scene is drawn on <canvas>, nothing SSR-sensitive). Drag to
   rotate; it idles with a slow auto-spin (calm = slower, reduced-motion =
   still). Coordinates are in ångström-scale units.
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from "react";
import { Move3d } from "lucide-react";

import { cn } from "@/lib/utils";
import { useReduced } from "./hooks";

/* ── tiny 3-vector maths ───────────────────────────────────────────────── */
type V3 = [number, number, number];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const len = (a: V3) => Math.hypot(a[0], a[1], a[2]);
const norm = (a: V3): V3 => {
  const l = len(a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
/* Rodrigues rotation of v about unit axis k by angle t. */
const rotAx = (v: V3, k: V3, t: number): V3 => {
  const c = Math.cos(t);
  const s = Math.sin(t);
  const kv = cross(k, v);
  const kk = dot(k, v) * (1 - c);
  return [v[0] * c + kv[0] * s + k[0] * kk, v[1] * c + kv[1] * s + k[1] * kk, v[2] * c + kv[2] * s + k[2] * kk];
};

/* ── element palette (muted element-CPK on λαχανί) ─────────────────────── */
type El = "C" | "O" | "N";
const ELEM: Record<El, { r: number; hi: string; base: string; lo: string }> = {
  C: { r: 0.34, hi: "#7B8270", base: "#414A38", lo: "#232a1c" },
  O: { r: 0.32, hi: "#EBA88F", base: "#C0563B", lo: "#7a2c1a" },
  N: { r: 0.35, hi: "#93B0D6", base: "#4B6C9B", lo: "#2a4468" },
};

interface Atom {
  p: V3;
  el: El;
}
interface Bond {
  a: number;
  b: number;
  order: 1 | 2;
}
interface Label {
  at: number;
  text: string;
}

/* ── ⁴C₁ chair of a pyranose ring: C1 C2 C3 C4 C5 O5 (O5 = ring oxygen) ── */
const RING: V3[] = [
  [1.25, 0.72, 0.25], // C1  (up)
  [1.25, -0.72, -0.25], // C2  (down)
  [0.0, -1.44, 0.25], // C3  (up)
  [-1.25, -0.72, -0.25], // C4  (down)
  [-1.25, 0.72, 0.25], // C5  (up)
  [0.0, 1.44, -0.25], // O5  (down)
];

/* Equatorial substituent direction at ring carbon `i` (ring lies ~in xy, so
   the flatter of the two tetrahedral bonds — smaller |z| — is equatorial). */
function equatorial(i: number): V3 {
  const c = RING[i];
  const u = norm(sub(RING[(i + 5) % 6], c));
  const v = norm(sub(RING[(i + 1) % 6], c));
  const bis = norm(add(u, v));
  const nrm = norm(cross(u, v));
  const cosHalf = Math.sqrt(Math.max(0, (1 + dot(u, v)) / 2));
  const cosPhi = 1 / (3 * cosHalf);
  const sinPhi = Math.sqrt(Math.max(0, 1 - cosPhi * cosPhi));
  const w1 = norm(add(mul(bis, -cosPhi), mul(nrm, sinPhi)));
  const w2 = norm(add(mul(bis, -cosPhi), mul(nrm, -sinPhi)));
  return Math.abs(w1[2]) < Math.abs(w2[2]) ? w1 : w2;
}

/* Bond lengths (Å). */
const CO = 1.43;
const CN = 1.46;
const CC = 1.52;
const CeqO = 1.23;
const COH = 1.34;
const NC = 1.34;

/* ── build the disaccharide once ───────────────────────────────────────── */
function buildHyaluronan() {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  const labels: Label[] = [];
  const put = (p: V3, el: El) => atoms.push({ p, el }) - 1;
  const bond = (a: number, b: number, order: 1 | 2 = 1) => bonds.push({ a, b, order });

  /* ---- Ring A: D-glucuronic acid (world frame = identity) ---- */
  const A = RING.map((p, i) => put(p, i === 5 ? "O" : "C"));
  for (let i = 0; i < 6; i++) bond(A[i], A[(i + 1) % 6]);
  const nA: V3 = [0, 0, 1];

  // C1 → bridging glycosidic O
  const eqA1 = equatorial(0);
  const iOg = put(add(RING[0], mul(eqA1, CO)), "O");
  bond(A[0], iOg);

  // C2, C3 hydroxyls (C4 hydroxyl added below as the free "cap")
  for (const c of [1, 2, 3]) {
    const io = put(add(RING[c], mul(equatorial(c), CO)), "O");
    bond(A[c], io);
  }

  // C5 → C6 carboxyl (–COOH)
  const iC6 = put(add(RING[4], mul(equatorial(4), CC)), "C");
  bond(A[4], iC6);
  const c6 = atoms[iC6].p;
  const u6 = norm(sub(RING[4], c6)); // C6→C5
  const iOc = put(add(c6, mul(rotAx(u6, nA, (2 * Math.PI) / 3), CeqO)), "O");
  bond(iC6, iOc, 2); // C=O
  const iOh = put(add(c6, mul(rotAx(u6, nA, (-2 * Math.PI) / 3), COH)), "O");
  bond(iC6, iOh); // C–OH
  labels.push({ at: iC6, text: "–COOH" });

  /* ---- Ring B: N-acetyl-D-glucosamine, β(1→3)-linked ---- */
  // Orient ring B so its C3 equatorial bond meets the bridging O, continuing
  // outward along eqA1; the remaining spin (glycosidic torsion) is tuned to
  // splay the rings without clashes.
  const e3 = equatorial(2);
  const negEq = mul(eqA1, -1);
  let axis = cross(e3, negEq);
  let ang = Math.acos(clamp(dot(e3, negEq), -1, 1));
  if (len(axis) < 1e-6) {
    axis = [0, 0, 1];
    ang = dot(e3, negEq) > 0 ? 0 : Math.PI;
  }
  axis = norm(axis);
  const torsion = 2.0;
  const kTor = norm(negEq);
  const R = (x: V3): V3 => rotAx(rotAx(x, axis, ang), kTor, torsion);
  const c3World = add(atoms[iOg].p, mul(eqA1, CO)); // O → C3(B)
  const t = sub(c3World, R(RING[2]));
  const place = (p: V3): V3 => add(R(p), t);
  const nB = R([0, 0, 1]);

  const B = RING.map((p, i) => put(place(p), i === 5 ? "O" : "C"));
  for (let i = 0; i < 6; i++) bond(B[i], B[(i + 1) % 6]);
  bond(iOg, B[2]); // glycosidic O → GlcNAc C3

  // C1' free hydroxyl (β cap)
  {
    const io = put(add(place(RING[0]), mul(R(equatorial(0)), CO)), "O");
    bond(B[0], io);
  }
  // C4' hydroxyl
  {
    const io = put(add(place(RING[3]), mul(R(equatorial(3)), CO)), "O");
    bond(B[3], io);
  }

  // C2' → N-acetyl (–NH–CO–CH₃). The acetyl is built in the amide reference
  // plane, then spun about the C2'–N bond (the amide torsion) to lift it clear
  // of the crowded equatorial belt where the glycosidic O and C1'/C4' hydroxyls
  // sit — otherwise the carbonyl O collides with the bridging oxygen.
  const c2b = place(RING[1]);
  const eqN = R(equatorial(1));
  const iN = put(add(c2b, mul(eqN, CN)), "N");
  bond(B[1], iN);
  const nPos = atoms[iN].p;
  const uNC2 = norm(sub(c2b, nPos)); // N→C2'
  const spinAx = norm(sub(nPos, c2b)); // C2'→N, the amide torsion axis
  const psi = (60 * Math.PI) / 180;
  const spin = (p: V3): V3 => add(nPos, rotAx(sub(p, nPos), spinAx, psi));
  const cacRef = add(nPos, mul(rotAx(uNC2, nB, (2 * Math.PI) / 3), NC));
  const uAc = norm(sub(nPos, cacRef)); // Cac→N
  const oacRef = add(cacRef, mul(rotAx(uAc, nB, (2 * Math.PI) / 3), CeqO));
  const meRef = add(cacRef, mul(rotAx(uAc, nB, (-2 * Math.PI) / 3), CC));
  const iCac = put(spin(cacRef), "C");
  bond(iN, iCac);
  const iOac = put(spin(oacRef), "O");
  bond(iCac, iOac, 2); // acetyl C=O
  const iMe = put(spin(meRef), "C");
  bond(iCac, iMe); // –CH₃
  labels.push({ at: iN, text: "–NHAc" });

  // C5' → C6' (CH₂OH)
  const iC6b = put(add(place(RING[4]), mul(R(equatorial(4)), CC)), "C");
  bond(B[4], iC6b);
  const c6b = atoms[iC6b].p;
  const u6b = norm(sub(place(RING[4]), c6b));
  const perp = norm(cross(u6b, nB));
  const dO6 = norm(add(mul(u6b, -1 / 3), mul(perp, Math.sqrt(8) / 3)));
  const iO6 = put(add(c6b, mul(dO6, CO)), "O");
  bond(iC6b, iO6);

  // recentre on the centroid
  const ctr = atoms.reduce<V3>((s, a) => add(s, a.p), [0, 0, 0]);
  const cen = mul(ctr, 1 / atoms.length);
  for (const a of atoms) a.p = sub(a.p, cen);
  const radius = atoms.reduce((m, a) => Math.max(m, len(a.p)), 0);

  return { atoms, bonds, labels, radius };
}

const MOL = buildHyaluronan();

/* ── the component ─────────────────────────────────────────────────────── */
export function MoleculeViewer({ calm = false, className }: { calm?: boolean; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReduced();

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    if (!wrap || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const cur = { rx: -0.42, ry: 0.7 };
    const tgt = { rx: -0.42, ry: 0.7 };
    let dragging = false;
    let raf = 0;
    const spin = reduced ? 0 : calm ? 0.0022 : 0.0042;

    const draw = () => {
      if (!w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const S = (Math.min(w, (h * 4) / 3) * 0.46) / MOL.radius;
      const F = MOL.radius * 3.4;

      // soft λαχανί wash + ground shadow
      const wash = ctx.createRadialGradient(cx, cy - S * 0.4, S * 0.3, cx, cy - S * 0.4, S * MOL.radius * 1.5);
      wash.addColorStop(0, "rgba(200,226,94,0.26)");
      wash.addColorStop(1, "rgba(200,226,94,0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      const sinY = Math.sin(cur.ry);
      const cosY = Math.cos(cur.ry);
      const sinX = Math.sin(cur.rx);
      const cosX = Math.cos(cur.rx);
      const proj = MOL.atoms.map((a) => {
        const x1 = a.p[0] * cosY + a.p[2] * sinY;
        const z1 = -a.p[0] * sinY + a.p[2] * cosY;
        const y2 = a.p[1] * cosX - z1 * sinX;
        const z2 = a.p[1] * sinX + z1 * cosX;
        const f = F / (F - z2);
        return { sx: cx + x1 * f * S, sy: cy - y2 * f * S, z: z2, f };
      });
      const zmin = Math.min(...proj.map((p) => p.z));
      const zmax = Math.max(...proj.map((p) => p.z));
      const depth = (z: number) => (z - zmin) / (zmax - zmin || 1);

      type Item = { z: number; kind: "bond" | "atom"; i: number };
      const items: Item[] = [];
      MOL.bonds.forEach((b, i) => items.push({ z: (proj[b.a].z + proj[b.b].z) / 2, kind: "bond", i }));
      MOL.atoms.forEach((_, i) => items.push({ z: proj[i].z, kind: "atom", i }));
      items.sort((p, q) => p.z - q.z);

      for (const it of items) {
        if (it.kind === "bond") {
          const bd = MOL.bonds[it.i];
          const pa = proj[bd.a];
          const pb = proj[bd.b];
          const ra = ELEM[MOL.atoms[bd.a].el].r * S * pa.f;
          const rb = ELEM[MOL.atoms[bd.b].el].r * S * pb.f;
          const dx = pb.sx - pa.sx;
          const dy = pb.sy - pa.sy;
          const l = Math.hypot(dx, dy) || 1;
          const ux = dx / l;
          const uy = dy / l;
          const x1 = pa.sx + ux * ra * 0.75;
          const y1 = pa.sy + uy * ra * 0.75;
          const x2 = pb.sx - ux * rb * 0.75;
          const y2 = pb.sy - uy * rb * 0.75;
          const d = depth(it.z);
          const alpha = 0.32 + 0.5 * d;
          const lw = 3.4 * ((pa.f + pb.f) / 2) * (S / 60);
          const offs = bd.order === 2 ? [-1.7, 1.7] : [0];
          for (const o of offs) {
            const ox = -uy * o * (S / 60);
            const oy = ux * o * (S / 60);
            ctx.lineCap = "round";
            ctx.strokeStyle = `rgba(52,58,42,${alpha})`;
            ctx.lineWidth = bd.order === 2 ? lw * 0.6 : lw;
            ctx.beginPath();
            ctx.moveTo(x1 + ox, y1 + oy);
            ctx.lineTo(x2 + ox, y2 + oy);
            ctx.stroke();
          }
        } else {
          const p = proj[it.i];
          const st = ELEM[MOL.atoms[it.i].el];
          const r = st.r * S * p.f;
          const d = depth(it.z);
          ctx.globalAlpha = 0.5 + 0.5 * d;
          const g = ctx.createRadialGradient(p.sx - r * 0.34, p.sy - r * 0.4, r * 0.1, p.sx, p.sy, r);
          g.addColorStop(0, st.hi);
          g.addColorStop(0.5, st.base);
          g.addColorStop(1, st.lo);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.beginPath();
          ctx.arc(p.sx - r * 0.34, p.sy - r * 0.42, r * 0.17, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // functional-group call-outs, splayed outward, depth-faded
      ctx.font = `600 12px var(--font-sans), system-ui, sans-serif`;
      ctx.textBaseline = "middle";
      for (const lb of MOL.labels) {
        const p = proj[lb.at];
        const d = depth(p.z);
        const dirx = p.sx - cx;
        const diry = p.sy - cy;
        const dl = Math.hypot(dirx, diry) || 1;
        const ex = p.sx + (dirx / dl) * 26;
        const ey = p.sy + (diry / dl) * 26;
        ctx.globalAlpha = 0.35 + 0.55 * d;
        ctx.strokeStyle = "rgba(95,113,42,0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.sx, p.sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        const right = ex >= p.sx;
        ctx.textAlign = right ? "left" : "right";
        const tx = ex + (right ? 4 : -4);
        const wText = ctx.measureText(lb.text).width;
        ctx.fillStyle = "rgba(255,255,255,0.82)";
        ctx.beginPath();
        const bx = right ? tx - 3 : tx - wText - 3;
        ctx.roundRect(bx, ey - 9, wText + 6, 18, 5);
        ctx.fill();
        ctx.fillStyle = "#46571D";
        ctx.fillText(lb.text, tx, ey);
        ctx.globalAlpha = 1;
      }
    };

    const step = () => {
      if (!dragging) tgt.ry += spin;
      cur.rx += (tgt.rx - cur.rx) * 0.12;
      cur.ry += (tgt.ry - cur.ry) * 0.12;
      draw();
      raf = requestAnimationFrame(step);
    };

    const measure = () => {
      const r = wrap.getBoundingClientRect();
      if (!r.width || !r.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      draw();
    };
    measure(); // synchronous first paint (rAF can be frozen in hidden tabs)
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    let lastX = 0;
    let lastY = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      wrap.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      tgt.ry += (e.clientX - lastX) * 0.011;
      tgt.rx = clamp(tgt.rx - (e.clientY - lastY) * 0.008, -1.2, 1.2);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const up = () => {
      dragging = false;
    };
    wrap.addEventListener("pointerdown", down);
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerup", up);
    wrap.addEventListener("pointercancel", up);

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointerdown", down);
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerup", up);
      wrap.removeEventListener("pointercancel", up);
    };
  }, [calm, reduced]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative aspect-[4/3] w-full cursor-grab touch-none select-none overflow-hidden rounded-2xl bg-gradient-to-br from-[#FBFDF2] via-[#F3F8E1] to-[#E9F1CE] active:cursor-grabbing",
        className,
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ihu-green-dark/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        Υαλουρονικό οξύ
      </span>
      <span className="pointer-events-none absolute left-3 top-[2.35rem] text-[9px] font-medium text-ihu-green-dark/70">
        επαναλαμβανόμενη δισακχαριτική μονάδα
      </span>

      <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold text-ihu-green-dark shadow-sm ring-1 ring-ihu-green-dark/10 backdrop-blur-sm">
        <Move3d size={12} />
        σύρετε για περιστροφή
      </span>
    </div>
  );
}

export default MoleculeViewer;
