import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Santa costume preset: a red suit with white trim, black belt and boots, a white beard and a red hat with a white pom-pom. Public-domain look, no brands.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.red}
      bottom="trousers"
      bottomColor={C.red}
      shoes="boots"
      shoesColor={C.ink}
      hat="none"
      over={() => (
        <g>
          <rect x={-80} y={-500} width={170} height={30} fill={C.ink} />
          <rect x={-22} y={-504} width={36} height={38} rx={4} fill={C.yellow} />
          <rect x={-80} y={-330} width={164} height={22} fill={C.white} />
          <path d="M -78 -600 Q 6 -570 86 -600 L 86 -580 Q 6 -552 -78 -580 Z" fill={C.white} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -96 -36 Q -100 -150 -10 -150 Q 60 -150 96 -70 Q 56 -50 -4 -60 Q -60 -52 -96 -36 Z" fill={C.red} />
          <path d="M -104 -40 Q 0 -66 104 -40 L 102 -6 Q 0 -30 -102 -6 Z" fill={C.white} />
          <circle cx={92} cy={-70} r={22} fill={C.white} />
          <path d="M -80 10 Q -90 130 8 136 Q 96 130 84 26 Q 60 62 36 46 Q 14 36 -14 36 Q -44 40 -80 10 Z" fill={C.white} />
        </g>
      )}
    />
  );
}
