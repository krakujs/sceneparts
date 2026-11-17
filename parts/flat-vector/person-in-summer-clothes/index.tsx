import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C, shade } from "../style/index";

// Person in summer clothes: tank top, shorts, sandals, sunglasses and a sun hat, walking.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      pose="walk"
      expression="smile"
      skin="dark"
      hair="afro"
      hairColor="black"
      hat="brim"
      hatColor={C.yellow}
      accessory="sunglasses"
      top="tank"
      topColor={C.orange}
      bottom="shorts"
      bottomColor={C.teal}
      shoes="sandals"
      shoesColor={C.brownDark}
    />
  );
}
