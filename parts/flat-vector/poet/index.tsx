import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Poet preset: purple shirt, teal scarf, red beret; writes with a quill held near the chin (pose think).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#5A40A8"
      shirtColor={C.white}
      hat="beret"
      hatColor={C.red}
      accessory="none"
      extra="scarf"
      extraColor={C.teal}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(24)`}>
          <path d="M 0 -6 L 0 -196" stroke={C.greyDark} strokeWidth={4} strokeLinecap="round" />
          <path d="M 0 -8 C 26 -60 30 -124 0 -196 C -22 -132 -24 -62 0 -8 Z" fill={C.white} />
          <path d="M 0 -8 C 8 -60 10 -120 0 -180" stroke={C.greyLight} strokeWidth={3} fill="none" />
        </g>
      )}
    />
  );
}
