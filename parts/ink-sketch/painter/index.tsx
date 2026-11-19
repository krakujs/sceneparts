import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Painter: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "bun",
  "hairColour": "black",
  "skin": "medium",
  "hat": "beret",
  "hatColour": "#2e6b45",
  "top": "shirt",
  "topColour": "#f5f1e8",
  "over": "apron",
  "overColour": "#c9874f",
  "hold": "paintbrush",
  "itemColour": "#7a4a2b",
  "legs": "trousers",
  "legsColour": "#3a3f4a",
  "extra": [
    {
      "d": "M -37 -600 A 7 7 0 1 0 -23 -600 A 7 7 0 1 0 -37 -600 Z M -19 -500 A 5 5 0 1 0 -9 -500 A 5 5 0 1 0 -19 -500 Z",
      "fill": "#c9463d"
    },
    {
      "d": "M -16 -556 A 6 6 0 1 0 -4 -556 A 6 6 0 1 0 -16 -556 Z",
      "fill": "#5b86c4"
    },
    {
      "d": "M 18 -618 A 6 6 0 1 0 30 -618 A 6 6 0 1 0 18 -618 Z",
      "fill": "#f0cf5a"
    },
    {
      "d": "M -45 -528 A 5 5 0 1 0 -35 -528 A 5 5 0 1 0 -45 -528 Z",
      "fill": "#7fae6a"
    },
    {
      "d": "M -132 -470 A 44 28 0 1 0 -44 -470 A 44 28 0 1 0 -132 -470 Z M -73 -482 A 7 7 0 1 0 -59 -482 A 7 7 0 1 0 -73 -482 Z",
      "fill": "#c59a6a"
    },
    {
      "d": "M -113 -486 A 5 5 0 1 0 -103 -486 A 5 5 0 1 0 -113 -486 Z M -101 -452 A 5 5 0 1 0 -91 -452 A 5 5 0 1 0 -101 -452 Z M -124 -456 A 4 4 0 1 0 -116 -456 A 4 4 0 1 0 -124 -456 Z",
      "fill": "#e86f51"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
