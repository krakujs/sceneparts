import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Astronaut preset: white jumpsuit, boots, backpack and a round helmet with visor drawn on the head.
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
      shoesColor="#DDE2EA"
      extra="backpack"
      extraColor="#DDE2EA"
      topper={() => (<g><rect x={-104} y={96} width={220} height={40} rx={18} fill="#DDE2EA" /><circle cx={6} cy={-6} r={132} fill="#BFE6F5" opacity={0.32} /><circle cx={6} cy={-6} r={132} fill="none" stroke={C.white} strokeWidth={20} /><circle cx={6} cy={-6} r={132} fill="none" stroke="#DDE2EA" strokeWidth={6} /><path d="M -76 -84 Q -30 -124 30 -118" stroke={C.white} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.85} /><circle cx={-98} cy={-6} r={16} fill="#DDE2EA" /></g>)}
    />
  );
}
