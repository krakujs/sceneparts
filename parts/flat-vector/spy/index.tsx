import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Spy preset: dark trench coat with a turned-up collar, sunglasses, and a briefcase in hand. Sneaky walk. No gun.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="walk"
      top="coat"
      topColor={C.inkSoft}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      hair="short"
      hairColor="black"
      accessory="sunglasses"
      over={() => (
        <g>
          <path d="M -98 -818 L -52 -800 L -66 -728 L -104 -760 Z" fill={C.ink} />
          <path d="M 102 -818 L 56 -800 L 70 -728 L 108 -760 Z" fill={C.ink} />
          <path d="M -16 -812 L 14 -760 L 46 -812 Z" fill={C.white} />
          <rect x={-76} y={-520} width={160} height={14} rx={5} fill={C.ink} />
        </g>
      )}
      held={(h) => (
        <g transform={`translate(${h.x} ${h.y - 30})`}>
          <rect x={-20} y={-10} width={92} height={70} rx={8} fill={C.brownDark} />
          <rect x={-8} y={-24} width={20} height={18} rx={6} fill="none" stroke={C.brownDark} strokeWidth={6} />
          <rect x={30} y={-24} width={20} height={18} rx={6} fill="none" stroke={C.brownDark} strokeWidth={6} />
          <rect x={-20} y={14} width={92} height={5} fill={C.brown} />
          <rect x={20} y={8} width={12} height={12} rx={3} fill={C.yellow} />
        </g>
      )}
    />
  );
}
