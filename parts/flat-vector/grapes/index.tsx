/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector grape bunch: 15 overlapping berries in a downward triangle, with stem and leaf.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};
/** Leaf along +x from the origin, pointed at both ends. */
const leaf = (L: number, W: number) => `M 0 0 Q ${f1(L / 2)} ${f1(-W)} ${f1(L)} 0 Q ${f1(L / 2)} ${f1(W)} 0 0 Z`;

const R = 40;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const green = p.color === "green";
  const col = green ? C.green : C.purple;
  const leafC = green ? C.greenDark : C.green;

  // 5 + 4 + 3 + 2 + 1 = 15 berries, bottom row first so the upper rows sit on top
  const dots: [number, number][] = [];
  for (let k = 4; k >= 0; k--) {
    const n = 5 - k, cy = -R - (4 - k) * 72;
    for (let i = 0; i < n; i++) dots.push([(i - (n - 1) / 2) * 80, cy]);
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={175} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <path d="M 0 -350 Q 10 -400 -4 -442" stroke={C.brown} strokeWidth={13} strokeLinecap="round" fill="none" />
        <g transform="translate(6 -418) rotate(-35)">
          <path d={leaf(150, 46)} fill={leafC} />
          <path d="M 0 0 L 132 0" stroke={shade(leafC, 0.3)} strokeWidth={4} strokeLinecap="round" />
        </g>
        {dots.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={R} fill={shade(col, 0.25)} />
            <circle cx={cx - 5} cy={cy - 5} r={R - 5} fill={col} />
            <ellipse cx={cx - 14} cy={cy - 16} rx={8} ry={5} fill="#FFFFFF" opacity={0.5} transform={`rotate(-35 ${f1(cx - 14)} ${f1(cy - 16)})`} />
          </g>
        ))}
      </g>
    </g>
  );
}
