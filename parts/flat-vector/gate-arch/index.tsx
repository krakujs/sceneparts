import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ornamental entrance archway, front view: two stone pillars with capitals and finials, a curved arch top with a
// decorated medallion, and an open iron gate between them with spear-tipped bars. Generic, not a real landmark.
// Origin = bottom centre; the pillar bases stand on y. About 840 px wide and 960 px tall at s = 1.
// anim "lights": the two pillar lanterns and the top orb glow on one after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.sand;
  const iron = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const litIndex = Math.floor(f / 12) % 3;
  const lit = (i: number) => anim === "lights" && litIndex === i;
  const bars = Array.from({ length: 12 }, (_, i) => -264 + i * 48);
  const pillar = (cx: number) => (
    <g key={cx}>
      <rect x={cx - 55} y={-50} width={110} height={50} rx={8} fill={C.greyDark} />
      <rect x={cx - 55} y={-740} width={110} height={700} rx={8} fill={stone} />
      <rect x={cx - 55} y={-560} width={110} height={14} fill={shade(stone, 0.15)} />
      <rect x={cx - 55} y={-300} width={110} height={14} fill={shade(stone, 0.15)} />
      <rect x={cx - 75} y={-770} width={150} height={40} rx={8} fill={shade(stone, 0.1)} />
      <path d={`M ${cx - 65} -770 L ${cx} -840 L ${cx + 65} -770 Z`} fill={iron} />
      <circle cx={cx} cy={-850} r={18} fill={lit(cx < 0 ? 0 : 1) ? C.yellow : C.greyLight} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {/* arch top: curved band, medallion and orbs */}
        <path d="M -345 -760 Q -345 -930 0 -930 Q 345 -930 345 -760" fill="none" stroke={stone} strokeWidth={44} />
        <path d="M -300 -760 Q -300 -880 0 -880 Q 300 -880 300 -760 Z" fill={shade(stone, 0.08)} />
        <circle cx={0} cy={-800} r={60} fill="none" stroke={iron} strokeWidth={12} />
        <circle cx={0} cy={-800} r={24} fill={iron} />
        <circle cx={-259} cy={-888} r={14} fill={iron} />
        <circle cx={259} cy={-888} r={14} fill={iron} />
        <circle cx={0} cy={-930} r={20} fill={lit(2) ? C.yellow : iron} />
        {/* open iron gate between the pillars */}
        <rect x={-290} y={-520} width={580} height={12} rx={4} fill={iron} />
        <rect x={-290} y={-240} width={580} height={12} rx={4} fill={iron} />
        {bars.map((bx) => (
          <g key={bx}>
            <rect x={bx - 6} y={-660} width={12} height={660} fill={iron} />
            <path d={`M ${bx - 10} -660 L ${bx} -700 L ${bx + 10} -660 Z`} fill={iron} />
          </g>
        ))}
        {/* pillars, capitals, finials and lanterns */}
        {[-345, 345].map((cx) => pillar(cx))}
      </g>
    </g>
  );
}
