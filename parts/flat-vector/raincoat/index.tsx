import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hooded raincoat on a wooden hanger: storm flap with toggles, hood behind the collar, angled patch
// pockets with flaps and a rubbery hem band. Origin = bottom centre (the hem rests on y).
// About 660 px wide and 740 px tall at s = 1.
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
  const main = p.color && p.color !== "none" ? p.color : C.yellow;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* hood behind the collar, with a darker opening */}
          <path d="M -150 -556 C -158 -640 -112 -680 0 -680 C 112 -680 158 -640 150 -556 Z" fill={shade(main, 0.14)} />
          <path d="M -100 -580 C -106 -634 -60 -652 0 -652 C 60 -652 106 -634 100 -580 Q 0 -546 -100 -580 Z" fill={shade(main, 0.4)} />
          <path d="M -100 -580 C -106 -634 -60 -652 0 -652 C 60 -652 106 -634 100 -580" stroke={shade(main, 0.2)} strokeWidth={8} fill="none" />
          {/* sleeves and body */}
          <path d="M -68 -588 L 68 -588 L 152 -574 L 240 -518 L 254 -232 L 196 -232 L 184 -440 L 178 0 L -178 0 L -184 -440 L -196 -232 L -254 -232 L -240 -518 L -152 -574 Z" fill={main} />
          <path d="M 124 -440 Q 146 -200 156 0 L 178 0 L 184 -440 Z" fill={shade(main, 0.1)} />
          {/* storm flap with toggles */}
          <rect x={-26} y={-552} width={52} height={552} fill={shade(main, 0.1)} />
          <rect x={-18} y={-466} width={36} height={14} rx={7} fill={trim} />
          <rect x={-18} y={-396} width={36} height={14} rx={7} fill={trim} />
          <rect x={-18} y={-326} width={36} height={14} rx={7} fill={trim} />
          {/* hem band and cuffs */}
          <rect x={-178} y={-34} width={356} height={34} fill={trim} />
          <path d="M 196 -256 L 254 -258 L 254 -232 L 196 -232 Z" fill={trim} />
          <path d="M -196 -256 L -254 -258 L -254 -232 L -196 -232 Z" fill={trim} />
          {/* angled patch pockets with flaps */}
          <path d="M 150 -262 L 76 -274 L 74 -236 L 148 -224 Z" fill={shade(main, 0.15)} stroke={shade(main, 0.3)} strokeWidth={4} strokeLinejoin="round" />
          <path d="M -150 -262 L -76 -274 L -74 -236 L -148 -224 Z" fill={shade(main, 0.15)} stroke={shade(main, 0.3)} strokeWidth={4} strokeLinejoin="round" />
          <path d="M 150 -262 L 76 -274 L 74 -252 L 148 -240 Z" fill={trim} />
          <path d="M -150 -262 L -76 -274 L -74 -252 L -148 -240 Z" fill={trim} />
        </g>
      </g>
    </g>
  );
}
