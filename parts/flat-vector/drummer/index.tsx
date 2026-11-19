import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Drummer preset: red tank top and blue bandana; two sticks striking a snare drum in front (pose hold).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.red}
      hat="bandana"
      hatColor={C.blue}
      accessory="none"
      extra="none"
      held={(h) => (
        <g>
          <rect x={110} y={-520} width={180} height={78} fill={C.blue} />
          <ellipse cx={200} cy={-442} rx={90} ry={20} fill={C.blueDark} />
          <ellipse cx={200} cy={-520} rx={90} ry={22} fill={C.white} />
          <ellipse cx={200} cy={-520} rx={90} ry={22} fill="none" stroke={C.greyLight} strokeWidth={3} />
          <path d={`M ${h.bx} ${h.by} L 178 -528`} stroke={C.brownDark} strokeWidth={9} strokeLinecap="round" />
          <path d={`M ${h.x} ${h.y} L 246 -528`} stroke={C.brownDark} strokeWidth={9} strokeLinecap="round" />
        </g>
      )}
    />
  );
}
