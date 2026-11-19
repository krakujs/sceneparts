import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Carpenter: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "medium",
  "hat": "bandana",
  "hatColour": "r",
  "hair": "ponytail",
  "hairColour": "brown",
  "top": "tee",
  "topColour": "#c59a6a",
  "belt": true,
  "legs": "trousers",
  "legsColour": "d",
  "hold": "hammer",
  "itemColour": "g",
  "extra": [{"d":"M -66 -58 L -100 -112 L -88 -120 L -54 -68 Z","fill":"#f0cf5a","at":"head"},{"d":"M -100 -112 L -112 -132 L -88 -120 Z","fill":"#e8d4b0","at":"head"}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
