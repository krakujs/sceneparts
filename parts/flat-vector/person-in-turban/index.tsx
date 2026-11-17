import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Turban preset: neatly wrapped orange turban with fold lines, full beard and a long kurta-style shirt.
/* eslint-disable @typescript-eslint/no-explicit-any */
const SHIRT = "#2F6FB0";
const TURBAN = "#E8703F";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={SHIRT}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="shoes"
      shoesColor={C.ink}
      hat="turban"
      hatColor={TURBAN}
      accessory={p.accessory ?? "beard"}
      over={() => (
        <g>
          <path d="M -78 -300 L 86 -300 L 90 -250 L -82 -250 Z" fill={shade(SHIRT, 0.12)} />
          <path d="M 14 -800 L 14 -600" stroke={shade(SHIRT, 0.25)} strokeWidth={4} />
        </g>
      )}
      topper={() => <path d="M -40 -150 Q 10 -170 60 -150" stroke={shade(TURBAN, 0.25)} strokeWidth={6} fill="none" />}
    />
  );
}
