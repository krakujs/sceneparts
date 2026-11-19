import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Water spirit: a translucent blue figure with wave-shaped hair, streams of water for arms, a rippling pool at its
// base and droplets that rise and fall. Origin = centre of the pool (ground level); about 950 px tall at s = 1.
// anim "flow": the body ripples, the hair streams and the droplets keep moving.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const WATER = "#3D9BE0", WATER_L = "#B5DDF5", WATER_D = "#2A74C0";

// half-width of the body at height t (0 = pool, 1 = shoulders)
const hw = (t: number) => 150 - 70 * t + 20 * Math.sin(t * Math.PI);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const flow = p.anim === "flow";
  const k = flow ? f : 0;
  const body = p.color && p.color !== "none" ? p.color : WATER;
  // torso outline: left edge up, right edge down, both rippling
  const left: string[] = [], right: string[] = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16, yy = -640 * t;
    const dx = 8 * Math.sin(t * 6 - k * 0.2);
    left.push(`${f1(-hw(t) + dx)} ${f1(yy)}`);
    right.push(`${f1(hw(t) + dx)} ${f1(yy)}`);
  }
  const torso = `M ${left.join(" L ")} L ${right.reverse().join(" L ")} Z`;
  const hair = (kk: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 14; i++) {
      const xx = -40 + i * 24;
      const yy = -872 + kk * 34 + 24 * Math.sin(xx * 0.02 + k * 0.12 + kk);
      pts.push(`${f1(xx)} ${f1(yy)}`);
    }
    return `M ${pts.join(" L ")}`;
  };
  const drops = [0, 1, 2, 3, 4, 5].map((i) => {
    const phase = ((k * 3 + i * 113) % 420) / 420;
    const dropY = -120 - phase * 560;
    const dropX = (i % 2 === 0 ? -1 : 1) * (240 + (i % 3) * 40);
    return { x: dropX, y: flow ? dropY : -120 - i * 90, o: flow ? Math.sin(Math.PI * phase) : 0.9 };
  });
  const ring = 230 + (flow ? (k % 60) * 2 : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* rippling pool */}
      <ellipse cx={0} cy={0} rx={250} ry={28} fill={body} opacity={0.35} />
      <ellipse cx={0} cy={2} rx={ring} ry={ring / 8} fill="none" stroke={WATER_L} strokeWidth={5} opacity={flow ? 0.7 - (k % 60) / 100 : 0.4} />
      {/* hair streaming to the right */}
      {[0, 1, 2, 3].map((kk) => (
        <path key={kk} d={hair(kk)} stroke={kk % 2 ? WATER_L : WATER} strokeWidth={26 - kk * 4} fill="none" strokeLinecap="round" opacity={0.92} />
      ))}
      {/* streams for arms */}
      <path d={`M -120 -560 Q -250 -560 -320 ${f1(-500 + 30 * Math.sin(k * 0.1))}`} stroke={body} strokeWidth={46} fill="none" strokeLinecap="round" opacity={0.85} />
      <path d={`M 120 -560 Q 250 -600 320 ${f1(-640 + 30 * Math.cos(k * 0.1))}`} stroke={body} strokeWidth={46} fill="none" strokeLinecap="round" opacity={0.85} />
      {/* body */}
      <path d={torso} fill={body} opacity={0.82} />
      <path d="M -90 -420 Q -110 -300 -70 -160" stroke={WATER_L} strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.6} />
      {/* head */}
      <circle cx={0} cy={-760} r={118} fill={body} opacity={0.88} />
      <ellipse cx={-44} cy={-806} rx={32} ry={18} fill={C.white} opacity={0.5} />
      <ellipse cx={-42} cy={-770} rx={12} ry={16} fill={C.ink} />
      <ellipse cx={42} cy={-770} rx={12} ry={16} fill={C.ink} />
      <path d="M -36 -716 Q 0 -690 36 -716" stroke={WATER_D} strokeWidth={9} fill="none" strokeLinecap="round" />
      {/* droplets */}
      {drops.map((d, i) => (
        <g key={i} opacity={d.o}>
          <circle cx={f1(d.x)} cy={f1(d.y)} r={14} fill={WATER_L} />
          <path d={`M ${f1(d.x)} ${f1(d.y - 26)} L ${f1(d.x - 9)} ${f1(d.y - 6)} L ${f1(d.x + 9)} ${f1(d.y - 6)} Z`} fill={WATER_L} />
        </g>
      ))}
    </g>
  );
}
