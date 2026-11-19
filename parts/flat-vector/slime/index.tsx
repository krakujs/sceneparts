import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Slime: translucent teal dome slime with dripping edges, two eyes and a smile. Feet at (0,0); about 480 px tall at s = 1.
// anim: bounce (hops with a squash on landing) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const teal: string = p.color && p.color !== "none" ? p.color : "#1FA39A";
  const deep = shade(teal, 0.25);
  const anim: string = p.anim ?? "bounce";
  const b = anim === "bounce" ? Math.abs(Math.sin(f * 0.1)) : 1;
  const lift = anim === "bounce" ? (1 - b) * 0 + b * 70 : 0;
  const sy = anim === "bounce" ? 1 - 0.12 * (1 - b) : 1;
  const sx = anim === "bounce" ? 1 + 0.06 * (1 - b) : 1;
  const drips: [number, number][] = [[-190, 55], [-60, 75], [90, 40], [200, 62]];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={230 - lift * 0.5} ry={18} fill={C.shadow} opacity={1 - lift / 200} />
      <g transform={`translate(0 ${-lift}) scale(${sx} ${sy})`} opacity={0.86}>
        <path d="M -250 -80 C -250 -300 -150 -480 0 -480 C 150 -480 250 -300 250 -80 Z" fill={teal} />
        <rect x={-250} y={-110} width={500} height={40} fill={teal} />
        {drips.map(([dx, L], i) => (
          <rect key={i} x={dx - 30} y={-110} width={60} height={L + 40} rx={30} fill={teal} />
        ))}
        <ellipse cx={0} cy={-200} rx={150} ry={110} fill={deep} opacity={0.25} />
        <ellipse cx={-120} cy={-330} rx={36} ry={70} fill="#FFFFFF" opacity={0.35} transform="rotate(20 -120 -330)" />
        <circle cx={120} cy={-150} r={10} fill="#FFFFFF" opacity={0.4} />
        <circle cx={90} cy={-210} r={6} fill="#FFFFFF" opacity={0.4} />
      </g>
      <g transform={`translate(0 ${-lift}) scale(${sx} ${sy})`}>
        <circle cx={-80} cy={-260} r={34} fill="#FFFFFF" />
        <circle cx={80} cy={-260} r={34} fill="#FFFFFF" />
        <circle cx={-72} cy={-256} r={18} fill={C.ink} />
        <circle cx={88} cy={-256} r={18} fill={C.ink} />
        <circle cx={-64} cy={-264} r={6} fill="#FFFFFF" />
        <circle cx={96} cy={-264} r={6} fill="#FFFFFF" />
        <circle cx={-140} cy={-200} r={22} fill={C.pink} opacity={0.5} />
        <circle cx={140} cy={-200} r={22} fill={C.pink} opacity={0.5} />
        <path d="M -50 -190 Q 0 -150 50 -190" stroke={C.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
