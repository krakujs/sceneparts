import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Sculptor: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "buzz",
  "hairColour": "grey",
  "skin": "dark",
  "beard": "stubble",
  "top": "tee",
  "topColour": "#a8b0bd",
  "over": "apron",
  "overColour": "#5a6170",
  "legs": "trousers",
  "legsColour": "#3a3f4a",
  "shoeStyle": "boots",
  "shoes": "#2a2220",
  "extra": [
    {
      "d": "M -4 -40 L 4 -40 L 2 -104 L -2 -104 Z",
      "fill": "#9a9790",
      "at": "hand"
    },
    {
      "d": "M -9 -4 L 9 -4 L 9 -40 L -9 -40 Z",
      "fill": "#8a6246",
      "at": "hand"
    },
    {
      "d": "M 120 -120 L 270 -120 L 270 0 L 120 0 Z",
      "fill": "#c59a6a"
    },
    {
      "d": "M 158 -120 Q 150 -152 170 -164 Q 164 -192 195 -200 Q 226 -192 220 -164 Q 240 -152 232 -120 Z",
      "fill": "#9a9790"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
