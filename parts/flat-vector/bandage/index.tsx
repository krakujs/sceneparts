import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bandage roll lying on the floor with a strip of gauze running out to the right.
// Origin = bottom centre (rests on y). anim "unroll": the tail pays out over 90 frames and the roll turns with it.
const f1 = (v: number) => v.toFixed(1);
const R = 150; // roll radius
const CX = -120, CY = -150; // roll centre (bottom of the roll touches y)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const col = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(col, 0.12);
  const anim: string = p.anim ?? "none";
  const e = anim === "unroll" ? 1 - Math.pow(1 - Math.min(1, f / 90), 3) : 0;
  const L = anim === "unroll" ? 120 + 240 * e : 240;
  const turn = ((L - 240) / R) * (180 / Math.PI); // the roll turns as gauze comes off its bottom
  const folds = Math.floor(L / 60);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={16} fill={C.shadow} />
      <g transform="translate(30 0)">
        {/* tail of gauze lying on the floor */}
        <rect x={-60} y={-64} width={L} height={64} rx={10} fill={col} />
        <rect x={-60} y={-14} width={L} height={14} rx={7} fill={dk} />
        {Array.from({ length: folds }, (_, i) => (
          <rect key={i} x={-60 + (i + 1) * 60} y={-64} width={6} height={64} fill={dk} />
        ))}
        {/* roll: shadow disc, body, rings and a tab that shows the turning */}
        <circle cx={CX + 10} cy={CY + 10} r={R} fill={dk} />
        <circle cx={CX} cy={CY} r={R} fill={col} />
        <g transform={`rotate(${f1(turn)} ${CX} ${CY})`}>
          <circle cx={CX} cy={CY} r={110} fill="none" stroke={dk} strokeWidth={8} />
          <circle cx={CX} cy={CY} r={72} fill="none" stroke={dk} strokeWidth={8} />
          <circle cx={CX} cy={CY} r={30} fill={dk} />
          <rect x={CX - 12} y={CY - R + 6} width={24} height={36} rx={6} fill={dk} />
        </g>
      </g>
    </g>
  );
}
