import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Video caller: waving at a tablet on a stand whose screen shows a generic face silhouette. Headset on, hoodie.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        pose={p.pose ?? "wave"}
        top="hoodie"
        topColor={C.teal}
        bottom="trousers"
        bottomColor={C.navy}
        shoes="sneakers"
        shoesColor={C.white}
        hat="none"
        accessory="headset"
      />
      <rect x={326} y={-430} width={18} height={430} fill={C.grey} />
      <rect x={280} y={-12} width={110} height={14} rx={6} fill={C.greyDark} />
      <rect x={220} y={-600} width={230} height={170} rx={14} fill={C.ink} />
      <rect x={232} y={-588} width={206} height={146} rx={8} fill="#8FD0F2" />
      <circle cx={335} cy={-530} r={42} fill={C.greyDark} />
      <path d="M 268 -456 Q 335 -414 402 -456 L 402 -428 L 268 -428 Z" fill={C.greyDark} />
    </g>
  );
}
