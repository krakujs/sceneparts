import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Garbage collector: yellow-green hi-vis vest over a grey tee, a beanie and a black bin bag in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.greyDark}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="boots"
      shoesColor={C.ink}
      hat="beanie"
      hatColor={C.orange}
      extra="hivis"
      extraColor="#E7F04A"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.3)`}>
          <path d="M -24 -6 Q 0 -36 24 -6" stroke={C.inkSoft} strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M -46 -2 Q 0 -14 46 -2 Q 56 40 42 104 Q 36 116 22 112 Q 0 106 -22 112 Q -36 116 -42 104 Q -56 40 -46 -2 Z" fill={C.inkSoft} />
          <path d="M -24 2 Q -26 50 -20 90" stroke="#5A6378" strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
