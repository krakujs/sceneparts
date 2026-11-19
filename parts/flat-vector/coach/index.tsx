import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Coach preset: navy tracksuit hoodie, green cap, whistle on a lanyard, clipboard in hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.navy}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      hat="cap"
      hatColor={C.green}
      accessory="none"
      extra="none"
      extraColor={C.white}
      prop="clipboard"
      propColor={C.white}
      over={() => (
        <g>
          <path d="M 4 -800 Q 30 -760 52 -800" stroke={C.yellow} strokeWidth={6} fill="none" />
          <circle cx={36} cy={-660} r={16} fill={C.yellow} />
          <circle cx={36} cy={-660} r={8} fill={C.yellowDark} />
        </g>
      )}
    />
  );
}
