import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Scientist preset: lab coat, goggles, bubbling flask in the front hand.
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
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      accessory="goggles"
      hatColor={C.blue}
      held={(h) => (<g transform={`translate(${h.x} ${h.y - 36})`}><rect x={-7} y={-84} width={14} height={30} rx={3} fill="#D9F1F7" /><path d="M -14 -54 L 14 -54 L 40 22 Q 46 36 30 36 L -30 36 Q -46 36 -40 22 Z" fill="#D9F1F7" /><path d="M -34 2 L 34 2 L 40 22 Q 46 36 30 36 L -30 36 Q -46 36 -40 22 Z" fill={C.green} /><circle cx={-8} cy={(-12 - (p.f * 1.4) % 34)} r={5} fill={C.white} opacity={0.85} /><circle cx={10} cy={(-6 - (p.f * 1.0 + 15) % 30)} r={4} fill={C.white} opacity={0.85} /></g>)}
    />
  );
}
