import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Caregiver preset: teal scrubs and a soft cap, with a mug of tea in the front hand. Pose, face, skin and hair stay free.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="scrubs"
      topColor={C.teal}
      bottom="trousers"
      bottomColor={C.navy}
      extra="lanyard"
      extraColor={C.blue}
      prop={p.prop ?? "mug"}
    />
  );
}
