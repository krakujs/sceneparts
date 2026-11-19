import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Grandfather preset: elder with a warm smile in a pale shirt, red braces and a navy waistcoat drawn over it (via over). Holds a mug by default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="elder"
      top="shirt"
      shirtColor={C.white}
      shoes="shoes"
      over={() => (
        <g>
          <path d="M 42 -800 L 84 -800 L 84 -478 L 42 -478 Z" fill={C.navy} />
          {[-720, -640, -560].map((y) => (
            <circle key={y} cx={62} cy={y} r={6} fill={C.yellow} />
          ))}
          <rect x={26} y={-800} width={12} height={300} rx={6} fill={C.red} />
          <rect x={-46} y={-800} width={12} height={300} rx={6} fill={C.red} />
        </g>
      )}
    />
  );
}
