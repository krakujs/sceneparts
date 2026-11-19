import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Curtains: a pair of drapes hanging from a rail, gathered into tie-backs at the sides. sway makes the hems
// move a little, as in a breeze. Centred on (x, y); a wall item, so no ground shadow. Origin = centre.
const f1 = (v: number) => v.toFixed(1);
const sway = (f: number, phase: number) => Math.sin((f * 2 * Math.PI) / 80 + phase);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const tie = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const dk = shade(c, 0.2);
  const rail = C.greyDark;
  const TOP = -460, BOT = 460; // drape top and bottom (in local units)
  const drape = (side: -1 | 1, k: number) => {
    // a drape: top edge at the rail, gathered at the tie-back on the outside, hem at the bottom
    const out = side * 330, inn = side * 120;
    const hemSway = p.anim === "sway" ? sway(f, k * 1.3) * 14 : 0;
    const hx = side * 240 + hemSway * side * 0.3;
    return (
      <g key={side}>
        <path
          d={`M ${out} ${TOP} L ${inn} ${TOP} Q ${inn - side * 20} 0 ${hx - side * 10} ${BOT} L ${hx + side * 150} ${BOT} Q ${out + side * 6} 0 ${out} ${TOP} Z`}
          fill={c}
        />
        {/* folds: darker bands */}
        {[0.25, 0.55, 0.8].map((t, i) => (
          <rect key={i} x={out + (inn - out) * t - 8} y={TOP + 20} width={16} height={BOT - TOP - 40} rx={8} fill={dk} opacity={0.45} />
        ))}
        {/* tie-back band at about waist height, wrapping the drape */}
        <rect x={side * 250 - 70} y={40} width={140} height={34} rx={12} fill={tie} />
        <rect x={side * 250 - 70} y={40} width={140} height={8} rx={4} fill="#FFFFFF" opacity={0.3} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim ?? "none", f)}>
        {/* rail with end caps */}
        <rect x={-480} y={TOP - 40} width={960} height={18} rx={9} fill={rail} />
        <circle cx={-486} cy={TOP - 31} r={14} fill={rail} />
        <circle cx={486} cy={TOP - 31} r={14} fill={rail} />
        {drape(-1, 0)}
        {drape(1, 1)}
      </g>
    </g>
  );
}
