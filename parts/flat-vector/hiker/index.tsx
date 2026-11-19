import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Hiker preset: teal tee, khaki trousers, brown boots, brim hat, orange backpack and a walking pole in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.tealDark}
      bottom="trousers"
      bottomColor={C.sand}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="brim"
      hatColor={C.greenDark}
      extra="backpack"
      extraColor={C.orange}
      held={(h) => (
        <g>
          <path d={`M ${h.x} ${h.y} L ${h.x + 34} 0`} stroke={C.brownDark} strokeWidth={12} strokeLinecap="round" />
          <circle cx={h.x + 34} cy={0} r={10} fill={C.greyDark} />
        </g>
      )}
    />
  );
}
