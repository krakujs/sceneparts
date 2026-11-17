import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Professor preset: brown tweed blazer over a white shirt, red bow tie, grey beard, a book in hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const tweed = "#8A6A4A";
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={tweed}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={C.greyDark}
      shoes="shoes"
      shoesColor={C.brownDark}
      hat="none"
      extra="bowtie"
      extraColor={C.red}
      prop="book"
      propColor={shade(C.purpleDark, 0.1)}
    />
  );
}
