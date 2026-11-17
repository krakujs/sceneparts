import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Flight attendant preset: red blazer, skirt, scarf and a rolling case held by the handle.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor="#E8503F"
      shirtColor={C.white}
      bottom="skirt"
      bottomColor={C.navy}
      shoes="heels"
      shoesColor={C.ink}
      extra="scarf"
      extraColor={C.pink}
      held={(h) => (<g><rect x={-4} y={0} width={8} height={425} transform={`translate(${h.x} ${h.y})`} fill={C.greyDark} /><g transform={`translate(${h.x} ${h.y})`}><rect x={-60} y={425} width={120} height={190} rx={14} fill="#7BC7B9" /><rect x={-60} y={425} width={120} height={20} rx={8} fill={C.teal} /><circle cx={-34} cy={620} r={10} fill={C.ink} /><circle cx={34} cy={620} r={10} fill={C.ink} /></g></g>)}
    />
  );
}
