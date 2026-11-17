import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Construction worker preset: orange hard hat, lime hi-vis vest, sand tee, brown boots and trousers, holding a shovel.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.sand}
      extra="hivis"
      extraColor={C.lime}
      hat="hardhat"
      hatColor={C.orange}
      shoes="boots"
      shoesColor={C.brownDark}
      bottomColor={C.greyDark}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-6} y={-10} width={12} height={380} rx={6} fill={C.brown} />
          <rect x={-18} y={-14} width={36} height={12} rx={6} fill={C.brownDark} />
          <path d="M -26 370 L 26 370 L 28 420 Q 0 448 -28 420 Z" fill={C.grey} />
        </g>
      )}
    />
  );
}
