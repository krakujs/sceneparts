import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Singer preset: sparkly yellow tank with star sparkles, holding a microphone (pose talk).
/* eslint-disable @typescript-eslint/no-explicit-any */
const star = (x: number, y: number, r: number) =>
  `M ${x} ${y - r} L ${x + r * 0.28} ${y - r * 0.28} L ${x + r} ${y} L ${x + r * 0.28} ${y + r * 0.28} L ${x} ${y + r} L ${x - r * 0.28} ${y + r * 0.28} L ${x - r} ${y} L ${x - r * 0.28} ${y - r * 0.28} Z`;

export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.yellow}
      hat="none"
      accessory="none"
      hatColor={C.ink}
      extra="none"
      prop="mic"
      propColor={C.greyDark}
      over={() => (
        <g>
          <path d={star(-40, -720, 16)} fill={C.white} />
          <path d={star(30, -650, 22)} fill={C.pink} />
          <path d={star(-6, -560, 14)} fill={C.white} />
          <path d={star(-44, -600, 10)} fill={C.pink} />
          <path d={star(50, -740, 10)} fill={C.white} />
        </g>
      )}
    />
  );
}
