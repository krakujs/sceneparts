import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Welder preset: grey work jumpsuit, welding mask flipped up on the head, holding a lit torch.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor={C.greyDark}
      topper={() => (
        <g>
          <path d="M -102 6 Q -108 -122 2 -124 Q 110 -122 102 6 L 80 6 Q 66 -82 0 -84 Q -66 -82 -80 6 Z" fill={C.ink} />
          <path d="M 56 -94 Q 114 -98 114 -40 L 98 -34 Q 94 -72 54 -74 Z" fill={C.greyDark} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(${90 - h.a})`}>
          <rect x={-10} y={-14} width={120} height={28} rx={9} fill={C.ink} />
          <rect x={106} y={-8} width={30} height={16} rx={5} fill={C.grey} />
          <ellipse cx={150} cy={0} rx={22} ry={13} fill={C.orange} />
          <ellipse cx={154} cy={0} rx={12} ry={7} fill={C.yellow} />
        </g>
      )}
    />
  );
}
