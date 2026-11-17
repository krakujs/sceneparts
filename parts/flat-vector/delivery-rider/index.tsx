import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Delivery rider preset: navy helmet, orange hoodie and a teal insulated delivery box on the back. Holds a phone by default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="hoodie"
      topColor={C.orange}
      hat="helmet"
      hatColor={C.yellow}
      extra="backpack"
      extraColor={C.teal}
      prop={p.prop ?? "phone"}
    />
  );
}
