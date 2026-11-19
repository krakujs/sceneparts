import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Short-sleeved polo shirt on a wooden hanger: soft folded collar, 3-button placket, sleeve trim.
// Origin = bottom centre (the hem rests on y). About 600 px wide and 720 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);

const Hanger = () => (
  <g fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 -654 L 0 -680 Q 0 -712 20 -708 Q 34 -702 26 -688" />
    <path d="M -198 -594 L 0 -654 L 198 -594" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const main = p.color && p.color !== "none" ? p.color : C.green;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const buttons = [-508, -474, -440];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* short sleeves and body */}
          <path d="M -66 -588 L 66 -588 L 128 -578 L 262 -512 L 230 -440 L 186 -456 L 180 0 L -180 0 L -186 -456 L -230 -440 L -262 -512 L -128 -578 Z" fill={main} />
          <path d="M 120 -440 Q 140 -200 146 0 L 180 0 L 186 -456 Z" fill={shade(main, 0.12)} />
          <rect x={-180} y={-18} width={360} height={18} fill={shade(main, 0.14)} />
          {/* sleeve hems */}
          <path d="M 262 -512 L 230 -440" stroke={trim} strokeWidth={12} strokeLinecap="round" />
          <path d="M -262 -512 L -230 -440" stroke={trim} strokeWidth={12} strokeLinecap="round" />
          {/* folded collar, two pieces meeting at a V */}
          <path d="M -66 -590 L -16 -546 L -40 -514 L -106 -576 Z" fill={trim} stroke={shade(trim, 0.2)} strokeWidth={4} strokeLinejoin="round" />
          <path d="M 66 -590 L 16 -546 L 40 -514 L 106 -576 Z" fill={trim} stroke={shade(trim, 0.2)} strokeWidth={4} strokeLinejoin="round" />
          {/* placket with three buttons */}
          <rect x={-22} y={-548} width={44} height={118} rx={6} fill={trim} stroke={shade(trim, 0.2)} strokeWidth={3} />
          {buttons.map((by, i) => (
            <circle key={i} cx={0} cy={by} r={6} fill={shade(trim, 0.3)} />
          ))}
        </g>
      </g>
    </g>
  );
}
