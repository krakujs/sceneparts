import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, HAIR, shade, skinColour } from "../style/index";

// Baby: a separate small seated drawing (not a Person), about 260 px tall at s = 1, origin at the bottom centre.
// Big round head, round onesie, a tiny wisp of hair. Gentle bob and wiggle from f.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const f = p.f;
  const X = p.x + (p.vx ?? 0) * f;
  const skin = skinColour(p.skin), skinD = shade(skin, 0.12);
  const suit = p.onesie || C.teal, suitD = shade(suit, 0.16);
  const bob = Math.sin(f / 14) * 3;
  const wig = Math.sin(f / 14 + 1) * 2;
  return (
    <g transform={`translate(${X} ${p.y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={96} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${bob}) rotate(${wig} 0 -10)`}>
        {/* legs stretched out in front, feet up */}
        <path d="M 16 -40 L 96 -28" stroke={skinD} strokeWidth={38} strokeLinecap="round" />
        <path d="M 10 -22 L 100 -18" stroke={skin} strokeWidth={40} strokeLinecap="round" />
        <circle cx={112} cy={-22} r={20} fill={skin} />
        {/* little arms up */}
        <path d="M -62 -150 L -104 -186" stroke={skinD} strokeWidth={30} strokeLinecap="round" />
        <path d="M 62 -150 L 98 -170" stroke={skin} strokeWidth={30} strokeLinecap="round" />
        <circle cx={-108} cy={-192} r={16} fill={skinD} />
        <circle cx={102} cy={-176} r={16} fill={skin} />
        {/* onesie */}
        <ellipse cx={0} cy={-110} rx={82} ry={86} fill={suit} />
        <ellipse cx={0} cy={-46} rx={72} ry={28} fill={suitD} />
        {/* big round head */}
        <circle cx={4} cy={-190} r={72} fill={skin} />
        <circle cx={-72} cy={-186} r={14} fill={skinD} />
        <path d="M -4 -260 Q 8 -282 20 -262 Q 8 -270 -4 -260 Z" fill={HAIR.brown} />
        <circle cx={-22} cy={-192} r={7} fill={C.ink} />
        <circle cx={30} cy={-192} r={7} fill={C.ink} />
        <circle cx={-40} cy={-168} r={12} fill={C.pink} opacity={0.5} />
        <circle cx={48} cy={-168} r={12} fill={C.pink} opacity={0.5} />
        <path d="M -2 -158 Q 8 -146 18 -158" stroke={C.inkSoft} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
