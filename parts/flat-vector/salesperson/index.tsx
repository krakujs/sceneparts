import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Salesperson preset: teal blazer with a name badge, dark skirt, heels, and a brochure held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.teal}
      bottom="skirt"
      bottomColor={C.ink}
      shoes="heels"
      shoesColor={C.red}
      hat="none"
      accessory="none"
      extra="badge"
      extraColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 20}) rotate(-10)`}>
          <rect x={-46} y={-60} width={92} height={120} rx={6} fill={C.white} />
          <rect x={-46} y={-60} width={92} height={120} rx={6} fill={shade(C.white, 0.06)} />
          <rect x={-36} y={-44} width={72} height={44} rx={4} fill={C.blue} />
          <rect x={-36} y={8} width={52} height={7} rx={3} fill={C.greyLight} />
          <rect x={-36} y={24} width={64} height={7} rx={3} fill={C.greyLight} />
          <rect x={-36} y={40} width={44} height={7} rx={3} fill={C.greyLight} />
        </g>
      )}
    />
  );
}
