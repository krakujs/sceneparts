import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Marine biologist preset: dark teal wetsuit-style jumpsuit with diving goggles on the forehead, holding an orange starfish.
/* eslint-disable @typescript-eslint/no-explicit-any */
const SUIT = "#1B4F5C";
const STAR = "M 0 -58 L 14 -20 L 54 -18 L 22 6 L 34 46 L 0 22 L -34 46 L -22 6 L -54 -18 L -14 -20 Z";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor={SUIT}
      shoes="boots"
      shoesColor={C.ink}
      accessory="goggles"
      hatColor={C.teal}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(12) scale(1.7)`}>
          <path d={STAR} fill={C.orange} stroke={C.redDark} strokeWidth={0} />
          <circle cx={0} cy={-4} r={6} fill={C.yellow} />
          <circle cx={-18} cy={22} r={4} fill={C.yellow} />
          <circle cx={18} cy={22} r={4} fill={C.yellow} />
        </g>
      )}
    />
  );
}
