import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector bug generator (insects and arachnids). Side view by default, origin = feet / bottom centre,
// faces right, honours flip. Sizes are px at s = 1: a bee is ~220 px long, a butterfly ~300 px span, an ant ~200 px.
// Body = abdomen + thorax + head shapes; legs = hip-knee-foot strokes; wings = shapes scaled around their root to flap.
// Poses: stand, crawl (alternating legs), fly (fast wing beat, body lifted alt px, legs dangle), hover (fly in place), idle.
// view "top" draws the bug from above, lying on the ground (good for butterflies, ladybugs, spiders).

export type BugPose = "stand" | "crawl" | "fly" | "hover" | "idle";
export type BugView = "side" | "top";
export type BugAbdomen = "oval" | "round" | "long" | "pointed";
export type BugPattern = "none" | "stripes" | "spots" | "dots-edge";
export type BugWings = "none" | "clear" | "long" | "butterfly" | "moth" | "shell" | "grasshopper";
export type BugAntennae = "none" | "thin" | "clubbed" | "feathery" | "elbow";

export type BugSpec = {
  pose?: BugPose;
  view?: BugView;
  /** px the body is lifted when flying (hover uses 30% of it) */
  alt?: number;
  /** head radius */
  head?: number;
  /** thorax size (half-width unit) */
  thorax?: number;
  /** abdomen length */
  abdomen?: number;
  /** abdomen half-height */
  abdomenH?: number;
  abdomenShape?: BugAbdomen;
  /** thin waist between thorax and abdomen (ant, wasp) */
  waist?: boolean;
  /** 6 or 8 */
  legs?: number;
  legLen?: number;
  legW?: number;
  legColor?: string;
  /** main colour (abdomen) */
  color?: string;
  /** second colour: stripes, dots, dark bits */
  color2?: string;
  thoraxColor?: string;
  headColor?: string;
  pattern?: BugPattern;
  patternColor?: string;
  wings?: BugWings;
  /** wing length px (butterfly: half of the ~300 px span) */
  wingSpan?: number;
  wingColor?: string;
  /** butterfly border colour */
  wingColor2?: string;
  wingSpots?: boolean;
  antennae?: BugAntennae;
  antennaLen?: number;
  antennaColor?: string;
  eyes?: "dots" | "big" | "none";
  stinger?: boolean;
  proboscis?: boolean;
  pincers?: "none" | "jaws";
  /** firefly abdomen glows, pulsing from f */
  glow?: boolean;
  hindLegs?: "normal" | "jumper";
};

type P2 = [number, number];
const f1 = (v: number) => v.toFixed(1);
const pt = (q: P2) => `${f1(q[0])} ${f1(q[1])}`;
const qb = (a: P2, c: P2, b: P2, t: number): P2 => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]];
const SPOTS: [number, number, number][] = [[-0.5, -0.3, 1], [-0.05, 0.3, 0.8], [0.35, -0.25, 0.9], [0.1, -0.55, 0.6], [0.6, 0.25, 0.7], [-0.35, 0.45, 0.6]];

/** A leg as hip -> knee -> foot, one round stroke. */
const Leg = ({ a, k, b, w, c }: { a: P2; k: P2; b: P2; w: number; c: string }) => (
  <path d={`M ${pt(a)} L ${pt(k)} L ${pt(b)}`} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Bug(p: PartProps<any> & BugSpec) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const pose: BugPose = p.pose ?? "stand", top = (p.view ?? "side") === "top";
  const flying = pose === "fly", hover = pose === "hover", crawl = pose === "crawl", airborne = flying || hover;
  const nLegs = p.legs ?? 6, legLen = p.legLen ?? 46, lw = p.legW ?? 9, perSide = Math.max(1, Math.ceil(nLegs / 2));
  const hr = p.head ?? 28, th = p.thorax ?? 42, ab = p.abdomen ?? 100, abH = p.abdomenH ?? th * 0.9;
  const shape: BugAbdomen = p.abdomenShape ?? "oval", pointed = shape === "pointed";
  const col = p.color ?? C.yellow, col2 = p.color2 ?? C.ink, thC = p.thoraxColor ?? col, hcol = p.headColor ?? col;
  const legC = p.legColor ?? C.ink, legFar = shade(legC, 0.25);
  const pat = p.pattern ?? "none", patC = p.patternColor ?? col2;
  const wings = p.wings ?? "none", wl = p.wingSpan ?? 150, wc = p.wingColor ?? "#E6F6FF", wc2 = p.wingColor2 ?? C.ink;
  const antK = p.antennae ?? "thin", antL = p.antennaLen ?? th * 1.5, antC = p.antennaColor ?? col2;
  const eyes = p.eyes ?? "dots";
  const flip = !!p.flip, x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const alt = p.alt ?? 140;

  // motion: lift, bob, wing beat and walk cycle (all from f)
  const lift = flying ? alt + Math.sin(f * 0.5) * 6 : hover ? alt * 0.3 + Math.sin(f / 9) * 6 : 0;
  const hipY = -legLen - lift - (crawl ? Math.abs(Math.sin(f * 0.3)) * 3 : 0);
  const beat = Math.sin(f * (flying ? 1.6 : 0.9));
  const wingSy = airborne ? 0.4 + 0.6 * (0.5 + 0.5 * beat) : 0.9;
  const stride = f * 0.05;

  // body centre: side view = thorax sits 0.45 th above the hips; top view = bug lies on the ground, feet at y = 0
  const by = top ? -Math.max(legLen * 1.2, wings === "butterfly" ? wl * 0.92 : 0, th) : hipY - th * 0.45;
  const Hc: P2 = [th * 1.0 + hr * 0.6, by - th * 0.1];
  const acx = -(th * 0.7 + ab * 0.5) - (p.waist ? th * 0.25 : 0), acy = by + th * 0.05;
  const arx = ab * 0.5, ary = shape === "long" ? abH * 0.55 : abH;
  const dirK = (k: number) => 0.8 - (1.6 * k) / Math.max(1, perSide - 1); // front legs reach forward, rear legs back
  const hipX = (k: number) => th * (0.5 - k / Math.max(1, perSide - 1));

  // side-view legs: near legs solid, far legs (behind the body) in shade
  const sideLeg = (k: number, far: boolean) => {
    const hx = hipX(k) + (far ? th * 0.12 : 0), hy = hipY - (far ? th * 0.12 : 0);
    const off = (far ? (k + 1) % 2 : k % 2) * 0.5;
    const u = crawl ? (((stride + off) % 1) + 1) % 1 : 0;
    const reach = legLen * 0.75 * dirK(k);
    let fx: number, fy: number;
    if (airborne) { fx = hx + dirK(k) * legLen * 0.35; fy = hy + legLen * 0.9 + Math.sin(f * 0.4 + k) * 2; }
    else if (u < 0.5) { fx = hx + reach * (1 - 4 * u); fy = 0; }
    else { const v = (u - 0.5) * 2; fx = hx - reach + 2 * reach * v; fy = -legLen * 0.35 * Math.sin(Math.PI * v); }
    const a: P2 = [hx, hy], b: P2 = [fx, fy];
    const kn: P2 = [(a[0] + b[0]) / 2 + dirK(k) * legLen * 0.1, (a[1] + b[1]) / 2 - legLen * 0.2];
    return <Leg key={`${far ? "f" : "n"}${k}`} a={a} k={kn} b={b} w={lw} c={far ? legFar : legC} />;
  };

  // top-view legs: one side points up the page (far, shaded), the other down (near), feet on the ground line
  const topLeg = (k: number, sd: 1 | -1) => {
    const hx = hipX(k), hy = by + sd * th * 0.45;
    const b: P2 = [hx + dirK(k) * legLen * 0.9, by + sd * legLen * 1.15];
    const a: P2 = [hx, hy], kn: P2 = [(a[0] + b[0]) / 2 + legLen * 0.12, (a[1] + b[1]) / 2];
    return <Leg key={`t${k}${sd}`} a={a} k={kn} b={b} w={lw} c={sd > 0 ? legC : legFar} />;
  };

  // butterfly wings in a local frame: x forward, wing reaches outward along -y; border (wc2) + inner colour (wc) + white dots
  const bflyWing = (L: number, fc: string, bc: string, key: string) => {
    const fore = (k: number) => `M 0 0 C ${f1(L * 0.5 * k)} ${f1(-L * 0.4 * k)} ${f1(L * 0.55 * k)} ${f1(-L * 0.95 * k)} ${f1(L * 0.15 * k)} ${f1(-L * k)} C ${f1(-L * 0.25 * k)} ${f1(-L * k)} ${f1(-L * 0.4 * k)} ${f1(-L * 0.6 * k)} 0 0 Z`;
    const hind = (k: number) => `M 0 0 C ${f1(-L * 0.1 * k)} ${f1(-L * 0.6 * k)} ${f1(-L * 0.55 * k)} ${f1(-L * 0.8 * k)} ${f1(-L * 0.72 * k)} ${f1(-L * 0.5 * k)} C ${f1(-L * 0.82 * k)} ${f1(-L * 0.2 * k)} ${f1(-L * 0.4 * k)} 0 0 0 Z`;
    const dots: P2[] = [[0.28, -0.82], [0.05, -0.9], [0.4, -0.62], [-0.55, -0.45]];
    return <g key={key}>
      <path d={hind(1)} fill={bc} /><path d={hind(0.84)} fill={shade(fc, 0.08)} transform={`translate(${f1(-L * 0.04)} ${f1(-L * 0.04)})`} />
      <path d={fore(1)} fill={bc} /><path d={fore(0.82)} fill={fc} transform={`translate(${f1(L * 0.03)} ${f1(-L * 0.06)})`} />
      {p.wingSpots && dots.map((d, i) => <circle key={i} cx={d[0] * L} cy={d[1] * L} r={L * 0.045} fill="#FFFFFF" />)}
    </g>;
  };

  // side wings: root on top of the thorax; flapping = scaleY around the root
  const R: P2 = [-th * 0.05, by - th * 0.7];
  const wingShape = (kind: BugWings, far: boolean): React.ReactNode => {
    const L = wl, fc = far ? shade(wc, 0.12) : wc;
    if (kind === "clear") return <ellipse cx={-L * 0.45} cy={-L * 0.12} rx={L * 0.5} ry={L * 0.26} fill={far ? "#BFE6F7" : "#E6F6FF"} opacity={0.6} />;
    if (kind === "long") return <g>{[0, 1].map((i) => <ellipse key={i} cx={-L * 0.5} cy={-L * 0.06 - i * L * 0.16} rx={L * 0.55} ry={L * 0.07} fill={far ? "#BFE6F7" : "#E6F6FF"} opacity={0.6} />)}</g>;
    if (kind === "shell") return <ellipse cx={-L * 0.5} cy={-L * 0.2} rx={L * 0.5} ry={L * 0.4} fill={fc} />;
    if (kind === "grasshopper") return <ellipse cx={-L * 0.3} cy={-L * 0.05} rx={L * 0.6} ry={L * 0.13} fill={fc} />;
    if (kind === "moth") return <path d={`M 0 0 Q ${f1(-L * 0.95)} ${f1(-L * 0.1)} ${f1(-L * 0.6)} ${f1(-L * 0.95)} Q ${f1(-L * 0.3)} ${f1(-L * 0.55)} 0 0 Z`} fill={fc} />;
    if (kind === "butterfly") return bflyWing(L * 0.95, fc, far ? shade(wc2, 0.1) : wc2, far ? "bf" : "bn");
    return null;
  };
  const sideWings = (far: boolean) => {
    const kind: BugWings = wings === "shell" ? (airborne ? "clear" : "none") : wings;
    if (kind === "none") return null;
    const tx = R[0] + (far ? -th * 0.25 : 0);
    return <g transform={`translate(${f1(tx)} ${f1(R[1])}) scale(1 ${f1(wingSy)}) rotate(${far ? -28 : -12})`}>{wingShape(kind, far)}</g>;
  };

  // top wings: a pair on each side of the body (butterflies spread wide)
  const topWings = (sd: 1 | -1) => {
    if (wings === "none" || (wings === "shell" && !airborne)) return null;
    if (wings === "butterfly") {
      const sy = airborne ? 0.55 + 0.45 * (0.5 + 0.5 * beat) : 1;
      return <g transform={`translate(${f1(th * 0.1)} ${f1(by)}) scale(1 ${f1(sd > 0 ? -sy : sy)})`}>{bflyWing(wl * 0.9, wc, wc2, `tw${sd}`)}</g>;
    }
    const clear = wings === "clear" || wings === "long";
    return <ellipse cx={-ab * 0.3} cy={by + sd * (th * 0.9 + wl * 0.3)} rx={wl * 0.55} ry={wl * 0.2} transform={`rotate(${-20 * sd} ${f1(-ab * 0.3)} ${f1(by + sd * (th * 0.9 + wl * 0.3))})`}
      fill={clear ? "#E6F6FF" : wc} opacity={clear ? 0.6 : 1} />;
  };

  // abdomen
  const abdomen = pointed
    ? <path d={`M ${f1(-th * 0.4)} ${f1(acy - abH * 0.85)} Q ${f1(-th * 0.4 - ab * 0.55)} ${f1(acy - abH * 0.9)} ${f1(-th * 0.7 - ab)} ${f1(acy)} Q ${f1(-th * 0.4 - ab * 0.55)} ${f1(acy + abH * 0.9)} ${f1(-th * 0.4)} ${f1(acy + abH * 0.85)} Z`} fill={col} />
    : <ellipse cx={acx} cy={acy} rx={arx} ry={ary} fill={col} />;
  const abPattern = pat === "stripes"
    ? <g>{[-0.55, -0.15, 0.25, 0.55].map((k) => <ellipse key={k} cx={acx + k * arx} cy={acy} rx={arx * 0.1} ry={ary * Math.sqrt(1 - k * k) * 0.95} fill={patC} />)}</g>
    : pat === "spots"
      ? <g>{SPOTS.map(([u, v, k], i) => <circle key={i} cx={acx + u * arx} cy={acy + v * ary} r={ary * 0.17 * k} fill={patC} />)}</g>
      : pat === "dots-edge"
        ? <g>{Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return <circle key={i} cx={acx + Math.cos(a) * arx * 0.8} cy={acy + Math.sin(a) * ary * 0.8} r={ary * 0.12} fill={patC} />; })}</g>
        : null;
  const glow = p.glow ? <ellipse cx={acx - arx * 0.2} cy={acy} rx={arx * 1.4} ry={ary * 1.35} fill="#FFF3A0" opacity={0.3 + 0.3 * Math.sin(f / 4)} /> : null;
  const tipX = pointed ? -(th * 0.7 + ab) : acx - arx;
  const stinger = p.stinger ? <path d={`M ${f1(tipX + hr * 0.3)} ${f1(acy - ary * 0.2)} L ${f1(tipX - hr * 0.7)} ${f1(acy)} L ${f1(tipX + hr * 0.3)} ${f1(acy + ary * 0.2)} Z`} fill={C.ink} /> : null;
  const shellSplit = wings === "shell" ? <rect x={acx - arx * 0.9} y={acy - 1.5} width={arx * 1.8} height={3} fill={shade(col, 0.3)} /> : null;
  const waist = p.waist ? <ellipse cx={-th * 1.05} cy={acy - th * 0.05} rx={th * 0.14} ry={th * 0.24} fill={col2} /> : null;
  const thorax = <ellipse cx={0} cy={by} rx={th * 1.15} ry={th * 0.9} fill={thC} />;

  // antennae: thin, clubbed, feathery, or elbow (bent)
  const antenna = (sd: 1 | -1) => {
    if (antK === "none") return null;
    const wob = Math.sin(f * 0.25 + sd) * hr * 0.25;
    const b: P2 = top ? [Hc[0] + hr * 0.5, Hc[1] + sd * hr * 0.5] : [Hc[0] + hr * (sd > 0 ? 0.15 : -0.1), Hc[1] - hr * 0.7];
    const tip: P2 = top ? [b[0] + antL * 0.6 + wob, b[1] + sd * antL * 0.7] : [b[0] + antL * 0.45 + wob, b[1] - antL * 0.9];
    const ctl: P2 = top ? [b[0] + antL * 0.4, b[1] + sd * antL * 0.1] : [b[0] + antL * 0.1, b[1] - antL * 0.6];
    const knee: P2 = top ? [b[0] + antL * 0.35, b[1] + sd * antL * 0.4] : [b[0] + antL * 0.35 + wob * 0.3, b[1] - antL * 0.55];
    const tipE: P2 = [knee[0] + antL * 0.3 + wob, knee[1] + (top ? sd * antL * 0.1 : -antL * 0.05)];
    const c = sd < 0 ? shade(antC, 0.25) : antC, w = Math.max(2.5, hr * 0.09);
    const d = antK === "elbow" ? `M ${pt(b)} L ${pt(knee)} L ${pt(tipE)}` : `M ${pt(b)} Q ${pt(ctl)} ${pt(tip)}`;
    const end = antK === "elbow" ? tipE : tip;
    return <g key={`ant${sd}`}>
      <path d={d} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {antK === "clubbed" && <circle cx={end[0]} cy={end[1]} r={hr * 0.24} fill={c} />}
      {antK === "elbow" && <circle cx={end[0]} cy={end[1]} r={hr * 0.1} fill={c} />}
      {antK === "feathery" && [0.35, 0.55, 0.75].map((t) => { const q = qb(b, ctl, tip, t); return <path key={t} d={`M ${pt(q)} l ${f1(hr * 0.22)} ${f1(-hr * 0.3)} M ${pt(q)} l ${f1(-hr * 0.22)} ${f1(-hr * 0.3)}`} stroke={c} strokeWidth={w * 0.7} strokeLinecap="round" fill="none" />; })}
    </g>;
  };

  // head: circle, eyes, smile; top view puts the eyes on either side of the head
  const eyeAt = (ex: number, ey: number) => {
    const er = eyes === "big" ? hr * 0.42 : hr * 0.2;
    return <g key={`e${ex}${ey}`}><circle cx={ex} cy={ey} r={er} fill={C.ink} /><circle cx={ex + er * 0.35} cy={ey - er * 0.35} r={er * 0.3} fill={C.white} /></g>;
  };
  const eyeEl = eyes === "none" ? null : top
    ? <g>{eyeAt(Hc[0] + hr * 0.3, Hc[1] - hr * 0.45)}{eyeAt(Hc[0] + hr * 0.3, Hc[1] + hr * 0.45)}</g>
    : eyeAt(Hc[0] + hr * 0.35, Hc[1] - hr * 0.12);
  const jaws = p.pincers === "jaws" ? <path d={`M ${f1(Hc[0] + hr * 0.6)} ${f1(Hc[1] + hr * 0.15)} L ${f1(Hc[0] + hr * 1.35)} ${f1(Hc[1] + hr * 0.5)} L ${f1(Hc[0] + hr * 0.6)} ${f1(Hc[1] + hr * 0.55)} Z`} fill={col2} /> : null;
  const proboscis = p.proboscis && !top ? <path d={`M ${pt([Hc[0] + hr * 0.9, Hc[1] + hr * 0.25])} Q ${pt([Hc[0] + hr * 1.4, Hc[1] + hr * 0.5])} ${pt([Hc[0] + hr * 1.9, Hc[1] + hr * 1.1])}`} stroke={C.ink} strokeWidth={Math.max(2, hr * 0.08)} strokeLinecap="round" fill="none" /> : null;
  const headEl = (
    <g>
      <circle cx={Hc[0]} cy={Hc[1]} r={hr} fill={hcol} />
      {eyeEl}
      {!top && <path d={`M ${pt([Hc[0] + hr * 0.2, Hc[1] + hr * 0.4])} Q ${pt([Hc[0] + hr * 0.45, Hc[1] + hr * 0.62])} ${pt([Hc[0] + hr * 0.65, Hc[1] + hr * 0.38])}`} stroke={C.ink} strokeWidth={Math.max(2, hr * 0.09)} strokeLinecap="round" fill="none" />}
      {jaws}
      {proboscis}
    </g>
  );

  // hind legs of a grasshopper: big folded legs, knee forward, foot back on the ground
  const jumper = p.hindLegs === "jumper" && !top
    ? <Leg a={[-th * 0.2, by + th * 0.2]} k={[th * 0.1, -legLen * 0.45]} b={[-th * 0.9, 0]} w={lw * 1.8} c={legC} />
    : null;

  // legs
  const legsEl = top
    ? <g>{Array.from({ length: perSide }, (_, k) => <g key={k}>{topLeg(k, -1)}{topLeg(k, 1)}</g>)}</g>
    : <g>
      {Array.from({ length: perSide }, (_, k) => sideLeg(k, true))}
      {Array.from({ length: perSide }, (_, k) => sideLeg(k, false))}
      {jumper}
    </g>;

  const shadowW = top ? ab * 0.9 + th : ab * 0.6 + th * 1.2;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={shadowW} ry={Math.max(5, shadowW * 0.08)} fill={C.shadow} />
      {top ? <g>{topWings(-1)}{topWings(1)}</g> : sideWings(true)}
      {legsEl}
      {glow}
      {abdomen}
      {abPattern}
      {shellSplit}
      {stinger}
      {waist}
      {thorax}
      {!top && sideWings(false)}
      {antenna(-1)}
      {antenna(1)}
      {headEl}
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Bug {...p} />;
}
