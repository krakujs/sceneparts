import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Teen boy preset: teenager in a hoodie and sneakers. Holds a phone in the front hand by default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="teen" top="hoodie" shoes="sneakers" />
  );
}
