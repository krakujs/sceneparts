import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Designer preset: lilac beret, mustard t-shirt, grey trousers, a drawing tablet held with a stylus.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const body = C.grey;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.yellowDark}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="sneakers"
      shoesColor={C.pink}
      hat="beret"
      hatColor={C.purple}
      extra="none"
      accessory="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-14)`}>
          <rect x={-70} y={-70} width={120} height={84} rx={12} fill={body} />
          <rect x={-62} y={-62} width={104} height={68} rx={6} fill={C.white} />
          <circle cx={-18} cy={-34} r={14} fill={C.pink} opacity={0.8} />
          <path d="M 4 -34 L 36 -58" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <path d="M 36 -58 L 42 -70" stroke={shade(C.ink, 0.1)} strokeWidth={7} strokeLinecap="round" />
        </g>
      )}
    />
  );
}
