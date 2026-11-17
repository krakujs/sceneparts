import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Idli (preset of flat-vector/dish): steel plate of white flat-domed idli with a bowl of green chutney and a bowl of sambar.
const LOOK = { vessel: "plate", w: 480, vesselColor: "#C9D1DC", rimColor: "#E3E8EF", fill: "none", steam: true };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the plate. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

const IDLI: [number, number][] = [[0.0, -0.25], [0.14, -0.24], [-0.15, -0.16], [0.1, -0.13]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 480, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  const idli = (cx: number, cy: number, i: number) => (
    <g key={"i" + i}>
      <ellipse cx={X(cx)} cy={X(cy) + X(0.014)} rx={X(0.085)} ry={X(0.046)} fill="#E4DFD0" />
      <ellipse cx={X(cx)} cy={X(cy)} rx={X(0.085)} ry={X(0.046)} fill="#FFFFFF" />
      <ellipse cx={X(cx) - X(0.015)} cy={X(cy) - X(0.012)} rx={X(0.04)} ry={X(0.018)} fill="#FBF9F3" />
    </g>
  );
  // small bowl standing on the plate: white bowl with coloured content
  const smallBowl = (cx: number, base: number, content: string, key: string) => {
    const rx = X(0.075), ry = X(0.03), h = X(0.07), top = X(base) - h;
    return (
      <g key={key}>
        <path d={`M ${X(cx) - rx} ${top} L ${X(cx) - rx * 0.62} ${X(base)} L ${X(cx) + rx * 0.62} ${X(base)} L ${X(cx) + rx} ${top} A ${rx} ${ry} 0 0 1 ${X(cx) - rx} ${top} Z`} fill="#FFFFFF" />
        <ellipse cx={X(cx)} cy={top} rx={rx} ry={ry} fill="#FFFFFF" />
        <ellipse cx={X(cx)} cy={top} rx={rx * 0.84} ry={ry * 0.84} fill={content} />
      </g>
    );
  };
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {IDLI.map(([u, v], i) => idli(u, v, i))}
          {smallBowl(-0.3, -0.1, "#7DBE5A", "chutney")}
          {smallBowl(0.3, -0.1, "#D9832F", "sambar")}
        </g>
      </g>
    </g>
  );
}
