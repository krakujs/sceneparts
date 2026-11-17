import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Jogger preset: casual purple hoodie, grey tracksuit trousers, orange trainers and over-ear headphones. Pose defaults to a run.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.purple}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="sneakers"
      shoesColor={C.orange}
      hat="none"
      accessory="headphones"
      hatColor={C.ink}
    />
  );
}
