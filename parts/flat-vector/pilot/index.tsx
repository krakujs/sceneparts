import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Pilot preset: navy uniform, peaked cap and a generic wings badge.
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
      bottomColor="#1F2433"
      shoes="shoes"
      shoesColor={C.ink}
      hat="peaked"
      hatColor="#253058"
      over={() => (<g fill={C.yellow}><path d="M 14 -676 Q -8 -700 -40 -690 Q -20 -670 14 -664 Z" /><path d="M 14 -676 Q 36 -700 68 -690 Q 48 -670 14 -664 Z" /><circle cx={14} cy={-672} r={6} /></g>)}
    />
  );
}
