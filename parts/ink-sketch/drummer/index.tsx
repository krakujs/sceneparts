import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Drummer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "mohawk",
  "hairColour": "#ef8fb4",
  "skin": "medium",
  "top": "tank",
  "topColour": "#d2403f",
  "legs": "trousers",
  "legsColour": "#3a3f4a",
  "shoeStyle": "sneakers",
  "shoes": "#f5f1e8",
  "extra": [
    {
      "d": "M -5 -4 L 5 -4 L -20 -110 L -25 -108 Z",
      "fill": "#c59a6a",
      "at": "hand"
    },
    {
      "d": "M -49 -460 L -41 -464 L -104 -566 L -110 -562 Z",
      "fill": "#c59a6a"
    },
    {
      "d": "M 120 -120 L 120 -24 A 65 16 0 0 0 250 -24 L 250 -120 Z",
      "fill": "#c9463d"
    },
    {
      "d": "M 120 -120 A 65 16 0 1 0 250 -120 A 65 16 0 1 0 120 -120 Z",
      "fill": "#f5f1e8"
    },
    {
      "d": "M 120 -92 L 250 -92 M 120 -60 L 250 -60"
    },
    {
      "d": "M 256 -150 A 44 9 0 1 0 344 -150 A 44 9 0 1 0 256 -150 Z",
      "fill": "#f0cf5a"
    },
    {
      "d": "M 300 -141 L 300 0 M 280 0 L 320 0"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
