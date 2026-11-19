import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Podcaster preset: purple hoodie, teal headphones, a studio mic held in the front hand. Pose, skin, hair free.
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
      hat="none"
      accessory="headphones"
      hatColor={C.teal}
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-10)`}>
          <rect x={-13} y={-40} width={26} height={60} rx={12} fill={C.ink} />
          <rect x={-22} y={-150} width={44} height={122} rx={22} fill={C.greyDark} />
          {[-122, -106, -90].map((y) => <rect key={y} x={-14} y={y} width={28} height={5} rx={2.5} fill={C.greyLight} />)}
        </g>
      )}
    />
  );
}
