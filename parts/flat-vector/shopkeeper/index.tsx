import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Shopkeeper preset: orange tee, white apron over dark trousers, shopping basket held in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const wicker = C.sand;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.orange}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="shoes"
      shoesColor={C.brownDark}
      hat="none"
      hatColor={C.red}
      accessory="moustache"
      extra="apron"
      extraColor={C.white}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y}) rotate(-4)`}>
          <path d="M -44 -50 Q -44 -104 0 -104 Q 44 -104 44 -50" stroke={C.brownDark} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M -60 -50 L 60 -50 L 48 40 Q 46 56 30 56 L -30 56 Q -46 56 -48 40 Z" fill={wicker} />
          <path d="M -60 -50 L 60 -50 L 58 -30 L -58 -30 Z" fill={shade(wicker, 0.15)} />
          <path d="M -22 -30 L -18 56 M 22 -30 L 18 56" stroke={shade(wicker, 0.2)} strokeWidth={5} />
          <circle cx={-14} cy={-62} r={14} fill={C.red} />
          <circle cx={18} cy={-66} r={13} fill={C.green} />
        </g>
      )}
    />
  );
}
