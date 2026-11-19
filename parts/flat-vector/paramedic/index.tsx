import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Paramedic preset: green uniform, hi-vis stripes, first-aid bag in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="uniform"
      topColor={C.green}
      extra="hivis"
      extraColor={C.yellow}
      hat="peaked"
      hatColor={C.greenDark}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="boots"
      shoesColor={C.ink}
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><path d="M -16 -4 Q -16 -40 0 -40 Q 16 -40 16 -4" stroke={C.greyDark} strokeWidth={7} fill="none" /><rect x={-42} y={-6} width={84} height={70} rx={10} fill={C.white} /><rect x={-5} y={6} width={10} height={36} fill={C.red} /><rect x={-17} y={18} width={34} height={10} fill={C.red} /></g>)}
    />
  );
}
