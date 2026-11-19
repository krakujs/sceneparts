import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Person with umbrella: walking with an open umbrella in the front hand, ready for rain.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="walk"
      expression="smile"
      skin="medium"
      hair="bun"
      hairColor="black"
      top="shirt"
      topColor={C.teal}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-5} y={-700} width={10} height={710} rx={4} fill={C.ink} />
          <path d="M -210 -610 Q 0 -790 210 -610 Q 158 -634 105 -610 Q 52 -634 0 -610 Q -52 -634 -105 -610 Q -158 -634 -210 -610 Z" fill={C.purple} />
          <path d="M 0 -700 Q -60 -680 -105 -614 M 0 -700 Q 60 -680 105 -614" stroke={C.purpleDark} strokeWidth={6} fill="none" />
          <circle cx={0} cy={-708} r={9} fill={C.ink} />
          <path d="M 0 10 q 0 22 -22 22" stroke={C.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
