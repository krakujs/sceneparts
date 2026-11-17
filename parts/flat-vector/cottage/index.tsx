import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Countryside cottage, flat front elevation, thatch roof with scalloped eaves. Origin = centre of the floor line.
// About 640 px wide and 620 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const warm = (f: number, i: number) => (Math.floor(f / 12) + i) % 3 === 0 ? C.yellow : C.sky;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.paper;
  const thatch = p.color2 && p.color2 !== "none" ? p.color2 : C.sand;
  const anim: string = p.anim ?? "none";
  const lit = anim === "lights";
  const pane = (i: number, wx: number, wy: number) => (
    <g key={i}>
      <rect x={wx} y={wy} width={120} height={110} rx={10} fill={C.white} />
      <rect x={wx + 10} y={wy + 10} width={100} height={90} rx={6} fill={lit ? warm(f, i) : C.sky} />
      <rect x={wx + 56} y={wy + 10} width={8} height={90} fill={C.white} />
      <rect x={wx + 10} y={wy + 50} width={100} height={8} fill={C.white} />
      <path d={`M ${wx + 18} ${wy + 18} L ${wx + 36} ${wy + 18} L ${wx + 18} ${wy + 40} Z`} fill={C.white} opacity={0.7} />
    </g>
  );
  const box = (bx: number) => (
    <g>
      <rect x={bx} y={-270} width={130} height={28} rx={6} fill={C.brown} />
      <circle cx={bx + 30} cy={-284} r={16} fill={C.pink} />
      <circle cx={bx + 62} cy={-290} r={18} fill={C.orange} />
      <circle cx={bx + 100} cy={-282} r={15} fill={C.yellow} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={340} ry={20} fill={C.shadow} />
        {/* walls */}
        <rect x={-270} y={-400} width={540} height={400} rx={12} fill={wall} />
        <rect x={-270} y={-40} width={540} height={40} rx={10} fill={shade(wall, 0.12)} />
        {/* thatch roof with rounded eaves */}
        <path d="M -350 -360 L -30 -640 Q 0 -652 30 -640 L 350 -360 Q 350 -330 320 -330 L -320 -330 Q -350 -330 -350 -360 Z" fill={thatch} />
        <path d="M -320 -330 L -30 -600 Q 0 -612 30 -600 L 320 -330 Z" fill={shade(thatch, 0.2)} />
        {[-220, -120, 0, 120, 220].map((tx, i) => (
          <path key={i} d={`M ${tx} ${-560 + Math.abs(tx) * 0.5} L ${tx + 14} ${-420 + Math.abs(tx) * 0.2}`} stroke={shade(thatch, 0.3)} strokeWidth={6} strokeLinecap="round" />
        ))}
        {/* windows */}
        {pane(0, -210, -300)}
        {pane(1, 90, -300)}
        {/* round door with a little canopy */}
        <rect x={-46} y={-280} width={92} height={60} rx={20} fill={shade(wall, 0.1)} />
        <path d="M -40 -40 L -40 -170 Q -40 -230 0 -230 Q 40 -230 40 -170 L 40 -40 Z" fill={C.teal} />
        <circle cx={22} cy={-120} r={7} fill={C.yellow} />
        {/* flower boxes under the windows */}
        {box(-222)}
        {box(78)}
        <rect x={-80} y={-40} width={160} height={24} rx={6} fill={C.greyLight} />
      </g>
    </g>
  );
}
