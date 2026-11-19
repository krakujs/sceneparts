import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Electrician preset: yellow hard hat, navy shirt, grey trousers and a tool belt, holding a coil of orange cable.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.navy}
      hat="hardhat"
      hatColor={C.yellow}
      extra="toolbelt"
      bottomColor={C.greyDark}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 24 30 Q 50 90 30 150 Q 16 190 40 210" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
          <circle cx={0} cy={-6} r={58} fill="none" stroke={C.orange} strokeWidth={14} />
          <circle cx={0} cy={-6} r={36} fill="none" stroke={shade(C.orange, 0.2)} strokeWidth={9} />
        </g>
      )}
    />
  );
}
