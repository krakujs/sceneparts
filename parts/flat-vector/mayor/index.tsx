import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Mayor: navy suit, white shirt and a gold ceremonial chain with a plain round medallion. No crest.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.navy}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      extra="tie"
      extraColor={C.teal}
      over={() => (
        <g>
          <path d="M -50 -790 Q 30 -600 110 -790" stroke={C.yellowDark} strokeWidth={12} fill="none" strokeLinecap="round" />
          <circle cx={30} cy={-628} r={34} fill={C.yellow} />
          <circle cx={30} cy={-628} r={20} fill={shade(C.yellow, 0.12)} />
        </g>
      )}
    />
  );
}
