/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clump of pointed grass blades, about 250 px tall. Origin = bottom centre of the clump.
const f1 = (v: number) => v.toFixed(1);
// [x at base, height, lean, width, colour index]
const BLADES: [number, number, number, number, number][] = [
  [-80, 170, -30, 16, 0], [-50, 230, -14, 18, 1], [-22, 260, -4, 20, 0], [8, 250, 10, 18, 1], [36, 215, 22, 17, 0],
  [66, 180, 30, 15, 1], [-100, 120, -45, 13, 1], [94, 120, 44, 13, 0], [-4, 200, 0, 14, 1],
];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const green = p.color && p.color !== "none" ? p.color : C.green;
  const cols = [green, shade(green, 0.2)];
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? Math.min(1, f / 20) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      {BLADES.map(([bx, h, lean, w, ci], i) => {
        const sw = anim === "sway" ? 4 * Math.sin((f * 2 * Math.PI) / 70 + i * 0.7) : 0;
        const tipX = bx + lean;
        const tipY = -h;
        const d = `M ${bx - w / 2} 0 Q ${f1(bx + lean * 0.2 - w * 0.2)} ${f1(-h * 0.55)} ${f1(tipX)} ${f1(tipY)} Q ${f1(bx + lean * 0.2 + w * 0.3)} ${f1(-h * 0.55)} ${bx + w / 2} 0 Z`;
        return (
          <g key={i} transform={`rotate(${f1(sw)} ${bx} 0) scale(1 ${f1(pop)})`}>
            <path d={d} fill={cols[ci]} />
          </g>
        );
      })}
    </g>
  );
}
