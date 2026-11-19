import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Casual zip jacket on a wooden hanger: stand collar, centre zip with pull, two slanted hip pockets,
// ribbed cuffs. Origin = bottom centre (the hem rests on y). About 640 px wide, 720 px tall at s = 1.
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
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* sleeves and body */}
          <path d="M -66 -588 L 66 -588 L 150 -574 L 238 -520 L 252 -236 L 196 -236 L 182 -440 L 172 0 L -172 0 L -182 -440 L -196 -236 L -252 -236 L -238 -520 L -150 -574 Z" fill={main} />
          <path d="M 120 -440 Q 140 -200 150 0 L 172 0 L 182 -440 Z" fill={shade(main, 0.1)} />
          {/* ribbed cuffs and hem */}
          <path d="M 196 -262 L 254 -264 L 252 -236 L 196 -236 Z" fill={trim} />
          <path d="M -196 -262 L -254 -264 L -252 -236 L -196 -236 Z" fill={trim} />
          <rect x={-172} y={-30} width={344} height={30} fill={shade(main, 0.2)} />
          {/* slanted hip pockets */}
          <path d="M 150 -258 L 74 -270 L 72 -236 L 146 -224 Z" fill={shade(main, 0.15)} stroke={shade(main, 0.3)} strokeWidth={4} strokeLinejoin="round" />
          <path d="M -150 -258 L -74 -270 L -72 -236 L -146 -224 Z" fill={shade(main, 0.15)} stroke={shade(main, 0.3)} strokeWidth={4} strokeLinejoin="round" />
          {/* stand collar */}
          <path d="M -70 -592 L 70 -592 L 78 -538 L -78 -538 Z" fill={shade(main, 0.18)} />
          {/* zip: dashed teeth and pull */}
          <path d="M 0 -540 L 0 -30" stroke={trim} strokeWidth={6} strokeDasharray="6 5" fill="none" />
          <rect x={-8} y={-548} width={16} height={36} rx={5} fill={trim} />
        </g>
      </g>
    </g>
  );
}
