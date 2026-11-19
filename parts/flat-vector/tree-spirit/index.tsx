import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tree spirit: a gentle forest spirit with a chunky round bark body, short root legs, leafy arms and a big round
// crown of leaves, with two glowing amber eyes. Origin = feet (bottom centre); about 1000 px tall at s = 1.
// anim "walk": takes slow steps, bobs and sways the crown; the eyes blink now and then.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const BARK = "#8A5A3C", BARK_D = "#5E3B26", LEAF = "#4BB46A", LEAF_D = "#348A4F", LEAF_L = "#A8D85A";
const CROWN: [number, number, number, string][] = [
  [0, -600, 150, LEAF_D], [-150, -640, 118, LEAF_D], [150, -650, 118, LEAF_D],
  [0, -760, 170, LEAF], [-140, -780, 130, LEAF], [140, -790, 130, LEAF], [0, -880, 130, LEAF_L],
];
const leafCluster = (cx: number, cy: number, rot: number, key: string) => (
  <g key={key} transform={`translate(${cx} ${cy}) rotate(${rot})`}>
    {[-40, 0, 40].map((a, i) => (
      <ellipse key={i} cx={0} cy={0} rx={36} ry={16} fill={i === 1 ? LEAF_L : LEAF} transform={`rotate(${a}) translate(20 0)`} />
    ))}
  </g>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const walk = p.anim === "walk";
  const ph = (f * 2 * Math.PI) / 70;
  const step = walk ? Math.sin(ph) : 0;
  const bob = walk ? -Math.abs(Math.sin(ph)) * 10 : 0;
  const sway = walk ? 2.5 * Math.sin(ph) : 0;
  const blink = f % 150 > 140;
  const eyeCol = p.eye && p.eye !== "none" ? p.eye : "#FFE27A";
  const armL = walk ? 14 * Math.sin(ph) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={230} ry={24} fill={C.shadow} />
      {/* root legs, swinging in turn */}
      <g transform={`rotate(${f1(step * 6)} -90 -200)`}>
        <rect x={-130} y={-200} width={80} height={200} rx={36} fill={BARK} />
        <ellipse cx={-98} cy={0} rx={60} ry={22} fill={BARK_D} />
      </g>
      <g transform={`rotate(${f1(-step * 6)} 90 -200)`}>
        <rect x={50} y={-200} width={80} height={200} rx={36} fill={BARK} />
        <ellipse cx={90} cy={0} rx={60} ry={22} fill={BARK_D} />
      </g>
      {/* arms, with leafy hands */}
      <path d={`M -160 -470 Q -300 -440 -330 ${f1(-330 + armL)}`} stroke={BARK} strokeWidth={52} fill="none" strokeLinecap="round" />
      <path d={`M 160 -470 Q 300 -440 330 ${f1(-330 - armL)}`} stroke={BARK} strokeWidth={52} fill="none" strokeLinecap="round" />
      {leafCluster(-336, -330 + armL, -20, "hl")}
      {leafCluster(336, -330 - armL, 20, "hr")}
      {/* trunk body */}
      <path d="M -190 -180 Q -220 -380 -170 -560 Q -150 -610 0 -612 Q 150 -610 170 -560 Q 220 -380 190 -180 Q 0 -150 -190 -180 Z" fill={BARK} />
      <path d="M 90 -180 Q 200 -380 170 -560 Q 150 -610 0 -612 Q 110 -560 120 -380 Q 120 -270 90 -180 Z" fill={shade(BARK, 0.2)} opacity={0.6} />
      {[-120, -40, 50, 130].map((bx, i) => (
        <path key={i} d={`M ${bx} -180 Q ${bx - 20 + i * 4} -330 ${bx + 10} -520`} stroke={BARK_D} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.5} />
      ))}
      <ellipse cx={-96} cy={-296} rx={16} ry={22} fill={BARK_D} opacity={0.7} />
      <ellipse cx={110} cy={-236} rx={12} ry={16} fill={BARK_D} opacity={0.7} />
      {/* face */}
      <circle cx={-80} cy={-420} r={30} fill={eyeCol} opacity={0.3} />
      <circle cx={80} cy={-420} r={30} fill={eyeCol} opacity={0.3} />
      <ellipse cx={-64} cy={-420} rx={18} ry={blink ? 3 : 24} fill={eyeCol} />
      <ellipse cx={64} cy={-420} rx={18} ry={blink ? 3 : 24} fill={eyeCol} />
      {!blink && <circle cx={-60} cy={-416} r={7} fill={C.ink} />}
      {!blink && <circle cx={68} cy={-416} r={7} fill={C.ink} />}
      <circle cx={-110} cy={-360} r={20} fill="#F27BA6" opacity={0.35} />
      <circle cx={110} cy={-360} r={20} fill="#F27BA6" opacity={0.35} />
      <path d="M -36 -346 Q 0 -316 36 -346" stroke="#3A2415" strokeWidth={9} fill="none" strokeLinecap="round" />
      {/* leafy crown */}
      <g transform={`rotate(${f1(sway)} 0 -560)`}>
        {CROWN.map(([cx, cy, r, col], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={col} />
        ))}
        {[[-80, -700, LEAF_L], [90, -690, LEAF_L], [-30, -830, LEAF_L], [110, -840, LEAF], [-120, -730, LEAF_L]].map(([lx, ly, col], i) => (
          <ellipse key={`l${i}`} cx={lx} cy={ly} rx={34} ry={16} fill={String(col)} transform={`rotate(${i * 37 - 40} ${lx} ${ly})`} />
        ))}
      </g>
    </g>
  );
}
