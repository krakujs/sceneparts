import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Ballet dancer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "bun",
  "hairColour": "brown",
  "skin": "light",
  "top": "tank",
  "topColour": "#ef8fb4",
  "legs": "none",
  "shoeStyle": "shoes",
  "shoes": "#f5f1e8",
  "arms": "up",
  "build": "teen",
  "extra": [
    {
      "d": "M -86 -486 Q 0 -460 86 -486 Q 128 -460 140 -420 Q 0 -392 -140 -420 Q -128 -460 -86 -486 Z M -112 -448 Q 0 -420 112 -448 M -128 -424 Q 0 -398 128 -424",
      "fill": "#ef8fb4"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
