import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Surfer: teal rash guard, orange board shorts, sunglasses, and a surfboard held along the back arm.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.teal}
      bottom="shorts"
      bottomColor={C.orange}
      shoes="sandals"
      shoesColor={C.brown}
      hat="none"
      accessory="sunglasses"
      over={() => (
        <g transform="rotate(6 -110 -350)">
          <rect x={-150} y={-700} width={56} height={700} rx={28} fill={C.skyDeep} />
          <rect x={-124} y={-690} width={10} height={680} fill={C.white} opacity={0.6} />
          <path d="M -150 -36 L -122 -4 L -94 -36 Z" fill={C.blueDark} />
          <rect x={-150} y={-420} width={56} height={22} fill={C.yellow} />
        </g>
      )}
    />
  );
}
