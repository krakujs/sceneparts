import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Receptionist preset: pink blazer over a white blouse, dark pencil skirt, heels and a headset with a mic.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="blazer"
      topColor={C.pink}
      shirtColor={C.white}
      bottom="skirt"
      bottomColor={C.ink}
      shoes="heels"
      shoesColor={C.ink}
      hat="none"
      accessory="headset"
      extra="none"
      extraColor={C.white}
      prop="none"
      propColor={C.orange}
    />
  );
}
