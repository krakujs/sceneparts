import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Lab technician: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "bun",
  "hairColour": "#5a3a22",
  "skin": "tan",
  "top": "labcoat",
  "topColour": "#f5f1e8",
  "inner": "#c9d8e6",
  "glasses": "glasses",
  "legs": "trousers",
  "legsColour": "#4a5a6a",
  "shoeStyle": "sneakers",
  "shoes": "#3a3a3a",
  "extra": [
    {
      "d": "M -29 -78 L -29 -22 Q -29 2 -22 2 Q -15 2 -15 -22 L -15 -78 Z",
      "fill": "teal",
      "at": "hand"
    },
    {
      "d": "M -7 -78 L -7 -22 Q -7 2 0 2 Q 7 2 7 -22 L 7 -78 Z",
      "fill": "pink",
      "at": "hand"
    },
    {
      "d": "M 15 -78 L 15 -22 Q 15 2 22 2 Q 29 2 29 -22 L 29 -78 Z",
      "fill": "yellow",
      "at": "hand"
    },
    {
      "d": "M -42 -8 L 42 -8 L 42 12 L -42 12 Z",
      "fill": "grey",
      "at": "hand"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
