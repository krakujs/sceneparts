import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";

// Call center agent preset: teal shirt and a headset. Defaults to a talking pose; pose, face, skin and hair stay free.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor="#1FA39A"
      accessory="headset"
    />
  );
}
