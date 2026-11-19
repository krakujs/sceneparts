import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Pharmacist preset: white coat, glasses, pill bottle in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.white}
      shirtColor="#A8D8EA"
      bottom="skirt"
      bottomColor="#3A4157"
      shoes="heels"
      shoesColor={C.ink}
      accessory="glasses"
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><rect x={-24} y={-56} width={48} height={70} rx={10} fill="#E0A21F" /><rect x={-27} y={-70} width={54} height={18} rx={6} fill={C.white} /><rect x={-24} y={-30} width={48} height={22} rx={3} fill={C.white} /></g>)}
    />
  );
}
