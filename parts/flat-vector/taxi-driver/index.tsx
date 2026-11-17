import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Taxi driver preset: teal shirt under a black cap, raising a yellow roof taxi sign with a checkered band.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.tealDark}
      hat="cap"
      hatColor={C.ink}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-6} y={-46} width={12} height={36} fill={C.greyDark} />
          <rect x={-64} y={-112} width={128} height={70} rx={12} fill={C.yellow} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={-64 + i * 16} y={-112} width={16} height={14} fill={i % 2 ? C.ink : C.white} />
          ))}
        </g>
      )}
    />
  );
}
