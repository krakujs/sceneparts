import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall conifer: five stacked triangular tiers with drooping skirts on a short trunk. Origin = centre of the trunk base on the ground.
// About 680 px wide and 1260 px tall at s = 1. anim sway rocks each tier a little, out of step.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

// Tiers from the bottom up: [skirt y, half width at the skirt, tip y]
const TIERS: [number, number, number][] = [[-170, 330, -430], [-330, 270, -600], [-520, 210, -760], [-700, 150, -920], [-880, 90, -1080]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const green = p.color && p.color !== "none" ? p.color : C.greenDark;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <rect x={-40} y={-200} width={80} height={204} rx={10} fill={bark} />
        <rect x={10} y={-200} width={30} height={204} rx={6} fill={shade(bark, 0.2)} />
        {TIERS.map(([base, hw, tip], i) => {
          const sw = anim === "sway" ? 1.2 * Math.sin((f * 2 * Math.PI) / 90 + i * 0.7) : 0;
          const body = `M ${-hw} ${base} L 0 ${tip} L ${hw} ${base} Q 0 ${base + 28} ${-hw} ${base} Z`;
          const half = `M 0 ${tip} L ${hw} ${base} Q 0 ${base + 28} 0 ${base} Z`;
          return (
            <g key={i} transform={`rotate(${f1(sw)} 0 ${base})`}>
              <path d={body} fill={green} />
              <path d={half} fill={shade(green, 0.22)} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
