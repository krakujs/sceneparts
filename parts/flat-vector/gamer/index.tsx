import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Gamer preset: purple hoodie with a headset, dark trousers, dark trainers and a generic game controller (no console brand shapes) held in both hands.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.purple}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="sneakers"
      shoesColor={C.ink}
      hat="none"
      accessory="headset"
      hatColor={C.ink}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-66} y={-36} width={132} height={72} rx={34} fill={C.greyDark} />
          <path d="M -66 -4 Q -66 -36 -30 -36 L 30 -36 Q 66 -36 66 -4 L 66 6 Q 66 36 34 36 Q 20 36 14 22 L -14 22 Q -20 36 -34 36 Q -66 36 -66 6 Z" fill={shade(C.greyDark, 0.25)} opacity={0.35} />
          <rect x={-46} y={-14} width={26} height={8} rx={3} fill={C.white} />
          <rect x={-59} y={-21} width={8} height={26} rx={3} fill={C.white} />
          <circle cx={42} cy={-12} r={7} fill={C.red} />
          <circle cx={58} cy={2} r={7} fill={C.blue} />
          <circle cx={26} cy={2} r={7} fill={C.green} />
        </g>
      )}
    />
  );
}
