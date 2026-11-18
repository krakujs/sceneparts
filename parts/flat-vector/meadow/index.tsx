import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Meadow: a rolling green lawn with scattered wildflowers and a butterfly. Origin = centre of the ground line.
// About 1000 px wide and 450 px tall at s = 1. anim sway sways the flowers and flaps the butterfly.
const f1 = (v: number) => v.toFixed(1);
const GRASS = "#6CC06A", GRASS_DK = "#4FA65A", STEM = "#3E9B4F";
// [x, height, petal colour]
const FLOWERS: [number, number, string][] = [
  [-470, 190, C.pink], [-390, 250, C.yellow], [-300, 170, C.white], [-220, 280, C.purple], [-140, 200, C.orange],
  [-60, 300, C.pink], [20, 180, C.yellow], [100, 260, C.white], [190, 210, C.purple], [270, 300, C.pink],
  [360, 170, C.orange], [440, 240, C.yellow],
];
const HILL_Y = -120; // approximate top of the lawn

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const grass = p.color && p.color !== "none" ? p.color : GRASS;
  const anim: string = p.anim ?? "none";
  const sway = (i: number, amp: number) => (anim === "sway" ? amp * Math.sin((f * 2 * Math.PI) / 90 + i * 0.6) : 0);
  const flap = anim === "sway" ? Math.cos((f * 2 * Math.PI) / 24) : 1;
  const bob = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 60) * 10 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={500} ry={14} fill={C.shadow} />
      {/* lawn */}
      <path d="M -520 0 L -520 -110 C -380 -160 -200 -150 0 -130 C 200 -110 380 -150 520 -100 L 520 0 Z" fill={grass} />
      <path d="M -520 -40 C -300 -70 300 -70 520 -40 L 520 0 L -520 0 Z" fill={shade(grass, 0.12)} />
      {/* grass blades */}
      {Array.from({ length: 40 }, (_, i) => {
        const gx = -500 + i * 26 + ((i * 37) % 11);
        const gy = -40 - ((i * 53) % 30);
        return <path key={i} d={`M ${f1(gx - 8)} ${gy} Q ${f1(gx)} ${gy - 36} ${f1(gx + 6)} ${gy - 40} Q ${f1(gx + 2)} ${gy - 18} ${f1(gx + 10)} ${gy} Z`} fill={GRASS_DK} />;
      })}
      {/* wildflowers */}
      {FLOWERS.map(([fx, h, petal], i) => {
        const a = sway(i, 3);
        const tipY = HILL_Y - h;
        return (
          <g key={i} transform={`rotate(${f1(a)} ${fx} ${HILL_Y})`}>
            <path d={`M ${fx} ${HILL_Y} Q ${fx + (i % 2 ? 10 : -10)} ${HILL_Y - h / 2} ${fx} ${tipY}`} stroke={STEM} strokeWidth={5} strokeLinecap="round" fill="none" />
            <path d={`M ${fx} ${HILL_Y - h * 0.4} q 26 -10 34 -28 q -26 -2 -34 28 Z`} fill={STEM} />
            {[0, 72, 144, 216, 288].map((pa) => (
              <circle key={pa} cx={f1(fx + Math.cos(((pa - 90) * Math.PI) / 180) * 17)} cy={f1(tipY + Math.sin(((pa - 90) * Math.PI) / 180) * 17)} r={14} fill={petal} />
            ))}
            <circle cx={fx} cy={tipY} r={9} fill={C.yellowDark} />
          </g>
        );
      })}
      {/* butterfly */}
      <g transform={`translate(240 ${f1(-430 + bob)})`}>
        <ellipse cx={-36} cy={-22} rx={44 * Math.max(0.15, Math.abs(flap))} ry={36} fill={C.orange} transform={`rotate(-20 -36 -22)`} />
        <ellipse cx={36} cy={-22} rx={44 * Math.max(0.15, Math.abs(flap))} ry={36} fill={C.orange} transform={`rotate(20 36 -22)`} />
        <ellipse cx={-28} cy={18} rx={28 * Math.max(0.15, Math.abs(flap))} ry={20} fill={C.purple} />
        <ellipse cx={28} cy={18} rx={28 * Math.max(0.15, Math.abs(flap))} ry={20} fill={C.purple} />
        <circle cx={-30} cy={-16} r={6} fill={C.white} opacity={0.7} />
        <circle cx={30} cy={-16} r={6} fill={C.white} opacity={0.7} />
        <rect x={-5} y={-40} width={10} height={70} rx={5} fill={C.ink} />
        <path d="M -2 -40 Q -14 -66 -24 -68 M 2 -40 Q 14 -66 24 -68" stroke={C.ink} strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
