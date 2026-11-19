import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Hanbok preset (women's chima jeogori): pale blue jacket with long sleeves, a yellow ribbon tie at the chest
// and a full pink high-waisted chima skirt down to the feet.
/* eslint-disable @typescript-eslint/no-explicit-any */
const JEO = "#A9D4F0";
const CHIMA = "#D8496B";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={JEO}
      shirtColor={JEO}
      bottom="trousers"
      bottomColor={CHIMA}
      shoes="shoes"
      shoesColor={C.white}
      hat="none"
      over={() => (
        <g>
          <path d="M -140 -40 L 150 -40 L 86 -600 L -80 -600 Z" fill={CHIMA} />
          <path d="M -140 -40 L -60 -40 L -40 -200 Z" fill="#B53A2E" opacity={0.35} />
          <rect x={-82} y={-612} width={172} height={24} rx={8} fill={C.yellow} />
          <path d="M 14 -790 Q 2 -700 -30 -628" stroke={C.yellow} strokeWidth={12} fill="none" strokeLinecap="round" />
          <path d="M 14 -790 Q 30 -700 44 -628" stroke={C.yellow} strokeWidth={12} fill="none" strokeLinecap="round" />
          <circle cx={14} cy={-792} r={12} fill={C.yellowDark} />
        </g>
      )}
    />
  );
}
