import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Teen girl preset: teenager in a casual t-shirt, sneakers and over-ear headphones (colour from hatColor).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="teen" top="tshirt" accessory="headphones" shoes="sneakers" />
  );
}
