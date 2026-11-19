import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Stir-fried noodles (preset of flat-vector/dish): plate of noodle strands with vegetable bits and chopsticks.
const LOOK = { vessel: "plate", w: 480, vesselColor: "#FFFFFF", fill: "strands", fillColor: "#F2D28A", fillColor2: "#B5652B", steam: false };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the plate. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

// vegetable bits on the plate: [x, y, colour]
const BITS: [number, number, string][] = [
  [-0.2, -0.2, "#FF8A3D"], [-0.05, -0.14, "#4BB46A"], [0.1, -0.2, "#E8503F"], [0.18, -0.12, "#FF8A3D"],
  [-0.12, -0.1, "#A8D85A"], [0.02, -0.23, "#4BB46A"], [0.25, -0.18, "#A8D85A"], [-0.25, -0.14, "#FF8A3D"],
  [0.0, -0.1, "#E8503F"], [0.14, -0.1, "#9A6240"],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 480, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {BITS.map(([u, v, c], i) => (
            <rect key={i} x={X(u) - X(0.025)} y={X(v) - X(0.011)} width={X(0.05)} height={X(0.022)} rx={X(0.011)} fill={c}
              transform={`rotate(${(i * 47) % 180} ${X(u)} ${X(v)})`} />
          ))}
          {/* chopsticks resting on the plate */}
          <line x1={X(0.2)} y1={-X(0.2)} x2={X(0.6)} y2={-X(0.95)} stroke="#B5814F" strokeWidth={X(0.018)} strokeLinecap="round" />
          <line x1={X(0.24)} y1={-X(0.2)} x2={X(0.66)} y2={-X(0.94)} stroke="#B5814F" strokeWidth={X(0.018)} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}
