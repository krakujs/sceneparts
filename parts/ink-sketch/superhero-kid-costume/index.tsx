import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Superhero kid costume: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build":"child","top":"tee","topColour":"teal","legs":"trousers","legsColour":"navy","shoeStyle":"sneakers","shoes":"#2a2624","back":"cape","backColour":"orange","arms":"up","hair":"spiky","hairColour":"black","skin":"tan","extra":[{"d":"M 16 -18 Q 56 -40 102 -22 L 106 4 Q 62 -2 26 12 Q 10 -4 16 -18 Z","fill":"black","at":"head"},{"d":"M 26.0 -724.0 L 34.2 -701.3 L 58.3 -700.5 L 39.3 -685.7 L 46.0 -662.5 L 26.0 -676.0 L 6.0 -662.5 L 12.7 -685.7 L -6.3 -700.5 L 17.8 -701.3 Z","fill":"yellow","at":"body"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
