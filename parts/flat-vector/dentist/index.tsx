import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Dentist preset: white coat, mask, dental mirror in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.white}
      shirtColor="#7BC7B9"
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="shoes"
      shoesColor={C.ink}
      accessory="mask"
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><rect x={-5} y={-54} width={10} height={60} rx={4} fill={C.greyDark} /><circle cx={0} cy={-80} r={28} fill={C.grey} /><circle cx={0} cy={-80} r={21} fill="#BFE6F5" /></g>)}
    />
  );
}
