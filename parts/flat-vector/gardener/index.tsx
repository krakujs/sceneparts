import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Gardener preset: yellow top, green apron and cap, watering can in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor="#FFC83D"
      extra="apron"
      extraColor={C.green}
      bottom="shorts"
      bottomColor={C.brown}
      shoes="boots"
      shoesColor={C.greenDark}
      hat="cap"
      hatColor={C.green}
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><path d="M -26 -30 Q 0 -70 26 -30" stroke={C.tealDark} strokeWidth={8} fill="none" /><rect x={-40} y={-30} width={80} height={70} rx={12} fill={C.teal} /><path d="M 36 4 L 74 -36" stroke={C.teal} strokeWidth={10} strokeLinecap="round" /><rect x={70} y={-46} width={16} height={14} rx={4} fill={C.tealDark} /></g>)}
    />
  );
}
