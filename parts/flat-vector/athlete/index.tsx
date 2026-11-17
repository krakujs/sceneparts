import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Athlete preset: blue tank top, teal shorts, red sneakers and an orange headband; default pose is a run.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="tank"
      topColor={C.blue}
      bottom="shorts"
      bottomColor={C.teal}
      shoes="sneakers"
      shoesColor={C.red}
      hat="bandana"
      hatColor={C.orange}
      accessory="none"
      extra="none"
    />
  );
}
