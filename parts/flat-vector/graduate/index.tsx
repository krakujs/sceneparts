import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Graduate preset: dark long gown over a white shirt, mortarboard with a yellow tassel, rolled diploma tied with a red ribbon in the front hand. Pose defaults to a cheer.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.ink}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      hat="mortarboard"
      hatColor={C.ink}
      held={(h) => (
        <g transform={`translate(${h.x - 40} ${h.y - 34})`}>
          <rect x={0} y={0} width={96} height={26} rx={13} fill={C.yellow} />
          <rect x={0} y={0} width={96} height={26} rx={13} fill="none" stroke={C.yellowDark} strokeWidth={3} />
          <rect x={58} y={-4} width={12} height={34} fill={C.red} />
          <path d="M 64 4 Q 84 -20 96 -4 Q 84 2 64 4 Z" fill={C.red} />
          <path d="M 64 22 L 84 46 L 74 46 L 62 28 Z" fill={C.redDark} />
        </g>
      )}
    />
  );
}
