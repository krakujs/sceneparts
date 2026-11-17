import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Air traffic controller preset: shirt, headset and lanyard; a tablet is the default prop.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.blueDark}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="shoes"
      shoesColor={C.ink}
      accessory="headset"
      extra="lanyard"
      extraColor={C.teal}
    />
  );
}
