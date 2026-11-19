import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";
import { C, shade } from "../style/index";

// Soda can (preset of flat-vector/drink): plain coloured can with a plain band (no text) and a ring pull on top.
const LOOK = { vessel: "can", color: "#E8503F", label: "#FFC83D", lid: "#DDE2EA", h: 330 };
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
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          {/* ring pull: a tab with a hole, riveted to the lid */}
          <rect x={-17} y={f1(-h - 4)} width={34} height={10} rx={5} fill="#C9CED8" />
          <ellipse cx={8} cy={f1(-h + 1)} rx={5} ry={3} fill={shade("#C9CED8", 0.35)} />
          <circle cx={-8} cy={f1(-h + 1)} r={4.5} fill={C.greyDark} />
        </g>
      </g>
    </g>
  );
}
