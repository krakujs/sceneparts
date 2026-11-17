import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Radiologist: teal scrubs and cap, holding an x-ray film with abstract pale shapes in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="scrubs"
      topColor="#7FC7C0"
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      hat="scrubcap"
      hatColor="#7FC7C0"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 52}) scale(1.3)`}>
          <rect x={-52} y={-64} width={104} height={128} rx={8} fill={C.navy} />
          <rect x={-40} y={-50} width={80} height={100} rx={6} fill="#3D5A80" />
          <path d="M -16 -34 Q 0 -10 -16 14 M 16 -34 Q 0 -10 16 14" stroke="#CFE6F5" strokeWidth={9} fill="none" strokeLinecap="round" />
          <rect x={-6} y={-40} width={12} height={80} rx={6} fill="#CFE6F5" opacity={0.85} />
          <circle cx={-24} cy={-20} r={9} fill="#CFE6F5" opacity={0.7} />
          <circle cx={24} cy={10} r={9} fill="#CFE6F5" opacity={0.7} />
        </g>
      )}
    />
  );
}
