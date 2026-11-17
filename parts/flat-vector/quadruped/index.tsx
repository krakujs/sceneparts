import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector four-legged animal generator. Origin = feet (bottom centre), faces right, honours flip.
// Every size is in px at s = 1 (a medium dog is ~300 px long). Presets fix the proportions, colours and features.
// Body = chest + hip ellipses; neck = thick round stroke; head = circle + snout ellipse (tilted by headTilt).
// Poses: stand, walk, run, idle (breathing + tail wag), sit, lie, graze (head down).

export type QPose = "stand" | "walk" | "run" | "idle" | "sit" | "lie" | "graze";
export type Ear = "pointy" | "round" | "floppy" | "long" | "side" | "tiny" | "fan" | "none";
export type Tail = "thin" | "bushy" | "tuft" | "flowing" | "curly" | "stub" | "flat" | "none";
export type Pattern = "none" | "spots" | "rosettes" | "patches" | "stripes" | "saddle" | "blaze" | "wool";
export type Horns = "none" | "cow" | "bull" | "buffalo" | "goat" | "ram" | "straight" | "antlers" | "moose" | "rhino" | "ossicones";
export type Mane = "none" | "horse" | "neck" | "lion" | "ridge" | "beard" | "shag";
export type Mask = "none" | "patches" | "band" | "face";

export type QSpec = {
  pose?: QPose; len?: number; girth?: number; leg?: number; legW?: number; neck?: number; neckW?: number; neckAngle?: number;
  head?: number; snout?: number; snoutH?: number; headTilt?: number; color?: string; belly?: string; muzzle?: string;
  legColor?: string; feet?: string; hooves?: boolean; nose?: string; ear?: Ear; earSize?: number; earColor?: string; innerEar?: string;
  tail?: Tail; tailLen?: number; tailAngle?: number; tailColor?: string; pattern?: Pattern; patternColor?: string;
  horns?: Horns; hornSize?: number; hornColor?: string; tusks?: "none" | "small" | "large"; trunk?: boolean;
  hump?: "none" | "one" | "two" | "shoulder"; mane?: Mane; maneColor?: string; mask?: Mask; maskColor?: string;
  tailTip?: string; headColor?: string; eye?: number; mouth?: "none" | "smile" | "open" | "tongue"; fluff?: boolean; back?: number;
  /** extra drawing on top, in animal space (origin = feet, facing right): head centre x,y and radius r, body centre y (by), len, girth, sit tilt (deg, about x = -0.42 len, y = 0) */
  over?: (h: { x: number; y: number; r: number; by: number; len: number; girth: number; tilt: number }) => React.ReactNode;
};

type P2 = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const n1 = (v: number) => v.toFixed(1);
const qb = (a: P2, c: P2, b: P2, t: number): P2 => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]];

/** Tapered tube along a quadratic curve a→c→b, width w0 at a and w1 at b, round end at b. */
export function taper(a: P2, c: P2, b: P2, w0: number, w1: number, fill: string, key?: React.Key, roundStart = false) {
  const N = 18, L: P2[] = [], R: P2[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, p = qb(a, c, b, t), q = qb(a, c, b, Math.min(1, t + 0.01)), o = qb(a, c, b, Math.max(0, t - 0.01));
    let dx = q[0] - o[0], dy = q[1] - o[1];
    const m = Math.hypot(dx, dy) || 1; dx /= m; dy /= m;
    const w = (w0 + (w1 - w0) * t) / 2;
    L.push([p[0] - dy * w, p[1] + dx * w]); R.push([p[0] + dy * w, p[1] - dx * w]);
  }
  const d = "M " + L.map((p) => `${n1(p[0])} ${n1(p[1])}`).join(" L ") + " L " + R.reverse().map((p) => `${n1(p[0])} ${n1(p[1])}`).join(" L ") + " Z";
  return (
    <g key={key}>
      <path d={d} fill={fill} />
      {w1 > 1 && <circle cx={b[0]} cy={b[1]} r={w1 / 2} fill={fill} />}
      {roundStart && <circle cx={a[0]} cy={a[1]} r={w0 / 2} fill={fill} />}
    </g>
  );
}

// deterministic spot layout inside the body (u, v in -1..1, size factor)
const SPOTS: [number, number, number][] = [[-0.7, -0.3, 1], [-0.35, 0.25, 0.8], [-0.05, -0.45, 0.9], [0.3, 0.1, 1.1], [0.62, -0.32, 0.8], [-0.55, 0.55, 0.7], [0.1, 0.55, 0.75], [0.45, 0.5, 0.7], [-0.2, -0.05, 0.6], [0.75, 0.15, 0.6], [-0.85, 0.15, 0.6]];
const PATCHES: [number, number, number, number][] = [[-0.55, -0.15, 1.1, 20], [0.35, -0.3, 0.9, -15], [0.05, 0.4, 0.8, 35], [0.7, 0.35, 0.6, 0]];

export function Quadruped(p: PartProps<any> & QSpec) {
  const s = p.s ?? 1, f = p.f ?? 0, pose: QPose = p.pose ?? "stand";
  const len = p.len ?? 300, gi = p.girth ?? 140, leg = p.leg ?? 120, lw = p.legW ?? 34;
  const neck = p.neck ?? 30, nw = p.neckW ?? Math.max(lw * 1.6, gi * 0.45);
  const r = p.head ?? 66, sn = p.snout ?? 46, sh = p.snoutH ?? r * 0.7;
  const col = p.color ?? "#C99A62", dk = shade(col, 0.2), belly = p.belly ?? "none";
  const legC = p.legColor ?? col, legFar = shade(legC, 0.2);
  const muzzle = p.muzzle ?? (belly !== "none" ? belly : col), nose = p.nose ?? C.ink;
  const earC = p.earColor ?? col, inner = p.innerEar ?? "#F2A7B8";
  const tailC = p.tailColor ?? col, patC = p.patternColor ?? C.ink, maneC = p.maneColor ?? shade(col, 0.35);
  const hornC = p.hornColor ?? "#EFE6D2", es = p.earSize ?? 1, hs = p.hornSize ?? 1, eyeK = p.eye ?? 1;
  const flip = !!p.flip, x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;

  // motion
  const walk = pose === "walk", run = pose === "run";
  const ph = f * (run ? 0.45 : walk ? 0.28 : 0.12);
  const amp = run ? 34 : walk ? 20 : 0;
  const bob = run ? Math.abs(Math.sin(ph)) * 14 : walk ? Math.abs(Math.sin(ph)) * 4 : 0;
  const breathe = pose === "idle" || pose === "stand" || pose === "sit" || pose === "lie" || pose === "graze" ? Math.sin(f / 14) * 0.012 : 0;
  const wag = (pose === "idle" || walk || run ? Math.sin(f / (run ? 3 : 5)) : 0) * 10;
  const low = pose === "lie" || pose === "sit";
  const by = low ? -gi * 0.5 : -(leg + gi * 0.5) - bob; // body centre y
  const tilt = pose === "sit" ? -26 : 0;
  const piv: P2 = [-len * 0.42, 0];
  const T = (q: P2): P2 => {
    if (!tilt) return q;
    const a = rad(tilt), dx = q[0] - piv[0], dy = q[1] - piv[1];
    return [piv[0] + dx * Math.cos(a) - dy * Math.sin(a), piv[1] + dx * Math.sin(a) + dy * Math.cos(a)];
  };
  const backY = p.back ?? 0; // + raises the shoulders (hyena, giraffe), - raises the hips

  // legs (stand/walk/run/idle/graze)
  const legRect = (lx: number, a: number, far: boolean, key: string) => {
    const L = -by + 2, c = far ? legFar : legC;
    return (
      <g key={key} transform={`translate(${n1(lx)} ${n1(by)}) rotate(${n1(a)})`}>
        <rect x={-lw / 2} y={0} width={lw} height={L} rx={lw / 2} fill={c} />
        {p.feet && p.feet !== "none" && <rect x={-lw / 2} y={L - lw * 1.3} width={lw} height={lw * 1.3} rx={lw / 2} fill={far ? shade(p.feet, 0.2) : p.feet} />}
        {p.hooves && <rect x={-lw / 2} y={L - lw * 0.55} width={lw} height={lw * 0.55} rx={lw * 0.15} fill={far ? C.ink : C.inkSoft} />}
        {p.fluff && <ellipse cx={0} cy={L - lw * 0.5} rx={lw * 0.75} ry={lw * 0.55} fill={far ? legFar : legC} />}
        {p.pattern === "stripes" && [0.35, 0.5, 0.65].map((t) => <rect key={t} x={-lw / 2} y={L * t} width={lw} height={lw * 0.28} fill={patC} />)}
      </g>
    );
  };
  const fx = len * 0.34, bx = -len * 0.34, sw = (o: number) => Math.sin(ph + o * Math.PI * 2) * amp;
  let farLegs: React.ReactNode = null, nearLegs: React.ReactNode = null;
  if (!low) {
    const go = run ? [0, 0.12, 0.5, 0.62] : [0, 0.5, 0.5, 0];
    farLegs = [legRect(bx + len * 0.09, sw(go[1]), true, "bf"), legRect(fx + len * 0.09, sw(go[3]), true, "ff")];
    nearLegs = [legRect(bx, sw(go[0]), false, "bn"), legRect(fx, sw(go[2]), false, "fn")];
  }

  // body
  const ry = (gi / 2) * (1 + breathe);
  const wool: P2[] = [];
  if (p.pattern === "wool") {
    for (let i = 0; i <= 6; i++) { const a = -Math.PI / 2 + (i / 6) * Math.PI; wool.push([len * 0.22 + Math.cos(a) * len * 0.3, by + Math.sin(a) * ry], [-len * 0.22 - Math.cos(a) * len * 0.3, by + Math.sin(a) * ry]); }
    for (let i = 1; i < 4; i++) { const xx = -len * 0.22 + (i / 4) * len * 0.44; wool.push([xx, by - ry], [xx, by + ry]); }
  }
  const bodyShapes = (
    <g>
      {wool.map((q, i) => <circle key={"w" + i} cx={q[0]} cy={q[1]} r={gi * 0.16} fill={col} />)}
      <ellipse cx={len * 0.22} cy={by - backY * 0.5} rx={len * 0.3} ry={ry} fill={col} />
      <ellipse cx={-len * 0.22} cy={by + backY * 0.5} rx={len * 0.3} ry={ry * 0.96} fill={col} />
      <path d={`M ${n1(-len * 0.24)} ${n1(by + backY * 0.5 - ry * 0.94)} L ${n1(len * 0.24)} ${n1(by - backY * 0.5 - ry * 0.98)} L ${n1(len * 0.24)} ${n1(by - backY * 0.5 + ry * 0.98)} L ${n1(-len * 0.24)} ${n1(by + backY * 0.5 + ry * 0.94)} Z`} fill={col} />
      {p.hump === "one" && <ellipse cx={0} cy={by - ry * 0.85} rx={len * 0.22} ry={gi * 0.42} fill={col} />}
      {p.hump === "two" && [-len * 0.15, len * 0.15].map((hx) => <ellipse key={hx} cx={hx} cy={by - ry * 0.85} rx={len * 0.14} ry={gi * 0.36} fill={col} />)}
      {p.hump === "shoulder" && <ellipse cx={len * 0.2} cy={by - ry * 0.6} rx={len * 0.3} ry={gi * 0.48} fill={p.mane === "shag" ? maneC : col} />}
      {belly !== "none" && <ellipse cx={len * 0.02} cy={by + ry * 0.55} rx={len * 0.38} ry={ry * 0.38} fill={belly} />}
      {p.pattern === "spots" && SPOTS.map(([u, v, k], i) => <circle key={i} cx={u * len * 0.44} cy={by + v * ry * 0.75} r={gi * 0.075 * k} fill={patC} />)}
      {p.pattern === "rosettes" && SPOTS.map(([u, v, k], i) => (
        <g key={i}>
          <circle cx={u * len * 0.44} cy={by + v * ry * 0.75} r={gi * 0.08 * k} fill={patC} />
          <circle cx={u * len * 0.44 + gi * 0.012} cy={by + v * ry * 0.75 + gi * 0.01} r={gi * 0.045 * k} fill={shade(col, 0.1)} />
        </g>
      ))}
      {p.pattern === "patches" && PATCHES.map(([u, v, k, a], i) => <ellipse key={i} cx={u * len * 0.42} cy={by + v * ry * 0.7} rx={gi * 0.26 * k} ry={gi * 0.17 * k} transform={`rotate(${a} ${n1(u * len * 0.42)} ${n1(by + v * ry * 0.7)})`} fill={patC} />)}
      {p.pattern === "stripes" && [-0.78, -0.56, -0.34, -0.12, 0.1, 0.32, 0.54, 0.76].map((u, i) => {
        const sx = u * len * 0.5, ax = Math.abs(sx), e = (ax - len * 0.22) / (len * 0.3);
        const top = ax <= len * 0.24 ? by - ry * 0.94 : by - ry * Math.sqrt(Math.max(0, 1 - e * e)) + 3;
        const bot = by + ry * (0.3 + (i % 2) * 0.25), w = gi * 0.06;
        return <path key={i} d={`M ${n1(sx - w)} ${n1(top)} Q ${n1(sx + w * 1.4)} ${n1((top + bot) / 2)} ${n1(sx)} ${n1(bot)} Q ${n1(sx + w * 2.6)} ${n1((top + bot) / 2)} ${n1(sx + w)} ${n1(top)} Z`} fill={patC} />;
      })}
      {p.pattern === "saddle" && <ellipse cx={-len * 0.04} cy={by - ry * 0.55} rx={len * 0.42} ry={ry * 0.5} fill={patC} />}
      {p.mane === "ridge" && Array.from({ length: 7 }, (_, i) => {
        const rx0 = len * (0.35 - i * 0.1);
        return <path key={i} d={`M ${n1(rx0 - gi * 0.06)} ${n1(by - ry * 0.9)} L ${n1(rx0)} ${n1(by - ry * 1.18)} L ${n1(rx0 + gi * 0.06)} ${n1(by - ry * 0.9)} Z`} fill={maneC} />;
      })}
    </g>
  );

  // neck & head (world space)
  const graze = pose === "graze", lie = pose === "lie";
  const na = rad(graze ? -62 : (p.neckAngle ?? 55) - (lie ? 12 : 0));
  const N0 = T([len * 0.36, by - ry * 0.25]);
  const nl = graze ? Math.max(neck, (leg + gi * 0.5) * 0.62 - r * 0.6) : neck;
  const H: P2 = [N0[0] + Math.cos(na) * nl, N0[1] - Math.sin(na) * nl + (pose === "idle" ? Math.sin(f / 18) * 3 : 0)];
  const nn: P2 = [Math.sin(na), Math.cos(na)]; // perpendicular, points down-forward
  const htilt = (p.headTilt ?? 0) + (graze ? 25 : 0);

  // tail (world space), anchored at the rump
  const TA = T([-len * 0.5, by - ry * 0.35]);
  const tl = p.tailLen ?? 110, ta = rad((p.tailAngle ?? 35) + wag), tw = Math.min(16, Math.max(8, lw * 0.42));
  const tend: P2 = [TA[0] - Math.cos(ta) * tl, TA[1] - Math.sin(ta) * tl];
  const tctl: P2 = [TA[0] - Math.cos(ta) * tl * 0.55 + Math.sin(ta) * tl * 0.25, TA[1] - Math.sin(ta) * tl * 0.55 - Math.cos(ta) * tl * 0.25 + tl * 0.2];
  let tail: React.ReactNode = null;
  const tk = p.tail ?? "thin";
  if (tk === "thin") tail = taper(TA, tctl, tend, tw, tw * 0.6, tailC, "t", true);
  else if (tk === "tuft") tail = <g>{taper(TA, tctl, tend, tw * 0.8, tw * 0.6, tailC, "t", true)}<ellipse cx={tend[0]} cy={tend[1]} rx={tw * 1.1} ry={tw * 1.6} transform={`rotate(${n1((ta * 180) / Math.PI - 90)} ${n1(tend[0])} ${n1(tend[1])})`} fill={maneC} /></g>;
  else if (tk === "bushy") {
    const m = qb(TA, tctl, tend, 0.55), c1: P2 = [TA[0] + (tctl[0] - TA[0]) * 0.55, TA[1] + (tctl[1] - TA[1]) * 0.55], c2: P2 = [tctl[0] + (tend[0] - tctl[0]) * 0.55, tctl[1] + (tend[1] - tctl[1]) * 0.55];
    const W = tl * 0.36, tipC = p.tailTip ?? "none";
    tail = <g>{taper(TA, c1, m, tw * 1.4, W, tailC, "t1", true)}{taper(m, c2, tend, W, W * 0.3, tailC, "t2")}{tipC !== "none" && taper(qb(TA, tctl, tend, 0.85), qb(TA, tctl, tend, 0.93), tend, W * 0.62, W * 0.3, tipC, "t3")}</g>;
  }
  else if (tk === "flowing") {
    const e2: P2 = [TA[0] - tl * 0.45, TA[1] + tl * 0.95 + wag];
    tail = <g>{taper(TA, [TA[0] - tl * 0.55, TA[1] + tl * 0.1], e2, tw * 1.8, tw * 2.6, maneC, "t", true)}</g>;
  } else if (tk === "curly") tail = <path d={`M ${n1(TA[0])} ${n1(TA[1])} c ${-tw * 2} ${-tw * 0.5} ${-tw * 2.6} ${tw * 1.8} ${-tw * 1.2} ${tw * 1.6} s ${tw * 0.3} ${-tw * 1.6} ${-tw * 1.4} ${-tw * 1.2}`} stroke={tailC} strokeWidth={tw * 0.6} fill="none" strokeLinecap="round" />;
  else if (tk === "stub") tail = <circle cx={TA[0] + tw * 0.3} cy={TA[1]} r={tw * 1.3} fill={tailC} />;
  else if (tk === "flat") {
    const fe: P2 = [TA[0] - tl * 0.8, TA[1] + gi * 0.35];
    tail = <ellipse cx={(TA[0] + fe[0]) / 2} cy={(TA[1] + fe[1]) / 2} rx={tl * 0.55} ry={tw * 1.6} transform={`rotate(${n1(Math.atan2(fe[1] - TA[1], fe[0] - TA[0]) * 180 / Math.PI + 180)} ${n1((TA[0] + fe[0]) / 2)} ${n1((TA[1] + fe[1]) / 2)})`} fill={tailC} />;
  }

  // head parts in head space (centre 0,0, faces right), rotated by htilt about the head centre
  const snx = r * 0.55 + sn * 0.5, sny = r * 0.25, srx = sn * 0.5 + r * 0.3, sry = sh / 2;
  const tip: P2 = [snx + srx, sny - sry * 0.25];
  const ear = p.ear ?? "pointy";
  const earShape = (far: boolean) => {
    const c = far ? shade(earC, 0.2) : earC, o = far ? -r * 0.35 : 0, k = es;
    if (ear === "pointy") {
      const b1: P2 = [o - r * 0.5, -r * 0.6], b2: P2 = [o + r * 0.1, -r * 0.8], tp: P2 = [o - r * 0.3, -r * (0.75 + 0.85 * k)];
      return <g><path d={`M ${n1(b1[0])} ${n1(b1[1])} L ${n1(tp[0])} ${n1(tp[1])} L ${n1(b2[0])} ${n1(b2[1])} Z`} fill={c} stroke={c} strokeWidth={r * 0.12} strokeLinejoin="round" />{!far && inner !== "none" && <path d={`M ${n1(b1[0] + r * 0.16)} ${n1(b1[1] - r * 0.08)} L ${n1(tp[0] + r * 0.04)} ${n1(tp[1] + r * 0.3)} L ${n1(b2[0] - r * 0.12)} ${n1(b2[1] - r * 0.02)} Z`} fill={inner} />}</g>;
    }
    if (ear === "round") return <g><circle cx={o - r * 0.35} cy={-r * 0.78} r={r * 0.34 * k} fill={c} />{!far && inner !== "none" && <circle cx={o - r * 0.33} cy={-r * 0.76} r={r * 0.18 * k} fill={inner} />}</g>;
    if (ear === "tiny") return <circle cx={o - r * 0.35} cy={-r * 0.88} r={r * 0.17 * k} fill={c} />;
    if (ear === "long") return <g transform={`rotate(${far ? -24 : -12} ${n1(o - r * 0.25)} ${n1(-r * 0.7)})`}><ellipse cx={o - r * 0.25} cy={-r * (0.75 + 0.75 * k)} rx={r * 0.24} ry={r * 0.85 * k} fill={c} />{!far && inner !== "none" && <ellipse cx={o - r * 0.25} cy={-r * (0.75 + 0.75 * k)} rx={r * 0.11} ry={r * 0.65 * k} fill={inner} />}</g>;
    if (ear === "side") return <g transform={`rotate(${far ? -35 : -15} ${n1(o - r * 0.45)} ${n1(-r * 0.55)})`}><ellipse cx={o - r * 0.45 - r * 0.38 * k} cy={-r * 0.55} rx={r * 0.42 * k} ry={r * 0.17} fill={c} />{!far && inner !== "none" && <ellipse cx={o - r * 0.5 - r * 0.38 * k} cy={-r * 0.55} rx={r * 0.26 * k} ry={r * 0.08} fill={inner} />}</g>;
    if (ear === "floppy" && !far) return <ellipse cx={-r * 0.38} cy={-r * 0.05 + r * 0.2 * (k - 1)} rx={r * 0.3 * Math.sqrt(k)} ry={r * 0.62 * k} transform={`rotate(14 ${n1(-r * 0.38)} ${n1(-r * 0.6)})`} fill={p.earColor ?? dk} />;
    if (ear === "fan" && !far) return <g><path d={`M ${n1(-r * 0.15)} ${n1(-r * 0.75)} C ${n1(-r * 1.3 * k)} ${n1(-r * 1.1 * k)} ${n1(-r * 1.5 * k)} ${n1(r * 0.7 * k)} ${n1(-r * 0.55)} ${n1(r * 1.0 * k)} C ${n1(-r * 0.25)} ${n1(r * 0.6)} ${n1(-r * 0.05)} ${n1(r * 0.1)} ${n1(-r * 0.15)} ${n1(-r * 0.75)} Z`} fill={p.earColor ?? dk} /></g>;
    return null;
  };
  const horn = (far: boolean) => {
    const hc = far ? shade(hornC, 0.18) : hornC, o = far ? -r * 0.32 : 0, k = hs, w = r * 0.2 * k;
    const b: P2 = [o - r * 0.05, -r * 0.82];
    switch (p.horns) {
      case "cow": return taper(b, [b[0] + r * 0.05, b[1] - r * 0.35 * k], [b[0] + r * 0.3 * k, b[1] - r * 0.45 * k], w, w * 0.25, hc);
      case "bull": return taper(b, [b[0] + r * (far ? -0.6 : 0.6) * k, b[1] - r * 0.05], [b[0] + r * (far ? -0.5 : 0.55) * k, b[1] - r * 0.6 * k], w * 1.2, w * 0.25, hc);
      case "buffalo": return taper([b[0], b[1] + r * 0.1], [b[0] - r * 1.1 * k, b[1] + r * 0.2], [b[0] - r * 0.95 * k, b[1] - r * 0.6 * k], w * 1.6, w * 0.25, hc);
      case "goat": return taper(b, [b[0] + r * 0.05, b[1] - r * 0.75 * k], [b[0] - r * 0.6 * k, b[1] - r * 0.7 * k], w, w * 0.2, hc);
      case "straight": return taper(b, [b[0] - r * 0.3 * k, b[1] - r * 0.8 * k], [b[0] - r * 0.75 * k, b[1] - r * 1.5 * k], w * 0.8, w * 0.2, hc);
      case "ram": return far ? null : <g><circle cx={-r * 0.2} cy={-r * 0.25} r={r * 0.42 * k} fill="none" stroke={hc} strokeWidth={r * 0.24 * k} /><circle cx={-r * 0.12} cy={-r * 0.2} r={r * 0.12 * k} fill={shade(hornC, 0.15)} /></g>;
      case "ossicones": return <g><rect x={b[0] - r * 0.08} y={b[1] - r * 0.6 * k} width={r * 0.16} height={r * 0.65 * k} rx={r * 0.08} fill={far ? shade(col, 0.2) : col} /><circle cx={b[0]} cy={b[1] - r * 0.62 * k} r={r * 0.14} fill={far ? C.ink : C.inkSoft} /></g>;
      case "antlers": {
        const sw2 = Math.max(4, r * 0.1), b2: P2 = [b[0] - r * 0.1, b[1]];
        const tipP: P2 = [b2[0] - r * 1.0 * k, b2[1] - r * 1.9 * k];
        return <g stroke={hc} strokeWidth={sw2} strokeLinecap="round" fill="none">
          <path d={`M ${n1(b2[0])} ${n1(b2[1])} Q ${n1(b2[0] + r * 0.3 * k)} ${n1(b2[1] - r * 1.0 * k)} ${n1(tipP[0])} ${n1(tipP[1])}`} />
          {[0.35, 0.6, 0.82].map((t) => { const q = qb(b2, [b2[0] + r * 0.3 * k, b2[1] - r * 1.0 * k], tipP, t); return <path key={t} d={`M ${n1(q[0])} ${n1(q[1])} l ${n1(r * 0.4 * k)} ${n1(-r * 0.45 * k)}`} />; })}
        </g>;
      }
      case "moose": {
        const P = (u: number, v: number) => `${n1(o + r * u * k)} ${n1(-r * 0.8 + r * (v + 0.8) * k)}`;
        const tips: P2[] = [[-1.62, -1.38], [-1.42, -1.66], [-1.12, -1.84], [-0.8, -1.9], [-0.48, -1.8]];
        return <g>
          <path d={`M ${P(-0.05, -0.8)} C ${P(-0.5, -0.85)} ${P(-1.2, -0.8)} ${P(-1.62, -1.38)} L ${P(-1.3, -1.7)} L ${P(-0.7, -1.82)} L ${P(-0.35, -1.6)} C ${P(-0.3, -1.2)} ${P(-0.15, -1.0)} ${P(0.1, -0.85)} Z`} fill={hc} />
          {tips.map((t, i) => <circle key={i} cx={o + r * t[0] * k} cy={-r * 0.8 + r * (t[1] + 0.8) * k} r={r * 0.13 * k} fill={hc} />)}
        </g>;
      }
      default: return null;
    }
  };
  const mask = p.mask ?? "none", mC = p.maskColor ?? C.ink;
  const eyeX = r * 0.42, eyeY = -r * 0.18, er = r * 0.13 * eyeK;
  const mouth = p.mouth ?? "smile";
  const headG = (
    <g transform={`translate(${n1(H[0])} ${n1(H[1])}) rotate(${n1(htilt)})`}>
      {p.mane === "lion" && <g>{Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <circle key={i} cx={-r * 0.25 + Math.cos(a) * r * 1.25} cy={r * 0.05 + Math.sin(a) * r * 1.25} r={r * 0.48} fill={maneC} />; })}<circle cx={-r * 0.25} cy={r * 0.05} r={r * 1.35} fill={maneC} /></g>}
      {earShape(true)}
      {horn(true)}
      {ear !== "floppy" && ear !== "fan" && earShape(false)}
      <circle cx={0} cy={0} r={r} fill={p.headColor ?? col} />
      {p.mane === "beard" && <path d={`M ${n1(r * 0.2)} ${n1(r * 0.7)} Q ${n1(r * 0.35)} ${n1(r * 1.6)} ${n1(r * 0.75)} ${n1(r * 0.75)} Z`} fill={maneC} />}
      <ellipse cx={snx} cy={sny} rx={srx} ry={sry} fill={p.headColor ?? col} />
      {(ear === "floppy" || ear === "fan") && earShape(false)}
      {p.trunk && taper([r * 0.55, r * 0.15], [r * 1.25, r * 1.1], [r * 0.95, r * 2.15], r * 0.6, r * 0.28, col, "tr")}
      {p.trunk && <path d={`M ${n1(r * 0.82)} ${n1(r * 2.1)} q ${n1(r * 0.25)} ${n1(r * 0.25)} ${n1(r * 0.45)} ${n1(-r * 0.05)}`} stroke={col} strokeWidth={r * 0.24} strokeLinecap="round" fill="none" />}
      {muzzle !== (p.headColor ?? col) && <ellipse cx={snx + srx * 0.15} cy={sny + sry * 0.12} rx={srx * 0.85} ry={sry * 0.85} fill={muzzle} />}
      {mask === "face" && <path d={`M ${n1(-r * 0.2)} ${n1(-r * 0.95)} Q ${n1(r * 0.9)} ${n1(-r * 0.7)} ${n1(tip[0])} ${n1(tip[1])} Q ${n1(r * 0.9)} ${n1(-r * 0.1)} ${n1(r * 0.1)} ${n1(-r * 0.2)} Z`} fill={mC} />}
      {mask === "band" && <ellipse cx={r * 0.5} cy={eyeY} rx={r * 0.5} ry={r * 0.24} fill={mC} />}
      {mask === "patches" && <ellipse cx={eyeX} cy={eyeY + r * 0.04} rx={r * 0.24} ry={r * 0.3} transform={`rotate(-20 ${n1(eyeX)} ${n1(eyeY)})`} fill={mC} />}
      {p.pattern === "blaze" && <path d={`M ${n1(r * 0.1)} ${n1(-r * 0.75)} Q ${n1(r * 0.75)} ${n1(-r * 0.4)} ${n1(tip[0] - r * 0.1)} ${n1(tip[1] - r * 0.05)} L ${n1(tip[0] - r * 0.25)} ${n1(tip[1] + r * 0.12)} Q ${n1(r * 0.6)} ${n1(-r * 0.2)} ${n1(r * 0.05)} ${n1(-r * 0.55)} Z`} fill={C.white} />}
      {p.tusks && p.tusks !== "none" && taper([snx + srx * (p.trunk ? -0.2 : 0.35), sny + sry * 0.5], [snx + srx * 0.9, sny + sry * (p.tusks === "large" ? 2.4 : 1.2)], [snx + srx * (p.tusks === "large" ? 1.6 : 1.0), sny + sry * (p.tusks === "large" ? 1.3 : -0.2)], r * (p.tusks === "large" ? 0.2 : 0.11), r * 0.05, "#FBF6E8", "tu")}
      {p.horns === "rhino" && <g>{taper([tip[0] - srx * 0.35, tip[1] - sry * 0.55], [tip[0] - srx * 0.1, tip[1] - sry * 1.8 * hs], [tip[0] - srx * 0.45, tip[1] - sry * 2.6 * hs], r * 0.4, r * 0.04, hornC, "rh")}{taper([tip[0] - srx * 0.95, tip[1] - sry * 0.75], [tip[0] - srx * 0.85, tip[1] - sry * 1.4 * hs], [tip[0] - srx * 1.05, tip[1] - sry * 1.6 * hs], r * 0.26, r * 0.04, hornC, "rh2")}</g>}
      {!p.trunk && <ellipse cx={tip[0] - r * 0.06} cy={tip[1]} rx={Math.max(5, r * 0.15)} ry={Math.max(4, r * 0.11)} fill={nose} />}
      {!p.trunk && mouth !== "none" && (mouth === "smile"
        ? <path d={`M ${n1(tip[0] - r * 0.06)} ${n1(tip[1] + r * 0.12)} q ${n1(-r * 0.05)} ${n1(r * 0.2)} ${n1(-r * 0.32)} ${n1(r * 0.16)}`} stroke={C.ink} strokeWidth={Math.max(3, r * 0.05)} fill="none" strokeLinecap="round" />
        : <g><path d={`M ${n1(tip[0] - r * 0.12)} ${n1(sny + sry * 0.55)} q ${n1(-r * 0.2)} ${n1(r * 0.3)} ${n1(-r * 0.45)} ${n1(r * 0.02)} Z`} fill={C.inkSoft} />{mouth === "tongue" && <ellipse cx={tip[0] - r * 0.3} cy={sny + sry * 0.8} rx={r * 0.12} ry={r * 0.2} fill="#F27BA6" />}</g>)}
      <circle cx={eyeX} cy={eyeY} r={er} fill={mask === "patches" || mask === "band" || mask === "face" ? C.white : C.ink} />
      {(mask === "patches" || mask === "band" || mask === "face") && <circle cx={eyeX + er * 0.15} cy={eyeY} r={er * 0.7} fill={C.ink} />}
      <circle cx={eyeX + er * 0.35} cy={eyeY - er * 0.35} r={er * 0.33} fill={C.white} />
      {horn(false)}
      {p.mane === "horse" && <path d={`M ${n1(-r * 0.3)} ${n1(-r * 0.85)} q ${n1(r * 0.2)} ${n1(-r * 0.4)} ${n1(r * 0.55)} ${n1(-r * 0.25)} q ${n1(-r * 0.15)} ${n1(r * 0.15)} ${n1(-r * 0.35)} ${n1(r * 0.3)} Z`} fill={maneC} />}
    </g>
  );

  // neck
  const neckEl = nl > 0 ? (
    <g>
      <path d={`M ${n1(N0[0])} ${n1(N0[1])} L ${n1(H[0])} ${n1(H[1])}`} stroke={col} strokeWidth={nw} strokeLinecap="round" />
      {p.pattern === "stripes" && [0.25, 0.45, 0.65, 0.85].map((t) => { const c0: P2 = [N0[0] + (H[0] - N0[0]) * t, N0[1] + (H[1] - N0[1]) * t]; return <path key={t} d={`M ${n1(c0[0] - nn[0] * nw * 0.48)} ${n1(c0[1] - nn[1] * nw * 0.48)} L ${n1(c0[0] + nn[0] * nw * 0.3)} ${n1(c0[1] + nn[1] * nw * 0.3)}`} stroke={patC} strokeWidth={nw * 0.14} />; })}
      {(p.pattern === "patches" || p.pattern === "spots" || p.pattern === "rosettes") && neck > nw && [0.3, 0.55, 0.8].map((t, i) => { const c0: P2 = [N0[0] + (H[0] - N0[0]) * t + nn[0] * nw * (i % 2 ? 0.12 : -0.12), N0[1] + (H[1] - N0[1]) * t + nn[1] * nw * (i % 2 ? 0.12 : -0.12)]; return <ellipse key={t} cx={c0[0]} cy={c0[1]} rx={nw * 0.22} ry={nw * 0.17} fill={patC} />; })}
      {(p.mane === "horse" || p.mane === "ridge" || p.mane === "neck") && <path d={`M ${n1(N0[0] - nn[0] * nw * 0.42)} ${n1(N0[1] - nn[1] * nw * 0.42)} L ${n1(H[0] - nn[0] * nw * 0.42)} ${n1(H[1] - nn[1] * nw * 0.42)}`} stroke={maneC} strokeWidth={nw * (p.mane === "horse" ? 0.38 : p.mane === "neck" ? 0.16 : 0.2)} strokeLinecap="round" />}
      {p.mane === "shag" && <path d={`M ${n1(N0[0])} ${n1(N0[1])} L ${n1(H[0])} ${n1(H[1])}`} stroke={maneC} strokeWidth={nw * 1.15} strokeLinecap="round" />}
    </g>
  ) : null;

  // sit/lie: haunch and paws
  let lowLegs: React.ReactNode = null, lowFront: React.ReactNode = null;
  if (low) {
    const hx = -len * 0.28, hy = -gi * 0.42;
    const ch = T([len * 0.3, by + ry * 0.4]);
    lowLegs = (
      <g>
        <ellipse cx={hx + len * 0.12} cy={-lw * 0.45} rx={lw * 1.5} ry={lw * 0.48} fill={p.feet && p.feet !== "none" ? p.feet : legFar} />
        <ellipse cx={hx} cy={hy} rx={len * 0.24} ry={gi * 0.42} fill={shade(col, 0.06)} />
      </g>
    );
    lowFront = pose === "sit"
      ? <g>{[0, 1].map((i) => { const xx = ch[0] + (i ? -lw * 0.9 : 0); return <g key={i}><rect x={xx - lw / 2} y={ch[1]} width={lw} height={-ch[1]} rx={lw / 2} fill={i ? legFar : legC} />{p.feet && p.feet !== "none" && <rect x={xx - lw / 2} y={-lw * 1.3} width={lw} height={lw * 1.3} rx={lw / 2} fill={p.feet} />}{p.hooves && <rect x={xx - lw / 2} y={-lw * 0.55} width={lw} height={lw * 0.55} rx={lw * 0.15} fill={C.inkSoft} />}</g>; })}</g>
      : <g>{[0, 1].map((i) => <rect key={i} x={len * 0.2 - i * lw * 0.6} y={-lw * (1 + i * 0.1)} width={leg * 0.75 + lw} height={lw} rx={lw / 2} fill={i ? legFar : (p.feet && p.feet !== "none" ? p.feet : legC)} />)}</g>;
  }

  const shadowW = len * 0.6;
  return (
    <g transform={`translate(${n1(x)} ${n1(y)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={shadowW} ry={Math.max(8, shadowW * 0.07)} fill={C.shadow} />
      {tail}
      {farLegs}
      {nearLegs}
      {lowLegs && pose === "lie" && lowFront}
      <g transform={tilt ? `rotate(${tilt} ${piv[0]} ${piv[1]})` : undefined}>{bodyShapes}</g>
      {lowLegs}
      {pose === "sit" && lowFront}
      {neckEl}
      {headG}
      {p.over && p.over({ x: H[0], y: H[1], r, by, len, girth: gi, tilt })}
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Quadruped {...p} />;
}
