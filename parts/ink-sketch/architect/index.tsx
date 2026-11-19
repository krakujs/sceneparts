import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Architect: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build":"adult","skin":"fair","hair":"bob","hairColour":"black","glasses":"glasses","top":"jacket","topColour":"navy","inner":"#f7f2e7","legs":"trousers","legsColour":"grey","shoeStyle":"shoes","shoes":"#2a2018","extra":[{"d":"M -26 24 L 70 -72 L 88 -54 L -8 50 Z","fill":"#5b86c4","at":"hand"},{"d":"M -40 40 A 20 20 0 1 0 0 40 A 20 20 0 1 0 -40 40 Z","fill":"#5b86c4","at":"hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
