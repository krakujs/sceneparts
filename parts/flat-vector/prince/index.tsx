import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Prince preset: royal blue tunic with gold trim, short red cape, small gold crown and polished boots.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="child"
      top="shirt"
      topColor={C.blue}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.white}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="none"
      hair="side"
      hairColor="#5B3A26"
      over={() => (
        <g>
          <path d="M -80 -800 Q 0 -770 86 -800 L 96 -700 Q 6 -650 -92 -700 Z" fill={C.red} />
          <path d="M -80 -800 Q 0 -770 86 -800 L 90 -786 Q 0 -756 -84 -786 Z" fill={C.yellow} />
          <rect x={-76} y={-520} width={160} height={12} fill={C.yellow} />
          <rect x={-8} y={-640} width={16} height={100} fill={C.yellow} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -54 -92 L -54 -124 L -28 -104 L 0 -134 L 28 -104 L 54 -124 L 54 -92 Z" fill={C.yellow} />
          <circle cx={0} cy={-112} r={7} fill={C.red} />
        </g>
      )}
    />
  );
}
