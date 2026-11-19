import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Princess preset: long teal gown with yellow accents, a small tiara, long violet hair and a friendly wave.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor={C.teal}
      shoes="sandals"
      shoesColor={C.yellow}
      hat="none"
      hair="long"
      hairColor="#6B4FBF"
      over={() => (
        <g>
          <path d="M -76 -520 L 84 -520 L 84 -500 L -76 -500 Z" fill={C.yellow} />
          <path d="M -40 -812 Q 4 -790 44 -812 L 40 -780 Q 4 -764 -36 -780 Z" fill={C.yellow} />
          <circle cx={4} cy={-512} r={10} fill={C.pink} />
          <path d="M -60 -520 L -20 -300 M 60 -520 L 30 -300" stroke={C.yellow} strokeWidth={6} opacity={0.6} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -56 -90 L -40 -120 L -20 -102 L 0 -136 L 20 -102 L 40 -120 L 56 -90 Z" fill={C.yellow} />
          <circle cx={0} cy={-112} r={8} fill={C.pink} />
        </g>
      )}
    />
  );
}
