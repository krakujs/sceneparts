import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";
import { shade } from "../style/index";

// Spring rolls (preset of flat-vector/dish): plate of three golden crispy rolls stacked, with a small dipping sauce bowl.
const LOOK = { vessel: "plate", w: 460, vesselColor: "#FFFFFF", fill: "none", steam: false, rollColor: "#E8A94A", sauceColor: "#D9413A" };

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
  const w: number = q.w ?? 460, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  const roll = (cx: number, cy: number, len: number, ang: number, key: string) => {
    const L = X(len), h = X(0.13), c: string = q.rollColor;
    return (
      <g key={key} transform={`translate(${X(cx)} ${X(cy)}) rotate(${ang})`}>
        <rect x={-L / 2} y={-h / 2 + X(0.02)} width={L} height={h} rx={h / 2} fill={shade(c, 0.3)} />
        <rect x={-L / 2} y={-h / 2} width={L} height={h} rx={h / 2} fill={c} />
        {[-0.3, 0, 0.28].map((k, i) => (
          <g key={i}>
            <circle cx={L * k} cy={-h * 0.18} r={h * 0.1} fill="#F7D28A" />
            <circle cx={L * k + h * 0.2} cy={h * 0.16} r={h * 0.08} fill={shade(c, 0.22)} />
          </g>
        ))}
      </g>
    );
  };
  // small bowl with dipping sauce
  const sauceBowl = (cx: number, base: number) => {
    const rx = X(0.08), ry = X(0.03), h = X(0.07), top = X(base) - h;
    return (
      <g>
        <path d={`M ${X(cx) - rx} ${top} L ${X(cx) - rx * 0.62} ${X(base)} L ${X(cx) + rx * 0.62} ${X(base)} L ${X(cx) + rx} ${top} A ${rx} ${ry} 0 0 1 ${X(cx) - rx} ${top} Z`} fill="#FFFFFF" />
        <ellipse cx={X(cx)} cy={top} rx={rx} ry={ry} fill="#FFFFFF" />
        <ellipse cx={X(cx)} cy={top} rx={rx * 0.84} ry={ry * 0.84} fill={q.sauceColor} />
      </g>
    );
  };
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {roll(-0.13, -0.2, 0.36, -8, "a")}
          {roll(0.13, -0.2, 0.36, 8, "b")}
          {roll(0, -0.3, 0.34, 0, "c")}
          {sauceBowl(0.3, -0.12)}
        </g>
      </g>
    </g>
  );
}
