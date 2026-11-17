import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Nurse preset: teal scrubs, badge, clipboard. Pose, face, skin and hair stay free.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="scrubs"
      topColor="#8ED8CF"
      bottom="trousers"
      bottomColor={C.navy}
      shoes="sneakers"
      shoesColor={C.white}
      extra="badge"
      prop={p.prop ?? "clipboard"}
    />
  );
}
