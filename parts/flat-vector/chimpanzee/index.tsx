import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector chimpanzee. Origin = feet (bottom centre), faces right, honours flip. About 570 px tall standing at s = 1.
// pose stand: upright with a slight sway. pose knuckle: walking on knuckles, limbs swing from p.f.

type P = [number, number];
const BODY = "#3A2A22", DARK = shade(BODY, 0.22), FACE = "#E8C29A", LIP = "#8A5540", EAR_IN = "#6B4636", EYE = "#1F2433";

const limb = (a: P, b: P, w0: number, w1: number, col: string, bend = 0) =>
  taper(a, [(a[0] + b[0]) / 2 + bend, (a[1] + b[1]) / 2], b, w0, w1, col, undefined, true);

function Head({ hx, hy, r }: { hx: number; hy: number; r: number }) {
  const E = (u: number, v: number, rx: number, ry: number, fill: string) => (
    <ellipse cx={hx + r * u} cy={hy + r * v} rx={r * rx} ry={r * ry} fill={fill} />
  );
  return (
    <g>
      {E(-0.84, -0.12, 0.38, 0.38, FACE)}
      {E(-0.84, -0.12, 0.2, 0.2, EAR_IN)}
      <ellipse cx={hx} cy={hy} rx={r} ry={r * 0.95} fill={BODY} />
      {E(0.42, 0.22, 0.55, 0.7, FACE)}
      {E(0.46, -0.06, 0.07, 0.08, EYE)}
      {E(0.86, 0.24, 0.07, 0.05, LIP)}
      <path d={`M ${hx + r * 0.6} ${hy + r * 0.56} Q ${hx + r * 0.78} ${hy + r * 0.66} ${hx + r * 0.96} ${hy + r * 0.5}`} fill="none" stroke={LIP} strokeWidth={r * 0.05} strokeLinecap="round" />
    </g>
  );
}

const STAND = {
  head: [45, -500, 70], torso: [-5, -380, 92, 118], chest: [22, -420, 84, 100], hips: [-10, -250, 72, 44],
  neck: [[5, -440], [25, -470], [40, -478]],
  hipN: [5, -250], kneeN: [22, -130], ankN: [14, -30], hipF: [-18, -250], kneeF: [-2, -130], ankF: [-10, -30],
  shN: [30, -440], elN: [48, -290], wrN: [52, -130], shF: [-10, -430], elF: [14, -290], wrF: [18, -130],
  hand: [6, 34, 36, 42], footOff: [14, -14, 40, 16],
};
const KNUCKLE = {
  head: [150, -330, 66], torso: [-10, -255, 118, 78], chest: [55, -270, 84, 82], hips: [-75, -195, 62, 56],
  neck: [[90, -290], [120, -320], [140, -330]],
  hipN: [-60, -190], kneeN: [-40, -90], ankN: [-62, -22], hipF: [-85, -185], kneeF: [-70, -90], ankF: [-90, -22],
  shN: [70, -270], elN: [100, -150], wrN: [130, -40], shF: [40, -260], elF: [70, -140], wrF: [96, -40],
  hand: [10, 16, 40, 22], footOff: [18, -14, 40, 15],
};

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, knuckle = (p.pose ?? "knuckle") === "knuckle";
  const K: any = knuckle ? KNUCKLE : STAND;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const ph = f * (knuckle ? 0.14 : 0.05), sw = Math.sin(ph);
  const bob = knuckle ? Math.abs(sw) * 6 : Math.sin(f / 15) * 3;
  const aN = knuckle ? sw * 26 : sw * 6, lN = knuckle ? -sw * 22 : 0;
  const wrN: P = [K.wrN[0] + aN, K.wrN[1]], wrF: P = [K.wrF[0] - aN, K.wrF[1]];
  const ankN: P = [K.ankN[0] + lN, K.ankN[1]], ankF: P = [K.ankF[0] - lN, K.ankF[1]];

  const leg = (hip: P, knee: P, ank: P, col: string) => (
    <g>
      {limb(hip, knee, 86, 64, col)}
      {limb(knee, ank, 64, 50, col)}
      <ellipse cx={ank[0] + K.footOff[0]} cy={K.footOff[1]} rx={K.footOff[2]} ry={K.footOff[3]} fill={col} />
    </g>
  );
  const arm = (sh: P, el: P, wr: P, col: string) => (
    <g>
      {limb(sh, el, 66, 52, col)}
      {limb(el, wr, 52, 42, col)}
      <ellipse cx={wr[0] + K.hand[0]} cy={wr[1] + K.hand[1]} rx={K.hand[2]} ry={K.hand[3]} fill={col} />
    </g>
  );
  const [hx, hy, hr] = K.head;
  const neck = K.neck;

  return (
    <g transform={`translate(${x} ${y - bob}) scale(${p.flip ? -s : s} ${s})`}>
      {leg(K.hipF, K.kneeF, ankF, DARK)}
      {arm(K.shF, K.elF, wrF, DARK)}
      {leg(K.hipN, K.kneeN, ankN, BODY)}
      <ellipse cx={K.hips[0]} cy={K.hips[1]} rx={K.hips[2]} ry={K.hips[3]} fill={BODY} />
      <ellipse cx={K.torso[0]} cy={K.torso[1]} rx={K.torso[2]} ry={K.torso[3]} fill={BODY} />
      <ellipse cx={K.chest[0]} cy={K.chest[1]} rx={K.chest[2]} ry={K.chest[3]} fill={BODY} />
      {taper(neck[0], neck[1], neck[2], 80, 70, BODY, undefined, true)}
      <Head hx={hx} hy={hy} r={hr} />
      {arm(K.shN, K.elN, wrN, BODY)}
    </g>
  );
}
