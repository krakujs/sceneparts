import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Firefighter: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"light","hair":"short","hairColour":"black","hat":"firehelmet","hatColour":"red","top":"jacket","topColour":"#d9a441","inner":"#3a3634","legs":"trousers","legsColour":"#6b5a3a","shoeStyle":"boots","shoes":"#1a1a1a","extra":[{"d":"M -76 -566 L 80 -566 L 78 -548 L -74 -548 Z","fill":"#dfe8ec","at":"body"},{"d":"M -14 -24 L 50 -50 L 60 -32 L -4 -6 Z","fill":"#3a3634","at":"hand"},{"d":"M 50 -50 L 80 -66 L 84 -40 L 60 -32 Z","fill":"#f2b632","at":"hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
