import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Tour guide: orange cap, teal shirt, sand shorts, a backpack and a plain flag on a pole held up in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.teal}
      bottom="shorts"
      bottomColor={C.sand}
      shoes="sneakers"
      shoesColor={C.ink}
      hat="cap"
      hatColor={C.orange}
      extra="backpack"
      extraColor={C.purple}
      held={(h) => (
        <g>
          <path d={`M ${h.x} ${h.y} L ${h.x + 8} ${h.y - 520}`} stroke={C.brownDark} strokeWidth={12} strokeLinecap="round" />
          <path d={`M ${h.x + 8} ${h.y - 520} L ${h.x + 150} ${h.y - 500} L ${h.x + 136} ${h.y - 430} L ${h.x + 150} ${h.y - 360} L ${h.x + 8} ${h.y - 380} Z`} fill={C.teal} />
        </g>
      )}
    />
  );
}
