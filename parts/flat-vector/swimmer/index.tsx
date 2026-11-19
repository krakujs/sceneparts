import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Swimmer preset: teal swimsuit, pink swim cap and goggles, folded towel held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.teal}
      bottom="shorts"
      bottomColor={C.tealDark}
      shoes="sandals"
      shoesColor={C.yellow}
      hat="skullcap"
      hatColor={C.pink}
      accessory="goggles"
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(8)`}>
          <rect x={-52} y={-74} width={104} height={136} rx={16} fill={C.white} />
          <rect x={-52} y={-74} width={104} height={22} rx={10} fill={C.sky} />
          <rect x={-52} y={-22} width={104} height={14} fill={C.skyDeep} opacity={0.8} />
          <rect x={-52} y={30} width={104} height={12} fill={shade(C.white, 0.1)} />
        </g>
      )}
    />
  );
}
