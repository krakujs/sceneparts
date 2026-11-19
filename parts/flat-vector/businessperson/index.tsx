import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Businessperson preset: grey blazer over a white shirt, red tie, dark trousers, leather briefcase.
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
      bottom="trousers"
      bottomColor={C.inkSoft}
      shoes="shoes"
      shoesColor={C.brownDark}
      hat="none"
      accessory="none"
      extra="tie"
      extraColor={C.red}
      prop="briefcase"
      propColor={C.brownDark}
    />
  );
}
