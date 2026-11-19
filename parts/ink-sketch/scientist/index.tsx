import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Scientist: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "curly",
  "hairColour": "#2a2624",
  "skin": "brown",
  "top": "labcoat",
  "topColour": "#f5f1e8",
  "inner": "#d9e6ef",
  "glasses": "goggles",
  "hold": "magnifier",
  "legs": "trousers",
  "legsColour": "#3a4a5a",
  "shoeStyle": "shoes",
  "shoes": "#2a2a2a"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
