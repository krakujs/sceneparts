import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Young woman preset: adult in a casual t-shirt and trousers with sneakers. Long hair by default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="adult" top="tshirt" bottom="trousers" shoes="sneakers" />
  );
}
