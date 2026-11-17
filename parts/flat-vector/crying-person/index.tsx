import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Crying person: sad face with tear drops falling from both eyes, animated with p.f.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const drop = (x: number, phase: number) => {
    const k = (p.f * 2 + phase) % 70;
    return (
      <g key={x + "-" + phase} transform={`translate(${x} ${14 + k}) scale(1.9)`} opacity={k > 56 ? (70 - k) / 14 : 1}>
        <path d="M 0 -14 Q -9 2 0 6 Q 9 2 0 -14 Z" fill={C.blue} />
      </g>
    );
  };
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="stand"
      expression="sad"
      skin="light"
      hair="long"
      hairColor="blonde"
      top="sweater"
      topColor={C.pink}
      bottom="trousers"
      bottomColor={C.blueDark}
      shoes="shoes"
      shoesColor={C.ink}
      topper={() => (
        <g>
          {drop(36, 0)}
          {drop(36, 35)}
          {drop(76, 18)}
          {drop(76, 52)}
        </g>
      )}
    />
  );
}
