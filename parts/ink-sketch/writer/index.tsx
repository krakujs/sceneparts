import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Writer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "curly",
  "hairColour": "grey",
  "skin": "fair",
  "glasses": "glasses",
  "top": "sweater",
  "topColour": "#c9874f",
  "legs": "trousers",
  "legsColour": "#5a6170",
  "shoeStyle": "shoes",
  "build": "elder",
  "hold": "book",
  "itemColour": "#5b86c4",
  "extra": [
    {
      "d": "M 0 -58 L 36 -130 L 44 -122 L 8 -54 Z",
      "fill": "#3a3634",
      "at": "hand"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
