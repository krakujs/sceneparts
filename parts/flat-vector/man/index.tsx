import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Man preset: everyday adult man in a jumper and trousers with shoes. Neutral, generic.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="adult" top="sweater" bottom="trousers" shoes="shoes" />
  );
}
