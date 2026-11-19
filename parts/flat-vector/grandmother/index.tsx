import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Grandmother preset: elder in a dress with a purple shawl drawn over the shoulders (over), knitting in her hands (held).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="elder"
      top="dress"
      bottom="skirt"
      over={() => (
        <g>
          <path d="M -82 -796 Q 6 -846 94 -796 L 104 -640 Q 60 -600 34 -628 Q 0 -596 -40 -626 Q -70 -600 -76 -640 Z" fill={C.purple} />
          {[-40, -8, 24, 56].map((x) => (
            <line key={x} x1={x} y1={-626} x2={x - 4} y2={-600} stroke={C.purpleDark} strokeWidth={6} strokeLinecap="round" />
          ))}
        </g>
      )}
      held={(h) => (
        <g>
          <path d={`M ${h.x - 10} ${h.y + 4} L ${h.x + 96} ${h.y - 62}`} stroke={C.greyDark} strokeWidth={7} strokeLinecap="round" />
          <path d={`M ${h.x - 4} ${h.y - 12} L ${h.x + 102} ${h.y - 76}`} stroke={C.greyDark} strokeWidth={7} strokeLinecap="round" />
          <circle cx={h.x + 16} cy={h.y + 30} r={32} fill={C.pink} />
          <path d={`M ${h.x - 6} ${h.y + 24} Q ${h.x + 16} ${h.y + 10} ${h.x + 38} ${h.y + 18}`} stroke={shade(C.pink, 0.2)} strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
      )}
    />
  );
}
