import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Tennis player preset: white polo, white pleated skirt, tennis racket held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.white}
      bottom="skirt"
      bottomColor={C.teal}
      shoes="sneakers"
      shoesColor={C.white}
      hat="cap"
      hatColor={C.yellow}
      accessory="sunglasses"
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-20)`}>
          <rect x={-6} y={-30} width={12} height={90} rx={5} fill={C.ink} />
          <rect x={-6} y={40} width={12} height={20} rx={4} fill={C.ink} />
          <ellipse cx={0} cy={-110} rx={46} ry={62} fill="none" stroke={C.ink} strokeWidth={12} />
          <path d="M -46 -110 L 46 -110 M 0 -172 L 0 -48" stroke={C.ink} strokeWidth={4} opacity={0.5} />
          <ellipse cx={0} cy={-110} rx={36} ry={52} fill={shade(C.lime, 0.05)} opacity={0.35} />
        </g>
      )}
    />
  );
}
