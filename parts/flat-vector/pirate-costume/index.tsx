import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Pirate costume preset: red bandana, eye patch, navy-striped white top, brown trousers and a toy cardboard sword raised in the front hand. Child or adult.
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
      bottom="trousers"
      bottomColor={C.brownDark}
      shoes="boots"
      shoesColor={C.ink}
      hat="bandana"
      hatColor={C.red}
      over={() => (
        <g>
          {[-772, -732, -692, -652, -612, -572, -532, -492].map((y) => (
            <rect key={y} x={-76} y={y} width={160} height={14} fill={C.navy} />
          ))}
        </g>
      )}
      topper={() => (
        <g>
          <path d="M 54 -24 Q 76 -34 100 -22 L 100 20 Q 76 30 54 20 Z" fill={C.ink} />
          <path d="M 60 -20 Q -10 -80 -92 -44" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      )}
      held={(h) => (
        <g>
          <rect x={h.x - 8} y={h.y - 214} width={16} height={196} rx={3} fill={C.sand} />
          <rect x={h.x - 8} y={h.y - 214} width={16} height={10} fill={shade(C.sand, 0.2)} />
          <rect x={h.x - 30} y={h.y - 26} width={60} height={12} rx={4} fill={C.brownDark} />
          <rect x={h.x - 6} y={h.y - 14} width={12} height={36} rx={5} fill={C.brown} />
        </g>
      )}
    />
  );
}
