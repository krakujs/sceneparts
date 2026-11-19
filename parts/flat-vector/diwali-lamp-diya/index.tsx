import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Diwali oil lamp (diya): a shallow terracotta bowl with a pinched spout, painted dots and a flame on the wick.
// Origin = bottom centre (the lamp stands on y). About 500 px wide and 330 px tall at s = 1 (spout to the right).
// anim "flicker": the flame sways and pulses. anim "bob": the lamp gently rises and falls.
const f1 = (v: number) => v.toFixed(1);
const CLAY = "#C4663F";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const clay = p.color && p.color !== "none" ? p.color : CLAY;
  const dot = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const wave = 0.5 + 0.5 * Math.sin(f * 0.9) * 0.6 + 0.5 * Math.sin(f * 2.3) * 0.4;
  const flicker = anim === "flicker";
  const sway = flicker ? Math.sin(f * 1.7) * 5 : 0;
  const fh = flicker ? 1 + (wave - 0.5) * 0.3 : 1;
  const glow = flicker ? 0.3 + wave * 0.25 : 0.4;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={18} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        <circle cx={0} cy={-230} r={210} fill={C.yellow} opacity={glow} />
        {/* bowl body with a shaded lower right side */}
        <path d="M -210 -170 Q -190 -40 0 -30 Q 190 -40 210 -170 Z" fill={clay} />
        <path d="M 40 -36 Q 186 -52 210 -170 Q 196 -80 40 -36 Z" fill={shade(clay, 0.22)} />
        {/* pinched spout on the right */}
        <path d="M 190 -196 L 302 -208 Q 306 -176 200 -150 Z" fill={clay} />
        <path d="M 240 -190 L 302 -208 Q 303 -196 290 -186 Z" fill={shade(clay, 0.3)} />
        {/* rim and oil */}
        <ellipse cx={0} cy={-170} rx={210} ry={34} fill={clay} />
        <ellipse cx={0} cy={-168} rx={168} ry={20} fill={shade(clay, 0.5)} />
        {/* painted dots */}
        {[-130, -65, 0, 65, 130].map((dx) => <circle key={dx} cx={dx} cy={-100 + Math.abs(dx) * 0.05} r={9} fill={dot} />)}
        {/* flame on the wick */}
        <g transform={`translate(${f1(sway)} -172) scale(1 ${f1(fh)})`}>
          <path d="M 0 0 C -30 -20 -36 -70 0 -112 C 36 -70 30 -20 0 0 Z" fill={C.orange} />
          <path d="M 0 -8 C -14 -26 -18 -60 0 -84 C 18 -60 14 -26 0 -8 Z" fill={C.yellow} />
        </g>
      </g>
    </g>
  );
}
