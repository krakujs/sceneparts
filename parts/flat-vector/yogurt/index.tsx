import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";
import { C } from "../style/index";

// Yogurt (preset of flat-vector/drink + extras): small pot of white yogurt with the foil lid peeled back, topped with berries.
const LOOK = { vessel: "jar", color: "#F3F6FA", liquid: "#FFF9EC", level: 0.88, h: 200 };
const f1 = (v: number) => v.toFixed(1);

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
  const surf = -0.88 * h;
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          {/* foil lid: back half still on the rim, a flap peeled up at the back right */}
          <path d={`M -100 ${f1(-h)} A 100 20 0 0 1 100 ${f1(-h)} Z`} fill="#DDE2EA" />
          <path d={`M 96 ${f1(-h - 2)} Q 124 ${f1(-h - 30)} 98 ${f1(-h - 52)} Q 86 ${f1(-h - 28)} 70 ${f1(-h - 14)} Z`} fill="#C9D2DE" />
          {/* berries piled on the yogurt */}
          <circle cx={-36} cy={f1(surf - 6)} r={19} fill={C.red} />
          <circle cx={-42} cy={f1(surf - 12)} r={4} fill="#FFFFFF" opacity={0.6} />
          <circle cx={12} cy={f1(surf - 12)} r={17} fill={C.purple} />
          <circle cx={7} cy={f1(surf - 17)} r={4} fill="#FFFFFF" opacity={0.6} />
          <circle cx={48} cy={f1(surf - 2)} r={15} fill={C.red} />
          <circle cx={-6} cy={f1(surf + 6)} r={13} fill={C.pink} />
        </g>
      </g>
    </g>
  );
}
