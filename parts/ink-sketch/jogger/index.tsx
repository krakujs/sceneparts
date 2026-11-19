import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Jogger: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top":"tank","topColour":"coral","legs":"shorts","legsColour":"black","shoeStyle":"sneakers","shoes":"#f5f1e8","hair":"ponytail","hairColour":"brown","skin":"dark","extra":[{"d":"M -92 -38 Q 0 -110 92 -38 L 92 -20 Q 0 -86 -92 -20 Z","fill":"blue","at":"head"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
