import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Travel agent: purple blazer over a white shirt, a navy skirt and a globe held in the front hand.
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
      bottom="skirt"
      bottomColor={C.navy}
      shoes="heels"
      shoesColor={C.red}
      accessory="earrings"
      prop="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 52}) scale(1.35)`}>
          <circle r={56} fill={C.skyDeep} />
          <path d="M -30 -30 Q -10 -40 2 -26 Q 10 -8 -4 2 Q -24 6 -34 -10 Z" fill={C.green} />
          <path d="M 18 14 Q 36 8 42 26 Q 30 42 16 34 Z" fill={C.green} />
        </g>
      )}
    />
  );
}
