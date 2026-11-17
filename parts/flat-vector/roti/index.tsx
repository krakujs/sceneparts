import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector roti: a stack of three round flatbreads with light brown spots, on a plate.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 420 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Roti(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const breadC = p.breadColor ?? "#F2D08A";
  const spotC = p.spotColor ?? "#B9793E";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // plate surface centre is at y -74 for a plate of width 460
  const surfY = -74, RX = 168, RY = 44, T = 22;
  const spots = (k: number) => [[-60, -6], [44, 4], [-8, 12], [78, -10], [-100, 8], [20, -6]].map(([sx, sy], i) => (
    <ellipse key={i} cx={f1(sx * 0.9 + k * 2)} cy={f1(sy * 0.6)} rx={11 + (i % 3) * 2} ry={6 + (i % 2)} fill={spotC} opacity={0.75} transform={`rotate(${(i * 23) % 50 - 25} ${f1(sx * 0.9)} ${f1(sy * 0.6)})`} />
  ));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Dish x={0} y={0} vessel="plate" w={460} fill="none" />
      <g transform={tr}>
        {[0, 1, 2].map((i) => {
          const cy = surfY - i * T;
          return (
            <g key={i}>
              {/* thickness band */}
              <path d={`M ${-RX} ${cy} L ${-RX} ${cy + 0} A ${RX} ${RY} 0 0 0 ${RX} ${cy} L ${RX} ${cy - 10} A ${RX} ${RY} 0 0 1 ${-RX} ${cy - 10} Z`} fill={shade(breadC, 0.14)} />
              <ellipse cx={0} cy={cy - 10} rx={RX} ry={RY} fill={i === 2 ? breadC : shade(breadC, 0.04)} />
              <ellipse cx={-40} cy={cy - 16} rx={RX * 0.45} ry={RY * 0.28} fill="#FFFFFF" opacity={0.18} />
              <g transform={`translate(0 ${cy - 10})`} >{spots(i)}</g>
            </g>
          );
        })}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Roti {...p} />;
}
