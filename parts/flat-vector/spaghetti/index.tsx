import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";
import { shade } from "../style/index";

// Spaghetti (preset of flat-vector/dish): plate of pale-yellow strands under a tomato sauce dome, two meatballs, fork.
const LOOK = { vessel: "plate", w: 480, vesselColor: "#FFFFFF", fill: "strands", fillColor: "#FBEBB0", fillColor2: "#EED58A", garnish: "fork", steam: false, sauceColor: "#E8503F" };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the plate. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 480, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  const sauce: string = q.sauceColor;
  const ball = (cx: number, cy: number) => (
    <g>
      <circle cx={X(cx)} cy={X(cy) + X(0.018)} r={X(0.066)} fill="#6B4128" />
      <circle cx={X(cx)} cy={X(cy)} r={X(0.066)} fill="#8A5A3C" />
      <circle cx={X(cx) - X(0.025)} cy={X(cy) - X(0.025)} r={X(0.02)} fill="#B07A54" />
    </g>
  );
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {ball(-0.22, -0.2)}
          {ball(0.2, -0.18)}
          {/* tomato sauce dome on the strands */}
          <ellipse cx={X(0)} cy={X(-0.25)} rx={X(0.2)} ry={X(0.12)} fill={shade(sauce, 0.22)} />
          <ellipse cx={X(-0.01)} cy={X(-0.29)} rx={X(0.17)} ry={X(0.1)} fill={sauce} />
          <ellipse cx={X(-0.05)} cy={X(-0.33)} rx={X(0.07)} ry={X(0.025)} fill="#F27A66" />
          <ellipse cx={X(0.06)} cy={X(-0.33)} rx={X(0.03)} ry={X(0.012)} fill="#4BB46A" transform={`rotate(20 ${X(0.06)} ${X(-0.33)})`} />
          <ellipse cx={X(-0.07)} cy={X(-0.28)} rx={X(0.03)} ry={X(0.012)} fill="#4BB46A" transform={`rotate(-30 ${X(-0.07)} ${X(-0.28)})`} />
        </g>
      </g>
    </g>
  );
}
