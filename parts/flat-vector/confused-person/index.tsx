import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Confused person: thinking pose, neutral face, question mark drawn as paths above the head, bobbing.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const bob = Math.sin(p.f / 9) * 14;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="think"
      expression="neutral"
      skin="tan"
      hair="curly"
      hairColor="auburn"
      top="sweater"
      topColor={C.purple}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      topper={() => (
        <g transform={`translate(0 ${bob + 70}) scale(1.3)`}>
          <path d="M -26 -186 Q -26 -250 0 -250 Q 26 -250 26 -220 Q 26 -198 0 -180 L 0 -160" stroke={C.yellow} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={0} cy={-132} r={11} fill={C.yellow} />
        </g>
      )}
    />
  );
}
