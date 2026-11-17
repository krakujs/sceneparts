import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Surgeon preset: scrubs, scrub cap, surgical mask and gloves in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="scrubs"
      topColor="#7FB8E8"
      bottom="trousers"
      bottomColor="#3A4E72"
      shoes="shoes"
      shoesColor={C.ink}
      hat="scrubcap"
      hatColor="#7FB8E8"
      accessory="mask"
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><circle r={33} fill={C.white} /><rect x={-27} y={16} width={54} height={22} rx={9} fill={shade(C.white, 0.12)} /></g>)}
    />
  );
}
