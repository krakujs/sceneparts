import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Software developer preset: teal hoodie, dark trousers, over-ear headphones, laptop held in the hands.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.ink}
      shoes="sneakers"
      shoesColor={C.greyDark}
      hat="none"
      extra="none"
      accessory="headphones"
      hatColor={C.purple}
      prop="laptop"
      propColor={C.grey}
    />
  );
}
