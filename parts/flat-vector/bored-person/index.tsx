import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Bored person: neutral face, sitting on a bench, slow sway and a sigh puff from the mouth.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const sway = Math.sin(p.f / 40) * 6;
  const k = p.f % 90;
  return (
    <g transform={`translate(${sway} 0) rotate(${Math.sin(p.f / 40) * 1.5} 0 0)`}>
      <Person
        {...p}
        x={p.x + (p.vx ?? 0) * p.f}
        f={p.f}
        flip={!!p.flip}
        pose="sit"
        expression="neutral"
        skin="tan"
        hair="bob"
        hairColor="brown"
        top="hoodie"
        topColor={C.grey}
        bottom="trousers"
        bottomColor={C.navy}
        shoes="sneakers"
        shoesColor={C.white}
        topper={() => (
          <ellipse cx={150 + k * 0.6} cy={40 - k * 0.5} rx={22 + k * 0.2} ry={12 + k * 0.1} fill={C.white} opacity={Math.max(0, 0.9 - k / 90)} />
        )}
      />
    </g>
  );
}
