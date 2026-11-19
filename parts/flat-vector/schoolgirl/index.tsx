import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Schoolgirl preset: child in a school jumper and pleated-style skirt, school shoes, a backpack. Ponytail by default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="child" top="sweater" bottom="skirt" shoes="shoes" extra="backpack" />
  );
}
