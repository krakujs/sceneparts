import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Data scientist: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"medium","hair":"curly","hairColour":"black","glasses":"glasses","top":"shirt","topColour":"#7fb2d8","inner":"#f7f2e7","legs":"trousers","legsColour":"#3a4150","hold":"tablet","itemColour":"#2a2a2a","extra":[{"d":"M -50 -800 L -40 -800 L -40 -744 L -50 -744 Z","fill":"#2a2a2a","at":"body"},{"d":"M -36 -796 L -28 -796 L -28 -744 L -36 -744 Z","fill":"#7fae6a","at":"body"},{"d":"M -62 -748 L -22 -748 L -22 -694 L -62 -694 Z","fill":"#34497a","at":"body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
