import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Mechanic preset: blue work jumpsuit with a red cap, a red rag hanging from the back pocket. Holds a wrench by default.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      top="jumpsuit"
      topColor={C.blue}
      hat="cap"
      hatColor={C.redDark}
      over={() => <path d="M 66 -500 L 96 -486 L 88 -446 L 60 -456 Z" fill={C.red} />}
      prop={p.prop ?? "wrench"}
    />
  );
}
