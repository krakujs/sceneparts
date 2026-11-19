import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Skier: blue ski jacket, orange beanie and goggles, two skis under the feet and two poles.
// The skis and poles are drawn in the same transform as the person, so flip and scale work.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  return (
    <g transform={`translate(${x} ${y - 46 * s}) scale(${p.flip ? -s : s} ${s})`}>
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        top="coat"
        topColor={C.blue}
        shirtColor={C.white}
        bottom="trousers"
        bottomColor={C.navy}
        shoes="boots"
        shoesColor={C.ink}
        hat="beanie"
        hatColor={C.orange}
        accessory="goggles"
        held={(h) => (
          <g>
            <path d={`M ${h.x} ${h.y} L ${h.x + 26} 34`} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
            <circle cx={h.x + 26} cy={36} r={11} fill="none" stroke={C.greyDark} strokeWidth={4} />
          </g>
        )}
        over={() => (
          <path d="M -46 -462 L -72 30" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        )}
      />
      <path d="M -150 24 L 168 24 Q 192 28 168 34 L -150 34 Z" fill={C.red} />
      <path d="M -150 36 L 168 36 Q 192 40 168 46 L -150 46 Z" fill={C.redDark} />
    </g>
  );
}
