import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Phoenix: fiery bird flying with wings spread and flame-like tail feathers. Origin = centre of the body (y default 900).
// About 900 px wide at s = 1. anim: flicker (feather tips and tail flames flicker) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const flame = (L: number, w: number) =>
  `M ${-w} 0 C ${-w * 1.1} ${-L * 0.45} ${-w * 0.35} ${-L * 0.8} 0 ${-L} C ${w * 0.35} ${-L * 0.8} ${w * 1.1} ${-L * 0.45} ${w} 0 Z`;
const WING: [number, number, number][] = [[-16, 380, 56], [-36, 400, 58], [-56, 370, 54], [-76, 320, 48], [-96, 260, 40]];
const WING_COL = [C.orange, C.red, C.yellow, C.orange, C.red];
const TAIL: [number, number, number][] = [[188, 300, 46], [204, 340, 48], [220, 320, 44], [236, 270, 38]];

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 900, s = 1, f = 0, flip = false } = p as any;
  const anim: string = p.anim ?? "flicker";
  const k = (i: number) => (anim === "flicker" ? 1 + 0.08 * Math.sin(f * 0.25 + i * 1.3) : 1);
  const bob = Math.sin(f * 0.1) * 8;
  const flap = anim === "flicker" ? Math.sin(f * 0.12) * 6 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`translate(40 ${bob}) scale(1.25)`}>
        <g transform={`translate(-20 -40) rotate(${-12 + flap})`} opacity={0.85}>
          {WING.map(([a, L, w], i) => (
            <path key={i} d={flame(L * k(i + 5), w)} transform={`rotate(${a})`} fill={i % 2 ? C.red : "#E0A21F"} />
          ))}
        </g>
        {TAIL.map(([a, L, w], i) => (
          <path key={i} d={flame(L * k(i), w)} transform={`translate(-110 40) rotate(${a})`} fill={i % 2 ? C.orange : C.yellow} />
        ))}
        <ellipse cx={0} cy={0} rx={140} ry={96} fill={C.orange} transform="rotate(-22)" />
        <ellipse cx={-20} cy={20} rx={100} ry={70} fill={C.yellow} opacity={0.75} transform="rotate(-22)" />
        <g transform={`translate(-10 -40) rotate(${flap})`}>
          {WING.map(([a, L, w], i) => (
            <path key={i} d={flame(L * k(i), w)} transform={`rotate(${a})`} fill={WING_COL[i]} />
          ))}
        </g>
        {[-15, -35, -55].map((a, i) => (
          <path key={i} d={flame([90, 100, 80][i] * k(i + 9), 26)} transform={`translate(100 -160) rotate(${a})`} fill={i === 1 ? C.red : C.yellow} />
        ))}
        <circle cx={120} cy={-110} r={64} fill={C.orange} />
        <path d="M 172 -118 L 224 -98 L 176 -84 Z" fill={C.yellow} />
        <circle cx={140} cy={-122} r={13} fill="#FFFFFF" />
        <circle cx={144} cy={-122} r={7} fill={C.ink} />
      </g>
    </g>
  );
}
