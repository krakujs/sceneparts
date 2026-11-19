import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// School principal preset: navy blazer over a light-blue shirt, ID lanyard, clipboard in hand.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.navy}
      shirtColor="#BFE0F0"
      bottom="trousers"
      bottomColor={C.ink}
      shoes="heels"
      shoesColor={C.ink}
      hat="none"
      extra="lanyard"
      extraColor={C.blue}
      prop="clipboard"
      propColor={C.brown}
    />
  );
}
