import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Office chair, side 3/4 view facing right: padded back on a gas-lift column, seat pad, armless, five-star base
// with wheels. anim spin = gentle swivel sway of the seat and back about the column. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "spin") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 90) * 5)} 0 -300)`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : "#3A4157";
  const dk = shade(c, 0.2);
  const metal = C.greyDark;
  // five star legs: spokes from the hub at (0,-130) to the wheel positions
  const spokes = [-200, -100, 0, 100, 200].map((dx) => [dx * 0.95, dx === 0 ? -20 : -40 + Math.abs(dx) * 0.05]);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={14} fill={C.shadow} />
      {/* base and column stay still; only the seat and back sway */}
      <g>
        {[-230, -115, 0, 115, 230].map((sx, i) => (
          <g key={i}>
            <line x1={0} y1={-140} x2={sx} y2={-30} stroke={metal} strokeWidth={14} strokeLinecap="round" />
            <circle cx={sx} cy={-18} r={18} fill={C.ink} />
          </g>
        ))}
        <rect x={-16} y={-200} width={32} height={80} rx={12} fill={metal} />
        <circle cx={0} cy={-150} r={34} fill={metal} />
      </g>
      <g transform={motion(p.anim ?? "none", f)}>
        {/* seat base */}
        <rect x={-150} y={-260} width={260} height={50} rx={22} fill={metal} />
        {/* seat pad, 3/4 view with shaded edge on the right */}
        <path d="M -170 -300 Q -170 -340 -130 -340 L 110 -340 Q 150 -340 150 -300 L 150 -292 Q 150 -262 120 -262 L -140 -262 Q -170 -262 -170 -292 Z" fill={c} />
        <path d="M 110 -340 Q 150 -340 150 -300 L 150 -292 Q 150 -262 120 -262 L 112 -262 Q 120 -300 110 -340 Z" fill={dk} />
        {/* back support */}
        <rect x={-150} y={-300} width={48} height={260} rx={22} fill={metal} />
        {/* padded backrest */}
        <path d="M -165 -330 L -150 -640 Q -146 -680 -110 -680 L -40 -680 Q -6 -680 -2 -640 L 10 -330 Z" fill={c} />
        <path d="M -40 -680 Q -6 -680 -2 -640 L 10 -330 L -10 -330 L -20 -640 Q -24 -676 -40 -680 Z" fill={dk} />
        <rect x={-120} y={-600} width={90} height={18} rx={9} fill="#FFFFFF" opacity={0.1} />
      </g>
    </g>
  );
}
