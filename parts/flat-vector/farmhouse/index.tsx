import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Farmhouse, front view: a two-storey house with a tin roof, a porch running across the front and a small silo to the right.
// Origin = centre of the floor line. About 960 px wide and 820 px tall at s = 1 (silo included).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const glow = (f: number, i: number) => (Math.floor(f / 12) + i) % 4 === 0 ? C.yellow : C.sky;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.white;
  const tin = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const lit = anim === "lights";
  const win = (i: number, wx: number, wy: number) => (
    <g key={i}>
      <rect x={wx} y={wy} width={100} height={100} rx={8} fill={C.white} />
      <rect x={wx + 8} y={wy + 8} width={84} height={84} rx={5} fill={lit ? glow(f, i) : C.sky} />
      <rect x={wx + 46} y={wy + 8} width={8} height={84} fill={C.white} />
      <rect x={wx + 8} y={wy + 46} width={84} height={8} fill={C.white} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={470} ry={20} fill={C.shadow} />
        {/* silo */}
        <rect x={380} y={-520} width={120} height={520} rx={10} fill={tin} />
        <rect x={380} y={-520} width={120} height={20} fill={shade(tin, 0.2)} />
        <path d="M 370 -520 Q 440 -600 510 -520 Z" fill={shade(tin, 0.2)} />
        <rect x={386} y={-440} width={108} height={6} fill={shade(tin, 0.25)} />
        <rect x={386} y={-340} width={108} height={6} fill={shade(tin, 0.25)} />
        <rect x={386} y={-240} width={108} height={6} fill={shade(tin, 0.25)} />
        {/* house walls */}
        <rect x={-320} y={-600} width={640} height={600} rx={8} fill={wall} />
        <rect x={-320} y={-40} width={640} height={40} fill={shade(wall, 0.14)} />
        {/* tin roof with a ridge cap */}
        <path d="M -360 -590 L 0 -800 L 360 -590 Z" fill={tin} />
        <path d="M -360 -590 L 0 -800 L 0 -780 L -340 -580 Z" fill={shade(tin, 0.15)} />
        <rect x={-6} y={-810} width={12} height={16} fill={shade(tin, 0.25)} />
        {/* upstairs and downstairs windows */}
        {win(0, -270, -560)}
        {win(1, 170, -560)}
        {win(2, -270, -430)}
        {win(3, 170, -430)}
        {/* porch roof across the front, posts and deck */}
        <rect x={-380} y={-300} width={760} height={24} rx={6} fill={tin} />
        {[-360, -200, -40, 120, 280].map((px) => (
          <rect key={px} x={px} y={-276} width={16} height={236} fill={C.white} />
        ))}
        <rect x={-380} y={-40} width={760} height={24} rx={4} fill={C.brown} />
        {/* front door */}
        <rect x={-40} y={-290} width={80} height={250} rx={8} fill={C.teal} />
        <circle cx={26} cy={-160} r={6} fill={C.yellow} />
      </g>
    </g>
  );
}
