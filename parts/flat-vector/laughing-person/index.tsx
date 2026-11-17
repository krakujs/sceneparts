import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Laughing person: laugh face, body shaking with laughter, small "ha" motion lines drawn as arcs (no text).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const shake = Math.sin(p.f * 1.1) * 4;
  const tilt = Math.sin(p.f * 1.1) * 2.5;
  const arcOp = 0.35 + 0.65 * Math.abs(Math.sin(p.f / 6));
  return (
    <g transform={`translate(${shake} 0) rotate(${tilt} 0 0)`}>
      <Person
        {...p}
        x={p.x + (p.vx ?? 0) * p.f}
        f={p.f}
        flip={!!p.flip}
        pose="stand"
        expression="laugh"
        skin="medium"
        hair="curly"
        hairColor="brown"
        top="tshirt"
        topColor={C.yellow}
        bottom="trousers"
        bottomColor={C.blueDark}
        shoes="sneakers"
        shoesColor={C.white}
        topper={() => (
          <g stroke={C.ink} strokeWidth={9} strokeLinecap="round" fill="none" opacity={arcOp}>
            <path d="M 150 -120 Q 180 -140 176 -170" />
            <path d="M 182 -96 Q 230 -110 224 -150" />
            <path d="M -150 -120 Q -180 -140 -176 -170" />
          </g>
        )}
      />
    </g>
  );
}
