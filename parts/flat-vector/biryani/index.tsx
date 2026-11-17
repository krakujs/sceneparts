import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Biryani (preset of flat-vector/dish): wide plate of orange-and-white rice with a chicken leg and herbs.
const LOOK = { vessel: "plate", w: 500, vesselColor: "#FFFFFF", rimColor: "#DDE2EA", fill: "grains", fillColor: "#FFF6E3", fillColor2: "#F4A259", garnish: "herbs", steam: false };

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
  const w: number = q.w ?? 500, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {/* chicken leg resting on the right of the rice */}
          <g transform={`translate(${X(0.16)} ${-X(0.3)}) rotate(-28)`}>
            <line x1={X(0.08)} y1={0} x2={X(0.2)} y2={X(0.03)} stroke="#F5F1E6" strokeWidth={X(0.03)} strokeLinecap="round" />
            <circle cx={X(0.22)} cy={X(-0.01)} r={X(0.024)} fill="#F5F1E6" />
            <circle cx={X(0.24)} cy={X(0.03)} r={X(0.024)} fill="#F5F1E6" />
            <ellipse cx={0} cy={X(0.012)} rx={X(0.12)} ry={X(0.09)} fill="#B5581E" />
            <ellipse cx={0} cy={0} rx={X(0.12)} ry={X(0.088)} fill="#D9782F" />
            <ellipse cx={X(-0.04)} cy={X(-0.035)} rx={X(0.05)} ry={X(0.018)} fill="#EE9A55" />
          </g>
        </g>
      </g>
    </g>
  );
}
