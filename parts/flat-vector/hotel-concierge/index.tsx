import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Hotel concierge: navy uniform with a red bowtie and a gold service bell in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={C.navy}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      extra="bowtie"
      extraColor={C.red}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 6}) scale(1.3)`}>
          <path d="M -36 0 Q -36 -44 0 -44 Q 36 -44 36 0 Z" fill={C.yellow} />
          <rect x={-48} y={0} width={96} height={12} rx={5} fill={C.yellowDark} />
          <circle cx={0} cy={-50} r={8} fill={C.yellowDark} />
        </g>
      )}
    />
  );
}
