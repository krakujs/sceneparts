import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Person in a yellow raincoat with a hood (topper), rain boots, walking.
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
      skin="light"
      hair="none"
      top="coat"
      topColor={C.yellow}
      bottom="trousers"
      bottomColor={C.inkSoft}
      shoes="boots"
      shoesColor={C.yellowDark}
      over={() => <circle cx={12} cy={-905} r={116} fill={C.yellowDark} />}
      topper={() => (
        <g>
          <path d="M -112 30 Q -118 -120 0 -124 Q 112 -120 110 30 Q 90 -40 40 -62 Q 0 -70 -40 -62 Q -90 -40 -112 30 Z" fill={C.yellow} />
          <path d="M -90 -40 Q 0 -110 92 -40" stroke={C.yellowDark} strokeWidth={8} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
