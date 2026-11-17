import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Cricketer preset: white kit, blue cap, cricket bat held in both hands.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor="#FFFFFF"
      bottom="trousers"
      bottomColor="#FFFFFF"
      shoes="sneakers"
      shoesColor="#E9EDF2"
      hat="cap"
      hatColor={C.blue}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-25)`}>
          <rect x={-6} y={-40} width={12} height={130} rx={5} fill={C.brown} />
          <path d="M -34 80 L 34 80 L 40 350 Q 0 380 -40 350 Z" fill={C.sand} />
          <path d="M -34 80 L -20 80 L -24 340 Q -34 300 -40 350 Z" fill={shade(C.sand, 0.12)} />
        </g>
      )}
    />
  );
}
