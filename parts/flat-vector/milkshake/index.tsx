import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";
import { C } from "../style/index";

// Milkshake (preset of flat-vector/drink): stemmed glass of pink shake, a whipped cream dome, a cherry and a striped straw.
const LOOK = { vessel: "stemmed", color: "#DDEFF8", liquid: "#F4A6C6", level: 0.86, foam: "#FFFFFF", straw: "none", h: 380, steam: false };
const f1 = (v: number) => v.toFixed(1);
const CREAM = [
  { x: -62, y: -6, r: 22 }, { x: -30, y: -18, r: 26 }, { x: 4, y: -22, r: 27 }, { x: 38, y: -16, r: 25 }, { x: 66, y: -6, r: 20 },
];

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s = q.s ?? 1, f = q.f ?? 0, x = q.x ?? 540, y = q.y ?? 1560, h = q.h;
  const straw = `M 16 ${f1(-180)} L 24 ${f1(-h - 50)} L 70 ${f1(-h - 84)}`;
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          {/* striped straw: pink with white dashes */}
          <path d={straw} fill="none" stroke="#FF6F91" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
          <path d={straw} fill="none" stroke="#FFFFFF" strokeWidth={12} strokeDasharray="9 9" strokeLinejoin="round" />
          {/* whipped cream peaks */}
          {CREAM.map((c, i) => <circle key={i} cx={c.x} cy={f1(c.y - h)} r={c.r} fill="#FFFFFF" />)}
          <circle cx={-6} cy={f1(-h - 30)} r={18} fill="#FFFFFF" />
          {/* cherry */}
          <path d={`M 0 ${f1(-h - 42)} Q 6 ${f1(-h - 62)} 22 ${f1(-h - 68)}`} fill="none" stroke={C.green} strokeWidth={4} strokeLinecap="round" />
          <circle cx={0} cy={f1(-h - 40)} r={17} fill={C.red} />
          <circle cx={-6} cy={f1(-h - 46)} r={5} fill="#FFFFFF" opacity={0.6} />
        </g>
      </g>
    </g>
  );
}
