import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Ninja preset: dark wrap outfit and hood with only the eyes showing, red sash, crouched ready pose. No weapon.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose={p.pose ?? "point"}
      top="jumpsuit"
      topColor={C.ink}
      shoes="sneakers"
      shoesColor={C.ink}
      hat="none"
      hair="none"
      over={() => (
        <g>
          <path d="M -76 -740 L 84 -560 L 84 -530 L -76 -700 Z" fill={C.red} />
          <path d="M -56 -800 L -22 -800 L -20 -760 L -56 -760 Z" fill={C.inkSoft} />
          <path d="M -84 -600 L 90 -600 L 90 -580 L -84 -580 Z" fill={C.inkSoft} opacity={0.6} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -104 -4 Q -108 -128 4 -130 Q 112 -126 106 -4 Q 110 70 56 98 L -46 98 Q -104 70 -104 -4 Z" fill={C.ink} />
          <path d="M -36 -10 Q -6 -22 26 -8 Q -6 2 -36 -10 Z" fill="#FFFFFF" />
          <path d="M 48 -10 Q 78 -22 108 -8 Q 78 2 48 -10 Z" fill="#FFFFFF" />
          <circle cx={-10} cy={-8} r={5} fill={C.ink} />
          <circle cx={70} cy={-8} r={5} fill={C.ink} />
        </g>
      )}
    />
  );
}
