import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Nutritionist: white lab coat over a lime shirt, holding a big red apple in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.white}
      shirtColor="#A8D85A"
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="sneakers"
      shoesColor={C.greenDark}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 26}) scale(1.3)`}>
          <path d="M 0 -30 Q -4 -40 6 -46" stroke={C.brownDark} strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M 4 -36 Q 22 -60 38 -44 Q 20 -30 4 -36 Z" fill={C.green} />
          <path d="M -38 -6 Q -46 -36 -14 -36 Q 0 -30 14 -36 Q 46 -36 38 -6 Q 36 30 16 36 Q 0 30 -16 36 Q -36 30 -38 -6 Z" fill={C.red} />
          <path d="M -22 -18 Q -22 -30 -10 -30" stroke="#FFB3A8" strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
