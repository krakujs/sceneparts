import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Gentle rounded grassy hill with a few grass tufts. Origin = centre of the base. About 1000 px wide and 440 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
const TUFTS: [number, number][] = [[-380, -30], [-250, -120], [-120, -230], [40, -300], [190, -200], [330, -60], [300, -130]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const grass = col(p.color, C.green);
  const tuft = col(p.color2, C.greenDark);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <path d="M -500 0 C -500 -200 -300 -440 0 -440 C 300 -440 500 -200 500 0 Z" fill={grass} />
        <path d="M -60 -436 C 200 -420 500 -220 500 0 L 60 0 C 60 -200 0 -340 -60 -436 Z" fill={shade(grass, 0.15)} />
        {TUFTS.map(([x0, y0], i) => {
          const sw = anim === "sway" ? Math.sin(f / 30 + i * 1.3) * 4 : 0;
          return (
            <path key={i} transform={`rotate(${f1(sw)} ${x0} ${y0})`}
              d={`M ${x0 - 18} ${y0} Q ${x0 - 14} ${y0 - 20} ${x0 - 18} ${y0 - 40} Q ${x0 - 6} ${y0 - 22} ${x0} ${y0 - 52} Q ${x0 + 6} ${y0 - 22} ${x0 + 18} ${y0 - 38} Q ${x0 + 14} ${y0 - 18} ${x0 + 18} ${y0} Z`}
              fill={tuft} />
          );
        })}
      </g>
    </g>
  );
}
