import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Knitted beanie: a dome with knit rows, a ribbed cuff and a pom-pom on top. Origin = bottom of the cuff (y).
// About 440 px wide and 420 px tall at s = 1. anim "sway": the pom-pom bounces gently.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wool = p.color && p.color !== "none" ? p.color : C.blue;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const bounce = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 40) * 10 : 0;
  const ribs = [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={220} ry={14} fill={C.shadow} />
      {/* dome */}
      <path d="M -200 -150 Q -210 -390 0 -390 Q 210 -390 200 -150 Z" fill={wool} />
      {/* knit rows on the dome */}
      {[-300, -330, -360].map((yy) => <path key={yy} d={`M -170 ${yy + 30} Q 0 ${yy - 14} 170 ${yy + 30}`} stroke={shade(wool, 0.2)} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />)}
      {/* highlight on the left */}
      <path d="M -150 -270 Q -160 -320 -110 -350" stroke={C.white} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.3} />
      {/* ribbed cuff */}
      <rect x={-216} y={-170} width={432} height={170} rx={36} fill={trim} />
      {ribs.map((rx) => <rect key={rx} x={rx - 5} y={-162} width={10} height={154} rx={5} fill={shade(trim, 0.18)} />)}
      <rect x={-216} y={-30} width={432} height={30} rx={14} fill={shade(trim, 0.12)} opacity={0.6} />
      {/* pom-pom */}
      <g transform={`translate(0 ${f1(bounce)})`}>
        <circle cx={0} cy={-416} r={66} fill={trim} />
        {[[-48, -452], [0, -482], [48, -452], [-44, -396], [44, -396], [0, -372]].map(([bx, by], i) => (
          <circle key={i} cx={bx} cy={by} r={24} fill={trim} />
        ))}
        <circle cx={-18} cy={-428} r={12} fill={C.white} opacity={0.5} />
      </g>
    </g>
  );
}
