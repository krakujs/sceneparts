import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Street sweeper: hi-vis vest over a blue tee, a yellow-green cap and a broom.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tshirt"
      topColor={C.blue}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="boots"
      shoesColor={C.brownDark}
      hat="cap"
      hatColor="#E7F04A"
      extra="hivis"
      extraColor="#E7F04A"
      prop="broom"
      propColor={C.yellowDark}
    />
  );
}
