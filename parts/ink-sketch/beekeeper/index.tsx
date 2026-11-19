import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Beekeeper: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "none",
  "skin": "medium",
  "top": "jacket",
  "topColour": "#f5f1e8",
  "legs": "trousers",
  "legsColour": "#f5f1e8",
  "hat": "sunhat",
  "hatColour": "#f5f1e8",
  "shoeStyle": "boots",
  "shoes": "#5a4a3a",
  "extra": [
    {
      "d": "M -112 -30 Q -132 70 -96 150 Q -40 186 14 182 Q 84 178 120 132 Q 136 60 118 -30 Z",
      "fill": "grey",
      "at": "head",
      "back": true
    },
    {
      "d": "M -18 -92 L 18 -92 L 18 -80 L 26 -72 L 26 -26 L -26 -26 L -26 -72 L -18 -80 Z",
      "fill": "yellow",
      "at": "hand"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
