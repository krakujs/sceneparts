import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Actor preset: navy blazer over a white shirt, holding a script (booklet of pages) in the front hand (pose talk).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.navy}
      shirtColor={C.white}
      hat="none"
      accessory="none"
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x - 6} ${h.y - 44}) rotate(-12)`}>
          <rect x={-56} y={-70} width={112} height={132} rx={8} fill={C.navy} />
          <rect x={-50} y={-62} width={100} height={116} rx={4} fill={C.white} />
          {[-40, -20, 0, 20, 40].map((y) => <rect key={y} x={-40} y={y - 2} width={80} height={5} rx={2.5} fill={C.greyLight} />)}
        </g>
      )}
    />
  );
}
