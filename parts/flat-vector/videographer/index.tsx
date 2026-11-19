import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Videographer preset: blue crew-neck t-shirt, khaki trousers, cap, video camera resting on the front shoulder.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.blue}
      bottom="trousers"
      bottomColor="#B9A277"
      shoes="boots"
      shoesColor={C.brownDark}
      hat="cap"
      hatColor={C.greyDark}
      extra="none"
      accessory="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-22)`}>
          <rect x={-74} y={-70} width={118} height={80} rx={12} fill={C.ink} />
          <rect x={44} y={-58} width={40} height={56} rx={8} fill={shade(C.ink, 0.2)} />
          <circle cx={-14} cy={-30} r={22} fill={C.greyDark} />
          <circle cx={-14} cy={-30} r={11} fill="#8FD0F2" />
          <rect x={-60} y={-90} width={36} height={22} rx={5} fill={C.ink} />
          <rect x={-46} y={-96} width={14} height={8} rx={3} fill={C.red} />
        </g>
      )}
    />
  );
}
