import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
const PUFFS: [number, number, number][] = [[-170, 20, 80], [-70, -50, 110], [62, -70, 118], [172, 15, 84], [0, 20, 96]];
/** Cloud body with a flat band underneath. */
const cloudShape = (fill: string, under: string) => (
  <g>
    {PUFFS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />)}
    <rect x={-250} y={52} width={500} height={60} rx={30} fill={under} />
  </g>
);

// Grey rain cloud with falling streaks below it. Origin = centre of the cloud.
// anim "rain" makes the streaks fall in a loop (each streak 170 px of travel, 3 px per frame).
const STREAKS = Array.from({ length: 9 }, (_, i) => i);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 500;
  const fill = p.color && p.color !== "none" ? p.color : "#B4BCCB";
  const under = p.color2 && p.color2 !== "none" ? p.color2 : "#8C95A8";
  const rain = (p.anim ?? "none") === "rain";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {cloudShape(fill, under)}
      {STREAKS.map((i) => {
        const ph = (i * 37 + (rain ? f * 3 : 0)) % 170;
        const sx = -160 + i * 40 + (i % 2 ? 10 : -6);
        const y0 = 150 + ph;
        return <line key={i} x1={sx} y1={y0} x2={sx - 10} y2={y0 + 56} stroke={C.blue} strokeWidth={12} strokeLinecap="round" opacity={(1 - 0.6 * (ph / 170)).toFixed(3)} />;
      })}
    </g>
  );
}
