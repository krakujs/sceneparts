import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Plumber preset: teal tee, blue overalls and a red cap, holding a plunger.
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
      hat="cap"
      hatColor={C.redDark}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-7} y={-6} width={14} height={112} rx={6} fill={C.brown} />
          <path d="M -10 100 L 10 100 Q 52 110 46 120 Q 36 142 0 142 Q -36 142 -46 120 Q -52 110 -10 100 Z" fill={C.red} />
        </g>
      )}
    />
  );
}
