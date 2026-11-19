import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Pest controller preset: green jumpsuit, face mask and a cap, holding a sprayer tank with a long wand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor="#4BB46A"
      accessory="mask"
      hat="cap"
      hatColor={C.orange}
      shoes="boots"
      shoesColor={C.ink}
      held={(h) => (
        <g>
          <path d={`M ${h.x - 4} ${h.y - 40} L ${h.x + 70} ${h.y - 150}`} stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
          <circle cx={h.x + 76} cy={h.y - 156} r={8} fill={C.ink} />
          <g transform={`translate(${h.x} ${h.y}) scale(1.2)`}>
            <rect x={-26} y={-30} width={52} height={92} rx={16} fill={C.orange} />
            <rect x={-26} y={-30} width={14} height={92} rx={6} fill="#E06A22" />
            <rect x={-16} y={-46} width={32} height={18} rx={6} fill={C.ink} />
            <rect x={-14} y={6} width={28} height={18} rx={4} fill={C.white} opacity={0.85} />
          </g>
        </g>
      )}
    />
  );
}

