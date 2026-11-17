import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Reader preset: sitting on a bench in a teal jumper and dark trousers, glasses, holding an open book in both hands.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      accessory="glasses"
      pose="sit"
      held={(h) => (
        <g transform={`translate(${h.x - 10} ${h.y - 30})`}>
          <path d="M 0 0 Q 50 -22 96 6 L 96 60 Q 50 34 0 56 Z" fill={C.white} />
          <path d="M 0 0 Q -4 -2 0 56 L 0 56 Q 50 34 96 60 L 96 6 Q 50 -22 0 0 Z" fill="none" />
          <path d="M 48 -14 L 48 46" stroke={shade(C.greyLight, 0.1)} strokeWidth={4} />
          {[0, 1, 2].map((i) => <rect key={i} x={10} y={12 + i * 12} width={30} height={5} rx={2} fill={C.greyLight} />)}
          {[0, 1, 2].map((i) => <rect key={i} x={58} y={8 + i * 12} width={30} height={5} rx={2} fill={C.greyLight} />)}
          <path d="M 0 0 Q 50 -22 96 6" stroke={C.blue} strokeWidth={6} fill="none" />
        </g>
      )}
    />
  );
}
