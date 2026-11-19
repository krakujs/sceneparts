import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Real estate agent preset: purple blazer over a white shirt, grey trousers, and a house-shaped key fob with a key in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.purple}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="shoes"
      shoesColor={C.brownDark}
      hat="none"
      accessory="none"
      extra="none"
      extraColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-6)`}>
          <rect x={-4} y={40} width={8} height={60} fill={C.grey} />
          <rect x={4} y={76} width={14} height={8} fill={C.grey} />
          <rect x={4} y={88} width={10} height={8} fill={C.grey} />
          <path d="M -44 -12 L 0 -62 L 44 -12 Z" fill={C.red} />
          <rect x={-34} y={-14} width={68} height={58} rx={4} fill={C.yellow} />
          <rect x={-12} y={6} width={24} height={38} rx={3} fill={C.brown} />
          <circle cx={6} cy={28} r={2.5} fill={C.yellow} />
        </g>
      )}
    />
  );
}
