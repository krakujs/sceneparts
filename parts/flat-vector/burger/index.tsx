import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector burger: sesame bun, patty, cheese drip, lettuce and tomato. Plain, no brand.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 340 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Burger(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const bunC = p.bunColor ?? "#E9A95A";
  const pattyC = p.pattyColor ?? "#7A4A2E";
  const cheese = p.cheese ?? true;
  const steam = p.steam ?? false;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const W = 340;
  const seeds: [number, number][] = [[-70, -395], [-30, -410], [10, -398], [50, -412], [85, -392], [-95, -368], [-50, -372], [-8, -378], [34, -370], [72, -366], [112, -360], [-20, -352], [22, -346]];
  const drip = (x0: number, len: number) => (
    <g key={x0}>
      <path d={`M ${x0 - 14} -292 Q ${x0} -292 ${x0 + 14} -292 L ${x0 + 14} ${-292 + len} Q ${x0} ${-292 + len + 16} ${x0 - 14} ${-292 + len} Z`} fill="#FFC83D" />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={18} fill={C.shadow} />
      <g transform={tr}>
        {/* bottom bun */}
        <path d={`M ${-W / 2} -60 Q ${-W / 2} -10 ${-W / 2 + 40} -6 L ${W / 2 - 40} -6 Q ${W / 2} -10 ${W / 2} -60 Z`} fill={bunC} />
        <path d={`M ${-W / 2} -60 Q ${-W / 2} -48 ${-W / 2 + 40} -46 L ${W / 2 - 40} -46 Q ${W / 2} -48 ${W / 2} -60 Z`} fill={shade(bunC, 0.22)} />
        {/* lettuce (frilly, wider than the patty) */}
        <path d={`M ${-W / 2 - 12} -66 Q ${-W / 2 - 22} -84 ${-W / 2 + 8} -92 Q ${-120} -78 -80 -96 Q -40 -80 0 -98 Q 40 -80 80 -96 Q 120 -78 ${W / 2 - 8} -92 Q ${W / 2 + 22} -84 ${W / 2 + 12} -66 Q ${W / 2 - 40} -54 0 -60 Q ${-W / 2 + 40} -54 ${-W / 2 - 12} -66 Z`} fill={C.green} />
        <path d={`M ${-W / 2 + 20} -72 Q 0 -54 ${W / 2 - 20} -72`} stroke={C.greenDark} strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* tomato slice */}
        <ellipse cx={0} cy={-112} rx={W / 2 - 14} ry={22} fill={C.red} />
        <ellipse cx={0} cy={-115} rx={W / 2 - 40} ry={13} fill="#F26A5A" />
        {/* patty */}
        <rect x={-W / 2 + 8} y={-150} width={W - 16} height={44} rx={22} fill={pattyC} />
        <rect x={-W / 2 + 24} y={-146} width={W - 48} height={8} rx={4} fill={shade(pattyC, -0.3)} opacity={0.5} />
        {/* cheese with drips */}
        {cheese && (
          <g>
            <path d={`M ${-W / 2 + 4} -176 L ${W / 2 - 4} -176 L ${W / 2 - 4} -160 Q ${W / 2 - 60} -146 ${W / 2 - 100} -158 L ${-W / 2 + 4} -150 Z`} fill="#FFC83D" />
            <path d={`M ${-W / 2 + 4} -176 L ${W / 2 - 4} -176 L ${W / 2 - 4} -170 L ${-W / 2 + 4} -170 Z`} fill={shade("#FFC83D", 0.1)} />
            {drip(-W / 2 + 40, 26)}
            {drip(-40, 18)}
            {drip(W / 2 - 60, 30)}
          </g>
        )}
        {/* top bun */}
        <path d={`M ${-W / 2 - 4} -180 C ${-W / 2 - 6} -290 ${-W / 2 + 40} -330 0 -330 C ${W / 2 - 40} -330 ${W / 2 + 6} -290 ${W / 2 + 4} -180 Q ${W / 2 - 30} -168 0 -168 Q ${-W / 2 + 30} -168 ${-W / 2 - 4} -180 Z`} fill={bunC} />
        <path d={`M ${-W / 2 + 30} -262 C ${-W / 2 + 60} -300 ${W / 2 - 60} -300 ${W / 2 - 30} -262`} stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" opacity={0.35} />
        {seeds.map(([sx, sy], i) => (
          <ellipse key={i} cx={sx} cy={sy + 330} rx={7} ry={4} fill="#FFF7E6" transform={`rotate(${(i * 37) % 80 - 40} ${sx} ${sy + 330})`} />
        ))}
        {steam && null}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Burger {...p} />;
}
