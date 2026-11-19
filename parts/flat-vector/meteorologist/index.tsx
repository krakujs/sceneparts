import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Meteorologist preset: navy blazer over a white shirt, holding a weather card with a sun and a cloud, pointing at it.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose={p.pose ?? "point"}
      top="blazer"
      topColor={C.navy}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      held={(h) => (
        <g transform={`translate(${h.x + 30} ${h.y - 30}) rotate(-8) scale(0.9)`}>
          <rect x={-70} y={-56} width={140} height={112} rx={14} fill={C.white} stroke={C.greyLight} strokeWidth={0} />
          <rect x={-70} y={44} width={140} height={10} rx={5} fill={C.skyDeep} />
          <circle cx={-22} cy={-14} r={24} fill={C.yellow} />
          <path d="M -6 22 Q -6 2 16 2 Q 22 -14 42 -8 Q 62 -6 60 16 Q 58 26 40 26 L 4 26 Q -6 26 -6 22 Z" fill={C.skyDeep} />
        </g>
      )}
    />
  );
}
