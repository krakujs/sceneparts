import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Backpacker preset: big trekking pack with a rolled bedroll strapped on top, green tee, grey trousers, boots, red bandana, map in hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.green}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="bandana"
      hatColor={C.red}
      extra="backpack"
      extraColor={C.teal}
      over={() => (
        <g>
          <rect x={-168} y={-842} width={112} height={40} rx={20} fill={C.yellowDark} />
          <rect x={-160} y={-824} width={100} height={8} fill={shade(C.yellowDark, 0.2)} />
          <rect x={-120} y={-760} width={50} height={40} rx={8} fill={shade(C.teal, 0.2)} />
        </g>
      )}
      held={(h) => (
        <g>
          <rect x={h.x - 6} y={h.y - 84} width={96} height={84} rx={5} fill={C.white} />
          <path d={`M ${h.x - 2} ${h.y - 60} L ${h.x + 30} ${h.y - 30} L ${h.x + 62} ${h.y - 64}`} stroke={C.blue} strokeWidth={6} fill="none" strokeLinecap="round" />
          <circle cx={h.x + 30} cy={h.y - 30} r={8} fill={C.red} />
        </g>
      )}
    />
  );
}
