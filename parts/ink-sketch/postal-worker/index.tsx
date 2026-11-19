import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Postal worker: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "light",
  "hat": "cap",
  "hatColour": "#2b4c8c",
  "hair": "buzz",
  "hairColour": "brown",
  "top": "shirt",
  "topColour": "#2b4c8c",
  "legs": "shorts",
  "legsColour": "grey",
  "hold": "envelope",
  "itemColour": "w",
  "extra": [{"d":"M -150 -640 L -66 -640 L -66 -470 L -150 -470 Z","fill":"#8a6246","at":"body","back":true},{"d":"M -156 -640 L -60 -640 L -60 -604 L -156 -604 Z","fill":"#5d4330","at":"body","back":true}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
