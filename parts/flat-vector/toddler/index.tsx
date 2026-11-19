import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Toddler preset: a small child (big head, short legs) in a t-shirt and shorts, waving by default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="toddler" top="tshirt" bottom="shorts" shoes="sneakers" />
  );
}
