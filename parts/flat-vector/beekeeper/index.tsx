import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Beekeeper preset: white suit, veiled hat drawn on the head and a smoker in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor="#F4F6FA"
      shoes="boots"
      shoesColor={C.ink}
      topper={() => (<g><ellipse cx={0} cy={-98} rx={130} ry={22} fill="#DDE2EA" /><path d="M -100 -40 Q -110 -110 4 -112 Q 110 -110 104 -40 L 100 100 Q 0 128 -96 100 Z" fill="#D5E6F2" opacity={0.85} /></g>)}
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><path d="M 18 -26 Q 40 -70 62 -60" stroke={C.greyDark} strokeWidth={8} fill="none" strokeLinecap="round" /><rect x={-24} y={-36} width={48} height={70} rx={10} fill={C.greyDark} /><circle cx={60} cy={-70 - (p.f * 0.9) % 50} r={9} fill={C.white} opacity={0.6} /><circle cx={72} cy={-96 - (p.f * 0.9 + 25) % 50} r={12} fill={C.white} opacity={0.4} /></g>)}
    />
  );
}
