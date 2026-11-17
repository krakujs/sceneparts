import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Makeup artist preset: pink shirt under a purple apron, holding a colour palette and a makeup brush in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#F7C6D9"
      bottom="trousers"
      bottomColor="#1F2433"
      extra="apron"
      extraColor={C.purple}
      held={(h) => (
        <g>
          <g transform={`translate(${h.x + 58} ${h.y - 4}) rotate(18)`}>
            <rect x={-5} y={-104} width={10} height={100} rx={5} fill={C.brownDark} />
            <path d="M -5 -104 Q -14 -132 0 -150 Q 14 -132 5 -104 Z" fill={C.pink} />
          </g>
          <g transform={`translate(${h.x} ${h.y})`}>
            <ellipse cx={0} cy={0} rx={48} ry={32} fill={C.white} />
            <ellipse cx={0} cy={6} rx={48} ry={30} fill={C.greyLight} opacity={0.5} />
            <circle cx={-22} cy={-8} r={9} fill={C.pink} />
            <circle cx={0} cy={-16} r={9} fill={C.yellow} />
            <circle cx={22} cy={-8} r={9} fill={C.teal} />
            <circle cx={-12} cy={10} r={9} fill={C.purple} />
            <circle cx={14} cy={12} r={9} fill={C.orange} />
          </g>
        </g>
      )}
    />
  );
}
