import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Actor: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "long",
  "hairColour": "brown",
  "skin": "medium",
  "top": "jacket",
  "topColour": "#7a1f2b",
  "legs": "trousers",
  "legsColour": "#1b1b2e",
  "back": "cape",
  "backColour": "#7a4bb5",
  "shoeStyle": "boots",
  "shoes": "#1b1b2e",
  "extra": [
    {
      "d": "M 0 -128 Q 40 -128 40 -78 Q 40 -28 0 -28 Q -40 -28 -40 -78 Q -40 -128 0 -128 Z",
      "fill": "#f0cf5a",
      "at": "hand"
    },
    {
      "d": "M -26 -86 Q -16 -98 -6 -86 Q -16 -80 -26 -86 Z M 6 -86 Q 16 -98 26 -86 Q 16 -80 6 -86 Z M -20 -50 Q 0 -30 20 -50 Q 0 -40 -20 -50 Z",
      "at": "hand"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
