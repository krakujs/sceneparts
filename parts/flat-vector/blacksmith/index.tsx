import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Blacksmith preset: grey tank top under a leather apron and a red bandana. Holds a glowing horseshoe; an anvil and hammer stand by the feet.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.greyDark}
      bottom="trousers"
      bottomColor="#3A4157"
      extra="apron"
      extraColor="#8A5A3C"
      hat="bandana"
      hatColor={C.red}
      held={(h) => (
        <g>
          <g transform={`translate(${h.x} ${h.y}) scale(1.2)`}>
            <circle cx={0} cy={-6} r={62} fill={C.orange} opacity={0.22} />
            <circle cx={0} cy={-6} r={42} fill={C.yellow} opacity={0.3} />
            <path d="M -38 -30 Q -40 40 0 40 Q 40 40 38 -30" stroke={C.orange} strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d="M -38 -30 Q -40 40 0 40 Q 40 40 38 -30" stroke={C.yellow} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.8} />
          </g>
          <g>
            <rect x={140} y={-94} width={160} height={28} rx={9} fill={C.greyDark} />
            <path d="M 170 -68 L 262 -68 L 250 -20 L 182 -20 Z" fill={C.greyDark} />
            <rect x={160} y={-20} width={120} height={20} rx={4} fill={C.ink} />
            <rect x={116} y={-100} width={24} height={8} rx={4} fill={C.grey} />
            <rect x={236} y={-126} width={12} height={36} rx={4} fill={C.brown} transform="rotate(20 242 -108)" />
            <rect x={206} y={-152} width={44} height={28} rx={5} fill={shade(C.greyDark, 0.2)} transform="rotate(20 228 -138)" />
          </g>
        </g>
      )}
    />
  );
}
