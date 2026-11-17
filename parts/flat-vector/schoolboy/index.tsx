import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Schoolboy preset: child in a school jumper and shorts, sneakers, a backpack on the back.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="child" top="sweater" bottom="shorts" shoes="sneakers" extra="backpack" />
  );
}
