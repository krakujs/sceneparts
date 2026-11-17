import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Veterinarian preset: teal scrubs, stethoscope, puppy held in both arms.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="scrubs"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      extra="stethoscope"
      extraColor={C.ink}
      held={(h) => (<g transform={`translate(${(h.x + h.bx) / 2} ${(h.y + h.by) / 2})`}><ellipse cx={-4} cy={18} rx={70} ry={38} fill="#E8B96A" /><ellipse cx={34} cy={-28} rx={12} ry={24} fill="#C98F45" transform="rotate(-20 34 -28)" /><circle cx={50} cy={-30} r={38} fill="#E8B96A" /><circle cx={66} cy={-36} r={5} fill={C.ink} /><circle cx={86} cy={-22} r={7} fill={C.ink} /></g>)}
    />
  );
}
