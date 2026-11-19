import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sand castle with a flag, crenellated walls and towers, plus a small blue bucket and a spade beside it.
// Origin = centre of the ground line. About 940 px wide and 560 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const SAND = "#E8C98E";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 1600;
  const sand = p.color && p.color !== "none" ? p.color : SAND;
  const flagC = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const dark = shade(sand, 0.35);
  const towers: [number, number, number][] = [[-290, 120, -460], [290, 120, -460], [-150, 90, -380], [150, 90, -380], [0, 130, -430]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform="translate(-130 0)">
        <ellipse cx={0} cy={4} rx={480} ry={16} fill={C.shadow} />
        {/* main curtain wall */}
        <rect x={-280} y={-300} width={560} height={300} fill={sand} />
        <rect x={-280} y={-300} width={560} height={14} fill={shade(sand, 0.12)} />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={-270 + i * 70} y={-326} width={40} height={28} fill={sand} />
        ))}
        {/* arched gate */}
        <path d="M -48 0 L -48 -110 Q -48 -150 0 -150 Q 48 -150 48 -110 L 48 0 Z" fill={dark} />
        <path d="M -20 0 L -20 -100 Q -20 -118 0 -118 Q 20 -118 20 -100 L 20 0 Z" fill={shade(sand, 0.55)} />
        {/* towers */}
        {towers.map(([cx, w, top], i) => (
          <g key={i}>
            <rect x={cx - w / 2} y={top} width={w} height={-top} fill={sand} />
            <rect x={cx - w / 2} y={top} width={w} height={12} fill={shade(sand, 0.12)} />
            {[0, 0.4, 0.8].map((t, j) => (
              <rect key={j} x={cx - w / 2 + w * t} y={top - 26} width={w * 0.2} height={28} fill={sand} />
            ))}
            <rect x={cx - 10} y={top + 60} width={20} height={34} rx={8} fill={dark} />
            <rect x={cx - 10} y={top + 130} width={20} height={34} rx={8} fill={dark} />
          </g>
        ))}
        {/* flag on the centre tower */}
        <rect x={-3} y={-590} width={6} height={160} fill={C.greyDark} />
        <path d="M 3 -590 L 92 -562 L 3 -534 Z" fill={flagC} />
        {/* bucket with handle */}
        <g transform="translate(330 0)">
          <path d="M 0 0 L 22 -150 L 88 -150 L 110 0 Z" fill={C.blue} />
          <rect x={-4} y={-164} width={118} height={16} rx={6} fill={shade(C.blue, 0.2)} />
          <path d="M 22 -152 Q 55 -226 88 -152" stroke={C.greyDark} strokeWidth={8} fill="none" strokeLinecap="round" />
          <path d="M 18 -110 L 92 -110" stroke={shade(C.blue, 0.25)} strokeWidth={6} />
        </g>
        {/* spade standing in the sand */}
        <g transform="translate(486 0)">
          <rect x={-6} y={-200} width={12} height={200} rx={6} fill={C.brownDark} transform="rotate(12 0 0)" />
          <ellipse cx={18} cy={-238} rx={38} ry={52} fill={C.grey} transform="rotate(12 18 -238)" />
        </g>
      </g>
    </g>
  );
}
