import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Orchard: a row of small round fruit trees with red fruit, standing on a grass strip. Origin = centre of the row on the ground.
// About 1000 px wide and 560 px tall at s = 1. anim sway moves the crowns.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const hash = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;

// Crown circles around (0,-360): [x, y, radius]
const CROWN: [number, number, number][] = [[-70, -330, 70], [60, -340, 72], [0, -400, 80], [-40, -270, 60], [50, -270, 60], [-80, -410, 56], [80, -420, 56]];
// Fruit positions inside the crown (golden-angle spread)
const FRUIT = Array.from({ length: 7 }, (_, i) => {
  const a = i * 2.39996, r = Math.sqrt((i + 0.5) / 7) * 100;
  return { x: Math.cos(a) * r, y: -360 + Math.sin(a) * r * 0.9 };
});
const TREES: [number, number, number][] = [[-370, 1, 0.9], [-185, -1, 1], [0, 1, 1.05], [185, -1, 1], [370, 1, 0.9]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const fruitC = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <rect x={-520} y={-26} width={1040} height={30} rx={14} fill="#A9CC8E" />
      {TREES.map(([tx, , ts], i) => {
        const sw = anim === "sway" ? 2 * Math.sin((f * 2 * Math.PI) / 90 + i * 0.8) : 0;
        return (
          <g key={i} transform={`translate(${f1(tx)} 0) scale(${f1(ts)})`}>
            <ellipse cx={0} cy={0} rx={130} ry={14} fill={C.shadow} />
            <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
              <rect x={-20} y={-220} width={40} height={220} rx={12} fill={C.brown} />
              <g transform={`rotate(${f1(sw)} 0 -220)`}>
                {CROWN.map(([cx, cy, r], j) => <circle key={`s${j}`} cx={cx + 12} cy={cy + 14} r={r} fill={shade(leaf, 0.2)} />)}
                {CROWN.map(([cx, cy, r], j) => <circle key={`m${j}`} cx={cx} cy={cy} r={r} fill={leaf} />)}
                {FRUIT.map((fr, j) => <circle key={`f${j}`} cx={f1(fr.x)} cy={f1(fr.y)} r={14 + 3 * hash(j)} fill={fruitC} />)}
                {FRUIT.map((fr, j) => <circle key={`h${j}`} cx={f1(fr.x - 4)} cy={f1(fr.y - 5)} r={4} fill="#FFFFFF" opacity={0.6} />)}
              </g>
            </g>
          </g>
        );
      })}
    </g>
  );
}
