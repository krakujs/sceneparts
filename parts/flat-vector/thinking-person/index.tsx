import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Thinking person: hand on chin, neutral face, thought bubble of three circles and a cloud above the head.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const pulse = 1 + Math.sin(p.f / 14) * 0.04;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="think"
      expression="neutral"
      skin="brown"
      hair="bun"
      hairColor="black"
      top="blazer"
      topColor={C.teal}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.inkSoft}
      shoes="shoes"
      shoesColor={C.ink}
      topper={() => (
        <g transform={`translate(0 0)`}>
          <circle cx={120} cy={-130} r={12} fill={C.white} opacity={0.95} />
          <circle cx={150} cy={-172} r={20} fill={C.white} opacity={0.95} />
          <g transform={`translate(230 -270) scale(${pulse})`}>
            <path d="M -110 0 Q -130 -40 -80 -50 Q -70 -100 -10 -90 Q 30 -130 80 -90 Q 140 -90 130 -40 Q 150 0 100 10 L -80 10 Q -120 10 -110 0 Z" fill={C.white} />
          </g>
        </g>
      )}
    />
  );
}
