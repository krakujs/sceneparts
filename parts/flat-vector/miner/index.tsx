import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Miner preset: orange work shirt, navy overalls, hard hat with a headlamp (topper), pickaxe held.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const hl = "#FFF6C2";
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor={C.orange}
      bottom="overalls"
      bottomColor={C.navy}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="hardhat"
      hatColor={C.yellow}
      extra="toolbelt"
      extraColor={C.brown}
      topper={() => (
        <g>
          <rect x={-18} y={-132} width={36} height={18} rx={6} fill={C.ink} />
          <circle cx={0} cy={-124} r={12} fill={hl} />
          <circle cx={0} cy={-124} r={6} fill={C.yellow} />
        </g>
      )}
      held={(h) => (
        <g>
          <g transform={`translate(${h.x} ${h.y})`}>
            <rect x={-6} y={-96} width={12} height={110} rx={5} fill={C.brownDark} />
            <path d="M -64 -110 Q -6 -140 62 -108 L 52 -92 Q -6 -116 -54 -96 Z" fill={C.greyDark} />
            <path d="M -64 -110 Q -70 -104 -58 -94 L -54 -96 Z" fill={shade(C.greyDark, 0.3)} />
          </g>
        </g>
      )}
    />
  );
}
