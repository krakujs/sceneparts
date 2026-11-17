import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Basketball player preset: orange jersey, navy shorts, basketball held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const ball = "#F07A2A";
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={ball}
      bottom="shorts"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      accessory="none"
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 20})`}>
          <circle cx={0} cy={0} r={68} fill={ball} />
          <path d="M -68 0 L 68 0 M 0 -68 L 0 68" stroke={shade(ball, 0.45)} strokeWidth={6} fill="none" />
          <path d="M -48 -48 Q 0 -10 -48 48 M 48 -48 Q 0 -10 48 48" stroke={shade(ball, 0.45)} strokeWidth={6} fill="none" />
        </g>
      )}
    />
  );
}
