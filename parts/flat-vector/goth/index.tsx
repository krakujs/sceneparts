import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Goth preset: black clothes under a long dark coat, dark plum lipstick, silver hoop earring, chain necklace and pale skin.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="coat"
      topColor={C.ink}
      shirtColor={C.inkSoft}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <path d="M -54 -800 Q 14 -730 80 -800" stroke={C.greyLight} strokeWidth={5} fill="none" strokeLinecap="round" />
          <circle cx={14} cy={-746} r={10} fill={C.greyLight} />
        </g>
      )}
      topper={() => (
        <g>
          <ellipse cx={62} cy={50} rx={24} ry={8} fill={C.purpleDark} opacity={0.9} />
          <circle cx={-50} cy={30} r={11} fill="none" stroke={C.greyLight} strokeWidth={4} />
        </g>
      )}
    />
  );
}
