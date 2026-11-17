import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Young man preset: adult in a shirt and jeans with sneakers. A neutral everyday look.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="adult" top="shirt" bottom="trousers" shoes="sneakers" />
  );
}
