import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Influencer preset: pink sweater, teal skirt, heels and sunglasses; a phone on a selfie stick in the front hand (pose point).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor={C.pink}
      bottom="skirt"
      bottomColor={C.teal}
      shoes="heels"
      shoesColor={C.ink}
      hat="none"
      accessory="sunglasses"
      hatColor={C.ink}
      extra="none"
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y})`}>
          <path d="M 0 0 L 46 -226" stroke={C.inkSoft} strokeWidth={9} strokeLinecap="round" />
          <g transform="translate(50 -248) rotate(12)">
            <rect x={-22} y={-42} width={44} height={84} rx={9} fill={C.ink} />
            <rect x={-17} y={-35} width={34} height={68} rx={5} fill={C.skyDeep} />
            <circle cx={0} cy={-29} r={3} fill={C.greyDark} />
          </g>
        </g>
      )}
    />
  );
}
