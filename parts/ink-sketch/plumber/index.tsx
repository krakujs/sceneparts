import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Plumber: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "light",
  "hat": "cap",
  "hatColour": "k",
  "hair": "short",
  "hairColour": "brown",
  "top": "shirt",
  "topColour": "o",
  "legs": "trousers",
  "legsColour": "d",
  "hold": "wrench",
  "itemColour": "g",
  "extra": [{"d":"M -152 -430 L -64 -430 L -64 -378 L -152 -378 Z","fill":"#c9463d","at":"body","back":true},{"d":"M -128 -430 Q -108 -466 -88 -430 L -96 -430 Q -108 -452 -120 -430 Z","fill":"#c9463d","at":"body","back":true}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
