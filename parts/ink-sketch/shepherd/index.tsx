import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Shepherd: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "elder",
  "hair": "none",
  "beard": "beard",
  "hairColour": "#a9a7a2",
  "skin": "tan",
  "top": "robe",
  "topColour": "#7a6a5a",
  "back": "cape",
  "backColour": "#5a4a3a",
  "hat": "headscarf",
  "hatColour": "#c9a66b",
  "hold": "staff",
  "itemColour": "#8a5a2a",
  "legs": "none",
  "shoeStyle": "boots",
  "shoes": "#5a3a22",
  "extra": [{"d":"M 198 -30 L 198 -2 L 214 -2 L 214 -30 Z M 282 -30 L 282 -2 L 298 -2 L 298 -30 Z","fill":"#3a3634","at":"body","back":true},{"d":"M 354 -74 A 18 18 0 0 1 341.7 -49 A 18 18 0 0 1 308 -30.7 A 18 18 0 0 1 262 -24 A 18 18 0 0 1 216 -30.7 A 18 18 0 0 1 182.3 -49 A 18 18 0 0 1 170 -74 A 18 18 0 0 1 182.3 -99 A 18 18 0 0 1 216 -117.3 A 18 18 0 0 1 262 -124 A 18 18 0 0 1 308 -117.3 A 18 18 0 0 1 341.7 -99 A 18 18 0 0 1 354 -74 Z","fill":"#d9d2c3","at":"body"},{"d":"M 322 -92 A 30 26 0 1 0 382 -92 A 30 26 0 1 0 322 -92 Z","fill":"#5d5a55","at":"body"}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
