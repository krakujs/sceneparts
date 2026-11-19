import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Groom: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top":"suit","topColour":"navy","inner":"#f7f2e7","neck":"bowtie","neckColour":"black","legs":"trousers","legsColour":"navy","shoeStyle":"shoes","shoes":"#2a2220","hair":"short","hairColour":"black","skin":"tan","extra":[{"d":"M -33 -738 A 11 11 0 1 0 -11 -738 A 11 11 0 1 0 -33 -738 Z","fill":"pink","at":"body"},{"d":"M -14 -734 Q -4 -750 8 -738 Q -4 -726 -14 -734 Z","fill":"green","at":"body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
