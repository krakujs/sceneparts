import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Window cleaner: teal tee, blue overalls, yellow cap, and a big bucket of water in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.teal}
      bottom="overalls"
      bottomColor={C.blue}
      shoes="sneakers"
      shoesColor={C.ink}
      hat="cap"
      hatColor={C.yellow}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) scale(1.3)`}>
          <path d="M -42 -6 Q 0 -40 42 -6" stroke={C.greyDark} strokeWidth={8} fill="none" strokeLinecap="round" />
          <path d="M -50 0 L 50 0 L 38 104 L -38 104 Z" fill={C.blue} />
          <rect x={-56} y={-6} width={112} height={14} rx={6} fill={shade(C.blue, 0.25)} />
          <path d="M -26 30 Q 0 24 26 30" stroke="#BFE6F5" strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
