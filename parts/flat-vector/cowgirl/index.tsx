import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Cowgirl preset: brown wide-brim hat, pink blouse, fringed suede vest, jeans and boots, waving.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HAT = "#8A5A3C";
const SUEDE = "#A8744A";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#F27BA6"
      shirtColor={C.white}
      bottom="trousers"
      bottomColor="#2F4F86"
      shoes="boots"
      shoesColor={C.brownDark}
      hat="none"
      over={() => (
        <g>
          <path d="M -40 -800 L 62 -800 L 76 -500 L -58 -500 Z" fill={SUEDE} />
          <path d="M -40 -800 L -8 -800 L -22 -500 L -58 -500 Z" fill={shade(SUEDE, 0.12)} />
          {[-58, -40, -22, -4, 14, 32, 50, 66].map((x, i) => <path key={x} d={`M ${x} -500 L ${x + 2} -474`} stroke={SUEDE} strokeWidth={5} strokeLinecap="round" opacity={i % 2 ? 1 : 0.8} />)}
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -58 -60 Q -66 -190 0 -186 Q 62 -186 58 -60 Z" fill={HAT} />
          <rect x={-60} y={-92} width={118} height={18} fill={shade(HAT, 0.3)} />
          <ellipse cx={0} cy={-64} rx={168} ry={26} fill={HAT} />
        </g>
      )}
    />
  );
}
