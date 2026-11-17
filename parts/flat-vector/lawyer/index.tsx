import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Lawyer preset: dark grey suit with white shirt, burgundy tie, briefcase in the hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const suit = "#4A5068";
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={suit}
      shirtColor={C.white}
      bottom="trousers"
      bottomColor={shade(suit, 0.1)}
      shoes="shoes"
      shoesColor={C.ink}
      hat="none"
      extra="tie"
      extraColor="#7A2E3A"
      prop="briefcase"
      propColor={C.brownDark}
    />
  );
}
