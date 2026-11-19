import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Dentist: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "short",
  "hairColour": "brown",
  "skin": "tan",
  "top": "coat",
  "topColour": "#f5f1e8",
  "inner": "#8fd3c8",
  "glasses": "glasses",
  "legs": "trousers",
  "legsColour": "#2a3a4a",
  "neck": "none",
  "extra": [
    {
      "d": "M -5 2 L 5 2 L 5 -70 L -5 -70 Z M -26 -96 A 26 26 0 1 0 26 -96 A 26 26 0 1 0 -26 -96 Z",
      "fill": "grey",
      "at": "hand"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
