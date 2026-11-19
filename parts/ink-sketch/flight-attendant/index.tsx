import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Flight attendant: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "bun",
  "hairColour": "black",
  "skin": "light",
  "top": "shirt",
  "topColour": "#f5f1e8",
  "neck": "scarf",
  "neckColour": "#d2403f",
  "hat": "cap",
  "hatColour": "#22304f",
  "legs": "skirt",
  "legsColour": "#22304f",
  "hold": "tray",
  "itemColour": "#d2403f",
  "shoeStyle": "shoes",
  "shoes": "#1a1a1a"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
