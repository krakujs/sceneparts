import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Sunbather: relaxing in a yellow deck chair with a sky-blue towel, in an orange tank top and blue shorts, with sunglasses.
// The deck chair is drawn behind the person; the person is drawn seated with no bench.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <path d="M -120 -440 L -300 -660" stroke={C.yellowDark} strokeWidth={30} strokeLinecap="round" />
      <path d="M -120 -440 L -300 -660" stroke={C.yellow} strokeWidth={18} strokeLinecap="round" />
      <path d="M 120 -424 L 200 0 M -120 -424 L -150 0" stroke={C.yellowDark} strokeWidth={16} strokeLinecap="round" />
      <rect x={-150} y={-466} width={300} height={30} rx={8} fill={C.yellow} />
      <rect x={-150} y={-466} width={300} height={10} rx={4} fill={C.skyDeep} />
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        pose="sit"
        seat={false}
        top="tank"
        topColor={C.orange}
        bottom="shorts"
        bottomColor={C.blueDark}
        shoes="sandals"
        shoesColor={C.brown}
        hat="none"
        accessory="sunglasses"
        expression="smile"
      />
    </g>
  );
}
