import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Translator: teal blazer, a headset mic and a small card with two speech bubbles held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.teal}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="shoes"
      shoesColor={C.brownDark}
      accessory="headset"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 40}) scale(1.2)`}>
          <rect x={-56} y={-48} width={112} height={96} rx={14} fill={C.white} />
          <path d="M -40 -26 Q -40 -40 -26 -40 L 8 -40 Q 22 -40 22 -26 L 22 -6 Q 22 8 8 8 L -20 8 L -30 18 L -26 8 Q -40 8 -40 -6 Z" fill={C.blue} />
          <path d="M 6 4 Q 6 -10 20 -10 L 40 -10 Q 52 -10 52 4 L 52 18 Q 52 30 40 30 L 30 30 L 36 40 L 24 30 Q 6 30 6 18 Z" fill={C.pink} />
        </g>
      )}
    />
  );
}
