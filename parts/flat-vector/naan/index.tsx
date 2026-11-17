import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector naan: a wide flat teardrop flatbread lying on a plate, seen from slightly above.
// Pale golden with char blisters, a butter sheen and herb flecks.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 440 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

// flat teardrop centred on (0,0): pointed top, round base; 440 wide, 255 tall
const BODY = "M 0 -130 C 60 -90 220 -50 220 0 C 220 70 110 125 0 125 C -110 125 -220 70 -220 0 C -220 -50 -60 -90 0 -130 Z";
const BLISTERS: [number, number, number, number][] = [
  [-120, -30, 22, 16], [-60, 20, 18, 12], [10, -50, 26, 18], [80, -10, 20, 14], [140, -40, 14, 10],
  [-150, 30, 14, 10], [30, 50, 16, 12], [-20, -90, 14, 9], [110, 40, 18, 12], [-90, -80, 12, 8],
  [60, -90, 12, 8], [-40, 90, 12, 9], [150, 15, 11, 8],
];
const HERBS: [number, number, number][] = [[-100, 0, -30], [-40, -60, 20], [40, 0, 60], [120, -30, -10], [-130, -10, 40], [20, 70, -40], [90, 40, 15], [-70, 60, -20]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Naan(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const breadC = p.breadColor ?? "#EBC47E";
  const butter = p.butter ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const PLATE_Y = -102; // plate surface centre for a plate of width 640
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Dish x={0} y={0} vessel="plate" w={640} fill="none" />
      <g transform={tr}>
        <g transform={`translate(0 ${PLATE_Y})`}>
          <ellipse cx={0} cy={14} rx={224} ry={100} fill={shade(breadC, 0.25)} opacity={0.5} />
          <path d={BODY} fill={breadC} />
          {/* darker bake edge along the lower rim */}
          <path d="M -220 0 C -220 70 -110 125 0 125 C 110 125 220 70 220 0 C 200 50 110 100 0 100 C -110 100 -200 50 -220 0 Z" fill={shade(breadC, 0.16)} opacity={0.6} />
          {BLISTERS.map(([bx, by, rx, ry], i) => (
            <ellipse key={i} cx={bx} cy={by} rx={rx} ry={ry} fill={shade(breadC, 0.55)} opacity={0.8} transform={`rotate(${(i * 31) % 70 - 35} ${bx} ${by})`} />
          ))}
          {HERBS.map(([hx, hy, a], i) => (
            <g key={"h" + i} transform={`translate(${hx} ${hy}) rotate(${a})`}>
              <ellipse cx={0} cy={0} rx={6} ry={3} fill={i % 2 ? C.green : C.greenDark} />
              <ellipse cx={6} cy={2} rx={3} ry={2} fill={C.green} />
            </g>
          ))}
          {butter && (
            <g>
              <path d="M -150 -40 Q -110 -80 -40 -92 Q -70 -40 -150 -40 Z" fill="#FFFFFF" opacity={0.45} />
              <path d="M -110 -70 Q -80 -86 -50 -90" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />
              <ellipse cx={-70} cy={-75} rx={22} ry={8} fill="#FFFFFF" opacity={0.35} />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Naan {...p} />;
}
