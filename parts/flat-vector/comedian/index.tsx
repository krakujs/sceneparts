import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Comedian preset: grey blazer over a white shirt with a red tie, holding a microphone (pose talk, laughing).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.greyDark}
      shirtColor={C.white}
      hat="none"
      accessory="none"
      extra="tie"
      extraColor={C.red}
      prop="mic"
      propColor={C.ink}
    />
  );
}
