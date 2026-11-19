import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Surgeon: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "buzz",
  "hairColour": "#2a1d17",
  "skin": "dark",
  "top": "tee",
  "topColour": "#3fa37a",
  "legs": "trousers",
  "legsColour": "#3fa37a",
  "hat": "surgical",
  "hatColour": "#3fa37a",
  "mouth": "mask",
  "shoeStyle": "boots",
  "shoes": "#f5f1e8"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
