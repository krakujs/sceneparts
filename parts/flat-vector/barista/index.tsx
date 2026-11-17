import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Barista preset: green apron over a purple tee and a teal beanie, holding a takeaway coffee cup.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.purple}
      hat="beanie"
      hatColor={C.tealDark}
      extra="apron"
      extraColor={C.greenDark}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.3)`}>
          <path d="M -8 -100 q -8 -12 0 -24 M 10 -100 q -8 -12 0 -24" stroke={C.grey} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />
          <path d="M -30 -74 L 30 -74 L 22 -8 Q 20 0 10 0 L -10 0 Q -20 0 -22 -8 Z" fill={C.white} />
          <rect x={-27} y={-52} width={54} height={20} fill={C.brown} />
          <rect x={-36} y={-88} width={72} height={12} rx={6} fill={C.greyDark} />
        </g>
      )}
    />
  );
}
