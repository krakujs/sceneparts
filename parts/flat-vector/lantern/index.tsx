import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Camping or storm lantern, hero scale: about 300 px wide and 500 px tall at s = 1, standing on its base with a handle on top.
// Glowing flame inside a glass cage. anim "flicker": the flame wobbles and its glow pulses, using p.f.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// Flicker: two sine waves at different speeds, so the flame never looks mechanical.
const flick = (f: number) => 0.5 + 0.5 * Math.sin(f * 0.9) * 0.6 + 0.5 * Math.sin(f * 2.3) * 0.4;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const flicker = anim === "flicker";
  const k = flicker ? flick(f) : 0.5;            // 0..1 flame strength
  const fh = 1 + (flicker ? (k - 0.5) * 0.25 : 0);  // flame height factor
  const fx = flicker ? Math.sin(f * 1.7) * 4 : 0;   // flame sways sideways
  const glow = flicker ? 0.35 + k * 0.3 : 0.5;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "flicker" ? "none" : anim, f)}>
        {/* glow halo behind the flame */}
        <circle cx={0} cy={-300} r={170} fill={C.yellow} opacity={glow * 0.35} />
        {/* base */}
        <rect x={-100} y={-40} width={200} height={40} rx={12} fill={metal} />
        <rect x={-120} y={-14} width={240} height={14} rx={7} fill={shade(metal, 0.25)} />
        {/* body: the glass cage */}
        <rect x={-95} y={-220} width={190} height={180} rx={14} fill={C.yellowDark} opacity={0.3} />
        {/* glass panes with the flame */}
        <path d={`M${-95 + fx * 0.3} ${-220} L${-70} ${-230} L70 -230 L95 -220 L95 -40 L-95 -40 Z`} fill={C.yellow} opacity={0.25} />
        <g transform={`translate(${f1(fx)} -130) scale(1.6 ${f1(1.6 * fh)}) translate(0 130)`}>
          <path d="M0 -130 Q-42 -170 -20 -220 Q-6 -200 0 -210 Q14 -190 30 -200 Q30 -150 0 -130 Z" fill={C.orange} />
          <path d="M0 -150 Q-24 -180 -6 -212 Q6 -196 14 -198 Q20 -170 0 -150 Z" fill={C.yellow} />
        </g>
        {/* frame bars */}
        {[-95, -32, 32, 95].map((bx) => <rect key={bx} x={bx - 7} y={-220} width={14} height={180} rx={6} fill={metal} />)}
        {/* top cap and handle */}
        <rect x={-120} y={-244} width={240} height={26} rx={12} fill={metal} />
        <path d="M-72 -244 Q-72 -330 0 -330 Q72 -330 72 -244" fill="none" stroke={shade(metal, 0.1)} strokeWidth={14} strokeLinecap="round" />
        <rect x={-30} y={-262} width={60} height={18} rx={9} fill={body} />
      </g>
    </g>
  );
}
