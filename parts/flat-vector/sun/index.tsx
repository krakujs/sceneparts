import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Round sun: solid disc with a lighter core and rounded triangular rays. Origin = centre of the sun.
const ease = (f: number, n: number) => { const t = Math.min(1, Math.max(0, f / n)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Point at radius r and angle deg (0 = up, clockwise). */
const at = (r: number, deg: number) => { const a = ((deg - 90) * Math.PI) / 180; return `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const rot = anim === "spin" ? (f * 360) / 240 : 0;
  const sc = anim === "pulse" ? 1 + 0.04 * Math.sin((f * 2 * Math.PI) / 60) : anim === "pop" ? ease(f, 20) : 1;
  const rays = Array.from({ length: 12 }, (_, i) => i);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={236} fill={body} opacity={0.14} />
      <g transform={`rotate(${rot.toFixed(1)}) scale(${sc.toFixed(3)})`}>
        {rays.map((i) => {
          const deg = i * 30, tip = i % 2 ? 200 : 226;
          return <path key={i} d={`M ${at(150, deg - 9)} L ${at(tip, deg)} L ${at(150, deg + 9)} Z`} fill={body} stroke={body} strokeWidth={16} strokeLinejoin="round" />;
        })}
        <circle r={124} fill={body} />
        <circle r={84} fill="#FFE98F" />
      </g>
    </g>
  );
}
