import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Field of wheat: five receding rows of golden stalks with ears. Origin = centre of the front row line.
// About 1000 px wide and 400 px tall at s = 1. anim sway rocks each stalk a little, out of step.
const f1 = (v: number) => v.toFixed(1);
const GOLD = "#E9B949", GOLD_DK = "#C98F2E", STEM = "#C49A45", LEAF = "#D9B45A";
const ROWS = [
  { base: -6, k: 1.0, n: 19 },
  { base: -64, k: 0.82, n: 22 },
  { base: -116, k: 0.68, n: 25 },
  { base: -160, k: 0.58, n: 28 },
  { base: -198, k: 0.5, n: 30 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const gold = p.color && p.color !== "none" ? p.color : GOLD;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={500} ry={16} fill={C.shadow} />
      {ROWS.map((row, r) => (
        <g key={r}>
          {Array.from({ length: row.n }, (_, i) => {
            const sx = -480 + (i * 960) / (row.n - 1) + (r % 2 ? 12 : 0);
            const a = anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 80 + i * 0.7 + r) : 0;
            const H = 380 * row.k, k = row.k;
            return (
              <g key={i} transform={`translate(${f1(sx)} ${row.base}) rotate(${f1(a)})`}>
                <rect x={-2.5 * k} y={-H * 0.82} width={5 * k} height={H * 0.82} fill={STEM} />
                <path d={`M 0 ${f1(-H * 0.35)} Q ${f1(34 * k)} ${f1(-H * 0.5)} ${f1(44 * k)} ${f1(-H * 0.3)} Q ${f1(20 * k)} ${f1(-H * 0.33)} 0 ${f1(-H * 0.35)} Z`} fill={LEAF} />
                <ellipse cx={0} cy={f1(-H * 0.9)} rx={12 * k} ry={40 * k} fill={gold} />
                <ellipse cx={f1(5 * k)} cy={f1(-H * 0.9)} rx={6 * k} ry={38 * k} fill={GOLD_DK} />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
}
