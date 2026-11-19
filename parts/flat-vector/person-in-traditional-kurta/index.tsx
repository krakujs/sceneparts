import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Kurta preset: long knee-length cream kurta with a mandarin collar and placket, over straight trousers.
/* eslint-disable @typescript-eslint/no-explicit-any */
const KURTA = "#E9D3A9";
const KURTA_D = shade(KURTA, 0.14);
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={KURTA}
      shirtColor={KURTA}
      bottom="trousers"
      bottomColor="#3F4A6B"
      shoes="shoes"
      shoesColor={C.brownDark}
      hat="none"
      over={() => (
        <g>
          <path d="M -100 -300 L 104 -300 L 110 -236 L -106 -236 Z" fill={KURTA} />
          <rect x={-106} y={-252} width={216} height={14} fill={KURTA_D} />
          <path d="M -30 -812 L 40 -812 L 46 -784 L -36 -784 Z" fill={KURTA_D} />
          <path d="M 12 -786 L 12 -560" stroke={KURTA_D} strokeWidth={4} />
          {[-740, -690, -640].map((yy) => <circle key={yy} cx={18} cy={yy} r={5} fill={KURTA_D} />)}
          <path d="M -70 -440 L -70 -330 M 80 -440 L 80 -330" stroke={KURTA_D} strokeWidth={4} />
        </g>
      )}
    />
  );
}
