import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Victorian gentleman preset: dark tailcoat over a pale waistcoat and white shirt, red cravat, top hat and a walking cane.
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
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      hat="tophat"
      hatColor={C.ink}
      prop="cane"
      propColor={C.brownDark}
      over={() => (
        <g>
          <path d="M -18 -812 L 48 -812 L 40 -640 L 52 -520 L 14 -468 L -24 -520 L -12 -640 Z" fill={C.sand} />
          {[-700, -640, -580].map((y) => (
            <circle key={y} cx={14} cy={y} r={5} fill={C.yellowDark} />
          ))}
          <path d="M -14 -616 Q 14 -578 46 -616" stroke={C.yellow} strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d="M 6 -800 L 30 -800 L 26 -780 L 34 -640 L 18 -610 L 2 -640 L 10 -780 Z" fill={C.redDark} />
        </g>
      )}
    />
  );
}
