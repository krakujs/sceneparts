import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Student preset: pink hoodie, dark jeans-style trousers, orange backpack on the back, a book in hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.pink}
      bottom="trousers"
      bottomColor={C.blueDark}
      shoes="sneakers"
      shoesColor={C.white}
      hat="none"
      extra="backpack"
      extraColor={C.teal}
      prop="book"
      propColor={C.yellow}
    />
  );
}
