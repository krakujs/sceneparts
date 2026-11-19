import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Chef preset: white chef jacket, tall chef hat and a frying pan in the front hand.
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
      shirtColor={C.white}
      bottom="trousers"
      bottomColor="#2F3B5C"
      shoes="shoes"
      shoesColor={C.ink}
      hat="chef"
      hatColor={C.white}
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><rect x={18} y={-8} width={54} height={14} rx={6} fill={C.brownDark} /><ellipse cx={72} cy={-4} rx={46} ry={20} fill={C.greyDark} /><ellipse cx={72} cy={-6} rx={36} ry={13} fill={shade(C.greyDark, 0.3)} /></g>)}
    />
  );
}
