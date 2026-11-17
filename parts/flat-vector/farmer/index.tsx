import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Farmer preset: checked shirt, dungarees, straw hat and a pitchfork in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#E8503F"
      bottom="overalls"
      bottomColor="#3A6FA8"
      shoes="boots"
      shoesColor={C.brownDark}
      hat="brim"
      hatColor="#E9D3A9"
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><rect x={-6} y={-204} width={12} height={640} rx={5} fill={C.brown} /><rect x={-24} y={-204} width={50} height={10} rx={4} fill={C.greyDark} /><rect x={-22} y={-270} width={8} height={72} rx={3} fill={C.greyDark} /><rect x={-4} y={-282} width={8} height={84} rx={3} fill={C.greyDark} /><rect x={14} y={-270} width={8} height={72} rx={3} fill={C.greyDark} /></g>)}
    />
  );
}
