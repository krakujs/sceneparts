import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pile of red bricks: a stack of three offset rows, chunky and readable, with a few bricks loose on top.
// About 600 px wide and 380 px tall at s = 1 (room scale). Origin = bottom centre (rests on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const BW = 180, BH = 90;   // brick size

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brick = p.color && p.color !== "none" ? p.color : C.redDark;
  const mortar = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  // Rows from the bottom: each row lists the x starts of its bricks (offset alternate rows).
  const rows: number[][] = [
    [-300, -120, 60, 240],
    [-240, -60, 120],
    [-300, -120, 60, 240],
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={340} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {rows.map((row, r) => {
          const by = -(r + 1) * BH - 4;
          return row.map((bx, i) => (
            <g key={`${r}-${i}`}>
              <rect x={bx} y={by} width={BW} height={BH} rx={10} fill={mortar} />
              <rect x={bx + 8} y={by + 8} width={BW - 16} height={BH - 20} rx={8} fill={i % 2 ? brick : shade(brick, 0.08)} />
              <rect x={bx + 8} y={by + BH - 18} width={BW - 16} height={10} rx={5} fill={shade(brick, 0.3)} opacity={0.6} />
            </g>
          ));
        })}
        {/* two loose bricks on top, tilted */}
        <g transform="translate(-60 -330) rotate(-8)">
          <rect x={-BW / 2} y={-BH / 2} width={BW} height={BH} rx={10} fill={brick} />
        </g>
        <g transform="translate(120 -320) rotate(6)">
          <rect x={-BW / 2} y={-BH / 2} width={BW} height={BH} rx={10} fill={shade(brick, 0.08)} />
        </g>
      </g>
    </g>
  );
}
