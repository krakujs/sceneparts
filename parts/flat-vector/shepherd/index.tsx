import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Shepherd preset: long brown cloak, headscarf and a crook staff in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={C.brown}
      shirtColor="#F4F1EA"
      bottom="trousers"
      bottomColor={C.brownDark}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="headscarf"
      hatColor="#E9D3A9"
      held={(h) => (<g transform={`translate(${h.x} ${h.y})`}><rect x={-6} y={-375} width={12} height={815} rx={5} fill={C.brownDark} /><path d="M -6 -372 L -6 -410 Q -6 -440 22 -440 Q 50 -440 50 -414 Q 50 -398 36 -398" stroke={C.brownDark} strokeWidth={12} fill="none" strokeLinecap="round" /></g>)}
    />
  );
}
