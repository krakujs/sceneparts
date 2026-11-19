import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Fisherman preset: yellow raincoat, brim rain hat and a fishing rod in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.yellow}
      bottom="trousers"
      bottomColor="#3D4A3A"
      shoes="boots"
      shoesColor={C.brownDark}
      hat="brim"
      hatColor={C.yellowDark}
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><path d="M 0 0 L 140 -330" stroke={C.brownDark} strokeWidth={10} strokeLinecap="round" /><path d="M 140 -330 L 150 -90" stroke={C.greyDark} strokeWidth={3} /><circle cx={150} cy={-84} r={7} fill={C.greyDark} /></g>)}
    />
  );
}
