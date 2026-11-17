import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Bus driver preset: navy uniform with a peaked cap and a lanyard badge, holding a handheld ticket machine.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={C.navy}
      hat="peaked"
      hatColor={C.ink}
      extra="lanyard"
      extraColor={C.yellow}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-12} y={-74} width={24} height={40} rx={3} fill={C.white} />
          <rect x={-9} y={-68} width={18} height={4} fill={C.greyLight} />
          <rect x={-22} y={-40} width={44} height={60} rx={10} fill={C.greyDark} />
          <rect x={-16} y={-34} width={32} height={20} rx={4} fill="#8FD0F2" />
          <circle cx={-8} cy={-2} r={4} fill={C.grey} />
          <circle cx={8} cy={-2} r={4} fill={C.grey} />
        </g>
      )}
    />
  );
}
