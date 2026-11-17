import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Snowboarder: baggy orange hoodie, teal beanie and goggles, one purple board under both feet in a side stance.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  return (
    <g transform={`translate(${x} ${y - 46 * s}) scale(${p.flip ? -s : s} ${s})`}>
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        top="hoodie"
        topColor={C.orange}
        bottom="trousers"
        bottomColor={C.navy}
        shoes="boots"
        shoesColor={C.ink}
        hat="beanie"
        hatColor={C.teal}
        accessory="goggles"
      />
      <path d="M -200 22 Q 0 10 200 20 Q 228 28 196 38 Q 0 46 -196 40 Q -230 34 -200 22 Z" fill={C.purple} />
      <rect x={-150} y={28} width={300} height={4} rx={2} fill={C.yellow} />
    </g>
  );
}
