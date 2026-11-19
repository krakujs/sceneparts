import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Musician: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "curly",
  "hairColour": "black",
  "skin": "brown",
  "top": "shirt",
  "topColour": "#2f5fb8",
  "legs": "trousers",
  "legsColour": "#5a6170",
  "shoeStyle": "sneakers",
  "shoes": "#f5f1e8",
  "extra": [
    {
      "d": "M 10 -821 Q 60 -821 55 -786 Q 50 -756 33 -734 Q 63 -711 68 -684 Q 70 -634 10 -604 Q -50 -634 -48 -684 Q -45 -711 -13 -734 Q -30 -756 -35 -786 Q -38 -821 10 -821 Z",
      "fill": "#6b4226"
    },
    {
      "d": "M 4 -818 L 16 -818 L 26 -870 L 16 -874 Z",
      "fill": "#6b4226"
    },
    {
      "d": "M 10 -812 L 10 -612"
    },
    {
      "d": "M -4 -4 L 4 -4 L -118 -266 L -124 -262 Z",
      "fill": "#c59a6a",
      "at": "hand"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
