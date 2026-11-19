import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Viking preset: round helmet without horns, braided auburn beard, brown fur cloak and a round wooden shield.
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
      bottom="trousers"
      bottomColor={C.brownDark}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="helmet"
      hatColor="#A9B2C2"
      hair="braid"
      hairColor="auburn"
      accessory="beard"
      over={() => (
        <g>
          <path d="M -110 -800 Q 4 -850 118 -800 L 122 -560 L 96 -340 Q 4 -300 -92 -340 L -116 -560 Z" fill={C.brown} />
          <path d="M -110 -800 Q 4 -850 118 -800 L 116 -770 Q 4 -814 -108 -770 Z" fill={C.brownDark} />
          {Array.from({ length: 11 }, (_, i) => <circle key={i} cx={-100 + i * 20} cy={-770 + (i % 2) * 12} r={11} fill={shade(C.brown, 0.25)} />)}
          <path d="M -76 -520 L 84 -520 L 84 -496 L -76 -496 Z" fill={C.brownDark} />
          <circle cx={4} cy={-508} r={9} fill={C.yellow} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <circle cx={30} cy={-10} r={92} fill={C.brown} />
          <circle cx={30} cy={-10} r={92} fill="none" stroke={C.brownDark} strokeWidth={14} />
          <path d="M -60 -10 L 120 -10 M 30 -102 L 30 82 M -36 -50 L 96 30 M -36 30 L 96 -50" stroke={shade(C.brown, 0.3)} strokeWidth={6} />
          <circle cx={30} cy={-10} r={24} fill={C.yellow} />
          <circle cx={30} cy={-10} r={24} fill="none" stroke={C.yellowDark} strokeWidth={6} />
        </g>
      )}
    />
  );
}
