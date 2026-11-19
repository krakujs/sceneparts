import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Teacher preset: teal cardigan over a white shirt, navy skirt, round glasses, a book in hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="sweater"
      topColor={C.tealDark}
      bottom="skirt"
      bottomColor={C.navy}
      shoes="heels"
      shoesColor={C.purpleDark}
      hat="none"
      extra="none"
      accessory="glasses"
      prop="book"
      propColor={C.yellow}
    />
  );
}
