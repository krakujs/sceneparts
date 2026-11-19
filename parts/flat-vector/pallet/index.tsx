import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden shipping pallet, front 3/4 view: deck boards on top, three stringer blocks, bottom boards.
// About 720 px wide and 300 px tall at s = 1. Origin = bottom centre (rests on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const DECK = [-300, -225, -150];
const BLOCKS = [-340, -40, 260];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={360} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* bottom boards */}
        <rect x={-360} y={-50} width={720} height={50} rx={6} fill={shade(wood, 0.2)} />
        {/* stringer blocks */}
        {BLOCKS.map((bx, i) => <rect key={i} x={bx} y={-90} width={80} height={40} rx={6} fill={dark} />)}
        {/* deck boards (top), with a 3/4 edge strip */}
        {DECK.map((dy, i) => (
          <g key={i}>
            <rect x={-360} y={dy} width={720} height={60} rx={6} fill={wood} />
            <rect x={-360} y={dy + 48} width={720} height={12} rx={4} fill={shade(wood, 0.22)} />
          </g>
        ))}
        {/* nail heads */}
        {[-320, -200, 200, 320].map((nx) => <circle key={nx} cx={nx} cy={-270} r={6} fill={C.greyDark} />)}
      </g>
    </g>
  );
}
