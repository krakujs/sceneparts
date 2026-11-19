import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Sailor: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "short",
  "hairColour": "brown",
  "skin": "fair",
  "top": "shirt",
  "topColour": "#f5f1e8",
  "neck": "scarf",
  "neckColour": "red",
  "hat": "cap",
  "hatColour": "#1f2f5a",
  "legs": "trousers",
  "legsColour": "#1f2f5a",
  "shoeStyle": "boots",
  "shoes": "#2a1d17",
  "hold": "bag",
  "itemColour": "#3a6fb0",
  "extra": [
    {
      "d": "M -29 -632 A 7 7 0 1 0 -15 -632 A 7 7 0 1 0 -29 -632 Z",
      "fill": "navy",
      "at": "body"
    },
    {
      "d": "M -26 -624 L -18 -624 L -18 -608 L -8 -608 L -8 -600 L -18 -600 L -18 -552 L -26 -552 L -26 -600 L -36 -600 L -36 -608 L -26 -608 Z",
      "fill": "navy",
      "at": "body"
    },
    {
      "d": "M -36 -570 Q -34 -542 -22 -540 Q -10 -542 -8 -570 L -16 -570 Q -18 -556 -22 -554 Q -26 -556 -28 -570 Z",
      "fill": "navy",
      "at": "body"
    }
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
