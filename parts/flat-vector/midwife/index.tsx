import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Midwife: purple scrubs and cap, cradling a swaddled baby in the front arm.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="scrubs"
      topColor={C.purple}
      bottom="trousers"
      bottomColor={C.purpleDark}
      shoes="sneakers"
      shoesColor={C.white}
      hat="scrubcap"
      hatColor={C.purple}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 30}) scale(1.5)`}>
          <ellipse cx={0} cy={-6} rx={70} ry={42} fill={C.pink} />
          <path d="M -58 -4 Q 0 -22 58 -4" stroke={C.white} strokeWidth={8} fill="none" strokeLinecap="round" />
          <circle cx={-18} cy={-64} r={34} fill="#F7D2B5" />
          <path d="M -30 -92 Q -18 -102 -6 -92" stroke="#C99A62" strokeWidth={6} fill="none" strokeLinecap="round" />
          <circle cx={-26} cy={-62} r={4} fill={C.ink} />
          <circle cx={-8} cy={-62} r={4} fill={C.ink} />
          <path d="M -24 -48 Q -17 -42 -10 -48" stroke={C.inkSoft} strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
