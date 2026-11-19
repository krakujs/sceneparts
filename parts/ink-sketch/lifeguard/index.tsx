import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Lifeguard: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin":"tan","hair":"ponytail","hairColour":"blonde","hat":"cap","hatColour":"#e0352b","glasses":"shades","top":"tank","topColour":"#e0352b","legs":"shorts","legsColour":"#e0352b","neck":"whistle","neckColour":"#c9ced6","shoeStyle":"sneakers","shoes":"#f5f1e8","extra":[{"d":"M -52 -40 A 52 52 0 1 0 52 -40 A 52 52 0 1 0 -52 -40 Z M -24 -40 A 24 24 0 1 1 24 -40 A 24 24 0 1 1 -24 -40 Z","fill":"#e0352b","at":"hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
