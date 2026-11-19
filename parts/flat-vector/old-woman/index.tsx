import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Old woman preset: elder with a white bun, glasses, a cardigan (sweater with a white front and buttons) and a skirt.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="elder"
      top="sweater"
      bottom="skirt"
      accessory="glasses"
      over={() => (
        <g>
          <rect x={44} y={-790} width={26} height={320} rx={8} fill={C.white} />
          {[-740, -660, -580, -500].map((y) => (
            <circle key={y} cx={57} cy={y} r={6} fill={C.greyDark} />
          ))}
        </g>
      )}
    />
  );
}
