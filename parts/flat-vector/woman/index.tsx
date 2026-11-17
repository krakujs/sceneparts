import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Woman preset: everyday adult woman in a dress with heels. Neutral, generic.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="adult" top="dress" bottom="skirt" shoes="heels" />
  );
}
