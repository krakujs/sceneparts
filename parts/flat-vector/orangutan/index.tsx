import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector orangutan. Origin = feet (bottom centre), faces right, honours flip. About 550 px tall standing at s = 1.
// Shaggy orange-red coat, very long arms, dark face with cheek pads. pose stand: upright, arms hanging. pose sit: seated.

type P = [number, number];
const FUR = "#D2692E", DARK = shade(FUR, 0.22), FACE = "#4A2C20", PAD = "#8E5A3E", EYE = "#1F2433", SHAG = shade(FUR, 0.3);

const limb = (a: P, b: P, w0: number, w1: number, col: string, bend = 0) =>
  taper(a, [(a[0] + b[0]) / 2 + bend, (a[1] + b[1]) / 2], b, w0, w1, col, undefined, true);

function Head({ hx, hy, r }: { hx: number; hy: number; r: number }) {
  const E = (u: number, v: number, rx: number, ry: number, fill: string) => (
    <ellipse cx={hx + r * u} cy={hy + r * v} rx={r * rx} ry={r * ry} fill={fill} />
  );
  return (
    <g>
      {E(-0.8, 0.05, 0.22, 0.22, DARK)}
      <ellipse cx={hx} cy={hy} rx={r} ry={r * 0.95} fill={FUR} />
      {E(0.44, 0.08, 0.52, 0.74, FACE)}
      {E(0.16, 0.6, 0.66, 0.4, PAD)}
      {E(0.5, -0.16, 0.08, 0.07, EYE)}
      {E(0.86, 0.14, 0.07, 0.05, "#2A1812")}
      <path d={`M ${hx + r * 0.5} ${hy + r * 0.45} Q ${hx + r * 0.7} ${hy + r * 0.5} ${hx + r * 0.9} ${hy + r * 0.4}`} fill="none" stroke="#2A1812" strokeWidth={r * 0.05} strokeLinecap="round" />
    </g>
  );
}
// shaggy hair locks hanging from an edge
const locks = (pts: P[], col: string) =>
  pts.map((a, i) => <React.Fragment key={i}>{taper(a, [a[0] - 16, a[1] + 18], [a[0] - 8, a[1] + 44], 22, 2, col)}</React.Fragment>);

const STAND = {
  head: [40, -500, 82], torso: [-10, -370, 98, 112], chest: [20, -400, 86, 94], hips: [-10, -240, 78, 44],
  neck: [[10, -430], [25, -460], [35, -468]],
  hipN: [4, -240], kneeN: [18, -120], ankN: [8, -28], hipF: [-16, -240], kneeF: [-2, -120], ankF: [-10, -28],
  shN: [24, -430], elN: [56, -280], wrN: [80, -100], shF: [-16, -420], elF: [16, -270], wrF: [36, -96],
  hand: [2, 30, 34, 30], footOff: [16, -12, 34, 14], armW: [70, 50], armW2: [60, 44],
  locks: [[-98, -410], [-102, -360], [-98, -310], [-86, -270]] as P[],
};
const SIT = {
  head: [30, -400, 80], torso: [-20, -240, 100, 116], chest: [14, -270, 90, 96], hips: [-20, -62, 98, 60],
  neck: [[10, -330], [24, -360], [30, -370]],
  hipN: [30, -80], kneeN: [140, -70], ankN: [150, -22], hipF: [10, -70], kneeF: [128, -44], ankF: [146, -16],
  shN: [0, -310], elN: [40, -220], wrN: [60, -120], shF: [-30, -300], elF: [0, -210], wrF: [30, -120],
  hand: [4, 16, 32, 28], footOff: [20, -12, 36, 14], armW: [66, 48], armW2: [56, 42],
  locks: [[-104, -260], [-100, -220], [-96, -180]] as P[],
};

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, sit = (p.pose ?? "sit") === "sit";
  const K: any = sit ? SIT : STAND;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const bob = Math.sin(f / (sit ? 20 : 16)) * (sit ? 2 : 3);
  const sw = Math.sin(f * 0.04) * (sit ? 0 : 6);
  const wrN: P = [K.wrN[0] + sw, K.wrN[1]], wrF: P = [K.wrF[0] - sw, K.wrF[1]];

  const leg = (hip: P, knee: P, ank: P, col: string) => (
    <g>
      {limb(hip, knee, 76, 60, col)}
      {limb(knee, ank, 60, 50, col)}
      <ellipse cx={ank[0] + K.footOff[0]} cy={K.footOff[1]} rx={K.footOff[2]} ry={K.footOff[3]} fill={col} />
    </g>
  );
  const arm = (sh: P, el: P, wr: P, col: string) => (
    <g>
      {limb(sh, el, K.armW[0], K.armW[1], col)}
      {limb(el, wr, K.armW[1], K.armW2[1], col)}
      <ellipse cx={wr[0] + K.hand[0]} cy={wr[1] + K.hand[1]} rx={K.hand[2]} ry={K.hand[3]} fill={col} />
    </g>
  );
  const [hx, hy, hr] = K.head;

  return (
    <g transform={`translate(${x} ${y - bob}) scale(${p.flip ? -s : s} ${s})`}>
      {leg(K.hipF, K.kneeF, K.ankF, DARK)}
      {arm(K.shF, K.elF, wrF, DARK)}
      {leg(K.hipN, K.kneeN, K.ankN, FUR)}
      <ellipse cx={K.hips[0]} cy={K.hips[1]} rx={K.hips[2]} ry={K.hips[3]} fill={FUR} />
      <ellipse cx={K.torso[0]} cy={K.torso[1]} rx={K.torso[2]} ry={K.torso[3]} fill={FUR} />
      <ellipse cx={K.chest[0]} cy={K.chest[1]} rx={K.chest[2]} ry={K.chest[3]} fill={FUR} />
      {locks(K.locks, SHAG)}
      {taper(K.neck[0], K.neck[1], K.neck[2], 92, 84, FUR, undefined, true)}
      <Head hx={hx} hy={hy} r={hr} />
      {arm(K.shN, K.elN, wrN, FUR)}
    </g>
  );
}
