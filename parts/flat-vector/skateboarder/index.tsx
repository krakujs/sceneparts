import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Skateboarder: cap and hoodie, standing on a skateboard. The wheels spin with p.f and the board rolls with vx.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  const spin = p.f * 14;
  const wheel = (cx: number) => (
    <g transform={`translate(${cx} 34) rotate(${spin})`}>
      <circle r={16} fill={C.ink} />
      <circle r={6} fill={C.greyLight} />
      <path d="M -11 0 L 11 0 M 0 -11 L 0 11" stroke={C.grey} strokeWidth={3} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y - 50 * s}) scale(${p.flip ? -s : s} ${s})`}>
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        top="hoodie"
        topColor={C.purple}
        bottom="trousers"
        bottomColor={C.greyDark}
        shoes="sneakers"
        shoesColor={C.white}
        hat="cap"
        hatColor={C.red}
        hair="short"
        hairColor="brown"
      />
      <rect x={-72} y={14} width={144} height={8} rx={3} fill={C.grey} />
      <rect x={-124} y={0} width={248} height={14} rx={7} fill={C.orange} />
      <rect x={-124} y={9} width={248} height={5} rx={2} fill={C.yellowDark} />
      {wheel(-78)}
      {wheel(78)}
    </g>
  );
}
