import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Groom preset: dark navy suit blazer over a white shirt, dark trousers, red bow tie and a pink flower on the lapel.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.navy}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      extra="bowtie"
      extraColor={C.red}
      over={() => (
        <g transform="translate(62 -720)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={0} cy={-9} rx={7} ry={11} fill={C.pink} transform={`rotate(${a})`} />
          ))}
          <circle cx={0} cy={0} r={6} fill={C.yellow} />
          <path d="M 0 8 Q -6 30 -12 44" stroke={C.green} strokeWidth={4} fill="none" />
          <path d="M -8 22 Q -18 16 -18 24 Q -10 28 -8 22 Z" fill={shade(C.green, 0.1)} />
        </g>
      )}
    />
  );
}
