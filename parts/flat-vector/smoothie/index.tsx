import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Smoothie (preset of flat-vector/drink): tall glass of thick pink-purple smoothie, a straw and berries on top.
const LOOK = { vessel: "tall", color: "#DDEFF8", liquid: "#C2448A", level: 0.9, straw: "#FFC83D", h: 360 };
const f1 = (v: number) => v.toFixed(1);
const BERRIES = [
  { x: -58, y: -10, r: 20, c: "#F27BA6" },
  { x: -30, y: -30, r: 23, c: "#7B5CD6" },
  { x: -8, y: -14, r: 22, c: "#E8503F" },
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
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          {BERRIES.map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={f1(b.y - h)} r={b.r} fill={b.c} />
              <circle cx={f1(b.x - b.r * 0.35)} cy={f1(b.y - h - b.r * 0.35)} r={b.r * 0.22} fill="#FFFFFF" opacity={0.6} />
            </g>
          ))}
          <path d={`M -36 ${f1(-h - 26)} Q -20 ${f1(-h - 34)} -8 ${f1(-h - 26)}`} fill="none" stroke="#5E8C3A" strokeWidth={4} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}
