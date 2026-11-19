import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Scorpion: friendly sand-brown scorpion, not scary. Two open pincers that snap gently, eight legs that step
// in turn, and a segmented tail curled over the back with a little stinger tip. Motion from f only.
// Origin = ground under the body, bottom centre; faces right; honours flip, s and vx.

const cubic = (t: number, P: [number, number][]): [number, number] => {
  const u = 1 - t;
  return [
    u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0],
    u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1],
  ];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, flip = !!p.flip;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const col: string = p.color ?? "#C8985E", dk = shade(col, 0.22), legC: string = "#A87A46", legFar = shade(legC, 0.25);
  const claw = 14 + 8 * Math.sin(f * 0.2); // pincer opening, degrees

  // legs: four per side, near solid, far shaded; each steps in turn (phase by leg index)
  const legs = (far: boolean) => [30, 0, -30, -56].map((hx, k) => {
    const u = f * 0.12 - k * 0.8 + (far ? Math.PI : 0);
    const hip: [number, number] = [hx, -54];
    const foot: [number, number] = [hx + 10 + 12 * Math.sin(u), -9 * Math.max(0, Math.cos(u))];
    const knee: [number, number] = [(hip[0] + foot[0]) / 2 + 14, -30];
    return <path key={`${far ? "f" : "n"}${k}`} d={`M ${hip[0]} ${hip[1]} L ${knee[0].toFixed(1)} ${knee[1]} L ${foot[0].toFixed(1)} ${foot[1].toFixed(1)}`}
      stroke={far ? legFar : legC} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />;
  });

  // tail: a cubic arc from the back rear, over the top, down to the stinger; tapering segments
  const T: [number, number][] = [[-130, -70], [-200, -200], [-70, -262], [30, -208]];
  const tailD = `M ${T[0][0]} ${T[0][1]} C ${T[1][0]} ${T[1][1]} ${T[2][0]} ${T[2][1]} ${T[3][0]} ${T[3][1]}`;
  const tailSegs = (
    <g>
      <path d={tailD} stroke={dk} strokeWidth={22} strokeLinecap="round" fill="none" />
      <path d={tailD} stroke={col} strokeWidth={16} strokeLinecap="round" fill="none" />
      {[0.25, 0.5, 0.75].map((t) => { const [tx, ty] = cubic(t, T); return <circle key={t} cx={tx.toFixed(1)} cy={ty.toFixed(1)} r={8} fill={dk} opacity={0.5} />; })}
    </g>
  );
  const [sx, sy] = cubic(1, T), [px, py] = cubic(0.94, T);
  const dirx = sx - px, diry = sy - py, dl = Math.hypot(dirx, diry) || 1;
  const ux = dirx / dl, uy = diry / dl;
  const stinger = `M ${(sx + ux * 18).toFixed(1)} ${(sy + uy * 18).toFixed(1)} L ${(sx - uy * 9).toFixed(1)} ${(sy + ux * 9).toFixed(1)} L ${(sx + uy * 9).toFixed(1)} ${(sy - ux * 9).toFixed(1)} Z`;

  // pincers: an arm from the front of the head and two jaws that open and close
  const armU = `M 96 -92 Q 122 -116 146 -112`, armL = `M 96 -72 Q 122 -58 146 -62`;

  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={9} fill={C.shadow} />
      {legs(true)}
      {tailSegs}
      <path d={stinger} fill={C.ink} opacity={0.85} />
      {/* abdomen (mesosoma) segments, then the front body */}
      <ellipse cx={-120} cy={-64} rx={26} ry={24} fill={dk} />
      <ellipse cx={-118} cy={-66} rx={25} ry={23} fill={col} />
      <ellipse cx={-76} cy={-70} rx={36} ry={32} fill={dk} />
      <ellipse cx={-76} cy={-72} rx={35} ry={31} fill={col} />
      <ellipse cx={-26} cy={-74} rx={38} ry={34} fill={dk} />
      <ellipse cx={-26} cy={-76} rx={37} ry={33} fill={col} />
      <ellipse cx={58} cy={-78} rx={62} ry={38} fill={dk} />
      <ellipse cx={58} cy={-82} rx={61} ry={36} fill={col} />
      {/* arms and claws */}
      <path d={armU} stroke={dk} strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d={armL} stroke={dk} strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d={armU} stroke={col} strokeWidth={11} strokeLinecap="round" fill="none" />
      <path d={armL} stroke={col} strokeWidth={11} strokeLinecap="round" fill="none" />
      <g transform={`translate(146 -112) rotate(${-claw})`}>
        <ellipse cx={24} cy={0} rx={26} ry={12} fill={dk} />
        <ellipse cx={24} cy={-2} rx={25} ry={11} fill={col} />
        <path d="M 32 -2 L 50 6 L 36 8 Z" fill={C.ink} opacity={0.5} />
      </g>
      <g transform={`translate(146 -62) rotate(${claw})`}>
        <ellipse cx={24} cy={0} rx={26} ry={12} fill={dk} />
        <ellipse cx={24} cy={-2} rx={25} ry={11} fill={col} />
        <path d="M 32 -2 L 50 -6 L 36 -8 Z" fill={C.ink} opacity={0.5} />
      </g>
      {legs(false)}
      {/* small friendly eyes on top of the front body */}
      <circle cx={96} cy={-104} r={5} fill={C.ink} />
      <circle cx={110} cy={-102} r={5} fill={C.ink} />
      <circle cx={97.5} cy={-105.5} r={1.6} fill={C.white} />
      <circle cx={111.5} cy={-103.5} r={1.6} fill={C.white} />
    </g>
  );
}
