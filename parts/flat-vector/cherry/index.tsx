/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cherries: a pair of round red cherries on two curved stems that meet at a leaf.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};
const leaf = (L: number, W: number) => `M 0 0 Q ${f1(L / 2)} ${f1(-W)} ${f1(L)} 0 Q ${f1(L / 2)} ${f1(W)} 0 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const col: string = p.color ?? C.red;
  const cherries: [number, number, number][] = [[-115, -100, 100], [110, -98, 98]];

  const cherry = ([cx, cy, r]: [number, number, number], i: number) => (
    <g key={i}>
      <circle cx={cx} cy={cy} r={r} fill={shade(col, 0.22)} />
      <circle cx={cx - 7} cy={cy - 7} r={r - 7} fill={col} />
      <ellipse cx={cx - 8} cy={cy - r + 10} rx={11} ry={6} fill={shade(col, 0.4)} opacity={0.55} />
      <ellipse cx={cx - r * 0.38} cy={cy - r * 0.38} rx={16} ry={10} fill="#FFFFFF" opacity={0.55} transform={`rotate(-40 ${f1(cx - r * 0.38)} ${f1(cy - r * 0.38)})`} />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={180} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <g transform="translate(20 -340) rotate(-35)">
          <path d={leaf(190, 52)} fill={C.green} />
          <path d="M 0 0 L 165 0" stroke={C.greenDark} strokeWidth={4} strokeLinecap="round" />
        </g>
        <path d="M -115 -200 C -120 -262 -62 -302 20 -340" stroke={C.greenDark} strokeWidth={9} strokeLinecap="round" fill="none" />
        <path d="M 110 -196 C 118 -262 62 -302 20 -340" stroke={C.greenDark} strokeWidth={9} strokeLinecap="round" fill="none" />
        {cherries.map(cherry)}
      </g>
    </g>
  );
}
