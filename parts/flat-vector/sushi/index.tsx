import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Sushi (preset of flat-vector/dish): wooden board with two nigiri (rice block + topping), two maki rolls with dark nori
// and a dab of green wasabi.
const LOOK = { vessel: "board", w: 460, vesselColor: "#C58A55", fill: "none", steam: false, toppingColor: "#F28C5B", tunaColor: "#D8473D" };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the board. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 460, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  const top = -X(0.29); // the board's top edge
  const nigiri = (cx: number, topping: string, key: string) => (
    <g key={key}>
      <rect x={X(cx) - X(0.1)} y={top - X(0.09)} width={X(0.2)} height={X(0.09)} rx={X(0.025)} fill="#FFF8EC" />
      <rect x={X(cx) - X(0.11)} y={top - X(0.155)} width={X(0.22)} height={X(0.075)} rx={X(0.03)} fill={topping} />
      <line x1={X(cx) - X(0.04)} y1={top - X(0.15)} x2={X(cx) - X(0.05)} y2={top - X(0.09)} stroke="#FFFFFF" strokeWidth={X(0.006)} opacity={0.5} />
    </g>
  );
  const maki = (cx: number, filling: string, key: string) => (
    <g key={key}>
      <circle cx={X(cx)} cy={top - X(0.09)} r={X(0.09)} fill="#2A2F3A" />
      <circle cx={X(cx)} cy={top - X(0.09)} r={X(0.075)} fill="#FFF8EC" />
      <circle cx={X(cx)} cy={top - X(0.09)} r={X(0.03)} fill={filling} />
    </g>
  );
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {nigiri(-0.34, q.toppingColor, "n1")}
          {nigiri(-0.11, q.tunaColor, "n2")}
          {/* wasabi dab on the tuna */}
          <ellipse cx={X(-0.1)} cy={top - X(0.2)} rx={X(0.03)} ry={X(0.018)} fill="#8BC34A" />
          <ellipse cx={X(-0.11)} cy={top - X(0.205)} rx={X(0.012)} ry={X(0.007)} fill="#C5E39A" />
          {maki(0.1, "#F28C5B", "m1")}
          {maki(0.31, "#6CC070", "m2")}
        </g>
      </g>
    </g>
  );
}
