import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Activist: orange tee and purple skirt, holding a protest sign with a plain heart. No text slogans.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.orange}
      bottom="skirt"
      bottomColor={C.purple}
      shoes="sneakers"
      shoesColor={C.ink}
      hat="bandana"
      hatColor={C.pink}
      held={(h) => (
        <g>
          <path d={`M ${h.x} ${h.y} L ${h.x + 6} ${h.y - 440}`} stroke={C.brownDark} strokeWidth={12} strokeLinecap="round" />
          <g transform={`translate(${h.x + 6} ${h.y - 520})`}>
            <rect x={-96} y={-86} width={192} height={150} rx={14} fill={C.yellow} />
            <path d="M 0 40 C -46 6 -34 -40 0 -14 C 34 -40 46 6 0 40 Z" fill={C.red} />
          </g>
        </g>
      )}
    />
  );
}
