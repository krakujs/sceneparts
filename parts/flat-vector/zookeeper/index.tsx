import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Zookeeper preset: khaki field uniform with a peaked cap and a yellow-trimmed badge, carrying a feed bucket of fish in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
const KHAKI = "#B9A074";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={KHAKI}
      bottom="trousers"
      bottomColor={C.sand}
      hat="peaked"
      hatColor={KHAKI}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.4)`}>
          <path d="M -48 -20 L 48 -20 L 36 40 L -36 40 Z" fill={C.blue} />
          <rect x={-52} y={-30} width={104} height={16} rx={7} fill={C.blueDark} />
          <path d="M -40 -22 Q 0 -60 42 -22 Z" fill={C.grey} />
          <ellipse cx={-6} cy={-30} rx={16} ry={8} fill={C.teal} />
          <path d="M 2 -34 L 16 -44 L 16 -24 Z" fill={C.teal} />
          <ellipse cx={22} cy={-36} rx={14} ry={7} fill={C.orange} transform="rotate(-12 22 -36)" />
        </g>
      )}
    />
  );
}
