import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Generic wireless signal symbol: a dot with three arcs (no wordmark). It floats: x,y is the centre of the dot.
// anim "signal": the arcs light up in turn, inner to outer, then reset.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// Arc of radius R spanning 90 degrees centred on straight up (a wifi-style fan).
const arc = (R: number) => {
  const d = R * Math.SQRT1_2;
  return `M ${f1(-d)} ${f1(-d)} A ${R} ${R} 0 0 1 ${f1(d)} ${f1(-d)}`;
};
const RADII = [90, 170, 250];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const on = p.color && p.color !== "none" ? p.color : C.blue;
  const off = p.off && p.off !== "none" ? p.off : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const lit = anim === "signal" ? Math.floor(f / 12) % 4 : 3;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {RADII.map((R, k) => (
          <path key={R} d={arc(R)} fill="none" stroke={k < lit ? on : off} strokeWidth={36} strokeLinecap="round" />
        ))}
        <circle cx={0} cy={0} r={32} fill={on} />
        <circle cx={-10} cy={-10} r={8} fill={C.white} opacity={0.5} />
      </g>
    </g>
  );
}
