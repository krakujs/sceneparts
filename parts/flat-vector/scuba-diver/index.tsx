import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Scuba diver: dark teal wetsuit (jumpsuit), yellow goggles, air tank on the back, regulator hose and fins on the feet.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor="#1D4E5F"
      accessory="goggles"
      hatColor={C.yellow}
      hat="none"
      over={() => (
        <g>
          <rect x={-150} y={-760} width={58} height={290} rx={26} fill={C.greyDark} />
          <rect x={-150} y={-760} width={16} height={290} rx={8} fill={C.grey} />
          <rect x={-156} y={-640} width={70} height={14} rx={4} fill={C.ink} />
          <path d="M -40 -6 Q 0 -30 52 -10 Q 66 6 40 10 Q 0 14 -40 6 Z" fill={C.orange} />
          <path d="M -110 -4 Q -70 -28 -22 -12 Q -10 4 -40 8 Q -80 14 -110 -4 Z" fill={C.orange} />
          <path d="M -40 -6 Q 0 -30 52 -10" stroke={C.redDark} strokeWidth={3} fill="none" />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M 64 62 Q 96 110 88 160 Q 84 200 60 230" stroke={C.yellowDark} strokeWidth={12} fill="none" strokeLinecap="round" />
          <circle cx={60} cy={236} r={16} fill={C.yellowDark} />
        </g>
      )}
    />
  );
}
