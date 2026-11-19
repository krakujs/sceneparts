import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Delivery rider: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "tan",
  "hat": "helmet",
  "hatColour": "r",
  "top": "jacket",
  "topColour": "d",
  "legs": "trousers",
  "legsColour": "k",
  "extra": [{"d":"M -172 -770 L -62 -770 L -62 -520 L -172 -520 Z","fill":"#e9963f","at":"body","back":true},{"d":"M -150 -700 L -84 -700 L -84 -640 L -150 -640 Z","fill":"#f7f2e7","at":"body","back":true}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
