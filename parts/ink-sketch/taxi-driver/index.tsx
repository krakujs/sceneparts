import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Taxi driver: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "brown",
  "hat": "cap",
  "hatColour": "y",
  "hair": "curly",
  "hairColour": "black",
  "top": "jacket",
  "topColour": "d",
  "legs": "trousers",
  "legsColour": "k",
  "badge": "y",
  "extra": [{"d":"M -14 -44 L 14 -44 L 14 -6 L -14 -6 Z","fill":"#f0cf5a","at":"hand"},{"d":"M -6 -44 Q -6 -66 0 -66 Q 6 -66 6 -44 Z","fill":"#9a9790","at":"hand"}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
