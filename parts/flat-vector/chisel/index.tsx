import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wood chisel lying on the floor: chunky handle on the left, steel ferrule and tapered blade on the right.
// Origin = floor centre. Hero size: about 470 px long at s = 1. anim "tap": the chisel is struck and bounces.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
const tap = (f: number) => `translate(0 ${f1(-Math.abs(Math.sin((f * Math.PI) / 15)) * 10)})`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const handle = p.color && p.color !== "none" ? p.color : C.brown;
  const steel = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-10} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={anim === "tap" ? tap(f) : motion(anim, f)}>
        <rect x={-210} y={-64} width={180} height={64} rx={30} fill={handle} />
        <rect x={-190} y={-54} width={120} height={10} rx={5} fill={C.white} opacity={0.3} />
        <rect x={-34} y={-68} width={44} height={68} rx={8} fill={shade(steel, 0.2)} />
        <polygon points="10,-46 230,-36 230,-26 10,-18" fill={steel} />
        <polygon points="230,-36 262,-31 230,-26" fill={shade(steel, 0.1)} />
      </g>
    </g>
  );
}
