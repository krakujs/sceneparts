import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Dashiki preset: loose bright orange tunic with an embroidered V-neck panel, dark trousers. Kufi cap is a param.
/* eslint-disable @typescript-eslint/no-explicit-any */
const TUNIC = "#F2A23A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={TUNIC}
      bottom="trousers"
      bottomColor="#2F3B5C"
      shoes="sneakers"
      shoesColor={C.white}
      hat={p.hat ?? "skullcap"}
      hatColor={p.hatColor ?? "#FFFFFF"}
      over={() => (
        <g>
          <path d="M -34 -812 L 44 -812 L 52 -700 L 5 -596 L -42 -700 Z" fill={C.red} />
          <path d="M -22 -790 L 32 -790 L 38 -710 L 5 -630 L -28 -710 Z" fill={C.yellow} />
          {[-720, -660, -600].map((y, i) => <path key={y} d={`M ${-20 + i * 2} ${y} L 0 ${y - 16} L 20 ${y} L 0 ${y + 16} Z`} fill={C.teal} />)}
          <path d="M -60 -560 L 80 -560 L 82 -548 L -62 -548 Z" fill={C.red} opacity={0.8} />
        </g>
      )}
    />
  );
}
