import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Dal (preset of flat-vector/dish): steel katori of yellow lentil dal with tempering seeds, chilli and steam.
const LOOK = { vessel: "cup", w: 560, vesselColor: "#B8C2CE", rimColor: "#E9EEF3", fill: "liquid", fillColor: "#F4C430", steam: true };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the katori. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

// tempering: mustard seeds (dark), a few chilli bits and green coriander, all on the dal surface
const C_GREEN = "#4BB46A";
const SEEDS: [number, number, string][] = [[-0.14, -0.28, "#8A4B1F"], [-0.05, -0.23, "#5E3B26"], [0.06, -0.3, "#8A4B1F"], [0.14, -0.25, "#5E3B26"], [-0.01, -0.32, "#8A4B1F"], [0.0, -0.245, "#5E3B26"], [-0.1, -0.225, "#8A4B1F"]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 560, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {SEEDS.map(([u, v, c], i) => <circle key={i} cx={X(u)} cy={X(v)} r={X(0.02)} fill={c} />)}
          <ellipse cx={X(0.1)} cy={X(-0.31)} rx={X(0.034)} ry={X(0.013)} fill="#E8503F" transform={`rotate(30 ${X(0.1)} ${X(-0.31)})`} />
          <ellipse cx={X(-0.2)} cy={X(-0.27)} rx={X(0.03)} ry={X(0.012)} fill="#E8503F" transform={`rotate(-20 ${X(-0.2)} ${X(-0.27)})`} />
          <circle cx={X(0.03)} cy={X(-0.21)} r={X(0.012)} fill={C_GREEN} />
          <circle cx={X(-0.07)} cy={X(-0.3)} r={X(0.012)} fill={C_GREEN} />
          <circle cx={X(0.18)} cy={X(-0.21)} r={X(0.012)} fill={C_GREEN} />
        </g>
      </g>
    </g>
  );
}
