import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Postal worker preset: blue uniform with a peaked cap and navy trousers, carrying a yellow mail bag with letters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={C.blueDark}
      hat="peaked"
      hatColor={C.navy}
      bottom="trousers"
      bottomColor={C.navy}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-30} y={-64} width={36} height={56} rx={3} fill={C.white} />
          <rect x={-6} y={-72} width={40} height={52} rx={3} fill={C.greyLight} />
          <path d="M -22 -50 L -4 -44 M -22 -38 L -4 -32" stroke={C.grey} strokeWidth={4} strokeLinecap="round" />
          <path d="M -58 -14 L 58 -14 L 46 120 Q 0 138 -46 120 Z" fill={C.yellowDark} />
          <path d="M -58 -14 L 58 -14 L 50 18 L -50 18 Z" fill={shade(C.yellowDark, 0.15)} />
        </g>
      )}
    />
  );
}
