import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Dancer preset: pink tank top, purple leggings and white sneakers; default pose is a cheer.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.pink}
      bottom="trousers"
      bottomColor={C.purpleDark}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      accessory="none"
      extra="none"
    />
  );
}
