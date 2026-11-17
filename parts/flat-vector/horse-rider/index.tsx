import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Horse rider preset: navy riding helmet, auburn riding jacket, sand breeches and tall boots, holding the reins in both hands.
/* eslint-disable @typescript-eslint/no-explicit-any */
const JACKET = "#8C3B22";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={JACKET}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor="#E9D3A9"
      shoes="boots"
      shoesColor={C.ink}
      hat="helmet"
      hatColor={C.navy}
      held={(h) => (
        <g>
          <path d={`M ${h.bx} ${h.by} Q ${(h.bx + h.x) / 2} ${h.by + 40} ${h.x} ${h.y}`} stroke={C.brownDark} strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d={`M ${h.x} ${h.y} L ${h.x + 110} ${h.y + 60}`} stroke={C.brownDark} strokeWidth={7} strokeLinecap="round" />
          <path d={`M ${h.bx} ${h.by} L ${h.bx + 110} ${h.by + 60}`} stroke={C.brownDark} strokeWidth={7} strokeLinecap="round" />
          <circle cx={h.x + 110} cy={h.y + 60} r={6} fill={C.yellow} />
          <circle cx={h.bx + 110} cy={h.by + 60} r={6} fill={C.yellow} />
        </g>
      )}
    />
  );
}
