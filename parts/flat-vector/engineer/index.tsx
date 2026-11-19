import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Engineer preset: blue hard hat, grey shirt and a lanyard badge, reading a tablet. Tablet is the prop default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="shirt"
      topColor={C.greyDark}
      hat="hardhat"
      hatColor={C.blue}
      extra="lanyard"
      extraColor={C.teal}
      prop={p.prop ?? "tablet"}
    />
  );
}
