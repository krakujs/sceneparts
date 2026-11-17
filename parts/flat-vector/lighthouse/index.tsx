import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Striped lighthouse on rocks, front view. Origin = base on the ground. About 540 px wide and 1010 px tall at s = 1.
// anim "beam": the light sweeps round, with a beam shining out in both directions.
const f1 = (v: number) => v.toFixed(1);
const LAMP_Y = -888;
const half = (y: number) => 120 + (65 - 120) * ((-60 - y) / 760);
const YS = [-60, -187, -313, -440, -567, -693, -820];
const motion = (anim: string, f: number) => (anim === "pop"
  ? (() => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; })()
  : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const band1 = p.color && p.color !== "none" ? p.color : C.red;
  const band2 = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sweep = anim === "beam" ? f * 1.5 : 0;
  const beam = <path d="M 0 0 L 980 -210 Q 1020 0 980 210 Z" fill={C.yellow} opacity={0.5} />;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {anim === "beam" && (
          <g transform={`translate(0 ${LAMP_Y}) rotate(${f1(sweep)})`}>
            {beam}
            <g transform="rotate(180)">{beam}</g>
          </g>
        )}
        {/* rocks at the base */}
        <path d="M -270 0 Q -250 -70 -170 -62 Q -130 -130 -50 -104 Q 10 -150 80 -100 Q 170 -118 220 -56 Q 280 -40 270 0 Z" fill={C.greyDark} />
        <path d="M -120 -80 Q -50 -120 20 -96 Q -40 -94 -120 -80 Z" fill={C.grey} />
        <path d="M 60 -70 Q 130 -110 200 -60 Q 150 -50 60 -70 Z" fill={C.grey} />
        {/* striped tower */}
        {YS.slice(0, -1).map((y0, i) => {
          const y1 = YS[i + 1], h0 = half(y0), h1 = half(y1);
          return (
            <path key={i} d={`M ${f1(-h0)} ${y0} L ${f1(h0)} ${y0} L ${f1(h1)} ${y1} L ${f1(-h1)} ${y1} Z`} fill={i % 2 ? band2 : band1} />
          );
        })}
        {/* gallery, lamp room, roof and lantern */}
        <rect x={-110} y={-846} width={220} height={24} rx={4} fill={C.greyDark} />
        <rect x={-64} y={-930} width={128} height={84} rx={6} fill={C.sky} />
        <circle cx={0} cy={LAMP_Y} r={40} fill={C.yellow} />
        <rect x={-6} y={-930} width={12} height={84} fill={C.greyDark} />
        <path d="M -84 -930 L 0 -1000 L 84 -930 Z" fill={C.greyDark} />
        <rect x={-6} y={-1012} width={12} height={14} fill={C.greyDark} />
      </g>
    </g>
  );
}
