import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Dirndl preset: dark green laced bodice, white puff-sleeved blouse, plum full skirt with dots and a white apron.
/* eslint-disable @typescript-eslint/no-explicit-any */
const BODICE = "#2F7A4A";
const SKIRT = "#8E2D5C";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={BODICE}
      bottom="trousers"
      bottomColor={SKIRT}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="none"
      over={() => (
        <g>
          <path d="M -86 -478 L 92 -478 L 150 -40 L -150 -40 Z" fill={SKIRT} />
          {[[-90, -300], [-30, -220], [40, -330], [-60, -120], [20, -90], [90, -200], [-110, -380], [70, -420]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={9} fill="#B8588A" />
          ))}
          <path d="M -30 -812 Q 10 -772 52 -812" stroke={C.white} strokeWidth={12} fill="none" />
          <circle cx={-44} cy={-790} r={46} fill={C.white} />
          <circle cx={48} cy={-790} r={46} fill={C.white} />
          <path d="M 14 -780 L 14 -560" stroke={C.ink} strokeWidth={4} strokeDasharray="8 8" />
          <path d="M -58 -500 L 90 -500 L 102 -170 L -72 -170 Z" fill={C.white} />
          <path d="M -58 -500 L 90 -500 L 92 -478 L -60 -478 Z" fill="#E9E2D6" />
          <path d="M -40 -240 Q 16 -220 70 -240" stroke="#D8CFC0" strokeWidth={6} fill="none" />
        </g>
      )}
    />
  );
}
