import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Golden oil lamp: round body, a long curved spout to the right, a loop handle at the back and a flat lid.
// Origin = bottom centre. About 420 px wide and 260 px tall at s = 1. anim "smoke": a purple wisp rises from
// the spout tip, drifts and fades, looping every 120 frames.
const f1 = (v: number) => v.toFixed(1);
const SPOUT_TIP = { x: 230, y: -170 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.4, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brass = p.color && p.color !== "none" ? p.color : C.yellow;
  const smoke = p.smoke && p.smoke !== "none" ? p.smoke : C.purple;
  const anim: string = p.anim ?? "smoke";
  const t = anim === "smoke" ? (f % 120) / 120 : 0;
  const wisp = (k: number) => {
    const u = (t + k * 0.33) % 1;
    const sway = Math.sin((u + k) * Math.PI * 2) * 30;
    return (
      <path key={k} d={`M ${SPOUT_TIP.x} ${SPOUT_TIP.y} Q ${f1(SPOUT_TIP.x + 40 + sway)} ${f1(SPOUT_TIP.y - 90 - u * 80)} ${f1(SPOUT_TIP.x + sway)} ${f1(SPOUT_TIP.y - 170 - u * 160)}`}
        fill="none" stroke={smoke} strokeWidth={f1(22 - u * 10) as any} strokeLinecap="round" opacity={0.7 * (1 - u)} />
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={210} ry={14} fill={C.shadow} />
      {/* handle loop at the back */}
      <path d="M -120 -150 Q -210 -200 -170 -120 Q -140 -80 -100 -110" fill="none" stroke={shade(brass, 0.2)} strokeWidth={22} strokeLinecap="round" />
      {/* spout: a long curved taper to the tip */}
      <path d="M 80 -140 Q 180 -150 230 -170 Q 200 -150 160 -132 Z" fill={shade(brass, 0.1)} />
      <path d="M 90 -150 Q 170 -170 232 -176 L 232 -162 Q 170 -156 90 -134 Z" fill={brass} />
      {/* body: round bowl on a short foot */}
      <path d="M -150 -90 Q -150 -220 0 -220 Q 150 -220 150 -90 Q 150 -30 0 -30 Q -150 -30 -150 -90 Z" fill={brass} />
      <path d="M 40 -210 Q 150 -190 150 -90 Q 150 -40 60 -32 Q 110 -80 40 -210 Z" fill={shade(brass, 0.2)} opacity={0.7} />
      <rect x={-70} y={-40} width={140} height={24} rx={10} fill={shade(brass, 0.25)} />
      {/* lid with a small knob and a flame-free wick hole */}
      <ellipse cx={-10} cy={-220} rx={70} ry={14} fill={shade(brass, 0.1)} />
      <circle cx={-10} cy={-232} r={10} fill={C.yellowDark} />
      {/* highlight */}
      <path d="M -100 -150 Q -100 -190 -60 -196" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.5} />
      {anim === "smoke" && [0, 1, 2].map((k) => wisp(k))}
    </g>
  );
}
