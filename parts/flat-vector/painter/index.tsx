import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Painter preset: teal tee, white smock apron, purple beret; a paint palette in the back hand and a brush in the front hand (pose hold).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.teal}
      hat="beret"
      hatColor={C.purple}
      accessory="none"
      extra="apron"
      extraColor={C.white}
      held={(h) => (
        <g>
          <g transform={`translate(${h.bx - 10} ${h.by + 26}) rotate(-15)`}>
            <ellipse cx={0} cy={0} rx={64} ry={46} fill={C.sand} />
            <circle cx={30} cy={16} r={9} fill={C.paper} />
            <circle cx={-30} cy={-12} r={9} fill={C.red} />
            <circle cx={-12} cy={-24} r={9} fill={C.yellow} />
            <circle cx={8} cy={-22} r={9} fill={C.blue} />
            <circle cx={28} cy={-6} r={9} fill={C.green} />
            <circle cx={-22} cy={10} r={9} fill={C.purple} />
          </g>
          <g transform={`translate(${h.x} ${h.y}) rotate(-40)`}>
            <rect x={-6} y={-130} width={12} height={150} rx={5} fill={C.brownDark} />
            <rect x={-8} y={-146} width={16} height={24} fill={C.grey} />
            <path d="M -8 -146 Q 0 -190 8 -146 Z" fill={C.red} />
          </g>
        </g>
      )}
    />
  );
}
