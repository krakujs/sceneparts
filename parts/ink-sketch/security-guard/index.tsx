import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Security guard: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"fair","hair":"buzz","hairColour":"brown","hat":"cap","hatColour":"#1a1b1f","top":"uniform","topColour":"grey","legs":"trousers","legsColour":"#1a1b1f","shoes":"#111111","belt":true,"hold":"torch","itemColour":"#2a2a2a","extra":[{"d":"M -58 -790 L -30 -790 L -30 -748 L -58 -748 Z","fill":"#2a2a2a","at":"body"},{"d":"M -52 -780 L -36 -780 L -36 -764 L -52 -764 Z","fill":"#9a9790","at":"body"},{"d":"M -40 -790 L -34 -836 L -26 -834 L -32 -790 Z","fill":"#2a2a2a","at":"body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
