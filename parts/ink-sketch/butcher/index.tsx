import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Butcher: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "brown",
  "hair": "short",
  "hairColour": "black",
  "hat": "cap",
  "hatColour": "w",
  "top": "shirt",
  "topColour": "w",
  "over": "apron",
  "overColour": "w",
  "legs": "trousers",
  "legsColour": "d",
  "extra": [{"d":"M -7 -4 L 7 -4 L 8 50 L -8 50 Z","fill":"#8a6246","at":"hand"},{"d":"M -28 -8 L 30 -8 L 32 -74 Q 30 -90 12 -90 L -26 -88 Z","fill":"#b8b4ad","at":"hand"}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
