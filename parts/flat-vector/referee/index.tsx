import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Referee preset: black and white striped shirt, black trousers, whistle on a lanyard, yellow card in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const stripes = [-742, -706, -670, -634, -598, -562, -526, -490];
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      accessory="none"
      extra="none"
      extraColor={C.white}
      over={() => (
        <g>
          {stripes.map((yy) => <rect key={yy} x={-76} y={yy} width={160} height={14} fill={C.ink} />)}
          <path d="M 4 -800 Q 30 -760 52 -800" stroke={C.ink} strokeWidth={6} fill="none" />
          <circle cx={36} cy={-660} r={16} fill={C.grey} />
          <circle cx={36} cy={-660} r={8} fill={C.ink} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-10)`}>
          <rect x={-32} y={-62} width={64} height={92} rx={8} fill={C.yellow} />
          <rect x={-22} y={-52} width={44} height={10} rx={4} fill={C.yellowDark} opacity={0.5} />
        </g>
      )}
    />
  );
}
