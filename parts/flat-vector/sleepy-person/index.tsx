import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Sleepy person: purple pyjamas and slippers, yawning, swaying slowly. Three simple Z paths float up with p.f.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1;
  const x = (p.x ?? 540) + (p.vx ?? 0) * p.f;
  const y = p.y ?? 1560;
  const sway = Math.sin(p.f / 40) * 2.5;
  const zs = [0, 1, 2].map((k) => {
    const t = ((p.f + k * 80) % 240) / 240;
    const zx = 130 + k * 26 + t * 30;
    const zy = -1040 - t * 250;
    const sz = 26 + k * 8 + t * 14;
    return (
      <path
        key={k}
        d="M 0 0 L 40 0 L 0 40 L 40 40"
        transform={`translate(${zx} ${zy}) scale(${sz / 40})`}
        stroke={C.blue}
        strokeWidth={9}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        opacity={1 - t}
      />
    );
  });
  return (
    <g transform={`translate(${x} ${y}) rotate(${sway}) scale(${p.flip ? -s : s} ${s})`}>
      <Person
        x={0}
        y={0}
        s={1}
        f={p.f}
        flip={false}
        pose={p.pose ?? "stand"}
        expression="open"
        top="tshirt"
        topColor={C.purple}
        bottom="trousers"
        bottomColor={C.purpleDark}
        shoes="sandals"
        shoesColor={C.pink}
        hat="none"
        hair="spiky"
        hairColor="brown"
      />
      {zs}
    </g>
  );
}
