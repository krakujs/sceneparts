import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flag pole with a plain, unmarked flag (no emblem, no national flag). The cloth is built from vertical slices so it
// ripples. Origin = bottom centre; the base plinth stands on y. About 430 px wide and 1360 px tall at s = 1.
// anim "lights": the flag ripples in the breeze (its natural motion). "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const cloth = p.color && p.color !== "none" ? p.color : C.blue;
  const pole = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const phase = anim === "lights" ? f * 0.35 : 0.8;
  const N = 14, W = 360, X0 = 10, TOP = -1290, BOT = -1050, AMP = 34;
  const wave = (i: number) => AMP * (0.15 + 0.85 * (i / N)) * Math.sin(i * 0.7 - phase);
  const topY = (i: number) => TOP + wave(i);
  const botY = (i: number) => BOT + wave(i);
  const midY = (i: number) => (topY(i) + botY(i)) / 2;
  const xs = (i: number) => X0 + (i * W) / N;
  const flagPath = Array.from({ length: N + 1 }, (_, i) => `${i ? "L" : "M"} ${f1(xs(i))} ${f1(topY(i))}`).join(" ")
    + " " + Array.from({ length: N + 1 }, (_, k) => {
      const i = N - k;
      return `L ${f1(xs(i))} ${f1(botY(i))}`;
    }).join(" ") + " Z";
  const lowerPath = Array.from({ length: N + 1 }, (_, i) => `${i ? "L" : "M"} ${f1(xs(i))} ${f1(midY(i))}`).join(" ")
    + " " + Array.from({ length: N + 1 }, (_, k) => {
      const i = N - k;
      return `L ${f1(xs(i))} ${f1(botY(i))}`;
    }).join(" ") + " Z";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={70} ry={12} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <rect x={-60} y={-40} width={120} height={40} rx={8} fill={C.greyDark} />
        <rect x={-11} y={-1330} width={22} height={1300} rx={8} fill={pole} />
        <rect x={-11} y={-1330} width={8} height={1300} fill={shade(pole, 0.15)} />
        <circle cx={0} cy={-1342} r={18} fill={C.yellow} />
        <path d={flagPath} fill={cloth} />
        <path d={lowerPath} fill={shade(cloth, 0.15)} opacity={0.6} />
      </g>
    </g>
  );
}
