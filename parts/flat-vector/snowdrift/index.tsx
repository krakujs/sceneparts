import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Low soft drifts of snow with blue shadows and a few sparkles. Origin = centre of the ground line.
// About 1000 px wide and 280 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
/** Four-point sparkle centred on (0,0). */
const star = (r: number) => `M 0 ${-r} Q 0 0 ${r} 0 Q 0 0 0 ${r} Q 0 0 ${-r} 0 Q 0 0 0 ${-r} Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const snow = pick(p.color, C.white);
  const blue = pick(p.color2, "#BFD8EE");
  const anim: string = p.anim ?? "none";
  const tw = (k: number) => (anim === "sparkle" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40 + k * 1.7) : 1);
  const SPARKS: [number, number, number][] = [[-270, -300, 24], [220, -330, 18], [-20, -360, 14], [400, -210, 16]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={500} ry={14} fill={C.shadow} />
        {/* far drifts in blue shadow */}
        <path d="M -520 0 C -500 -110 -400 -150 -300 -150 C -200 -150 -150 -60 -110 0 Z" fill={blue} />
        <path d="M 150 0 C 190 -110 280 -170 380 -170 C 470 -170 500 -90 520 0 Z" fill={blue} />
        {/* main white drift with a blue shadow band along its foot */}
        <path d="M -520 0 C -480 -120 -360 -200 -230 -200 C -130 -200 -90 -270 10 -270 C 140 -270 200 -190 300 -170 C 400 -150 470 -60 520 0 Z" fill={snow} />
        <path d="M -520 0 C -420 -60 -250 -60 -120 -40 C 0 -22 120 -30 260 -50 C 380 -66 470 -30 520 0 Z" fill={blue} opacity={0.9} />
        {SPARKS.map(([sx, sy, r], k) => (
          <g key={k} transform={`translate(${sx} ${sy}) scale(${f1(tw(k))})`}>
            <path d={star(r)} fill={C.blue} />
          </g>
        ))}
      </g>
    </g>
  );
}
