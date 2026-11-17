import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// DJ preset: teal tee, teal cap and teal headphones; holds a vinyl record in both hands (pose hold).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.navy}
      hat="cap"
      hatColor={C.teal}
      accessory="headphones"
      extra="none"
      held={(h) => {
        const mx = (h.x + h.bx) / 2, my = (h.y + h.by) / 2;
        return (
          <g transform={`translate(${mx} ${my}) rotate(-12)`}>
            <circle cx={0} cy={0} r={86} fill={C.ink} />
            {[78, 66, 54].map((r) => <circle key={r} cx={0} cy={0} r={r} fill="none" stroke={C.inkSoft} strokeWidth={3} />)}
            <circle cx={0} cy={0} r={30} fill={C.orange} />
            <circle cx={0} cy={0} r={6} fill={C.paper} />
          </g>
        );
      }}
    />
  );
}
