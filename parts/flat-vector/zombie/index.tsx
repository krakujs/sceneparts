import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Zombie preset: cartoon zombie with green-grey skin, torn clothes, arms out in front and a slow shuffle. No gore.
/* eslint-disable @typescript-eslint/no-explicit-any */
const skin = "#8FA68A";
export default function Part(p: PartProps<any>) {
  const bob = Math.sin(p.f / 7) * 4;
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      y={(p.y ?? 1560) + bob}
      f={p.f}
      flip={!!p.flip}
      skin={skin}
      pose="hold"
      expression="open"
      top="tshirt"
      topColor="#5E6E8A"
      bottom="trousers"
      bottomColor="#4A4F5E"
      shoes="sneakers"
      shoesColor={C.greyDark}
      hat="none"
      hair="none"
      accessory="none"
      over={() => (
        <g>
          <path d="M -80 -300 L -60 -262 L -40 -300 L -18 -254 L 4 -300 L 26 -258 L 48 -300 L 70 -262 L 88 -300 L 88 -330 L -80 -330 Z" fill="#4A4F5E" />
          <path d="M -70 -740 L -40 -716 L -62 -690 L -30 -668" stroke={C.greyDark} strokeWidth={5} fill="none" />
          <path d="M 40 -800 L 64 -780 L 52 -750" stroke={C.greyDark} strokeWidth={5} fill="none" />
          <circle cx={-30} cy={-660} r={9} fill={C.greyDark} opacity={0.5} />
        </g>
      )}
      topper={() => (
        <g>
          <path d="M -78 -40 Q -60 -100 -20 -98" stroke="#3E4D39" strokeWidth={8} fill="none" strokeLinecap="round" />
          <path d="M 40 -92 Q 64 -110 84 -80" stroke="#3E4D39" strokeWidth={8} fill="none" strokeLinecap="round" />
          <circle cx={-4} cy={-62} r={7} fill="#3E4D39" opacity={0.5} />
        </g>
      )}
    />
  );
}
