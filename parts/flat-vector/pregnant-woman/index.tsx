import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Pregnant woman: adult in a dress with a rounded belly drawn over the body (body space, see A.belly).
// The front hand rests on the lower belly.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const dress = p.topColor || C.purple;
  const dressD = shade(dress, 0.16);
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="dress"
      bottom="skirt"
      over={() => (
        <g>
          <path d="M 60 -690 Q 150 -664 178 -584 Q 190 -508 140 -468 Q 110 -446 70 -460 Q 40 -520 40 -600 Z" fill={dress} />
          <path d="M 150 -636 Q 170 -592 158 -540" stroke={dressD} strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
