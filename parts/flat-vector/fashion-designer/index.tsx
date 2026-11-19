import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Fashion designer preset: purple blazer and sunglasses, a measuring tape over the shoulder and a sketch pad in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.purple}
      bottom="trousers"
      bottomColor="#1F2433"
      accessory="sunglasses"
      over={() => (
        <path d="M -62 -792 Q -14 -826 40 -804 Q 76 -790 80 -738" stroke={C.yellow} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="14 6" />
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <rect x={-40} y={-58} width={80} height={104} rx={7} fill={C.teal} />
          <rect x={-34} y={-52} width={68} height={92} rx={3} fill={C.white} />
          {[-40, -26, -12].map((y) => <circle key={y} cx={-27} cy={y} r={3} fill={C.greyDark} />)}
          <path d="M -12 -36 L 12 -36 L 24 -8 L 14 22 L -14 22 L -24 -8 Z" fill={C.purple} />
          <path d="M -12 -36 L 12 -36 L 6 -26 L -6 -26 Z" fill={C.purpleDark} />
          <rect x={-18} y={-6} width={36} height={4} rx={2} fill={C.pink} />
        </g>
      )}
    />
  );
}
