import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Lifeguard preset: red t-shirt, red shorts, whistle on a cord, rescue ring float held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.red}
      bottom="shorts"
      bottomColor={C.red}
      shoes="sandals"
      shoesColor={C.brownDark}
      hat="cap"
      hatColor={C.red}
      extra="none"
      accessory="sunglasses"
      over={() => (
        <g>
          <path d="M -6 -800 Q 6 -740 26 -722" stroke={C.yellow} strokeWidth={5} fill="none" />
          <rect x={18} y={-730} width={22} height={16} rx={6} fill={C.yellow} />
          <rect x={28} y={-736} width={10} height={6} rx={2} fill={shade(C.yellow, 0.2)} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <circle cx={0} cy={-14} r={44} fill="none" stroke={C.white} strokeWidth={22} />
          <circle cx={0} cy={-14} r={44} fill="none" stroke={shade(C.white, 0.25)} strokeWidth={4} strokeDasharray="20 60" />
        </g>
      )}
    />
  );
}
