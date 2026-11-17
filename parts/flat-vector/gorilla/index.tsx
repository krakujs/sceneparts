import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector gorilla. Origin = feet (bottom centre), faces right, honours flip. About 700 px tall standing at s = 1.
// pose stand: upright with a slow breathing sway. pose knuckle: walks on its knuckles, limbs swing from p.f.

type P = [number, number];
const BODY = "#343840", TORSO = "#4A4F59", DARK = shade(BODY, 0.22), SILVER = "#B9C1CC", FACE = "#5B4F49", FACE_DK = "#352C28", EYE = "#1F2433";

const limb = (a: P, b: P, w0: number, w1: number, col: string, bend = 0) =>
  taper(a, [(a[0] + b[0]) / 2 + bend, (a[1] + b[1]) / 2], b, w0, w1, col, undefined, true);

function Head({ hx, hy, r, col }: { hx: number; hy: number; r: number; col: string }) {
  const E = (u: number, v: number, rx: number, ry: number, fill: string) => (
    <ellipse cx={hx + r * u} cy={hy + r * v} rx={r * rx} ry={r * ry} fill={fill} />
  );
  return (
    <g>
      <ellipse cx={hx} cy={hy} rx={r} ry={r * 0.95} fill={col} />
      {E(0.5, 0.12, 0.5, 0.6, FACE)}
      {E(0.8, 0.3, 0.3, 0.26, FACE)}
      {taper([hx + r * 0.02, hy - r * 0.42], [hx + r * 0.5, hy - r * 0.52], [hx + r * 0.98, hy - r * 0.3], r * 0.26, r * 0.16, DARK)}
      {E(0.46, -0.16, 0.08, 0.07, EYE)}
      {E(0.88, 0.2, 0.06, 0.04, FACE_DK)}
      <path d={`M ${hx + r * 0.6} ${hy + r * 0.6} Q ${hx + r * 0.8} ${hy + r * 0.7} ${hx + r * 0.98} ${hy + r * 0.5}`} fill="none" stroke={FACE_DK} strokeWidth={r * 0.04} strokeLinecap="round" />
    </g>
  );
}

const STAND = {
  head: [40, -620, 92], torso: [-5, -420, 138, 138], chest: [25, -470, 118, 110], hips: [-10, -300, 110, 50],
  saddle: [-95, -450, 34, 62], neck: [[10, -550], [25, -588], [40, -612]],
  hipN: [10, -300], kneeN: [30, -150], ankN: [20, -40], hipF: [-30, -300], kneeF: [-10, -150], ankF: [-20, -40],
  shN: [40, -500], elN: [60, -340], wrN: [70, -160], shF: [-60, -490], elF: [-30, -330], wrF: [-20, -170],
  hand: [4, 40, 44, 50],
};
const KNUCKLE = {
  head: [205, -425, 88], torso: [-20, -340, 165, 105], chest: [60, -360, 110, 110], hips: [-90, -290, 80, 70],
  saddle: [-50, -415, 78, 20], neck: [[110, -400], [150, -440], [190, -420]],
  hipN: [-70, -290], kneeN: [10, -160], ankN: [-30, -40], hipF: [-110, -280], kneeF: [-50, -150], ankF: [-70, -40],
  shN: [80, -360], elN: [120, -200], wrN: [140, -60], shF: [40, -350], elF: [70, -200], wrF: [90, -60],
  hand: [12, 30, 50, 30],
};

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, knuckle = (p.pose ?? "knuckle") === "knuckle";
  const K: any = knuckle ? KNUCKLE : STAND;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const ph = f * (knuckle ? 0.12 : 0.04), sw = Math.sin(ph);
  const bob = knuckle ? Math.abs(sw) * 7 : Math.sin(f / 16) * 3;
  const aN = knuckle ? sw * 30 : sw * 8, lN = knuckle ? -sw * 25 : 0;
  const wrN: P = [K.wrN[0] + aN, K.wrN[1]], wrF: P = [K.wrF[0] - aN, K.wrF[1]];
  const ankN: P = [K.ankN[0] + lN, K.ankN[1]], ankF: P = [K.ankF[0] - lN, K.ankF[1]];

  const leg = (hip: P, knee: P, ank: P, col: string) => (
    <g>
      {limb(hip, knee, 120, 88, col)}
      {limb(knee, ank, 88, 70, col)}
      <ellipse cx={ank[0] + 22} cy={-24} rx={64} ry={24} fill={col} />
    </g>
  );
  const arm = (sh: P, el: P, wr: P, col: string) => (
    <g>
      {limb(sh, el, 100, 80, col)}
      {limb(el, wr, 80, 62, col)}
      <ellipse cx={wr[0] + K.hand[0]} cy={wr[1] + K.hand[1]} rx={K.hand[2]} ry={K.hand[3]} fill={col} />
    </g>
  );
  const [hx, hy, hr] = K.head;

  return (
    <g transform={`translate(${x} ${y - bob}) scale(${p.flip ? -s : s} ${s})`}>
      {leg(K.hipF, K.kneeF, ankF, DARK)}
      {arm(K.shF, K.elF, wrF, DARK)}
      {leg(K.hipN, K.kneeN, ankN, BODY)}
      <ellipse cx={K.hips[0]} cy={K.hips[1]} rx={K.hips[2]} ry={K.hips[3]} fill={TORSO} />
      <ellipse cx={K.torso[0]} cy={K.torso[1]} rx={K.torso[2]} ry={K.torso[3]} fill={TORSO} />
      <ellipse cx={K.chest[0]} cy={K.chest[1]} rx={K.chest[2]} ry={K.chest[3]} fill={TORSO} />
      <ellipse cx={K.saddle[0]} cy={K.saddle[1]} rx={K.saddle[2]} ry={K.saddle[3]} fill={SILVER} />
      {taper(K.neck[0], K.neck[1], K.neck[2], 130, 104, TORSO, undefined, true)}
      <Head hx={hx} hy={hy} r={hr} col={TORSO} />
      {arm(K.shN, K.elN, wrN, BODY)}
    </g>
  );
}
