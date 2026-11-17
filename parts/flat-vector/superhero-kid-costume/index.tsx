import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Superhero kid costume preset: child-sized, generic orange cape that flutters behind, a red eye mask and a plain yellow star on a teal tee. No known superhero emblem or colour scheme.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const flutter = Math.sin(p.f / 6) * 22;
  const flutter2 = Math.sin(p.f / 6 + 1.2) * 16;
  return (
    <Person
      {...p}
      age="child"
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <path d={`M -54 -800 Q -150 -760 ${-190 + flutter} -560 Q ${-170 + flutter2} -420 ${-220 + flutter} -330 L -80 -330 Q -110 -520 -40 -800 Z`} fill={C.orange} />
          <path d={`M -150 -640 Q ${-180 + flutter} -560 ${-220 + flutter} -330`} stroke={shade(C.orange, 0.18)} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M 30 -730 L 40 -700 L 68 -700 L 46 -684 L 54 -656 L 30 -672 L 6 -656 L 14 -684 L -8 -700 L 20 -700 Z" fill={C.yellow} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -92 -34 Q 0 -66 96 -34 Q 98 -6 60 6 Q 0 -10 -60 6 Q -98 -6 -92 -34 Z" fill={C.red} />
          <circle cx={-34} cy={-4} r={0} fill={C.white} />
        </g>
      )}
    />
  );
}
