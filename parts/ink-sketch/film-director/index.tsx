import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Film director: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "none",
  "beard": "moustache",
  "skin": "tan",
  "hat": "cap",
  "hatColour": "#5a6170",
  "top": "jacket",
  "topColour": "#c9874f",
  "inner": "#f5f1e8",
  "legs": "trousers",
  "legsColour": "#3a3f4a",
  "shoeStyle": "boots",
  "shoes": "#3a2a22",
  "extra": [
    {
      "d": "M 0 -16 L 64 -60 L 64 36 L 0 12 Z",
      "fill": "#e9963f",
      "at": "hand"
    },
    {
      "d": "M -20 -18 L 2 -18 L 2 12 L -20 12 Z",
      "fill": "#3a3634",
      "at": "hand"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
