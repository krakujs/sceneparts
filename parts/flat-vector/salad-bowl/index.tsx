import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Salad bowl (preset of flat-vector/dish): wooden bowl of leafy greens with red tomatoes and yellow accents.
const LOOK = { vessel: "bowl", w: 440, vesselColor: "#B9814F", rimColor: "#D9A674", fill: "leafy", fillColor: "#6CC070", fillColor2: "#3E9B54", steam: false };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the bowl. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

const TOMATOES: [number, number][] = [[-0.2, -0.42], [0.06, -0.47], [0.24, -0.37]];
const YELLOW: [number, number][] = [[-0.04, -0.36], [0.14, -0.41], [-0.3, -0.3]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 440, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {TOMATOES.map(([u, v], i) => (
            <g key={"t" + i}>
              <circle cx={X(u)} cy={X(v)} r={X(0.07)} fill="#E8503F" />
              <circle cx={X(u) - X(0.025)} cy={X(v) - X(0.025)} r={X(0.02)} fill="#FFFFFF" opacity={0.45} />
              <ellipse cx={X(u)} cy={X(v) - X(0.066)} rx={X(0.03)} ry={X(0.012)} fill="#348A4F" />
            </g>
          ))}
          {YELLOW.map(([u, v], i) => (
            <g key={"y" + i}>
              <circle cx={X(u)} cy={X(v)} r={X(0.05)} fill="#FFC83D" />
              <circle cx={X(u) - X(0.018)} cy={X(v) - X(0.018)} r={X(0.016)} fill="#FFF0B0" />
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
