import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Runner preset: orange running vest, navy shorts, white race bib pinned to the chest. Pose defaults to a run.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.orange}
      bottom="shorts"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.purple}
      hat="none"
      accessory="none"
      extra="none"
      over={() => (
        <g>
          <rect x={-36} y={-742} width={84} height={96} rx={10} fill={C.white} />
          <circle cx={6} cy={-700} r={9} fill={C.greyLight} />
          <circle cx={30} cy={-690} r={7} fill={C.greyLight} />
          <rect x={-22} y={-660} width={52} height={8} rx={4} fill={C.greyLight} />
        </g>
      )}
    />
  );
}
