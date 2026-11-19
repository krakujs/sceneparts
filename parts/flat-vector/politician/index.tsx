import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Politician: grey suit and red tie, mid-speech in the talk pose with an open hand gesture.
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
      extra="tie"
      extraColor={C.red}
      bottom="trousers"
      bottomColor={C.inkSoft}
      shoes="shoes"
      shoesColor={C.ink}
    />
  );
}
