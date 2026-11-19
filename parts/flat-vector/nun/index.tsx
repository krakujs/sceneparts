import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Nun preset: dark habit with a long veil and white wimple drawn on the head, holding a book. Generic and respectful.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HABIT = "#2B2F3A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="dress"
      topColor={HABIT}
      hair="none"
      topper={() => (
        <g>
          <path d="M -104 -30 Q -112 -128 4 -130 Q 100 -128 96 -66 L 40 -70 Q 0 -58 -28 -26 L -44 60 L -70 110 Z" fill={HABIT} />
          <path d="M -36 -62 Q 10 -84 84 -72" stroke={C.white} strokeWidth={12} fill="none" strokeLinecap="round" />
        </g>
      )}
      prop={p.prop ?? "book"}
      propColor={p.propColor ?? C.purpleDark}
    />
  );
}
