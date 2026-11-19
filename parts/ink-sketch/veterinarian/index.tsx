import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Veterinarian: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "bob",
  "hairColour": "#3a2a22",
  "skin": "fair",
  "top": "tee",
  "topColour": "#2aa198",
  "legs": "trousers",
  "legsColour": "#2aa198",
  "neck": "stethoscope",
  "neckColour": "#3a3a3a",
  "shoeStyle": "sneakers",
  "shoes": "#f5f1e8",
  "extra": [
    {
      "d": "M -22.4 -590.4 L -20 -612 L -10 -602 Q -4 -604 2 -602 L 12 -612 L 14.4 -590.4 A 26 26 0 1 1 -22.4 -590.4 Z",
      "fill": "brown",
      "at": "body"
    },
    {
      "d": "M -26 -572 L 18 -572 L 18 -500 L -26 -500 Z",
      "fill": "navy",
      "at": "body"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
