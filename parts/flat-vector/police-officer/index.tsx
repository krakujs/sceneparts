import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Police officer preset: generic navy uniform, peaked cap, plain star badge on the chest, radio held in the front hand.
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
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      hat="peaked"
      hatColor={C.navy}
      extra="none"
      over={() => (
        <g transform="translate(-44 -700)">
          <path d="M 0 -22 L 6 -7 L 22 -7 L 9 3 L 14 19 L 0 9 L -14 19 L -9 3 L -22 -7 L -6 -7 Z" fill={C.yellow} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-16} y={-62} width={32} height={74} rx={8} fill={C.ink} />
          <rect x={-12} y={-56} width={24} height={20} rx={4} fill={C.skyDeep} />
          <rect x={-3} y={-78} width={6} height={24} rx={3} fill={C.greyDark} />
          <circle cx={0} cy={-6} r={4} fill={C.grey} />
        </g>
      )}
    />
  );
}
