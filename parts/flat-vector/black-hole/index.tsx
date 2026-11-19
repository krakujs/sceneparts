import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Black hole: a black event-horizon disc ringed by a tilted orange-white accretion disk, with a bright photon ring
// that bends light round the edge. The disk passes in front of the hole at the bottom and behind it at the top.
// Origin = centre of the hole; about 760 px wide at s = 1.
// anim "swirl": bright streaks race round the disk.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const R = 170;

// The disk: [rx, ry, stroke width, colour]
const DISK: [number, number, number, string][] = [
  [372, 110, 56, C.orange],
  [322, 94, 34, C.yellow],
];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col = p.color && p.color !== "none" ? p.color : C.orange;
  const swirl = p.anim === "swirl";
  const off = swirl ? -f * 6 : 0;
  const pulse = 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 80);
  const halfFront = (rx: number, ry: number) => `M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`;
  const streaks = (rx: number, ry: number, width: number, key: string) => (
    <ellipse key={key} cx={0} cy={0} rx={rx} ry={ry} fill="none" stroke="#FFF3B0" strokeWidth={width} strokeDasharray="70 60" strokeDashoffset={f1(off)} strokeLinecap="round" opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <circle cx={0} cy={0} r={300} fill={col} opacity={0.06 + 0.04 * pulse} />
      <circle cx={0} cy={0} r={250} fill={col} opacity={0.1 + 0.05 * pulse} />
      <g transform="rotate(-10)">
        {/* disk, back half (drawn behind the hole) */}
        {DISK.map(([rx, ry, w, c], i) => (
          <ellipse key={`b${i}`} cx={0} cy={0} rx={rx} ry={ry} fill="none" stroke={c} strokeWidth={w} opacity={0.85} />
        ))}
        {streaks(330, 98, 12, "sb")}
      </g>
      {/* event horizon */}
      <circle cx={0} cy={0} r={R} fill="#05060A" />
      <g transform="rotate(-10)">
        {/* disk, front half (passes in front of the hole) */}
        {DISK.map(([rx, ry, w, c], i) => (
          <path key={`f${i}`} d={halfFront(rx, ry)} fill="none" stroke={c} strokeWidth={w} opacity={0.85} />
        ))}
        <path d={halfFront(330, 98)} fill="none" stroke="#FFF3B0" strokeWidth={12} strokeDasharray="70 60" strokeDashoffset={f1(off)} strokeLinecap="round" opacity={0.85} />
      </g>
      {/* photon ring */}
      <circle cx={0} cy={0} r={R + 10} fill="none" stroke={C.yellow} strokeWidth={10} opacity={0.5} />
      <circle cx={0} cy={0} r={R + 4} fill="none" stroke="#FFF3B0" strokeWidth={6} opacity={0.95} />
    </g>
  );
}
