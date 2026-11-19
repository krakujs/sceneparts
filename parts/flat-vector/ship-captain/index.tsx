import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Ship captain preset: white uniform, tie, peaked cap and binoculars in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={C.white}
      extra="tie"
      extraColor={C.navy}
      bottom="trousers"
      bottomColor="#2F3B5C"
      shoes="boots"
      shoesColor={C.ink}
      hat="peaked"
      hatColor={C.white}
      held={(h) => (<g transform={`translate(${h.x} ${h.y - 18})`}><rect x={-40} y={-22} width={80} height={40} rx={10} fill={C.ink} /><circle cx={-30} cy={-2} r={17} fill={C.greyDark} /><circle cx={30} cy={-2} r={17} fill={C.greyDark} /><circle cx={-30} cy={-2} r={9} fill="#8FD0F2" /><circle cx={30} cy={-2} r={9} fill="#8FD0F2" /></g>)}
    />
  );
}
