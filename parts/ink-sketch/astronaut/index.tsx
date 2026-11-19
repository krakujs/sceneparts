import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Astronaut: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "none",
  "skin": "medium",
  "back": "backpack",
  "backColour": "#cfd6dc",
  "top": "jacket",
  "topColour": "#f5f1e8",
  "legs": "trousers",
  "legsColour": "#f5f1e8",
  "shoeStyle": "boots",
  "shoes": "#9a9a9a",
  "hat": "spacehelmet",
  "hatColour": "#f5f1e8",
  "extra": [
    {
      "d": "M -22 -722 L 34 -722 L 34 -666 L -22 -666 Z",
      "fill": "grey",
      "at": "body"
    },
    {
      "d": "M -14 -712 L 0 -712 L 0 -698 L -14 -698 Z",
      "fill": "red",
      "at": "body"
    },
    {
      "d": "M 8 -712 L 22 -712 L 22 -698 L 8 -698 Z",
      "fill": "yellow",
      "at": "body"
    },
    {
      "d": "M -14 -684 L 22 -684 L 22 -672 L -14 -672 Z",
      "fill": "green",
      "at": "body"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
