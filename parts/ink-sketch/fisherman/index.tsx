import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Fisherman: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "hair": "short",
  "hairColour": "#8a8a8a",
  "beard": "stubble",
  "skin": "medium",
  "build": "elder",
  "top": "jacket",
  "topColour": "yellow",
  "hat": "cap",
  "hatColour": "#c9a66b",
  "hold": "fishingrod",
  "legs": "trousers",
  "legsColour": "#5a6b3a",
  "shoeStyle": "boots",
  "shoes": "#3a2a22"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
