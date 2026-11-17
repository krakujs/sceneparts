import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Hijab preset: teal headscarf covering the hair and neck, with a long modest dress to the ankles.
/* eslint-disable @typescript-eslint/no-explicit-any */
const DRESS = "#2F6F8F";
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="coat"
      topColor={DRESS}
      bottom="trousers"
      bottomColor={DRESS}
      shoes="shoes"
      shoesColor={C.brownDark}
      hat="headscarf"
      hatColor={C.teal}
      over={() => (
        <g>
          <path d="M -80 -812 L 88 -812 L 100 -40 L -96 -40 Z" fill={DRESS} />
          <rect x={-96} y={-70} width={196} height={18} fill={C.blueDark} opacity={0.5} />
          <path d="M -30 -812 L 52 -812 L 40 -770 L -18 -770 Z" fill={C.teal} />
        </g>
      )}
    />
  );
}
