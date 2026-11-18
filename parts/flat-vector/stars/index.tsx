import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cluster of twelve mixed-size five- and four-pointed stars over about 900 x 600. Origin = centre of the cluster.
// anim "twinkle" fades each star in and out at its own pace.
const STARS: [number, number, number, number][] = [
  [-380, -210, 64, 5], [-215, -70, 38, 4], [-320, 130, 52, 5], [-95, -235, 32, 4], [70, -150, 76, 5], [225, -255, 44, 5],
  [115, 45, 28, 4], [345, -55, 58, 5], [300, 165, 34, 4], [-120, 205, 46, 5], [40, 275, 26, 4], [410, 235, 48, 5],
];
const star5 = (R: number) => {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? R * 0.46 : R, a = ((i * 36 - 90) * Math.PI) / 180;
    d += `${i ? "L" : "M"}${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)} `;
  }
  return d + "Z";
};
const star4 = (R: number) => { const k = (R * 0.2).toFixed(1); return `M 0 ${-R} Q ${k} ${-k} ${R} 0 Q ${k} ${k} 0 ${R} Q -${k} ${k} ${-R} 0 Q -${k} -${k} 0 ${-R} Z`; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const col = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {STARS.map(([sx, sy, R, n], i) => {
        const c = i % 3 === 1 ? shade(col, 0.14) : col;
        const tw = anim === "twinkle" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / (50 + (i % 5) * 9) + i * 1.7) : 1;
        const op = anim === "twinkle" ? 0.3 + 0.7 * tw : 1;
        const k = anim === "twinkle" ? 0.85 + 0.15 * tw : 1;
        return (
          <g key={i} transform={`translate(${sx} ${sy}) scale(${k.toFixed(3)})`} opacity={op.toFixed(3)}>
            <path d={n === 5 ? star5(R) : star4(R * 1.05)} fill={c} stroke={c} strokeWidth={R * 0.12} strokeLinejoin="round" />
          </g>
        );
      })}
    </g>
  );
}
