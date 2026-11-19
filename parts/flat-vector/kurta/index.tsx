import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Kurta, a long tunic with a band collar, a short button placket, long sleeves, cuffs and side slits,
// on a wooden hanger. Origin = bottom centre (the hem rests on y). About 500 px wide, 720 px tall.
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
  const main = p.color && p.color !== "none" ? p.color : C.orange;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const buttons = [-540, -496, -452];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* long narrow sleeves and tunic body */}
          <path d="M -58 -586 L 58 -586 L 132 -576 L 196 -250 L 150 -240 L 152 -430 L 176 0 L -176 0 L -152 -430 L -150 -240 L -196 -250 L -132 -576 Z" fill={main} />
          <path d="M 120 -430 Q 140 -200 150 0 L 176 0 L 152 -430 Z" fill={shade(main, 0.1)} />
          {/* side slits at the hem */}
          <path d="M 174 -90 L 174 0" stroke={shade(main, 0.5)} strokeWidth={6} strokeLinecap="round" />
          <path d="M -174 -90 L -174 0" stroke={shade(main, 0.5)} strokeWidth={6} strokeLinecap="round" />
          {/* cuffs */}
          <rect x={146} y={-262} width={56} height={18} rx={4} fill={trim} />
          <rect x={-202} y={-262} width={56} height={18} rx={4} fill={trim} />
          {/* band collar */}
          <rect x={-60} y={-600} width={120} height={28} rx={10} fill={trim} />
          {/* short placket with buttons */}
          <rect x={-20} y={-574} width={40} height={180} rx={6} fill={trim} />
          {buttons.map((by, i) => (
            <circle key={i} cx={0} cy={by + 20} r={7} fill={C.white} stroke={shade(trim, 0.25)} strokeWidth={2} />
          ))}
        </g>
      </g>
    </g>
  );
}
