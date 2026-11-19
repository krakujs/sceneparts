import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Graduate: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top":"gown","topColour":"navy","hat":"graduation","hatColour":"black","hair":"long","hairColour":"brown","skin":"fair","over":"sash","overColour":"yellow","extra":[{"d":"M -34 -100 L 34 -100 L 34 -64 L -34 -64 Z","at":"hand"},{"d":"M -6 -104 L 6 -104 L 6 -60 L -6 -60 Z","fill":"yellow","at":"hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
