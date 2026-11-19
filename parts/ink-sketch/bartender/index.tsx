import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Bartender: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "medium",
  "hair": "ponytail",
  "hairColour": "red",
  "top": "shirt",
  "topColour": "w",
  "over": "vest",
  "overColour": "n",
  "legs": "trousers",
  "legsColour": "k",
  "extra": [{"d":"M -20 -12 L 20 -12 L 15 -110 L -15 -110 Z","fill":"#b8b4ad","at":"hand"},{"d":"M -17 -110 L 17 -110 L 15 -128 Q 0 -136 -15 -128 Z","fill":"#9a9790","at":"hand"}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
