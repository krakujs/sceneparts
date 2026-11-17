import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Camper preset: green fleece, grey trousers, yellow beanie, green trainers and a red camping mug in the front hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor={C.green}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="sneakers"
      shoesColor={C.greenDark}
      hat="beanie"
      hatColor={C.yellowDark}
      prop="mug"
      propColor={C.red}
    />
  );
}
