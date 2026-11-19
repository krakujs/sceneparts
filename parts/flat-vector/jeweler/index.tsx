import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Jeweler preset: navy knit sweater and grey trousers, a loupe eyepiece on one eye, and a ring box in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor="#253058"
      bottom="trousers"
      bottomColor="#5D6578"
      topper={() => (
        <g>
          <path d="M 102 -22 Q 124 -62 98 -86" stroke={C.greyDark} strokeWidth={4} fill="none" />
          <circle cx={76} cy={0} r={25} fill="#BFE6F5" opacity={0.35} />
          <circle cx={76} cy={0} r={25} stroke={C.greyDark} strokeWidth={6} fill="none" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.35)`}>
          <rect x={-40} y={-22} width={80} height={52} rx={7} fill={C.purpleDark} />
          <rect x={-40} y={-34} width={80} height={18} rx={7} fill={C.purple} />
          <circle cx={0} cy={-44} r={14} stroke={C.yellow} strokeWidth={6} fill="none" />
          <path d="M -9 -64 L 0 -78 L 9 -64 L 0 -58 Z" fill="#BFE6F5" />
          <path d="M -9 -64 L 0 -58 L 9 -64 Z" fill={C.skyDeep} />
        </g>
      )}
    />
  );
}
