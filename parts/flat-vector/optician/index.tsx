import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Optician: light white coat over a blue shirt, wearing glasses, with an eye-chart card held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor="#F2F5F8"
      shirtColor={C.blue}
      bottom="trousers"
      bottomColor={C.blue}
      shoes="shoes"
      shoesColor={C.navy}
      accessory="glasses"
      held={(h) => (
        <g transform={`translate(${h.x - 6} ${h.y - 92}) scale(1.3)`}>
          <rect x={-58} y={-60} width={116} height={124} rx={10} fill="#CFE6F5" />
          <rect x={-58} y={-60} width={116} height={10} fill="#8EC5E8" />
          <rect x={-40} y={-40} width={80} height={14} rx={3} fill={C.ink} />
          <rect x={-32} y={-18} width={64} height={11} rx={3} fill={C.ink} />
          <rect x={-24} y={2} width={48} height={9} rx={3} fill={C.ink} />
          <rect x={-18} y={18} width={36} height={6} rx={2} fill={C.ink} />
        </g>
      )}
    />
  );
}
