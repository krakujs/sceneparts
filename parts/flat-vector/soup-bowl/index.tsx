import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Soup bowl (preset of flat-vector/dish): deep bowl of orange-red soup with herbs, steam and a spoon.
const LOOK = { vessel: "deepbowl", w: 420, vesselColor: "#FFFFFF", rimColor: "#E9EEF3", fill: "liquid", fillColor: "#E8643A", garnish: "herbs", steam: true };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the bowl. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 420, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {/* spoon standing in the soup, handle out over the rim */}
          <line x1={X(0.12)} y1={-X(0.44)} x2={X(0.42)} y2={-X(0.98)} stroke="#C9D1DC" strokeWidth={X(0.022)} strokeLinecap="round" />
          <ellipse cx={X(0.1)} cy={-X(0.43)} rx={X(0.07)} ry={X(0.045)} fill="#DDE2EA" />
          <ellipse cx={X(0.1)} cy={-X(0.43)} rx={X(0.045)} ry={X(0.025)} fill="#C9D1DC" />
        </g>
      </g>
    </g>
  );
}
