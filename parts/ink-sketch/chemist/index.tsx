import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Chemist: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "bob",
  "hairColour": "auburn",
  "skin": "light",
  "top": "shirt",
  "topColour": "#8fb8d8",
  "over": "apron",
  "overColour": "#f5f1e8",
  "legs": "trousers",
  "legsColour": "#2a3a4a",
  "hold": "bottle",
  "itemColour": "#8a4fd6",
  "shoeStyle": "shoes",
  "shoes": "#2a1d17"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
