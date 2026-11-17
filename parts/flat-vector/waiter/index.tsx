import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Waiter preset: white shirt, black bow tie and black skirt, carrying a serving tray. The tray is the prop default and can be overridden.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.white}
      bottom="skirt"
      bottomColor={C.ink}
      extra="bowtie"
      extraColor={C.ink}
      prop={p.prop ?? "tray"}
    />
  );
}
