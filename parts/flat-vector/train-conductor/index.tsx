import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Train conductor preset: dark green uniform and skirt with a peaked cap, a whistle at the lips and a green signal flag.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={C.greenDark}
      hat="peaked"
      hatColor={C.ink}
      bottom="skirt"
      bottomColor={C.ink}
      topper={() => (
        <g>
          <rect x={62} y={54} width={52} height={16} rx={7} fill={C.greyDark} />
          <circle cx={84} cy={50} r={9} fill={C.grey} />
          <rect x={110} y={57} width={9} height={10} rx={4} fill={C.ink} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-4} y={-176} width={8} height={180} rx={3} fill={C.brownDark} />
          <path d="M 4 -176 L 74 -176 L 74 -120 L 4 -120 Z" fill={C.green} />
          <rect x={4} y={-176} width={70} height={8} fill={C.greenDark} />
        </g>
      )}
    />
  );
}
