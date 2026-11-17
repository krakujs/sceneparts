import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector bird generator. Origin = feet on the ground (bottom centre), faces right, honours flip.
// Every size is in px at s = 1 (a sparrow is ~110 px tall, a flamingo ~420 px tall).
// Body = ellipse rotated by `upright` about its centre; head = circle; neck = thick round stroke;
// beak = one of ten shapes drawn from the front of the head.

export type BPose = "stand" | "walk" | "hop" | "peck" | "perch" | "fly" | "glide" | "swim" | "idle";
export type BBeak = "cone" | "short" | "hook" | "long" | "spear" | "flat" | "pouch" | "big" | "needle" | "curved";
export type BCrest = "none" | "tuft" | "spiky" | "crown" | "earTufts";
export type BComb = "none" | "rooster" | "turkey";
export type BTail = "short" | "long" | "forked" | "fan" | "train" | "wedge" | "up";
export type BPattern = "none" | "streaks" | "spots" | "bars" | "scales";

export type BirdSpec = {
  pose?: BPose; body?: number; bodyH?: number; neck?: number; neckAngle?: number; neckW?: number; neckBend?: number;
  upright?: number; head?: number; beak?: BBeak; beakLen?: number; beakColor?: string; beakTip?: string;
  color?: string; belly?: string; wingColor?: string; wingTip?: string; wingspan?: number; alt?: number; flightless?: boolean;
  headColor?: string; cap?: string; eyeRing?: string; eyeSize?: number; facialDisc?: boolean; discColor?: string;
  crest?: BCrest; crestColor?: string; comb?: BComb;
  tail?: BTail; tailLen?: number; tailColor?: string; tailDrop?: number; tailEye?: string;
  leg?: number; legColor?: string; webbed?: boolean;
  pattern?: BPattern; patternColor?: string;
};

type P2 = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const n1 = (v: number) => v.toFixed(1);
const P = (p: P2) => `${n1(p[0])} ${n1(p[1])}`;
const rot = (v: P2, a: number): P2 => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
const add = (a: P2, b: P2): P2 => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P2, k: number): P2 => [a[0] * k, a[1] * k];
const unit = (a: P2): P2 => { const m = Math.hypot(a[0], a[1]) || 1; return [a[0] / m, a[1] / m]; };
const perp = (a: P2): P2 => [-a[1], a[0]];
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Bird(p: PartProps<any> & BirdSpec) {
  const s = p.s ?? 1, f = p.f ?? 0, pose: BPose = p.pose ?? "stand";
  const body = p.body ?? 62, bodyH = p.bodyH ?? 46, head = p.head ?? 22, neck = p.neck ?? 0;
  const up = rad(p.upright ?? 0), upDeg = p.upright ?? 0;
  const color = p.color ?? C.brown, wingC = p.wingColor ?? shade(color, 0.1), wingFar = shade(wingC, 0.22);
  const headC = p.headColor ?? color, legC = p.legColor ?? C.brownDark, legFar = shade(legC, 0.22);
  const beakC = p.beakColor ?? C.yellow, tailC = p.tailColor ?? shade(wingC, 0.15), patC = p.patternColor ?? C.ink;
  const eyeRing = p.eyeRing && p.eyeRing !== "none" ? p.eyeRing : null;
  const flip = !!p.flip, x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;

  // motion flags
  const flying = pose === "fly", gliding = pose === "glide", swimming = pose === "swim", peck = pose === "peck";
  const perch = pose === "perch", hop = pose === "hop", walk = pose === "walk", idle = pose === "idle";
  const alt = p.alt ?? 120;
  const ph = f * (walk ? 0.3 : 0.2);
  const lift = flying ? alt + Math.sin(f * 0.5) * 3 : hop ? Math.abs(Math.sin(f * 0.22)) * 28 : 0;
  const leg = perch ? (p.leg ?? 30) * 0.35 : (p.leg ?? 30);
  const legW = clamp(leg * 0.06, 2.4, 7);
  const ext = Math.hypot((body / 2) * Math.sin(up), (bodyH / 2) * Math.cos(up)); // half-height of tilted body
  const breathe = 1 + (idle ? Math.sin(f / 12) * 0.025 : 0);
  const Cy = swimming ? -ext * 0.6 : flying || gliding ? -leg * 0.6 - ext : -leg - ext + 4;
  const Cb: P2 = [0, Cy];
  // body frame -> ground frame (dx, dy measured from body centre, unrotated)
  const R = (dx: number, dy: number): P2 => add(Cb, rot([dx, dy], -up));
  const legTop = Cy + bodyH * 0.3;
  const tuck = flying || gliding ? 1 : hop ? clamp(lift / 28, 0, 1) : 0;

  // neck and head
  const peckA = peck ? Math.max(0, Math.sin(f * 0.3)) : 0;
  const turn = idle ? Math.sin(f / 22) * head * 0.12 : 0;
  const nb = R(body * 0.3, -bodyH * 0.2);
  const nAng = rad((p.neckAngle ?? 40) - peckA * 60);
  const nDir: P2 = [Math.cos(nAng), -Math.sin(nAng)];
  let H: P2 = neck > 0 ? add(nb, mul(nDir, neck)) : R(body * 0.4, -bodyH * 0.08);
  H = add(H, [turn + (neck > 0 ? 0 : peckA * head * 0.6), neck > 0 ? 0 : peckA * head * 1.4]);
  const [h0, h1] = H;
  const nw = p.neckW ?? Math.max(5, head * 0.7);
  const bendPx = (p.neckBend ?? 0) * neck, pd = perp(nDir);
  const c1 = add(add(nb, mul(nDir, neck * 0.45)), mul(pd, bendPx));
  const c2 = add(add(H, mul(nDir, -neck * 0.45)), mul(pd, -bendPx));
  const neckEl = neck > 0 ? <path d={`M ${P(nb)} C ${P(c1)} ${P(c2)} ${P(H)}`} stroke={color} strokeWidth={nw} strokeLinecap="round" fill="none" /> : null;

  // wings
  const wingLen = (p.wingspan ?? 160) / 2;
  const shoulder = R(body * 0.05, -bodyH * 0.12);
  const flapA = flying ? -90 + Math.sin(f * 0.55) * 55 : gliding ? -100 : -90;
  const flightWing = (ang: number, col: string, key: string) => {
    const a = rad(ang), d: P2 = [Math.cos(a), Math.sin(a)], n = perp(d), wr = Math.max(bodyH * 0.5, wingLen * 0.4);
    const T = add(shoulder, mul(d, wingLen)), m = add(shoulder, mul(d, wingLen * 0.5));
    const A = add(shoulder, mul(n, wr / 2)), B = add(shoulder, mul(n, -wr / 2));
    const tipAt = add(shoulder, mul(d, wingLen * 0.7));
    return (
      <g key={key}>
        <path d={`M ${P(A)} Q ${P(add(m, mul(n, wr * 0.45)))} ${P(T)} Q ${P(add(m, mul(n, -wr * 0.2)))} ${P(B)} Z`} fill={col} />
        {p.wingTip && p.wingTip !== "none" && <path d={`M ${P(add(tipAt, mul(n, wr * 0.4)))} L ${P(T)} L ${P(add(tipAt, mul(n, -wr * 0.3)))} Z`} fill={p.wingTip} />}
      </g>
    );
  };
  const showFlight = (flying || gliding) && !p.flightless;

  // tail
  const tailLen0 = p.tailLen ?? body * 0.6, tailKind0: BTail = p.tail ?? "short", tailKind = tailKind0;
  const T0 = R(-body * 0.42, bodyH * 0.05);
  let D = unit(rot(rot([-1, 0], -rad(p.tailDrop ?? 15)), -up));
  if (tailKind === "up") D = unit(rot([-0.35, -1], -up));
  const N = perp(D), tw = bodyH * 0.22;
  // never let the tail reach below the feet (upright birds such as owls and penguins)
  const room = D[1] > 0.05 && !(flying || gliding) ? Math.max(4, (-T0[1] - 2) / D[1]) : 1e9;
  const tailLen = Math.min(tailLen0, room / (tailKind0 === "long" ? 1.6 : 1));
  const tE = add(T0, mul(D, tailLen));
  const quad = (L: number, w: number) => {
    const E = add(T0, mul(D, L));
    return <path d={`M ${P(add(T0, mul(N, w)))} L ${P(add(E, mul(N, w * 0.6)))} L ${P(add(E, mul(N, -w * 0.6)))} L ${P(add(T0, mul(N, -w)))} Z`} fill={tailC} />;
  };
  let tailEl: React.ReactNode = null;
  if (tailKind === "short" || tailKind === "up") tailEl = quad(tailLen, tw);
  else if (tailKind === "long") tailEl = quad(tailLen * 1.6, tw * 0.6);
  else if (tailKind === "forked") {
    const notch = add(T0, mul(D, tailLen * 0.72)), E1 = add(tE, mul(N, tw * 0.8)), E2 = add(tE, mul(N, -tw * 0.8));
    tailEl = <path d={`M ${P(add(T0, mul(N, tw)))} L ${P(E1)} L ${P(notch)} L ${P(E2)} L ${P(add(T0, mul(N, -tw)))} Z`} fill={tailC} />;
  } else if (tailKind === "wedge") {
    const E1 = add(tE, mul(N, tw * 2.2)), E2 = add(tE, mul(N, -tw * 2.2));
    tailEl = <path d={`M ${P(add(T0, mul(N, tw)))} L ${P(E1)} L ${P(E2)} L ${P(add(T0, mul(N, -tw)))} Z`} fill={tailC} />;
  } else if (tailKind === "fan") {
    const R0 = tailLen0 * 1.25, Df = unit(rot([-0.35, -1], 0));
    const Pa = (a: number, r: number) => add(T0, mul(rot(Df, rad(a)), r));
    const spots: P2[] = [];
    for (const a of [-60, -36, -12, 12, 36, 60]) spots.push(Pa(a, R0 * 0.82));
    for (const a of [-48, -24, 0, 24, 48]) spots.push(Pa(a, R0 * 0.55));
    tailEl = (
      <g>
        <path d={`M ${P(T0)} L ${P(Pa(-80, R0))} A ${n1(R0)} ${n1(R0)} 0 0 1 ${P(Pa(80, R0))} Z`} fill={tailC} />
        <path d={`M ${P(T0)} L ${P(Pa(-80, R0 * 0.93))} A ${n1(R0 * 0.93)} ${n1(R0 * 0.93)} 0 0 1 ${P(Pa(80, R0 * 0.93))} Z`} fill={shade(tailC, -0.25)} opacity={0.35} />
        {spots.map((q, i) => <g key={i}><ellipse cx={q[0]} cy={q[1]} rx={R0 * 0.075} ry={R0 * 0.095} fill={p.tailEye ?? C.teal} /><circle cx={q[0]} cy={q[1]} r={R0 * 0.04} fill={C.navy} /></g>)}
      </g>
    );
  } else if (tailKind === "train") {
    tailEl = (
      <g>
        {[-14, -5, 4, 13].map((a, i) => {
          const E = add(T0, mul(rot(D, rad(a)), tailLen * 1.7));
          return <g key={i}><line x1={T0[0]} y1={T0[1]} x2={E[0]} y2={E[1]} stroke={tailC} strokeWidth={bodyH * 0.13} strokeLinecap="round" /><circle cx={E[0]} cy={E[1]} r={bodyH * 0.17} fill={p.tailEye ?? C.teal} /></g>;
        })}
      </g>
    );
  }

  // legs and feet
  const legAt = (i: 0 | 1) => {
    const lx = i ? body * 0.12 : -body * 0.1, far = i === 1;
    const fx = lx + (walk ? Math.sin(ph + i * Math.PI) * leg * 0.22 : 0);
    const footY = tuck > 0 ? legTop + leg * 0.3 : 0;
    const c = far ? legFar : legC;
    return (
      <g key={"leg" + i}>
        <line x1={lx} y1={legTop} x2={tuck > 0 ? lx : fx} y2={footY} stroke={c} strokeWidth={legW} strokeLinecap="round" />
        {tuck === 0 && (p.webbed
          ? <path d={`M ${n1(fx - legW)} 0 L ${n1(fx + legW * 2.4)} 0 L ${n1(fx + legW * 0.6)} ${n1(-legW * 1.2)} Z`} fill={c} />
          : <g stroke={c} strokeWidth={legW * 0.6} strokeLinecap="round"><line x1={fx} y1={0} x2={fx + legW * 1.8} y2={0} /><line x1={fx} y1={0} x2={fx - legW * 0.8} y2={0} /></g>)}
      </g>
    );
  };

  // body details
  const bodyDetails: React.ReactNode[] = [];
  const pat = p.pattern ?? "none";
  if (pat === "streaks") for (let i = 0; i < 5; i++) { const xx = -body * 0.18 + i * body * 0.11; bodyDetails.push(<line key={"s" + i} x1={xx} y1={Cy - bodyH * 0.1} x2={xx + body * 0.02} y2={Cy + bodyH * 0.22} stroke={patC} strokeWidth={Math.max(1.6, bodyH * 0.06)} strokeLinecap="round" />); }
  if (pat === "spots") for (let i = 0; i < 6; i++) { const xx = -body * 0.25 + (i % 3) * body * 0.2 + (i > 2 ? body * 0.1 : 0), yy = Cy - bodyH * 0.1 + (i > 2 ? bodyH * 0.25 : 0); bodyDetails.push(<circle key={"p" + i} cx={xx} cy={yy} r={bodyH * 0.07} fill={patC} />); }
  if (pat === "bars") for (let i = 0; i < 3; i++) { const yy = Cy - bodyH * 0.2 + i * bodyH * 0.2; bodyDetails.push(<line key={"b" + i} x1={-body * 0.3} y1={yy} x2={body * 0.25} y2={yy} stroke={patC} strokeWidth={Math.max(1.6, bodyH * 0.06)} strokeLinecap="round" />); }
  if (pat === "scales") for (let i = 0; i < 6; i++) { const xx = -body * 0.2 + (i % 3) * body * 0.18, yy = Cy + (i > 2 ? bodyH * 0.2 : 0); bodyDetails.push(<path key={"c" + i} d={`M ${n1(xx)} ${n1(yy)} q ${n1(bodyH * 0.08)} ${n1(-bodyH * 0.08)} ${n1(bodyH * 0.16)} 0`} stroke={patC} strokeWidth={1.6} fill="none" />); }

  // beak
  const bb = add(H, [head * 0.8, head * 0.12]);
  const bk: BBeak = p.beak ?? "cone";
  const tipC = p.beakTip && p.beakTip !== "none" ? p.beakTip : null;
  const triTip = (L: number, h: number) => tipC && <polygon points={`${n1(L * 0.62)},${n1(-h * 0.2)} ${n1(L)},0 ${n1(L * 0.62)},${n1(h * 0.2)}`} fill={tipC} />;
  const tri = (L: number, h: number) => (
    <g>
      <path d={`M 0 ${n1(-h / 2)} Q ${n1(L * 0.6)} ${n1(-h / 2)} ${n1(L)} 0 Q ${n1(L * 0.6)} ${n1(h / 2)} 0 ${n1(h / 2)} Z`} fill={beakC} />
      {triTip(L, h)}
    </g>
  );
  let beakEl: React.ReactNode;
  if (bk === "cone" || bk === "short") {
    const L = p.beakLen ?? (bk === "cone" ? head * 0.9 : head * 0.5);
    beakEl = tri(L, head * 0.6);
  } else if (bk === "hook") {
    const L = p.beakLen ?? head * 0.85, h = head * 0.55;
    beakEl = <path d={`M 0 ${n1(-h / 2)} Q ${n1(L * 0.9)} ${n1(-h / 2)} ${n1(L)} ${n1(h * 0.25)} Q ${n1(L * 0.85)} ${n1(h * 0.02)} 0 ${n1(h / 2)} Z`} fill={beakC} />;
  } else if (bk === "long") {
    const L = p.beakLen ?? head * 2, h = head * 0.3;
    beakEl = tri(L, h);
  } else if (bk === "spear") {
    const L = p.beakLen ?? head * 2.6, h = Math.max(2.5, head * 0.2);
    beakEl = tri(L, h);
  } else if (bk === "flat") {
    const L = p.beakLen ?? head * 0.95, h = head * 0.4;
    beakEl = <ellipse cx={L / 2} cy={0} rx={L / 2} ry={h / 2} fill={beakC} />;
  } else if (bk === "pouch") {
    const L = p.beakLen ?? head * 1.5, h = head * 0.22;
    beakEl = (
      <g>
        <ellipse cx={L * 0.55} cy={h * 1.1} rx={L * 0.42} ry={h * 1.1} fill={shade(beakC, 0.15)} />
        <path d={`M 0 ${n1(-h / 2)} Q ${n1(L * 0.6)} ${n1(-h / 2)} ${n1(L)} 0 Q ${n1(L * 0.6)} ${n1(h / 2)} 0 ${n1(h / 2)} Z`} fill={beakC} />
      </g>
    );
  } else if (bk === "big") {
    const L = p.beakLen ?? head * 1.4, h = head * 0.9;
    beakEl = <path d={`M 0 ${n1(-h * 0.4)} Q ${n1(L * 0.6)} ${n1(-h * 0.7)} ${n1(L)} ${n1(-h * 0.1)} Q ${n1(L * 1.02)} ${n1(h * 0.2)} ${n1(L * 0.9)} ${n1(h * 0.25)} Q ${n1(L * 0.5)} ${n1(h * 0.5)} 0 ${n1(h * 0.45)} Z`} fill={beakC} />;
  } else if (bk === "needle") {
    const L = p.beakLen ?? head * 2.4, h = Math.max(2.5, head * 0.12);
    beakEl = tri(L, h);
  } else {
    const L = p.beakLen ?? head * 2.1, h = head * 0.7;
    beakEl = (
      <g>
        <path d={`M 0 ${n1(-h / 2)} Q ${n1(L * 0.45)} ${n1(-h * 0.6)} ${n1(L * 0.62)} ${n1(-h * 0.25)} Q ${n1(L * 0.85)} ${n1(h * 0.3)} ${n1(L * 0.82)} ${n1(h * 1.5)} Q ${n1(L * 0.6)} ${n1(h * 0.6)} ${n1(L * 0.45)} ${n1(h * 0.4)} Q ${n1(L * 0.2)} ${n1(h * 0.5)} 0 ${n1(h / 2)} Z`} fill={beakC} />
        {tipC && <path d={`M ${n1(L * 0.66)} ${n1(-h * 0.15)} Q ${n1(L * 0.85)} ${n1(h * 0.3)} ${n1(L * 0.82)} ${n1(h * 1.5)} Q ${n1(L * 0.66)} ${n1(h * 0.75)} ${n1(L * 0.56)} ${n1(h * 0.45)} Z`} fill={tipC} />}
      </g>
    );
  }

  // head details
  const crest = p.crest ?? "none", crestC = p.crestColor ?? color;
  let crestEl: React.ReactNode = null;
  const hx = (k: number) => h0 + head * k, hy = (k: number) => h1 + head * k;
  if (crest === "tuft") crestEl = <path d={`M ${n1(hx(-0.6))} ${n1(hy(-0.5))} Q ${n1(hx(-0.95))} ${n1(hy(-1.2))} ${n1(hx(-0.4))} ${n1(hy(-1.35))} Q ${n1(hx(-0.3))} ${n1(hy(-0.9))} ${n1(hx(0.1))} ${n1(hy(-0.8))} Z`} fill={crestC} />;
  if (crest === "spiky") crestEl = <path d={`M ${n1(hx(-0.7))} ${n1(hy(-0.4))} L ${n1(hx(-0.8))} ${n1(hy(-1.3))} L ${n1(hx(-0.4))} ${n1(hy(-0.8))} L ${n1(hx(-0.3))} ${n1(hy(-1.5))} L ${n1(hx(0))} ${n1(hy(-0.9))} L ${n1(hx(0.1))} ${n1(hy(-1.3))} L ${n1(hx(0.4))} ${n1(hy(-0.5))} Z`} fill={crestC} />;
  if (crest === "crown") crestEl = <path d={`M ${n1(hx(-0.9))} ${n1(hy(0.2))} L ${n1(hx(-0.7))} ${n1(hy(-1.0))} L ${n1(hx(-0.25))} ${n1(hy(-0.4))} L ${n1(hx(0))} ${n1(hy(-1.2))} L ${n1(hx(0.3))} ${n1(hy(-0.4))} L ${n1(hx(0.7))} ${n1(hy(-1.0))} L ${n1(hx(0.8))} ${n1(hy(0.2))} Z`} fill={crestC} />;
  if (crest === "earTufts") crestEl = (
    <g fill={crestC}>
      <path d={`M ${n1(hx(-0.85))} ${n1(hy(-0.2))} L ${n1(hx(-0.7))} ${n1(hy(-1.25))} L ${n1(hx(-0.25))} ${n1(hy(-0.6))} Z`} />
      <path d={`M ${n1(hx(0.25))} ${n1(hy(-0.6))} L ${n1(hx(0.7))} ${n1(hy(-1.25))} L ${n1(hx(0.85))} ${n1(hy(-0.2))} Z`} />
    </g>
  );

  const disc = !!p.facialDisc;
  const eyeR = head * (disc ? 0.34 : 0.17) * (p.eyeSize ?? 1);
  const eyes: P2[] = disc ? [[hx(-0.2), hy(-0.12)], [hx(0.3), hy(-0.12)]] : [[hx(0.35), hy(-0.18)]];
  const eyeEl = (e: P2, key: number) => (
    <g key={key}>
      {eyeRing && <circle cx={e[0]} cy={e[1]} r={eyeR * 1.35} fill={eyeRing} />}
      <circle cx={e[0]} cy={e[1]} r={eyeR} fill={C.ink} />
      <circle cx={e[0] + eyeR * 0.35} cy={e[1] - eyeR * 0.35} r={eyeR * 0.32} fill={C.white} />
    </g>
  );
  const cap = p.cap && p.cap !== "none" ? <path d={`M ${n1(hx(-0.92))} ${n1(hy(-0.12))} A ${n1(head)} ${n1(head)} 0 0 1 ${n1(hx(0.92))} ${n1(hy(-0.12))} Z`} fill={p.cap} /> : null;
  const comb = p.comb ?? "none";
  let combEl: React.ReactNode = null;
  if (comb === "rooster") combEl = (
    <g fill={C.red}>
      <circle cx={hx(-0.1)} cy={hy(-0.92)} r={head * 0.22} /><circle cx={hx(0.2)} cy={hy(-1.0)} r={head * 0.26} /><circle cx={hx(0.48)} cy={hy(-0.78)} r={head * 0.2} />
      <ellipse cx={bb[0] - head * 0.22} cy={bb[1] + head * 0.42} rx={head * 0.14} ry={head * 0.3} />
    </g>
  );
  if (comb === "turkey") combEl = (
    <g fill={C.red}>
      <ellipse cx={bb[0] - head * 0.15} cy={bb[1] + head * 0.15} rx={head * 0.12} ry={head * 0.4} />
      <ellipse cx={bb[0] - head * 0.3} cy={bb[1] + head * 0.45} rx={head * 0.13} ry={head * 0.22} />
    </g>
  );

  // shadow and water
  const shW = body * 0.7 * (1 - clamp(lift / 300, 0, 0.5));
  const body2 = (
    <g transform={`rotate(${n1(-upDeg)} 0 ${n1(Cy)})`}>
      <ellipse cx={0} cy={Cy} rx={body / 2} ry={(bodyH / 2) * breathe} fill={color} />
      {p.belly && p.belly !== "none" && <ellipse cx={body * 0.05} cy={Cy + bodyH * 0.28} rx={body * 0.34} ry={bodyH * 0.22} fill={p.belly} />}
      {bodyDetails}
      {!showFlight && (p.flightless
        ? <ellipse cx={-body * 0.05} cy={Cy - bodyH * 0.02} rx={body * 0.14} ry={bodyH * 0.16} fill={wingC} />
        : <g>
            <ellipse cx={-body * 0.08} cy={Cy - bodyH * 0.03} rx={body * 0.36} ry={bodyH * 0.34} fill={wingC} />
            {p.wingTip && p.wingTip !== "none" && <ellipse cx={-body * 0.36} cy={Cy} rx={body * 0.12} ry={bodyH * 0.16} fill={p.wingTip} />}
          </g>)}
    </g>
  );

  return (
    <g transform={`translate(${n1(x)} ${n1(y)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={shW} ry={5} fill={C.shadow} />
      <g transform={`translate(0 ${n1(-lift)})`}>
        {showFlight && flightWing(flapA + (flying ? 14 : 8), wingFar, "wf")}
        {tailEl}
        {!swimming && legAt(1)}
        {!swimming && legAt(0)}
        {body2}
        {neckEl}
        {showFlight && flightWing(flapA, wingC, "wn")}
        {crestEl}
        <circle cx={h0} cy={h1} r={head} fill={headC} />
        {cap}
        {disc && <circle cx={h0 + head * 0.05} cy={h1} r={head * 0.82} fill={p.discColor ?? C.sand} />}
        {combEl}
        {eyes.map((e, i) => eyeEl(e, i))}
        <g transform={`translate(${n1(bb[0])} ${n1(bb[1])})`}>{beakEl}</g>
      </g>
      {swimming && <ellipse cx={0} cy={0} rx={body * 0.95} ry={6} fill={C.skyDeep} />}
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Bird {...p} />;
}
