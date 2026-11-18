import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Tornado: a grey funnel of swirling bands narrowing from a dark cloud to the ground, with debris specks.
// Origin = centre of the funnel's ground contact. anim "spin": the bands sway and the debris orbits.
const BANDS = Array.from({ length: 8 }, (_, i) => i);
const TONES = ["#9AA3B5", "#7F8799", "#B3BAC8", "#5D6578"];
const DEBRIS: [number, number, number, number][] = [
  [-200, 246, 8, 0], [170, 256, 6, 1], [-140, 280, 7, 0], [120, 300, 9, 1], [-60, 312, 5, 0],
  [230, 220, 5, 1], [-250, 190, 6, 1], [210, 130, 6, 0], [-190, 120, 5, 1], [150, 70, 5, 0],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 800;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin";
  const off = (i: number) => (spin ? 22 * Math.sin((f * 2 * Math.PI) / 50 + i * 0.9) : i % 2 ? 12 : -12);
  const debrisDx = (i: number) => (spin ? 16 * Math.sin((f * 2 * Math.PI) / 60 + i) : 0);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={-330} rx={230} ry={46} fill="#7F8799" />
      {BANDS.map((i) => {
        const w = 400 - i * 44, yy = -290 + i * 66;
        return <rect key={i} x={-w / 2 + off(i)} y={yy} width={w} height={50} rx={25} fill={TONES[i % 4]} />;
      })}
      <ellipse cx={0} cy={236} rx={110} ry={24} fill="#C9A878" />
      {DEBRIS.map(([dx, dy, r, t], i) => (
        <circle key={i} cx={dx + debrisDx(i)} cy={dy} r={r} fill={t ? C.brown : "#B89A6A"} />
      ))}
    </g>
  );
}
