import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// DJ: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "buzz",
  "hairColour": "black",
  "skin": "dark",
  "hat": "headset",
  "hatColour": "#1b1b2e",
  "top": "tee",
  "topColour": "#2f5fb8",
  "legs": "trousers",
  "legsColour": "#1b1b2e",
  "shoeStyle": "sneakers",
  "shoes": "#f5f1e8",
  "extra": [
    {
      "d": "M 118 -500 L 360 -500 L 360 -470 L 118 -470 Z",
      "fill": "#5a6170"
    },
    {
      "d": "M 140 -470 L 140 0 M 338 -470 L 338 0"
    },
    {
      "d": "M 152 -500 A 44 14 0 1 0 240 -500 A 44 14 0 1 0 152 -500 Z",
      "fill": "#3a3634"
    },
    {
      "d": "M 256 -500 A 44 14 0 1 0 344 -500 A 44 14 0 1 0 256 -500 Z",
      "fill": "#3a3634"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
