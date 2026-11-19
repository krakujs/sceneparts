import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Bartender preset: dark waistcoat over a white shirt with a red bow tie, holding a metal cocktail shaker.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.white}
      extra="bowtie"
      extraColor={C.red}
      over={() => (
        <g fill={C.ink}>
          <path d="M -58 -760 L -8 -748 L 4 -470 L -66 -470 Z" />
          <path d="M 84 -760 L 36 -748 L 24 -470 L 90 -470 Z" />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-16} y={-112} width={32} height={16} rx={5} fill={C.greyDark} />
          <path d="M -20 -96 L 20 -96 L 24 -4 Q 0 6 -24 -4 Z" fill={C.grey} />
          <rect x={-14} y={-88} width={6} height={80} rx={3} fill="#FFFFFF" opacity={0.5} />
          <path d="M -20 -96 L 20 -96 L 22 -84 L -22 -84 Z" fill={shade(C.grey, 0.2)} />
        </g>
      )}
    />
  );
}
