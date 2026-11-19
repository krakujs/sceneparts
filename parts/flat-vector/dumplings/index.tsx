import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Dumplings (preset of flat-vector/dish): bamboo steamer basket with pleated white dumplings and steam.
const LOOK = { vessel: "basket", w: 440, vesselColor: "#E9D3A9", fill: "none", dumplingColor: "#FFFFFF", steam: true };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the basket. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

// dumplings as [x, base y] in units of the basket width; back row first so the front overlaps it
const DUMPLINGS: [number, number][] = [[-0.2, -0.44], [0.01, -0.48], [0.22, -0.43], [-0.1, -0.33], [0.12, -0.31]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 440, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  const skin: string = q.dumplingColor;
  const dumpling = (cx: number, cy: number, i: number) => {
    const a = X(0.075), b = X(0.07);
    return (
      <g key={i}>
        <ellipse cx={cx} cy={cy + X(0.012)} rx={a} ry={X(0.02)} fill="#D5DCE6" />
        <path d={`M ${cx - a} ${cy} C ${cx - a} ${cy - b * 1.3} ${cx + a} ${cy - b * 1.3} ${cx + a} ${cy} Z`} fill={skin} />
        {[-2, -1, 0, 1, 2].map((k) => {
          const px = cx + k * a * 0.36, py = cy - b * 0.95 * Math.sqrt(1 - (k * 0.36) ** 2);
          return <line key={k} x1={px} y1={py + b * 0.08} x2={px} y2={py + b * 0.5} stroke="#D0D8E3" strokeWidth={X(0.012)} strokeLinecap="round" />;
        })}
      </g>
    );
  };
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {DUMPLINGS.map(([u, v], i) => dumpling(X(u), X(v), i))}
        </g>
      </g>
    </g>
  );
}
