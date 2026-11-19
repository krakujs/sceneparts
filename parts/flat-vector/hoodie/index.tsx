import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pullover hoodie on a wooden hanger: hood behind the neck, drawstrings, front kangaroo pocket,
// ribbed cuffs and hem. Origin = bottom centre (the hem rests on y). About 640 px wide, 740 px tall.
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
  const main = p.color && p.color !== "none" ? p.color : C.navy;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* hood, behind the body */}
          <path d="M -132 -556 C -152 -644 -110 -670 0 -670 C 110 -670 152 -644 132 -556 Z" fill={shade(main, 0.08)} />
          <path d="M -86 -580 C -92 -636 -50 -652 0 -652 C 50 -652 92 -636 86 -580 Q 0 -546 -86 -580 Z" fill={shade(main, 0.4)} />
          <path d="M -86 -580 C -92 -636 -50 -652 0 -652 C 50 -652 92 -636 86 -580" stroke={trim} strokeWidth={12} fill="none" strokeLinecap="round" />
          {/* sleeves and body */}
          <path d="M -70 -586 Q 0 -540 70 -586 L 130 -578 L 240 -520 L 252 -236 L 196 -234 L 184 -440 L 176 0 L -176 0 L -184 -440 L -196 -234 L -252 -236 L -240 -520 L -130 -578 Z" fill={main} />
          <path d="M 120 -440 Q 140 -200 146 0 L 176 0 L 184 -440 Z" fill={shade(main, 0.12)} />
          {/* ribbed cuffs and hem */}
          <path d="M -188 -262 L -254 -264 L -252 -234 L -196 -234 Z" fill={trim} />
          <path d="M 188 -262 L 254 -264 L 252 -234 L 196 -234 Z" fill={trim} />
          <rect x={-176} y={-40} width={352} height={40} fill={trim} />
          {[-34, -24, -14, -4].map((ry, i) => (
            <path key={i} d={`M -176 ${ry} L 176 ${ry}`} stroke={shade(trim, 0.15)} strokeWidth={2} />
          ))}
          {/* kangaroo pocket */}
          <path d="M -118 -340 L 118 -340 L 146 -184 L -146 -184 Z" fill={shade(main, 0.12)} stroke={shade(main, 0.28)} strokeWidth={5} strokeLinejoin="round" />
          {/* drawstrings */}
          <path d="M -22 -552 L -26 -430" stroke={trim} strokeWidth={7} strokeLinecap="round" />
          <path d="M 22 -552 L 26 -430" stroke={trim} strokeWidth={7} strokeLinecap="round" />
          <circle cx={-26} cy={-422} r={9} fill={trim} />
          <circle cx={26} cy={-422} r={9} fill={trim} />
        </g>
      </g>
    </g>
  );
}
