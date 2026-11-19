import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Vineyard: three receding rows of vines on wooden posts with two wires, leaves and purple grape bunches.
// Origin = centre of the front row's ground line. About 1000 px wide and 330 px tall at s = 1. anim sway rocks the rows gently.
const f1 = (v: number) => v.toFixed(1);
const POST = "#8A5A3C", WIRE = "#5D6578", LEAF = "#3E9B4F", GRAPE = "#7B5CD6";
// back row first: base y, scale k
const ROWS = [
  { base: -300, k: 0.55 },
  { base: -150, k: 0.78 },
  { base: 0, k: 1 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const grape = p.color && p.color !== "none" ? p.color : GRAPE;
  const leaf = p.color2 && p.color2 !== "none" ? p.color2 : LEAF;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={500} ry={14} fill={C.shadow} />
      {ROWS.map((row, r) => {
        const k = row.k, b = row.base;
        const a = anim === "sway" ? 1.5 * Math.sin((f * 2 * Math.PI) / 100 + r) : 0;
        const posts = [-3, -2, -1, 0, 1, 2, 3];
        const hi = b - 230 * k, lo = b - 160 * k; // top and lower wire heights
        return (
          <g key={r} transform={`rotate(${f1(a)} 0 ${b})`}>
            {/* wires */}
            <rect x={-480 * k} y={hi - 2 * k} width={960 * k} height={3 * k} fill={WIRE} />
            <rect x={-480 * k} y={lo - 2 * k} width={960 * k} height={3 * k} fill={WIRE} />
            {/* vines with leaves and bunches in the gaps */}
            {posts.slice(0, -1).map((pi, gi) => {
              const gx = (pi + 0.5) * 160 * k;
              return (
                <g key={gi}>
                  {[-40, -14, 14, 40].map((dx, li) => (
                    <ellipse key={li} cx={f1(gx + dx * k)} cy={f1(hi - 6 * k + (li % 2 ? 4 : -4) * k)} rx={15 * k} ry={8 * k} fill={li % 2 ? shade(leaf, 0.15) : leaf} transform={`rotate(${li % 2 ? 30 : -30} ${f1(gx + dx * k)} ${f1(hi)})`} />
                  ))}
                  {gi % 2 === 0 && [[-10, 0], [10, 0], [0, 12], [-6, 26], [8, 26], [0, 40]].map(([dx, dy], bi) => (
                    <circle key={bi} cx={f1(gx + dx * k)} cy={f1(lo + 4 * k + dy * k)} r={11 * k} fill={bi % 2 ? shade(grape, 0.2) : grape} />
                  ))}
                </g>
              );
            })}
            {/* wooden posts */}
            {posts.map((pi) => (
              <g key={pi}>
                <rect x={pi * 160 * k - 6 * k} y={b - 230 * k} width={12 * k} height={230 * k} rx={3 * k} fill={POST} />
                <rect x={pi * 160 * k - 6 * k} y={b - 230 * k} width={12 * k} height={18 * k} fill={shade(POST, 0.25)} />
              </g>
            ))}
          </g>
        );
      })}
    </g>
  );
}
