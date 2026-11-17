import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Librarian preset: plum cardigan over a white shirt, dark trousers, glasses, a stack of three books held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor="#8E4F7A"
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      extra="none"
      accessory="glasses"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-46} y={-30} width={92} height={22} rx={4} fill={C.blue} />
          <rect x={-42} y={-30} width={84} height={6} fill={shade(C.blue, 0.25)} />
          <rect x={-40} y={-56} width={80} height={24} rx={4} fill={C.green} />
          <rect x={-36} y={-56} width={72} height={5} fill={shade(C.green, 0.25)} />
          <rect x={-44} y={-82} width={88} height={24} rx={4} fill={C.orange} />
          <rect x={-40} y={-82} width={80} height={5} fill={shade(C.orange, 0.25)} />
          <rect x={-46} y={-30} width={6} height={22} fill={C.white} opacity={0.5} />
        </g>
      )}
    />
  );
}
