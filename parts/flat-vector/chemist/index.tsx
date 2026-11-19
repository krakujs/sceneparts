import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Chemist preset: lab coat, goggles, purple beaker in the front hand.
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
      shirtColor="#F4F1EA"
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="boots"
      shoesColor={C.brownDark}
      accessory="goggles"
      hatColor="#F27BA6"
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><path d="M -30 -70 L -30 6 Q -30 30 -8 30 L 8 30 Q 30 30 30 6 L 30 -70 Z" fill="#D9F1F7" /><path d="M -28 -22 L 28 -22 L 28 6 Q 28 28 8 28 L -8 28 Q -28 28 -28 6 Z" fill={C.purple} /><rect x={-36} y={-76} width={72} height={9} rx={4} fill={C.greyLight} /></g>)}
    />
  );
}
