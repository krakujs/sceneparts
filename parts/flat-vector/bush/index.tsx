import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round leafy shrub: a dome of overlapping leaf clumps on a flat base. Origin = centre of the bush base on the ground.
// About 560 px wide and 400 px tall at s = 1. anim sway rustles the leaves.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
// Clumps: [x, y, radius]
const CLUMPS: [number, number, number][] = [[-190, -120, 115], [190, -120, 115], [-90, -230, 125], [95, -240, 130], [0, -270, 110], [-200, -60, 60], [200, -60, 60]];
const DOTS: [number, number][] = [[-60, -300], [70, -180], [-150, -200], [150, -250], [20, -340]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 2 * Math.sin((f * 2 * Math.PI) / 80) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={18} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <g transform={`rotate(${f1(sway)} 0 0)`}>
          <rect x={-280} y={-130} width={560} height={130} rx={50} fill={shade(leaf, 0.25)} />
          {CLUMPS.map(([cx, cy, r], i) => <circle key={`s${i}`} cx={cx + 14} cy={cy + 18} r={r} fill={shade(leaf, 0.2)} />)}
          {CLUMPS.map(([cx, cy, r], i) => <circle key={`m${i}`} cx={cx} cy={cy} r={r} fill={leaf} />)}
          {DOTS.map(([dx, dy], i) => <circle key={`d${i}`} cx={dx} cy={dy} r={14} fill={C.lime} opacity={0.8} />)}
        </g>
      </g>
    </g>
  );
}
