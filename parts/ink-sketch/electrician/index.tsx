import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Electrician: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "tan",
  "hat": "hardhat",
  "hatColour": "y",
  "hair": "ponytail",
  "hairColour": "black",
  "top": "shirt",
  "topColour": "e",
  "belt": true,
  "legs": "trousers",
  "legsColour": "d",
  "extra": [{"d":"M -52 -458 L -8 -458 L -8 -404 L -52 -404 Z","fill":"#c9463d","at":"body"},{"d":"M -20 -40 L 20 -40 L 20 20 L -20 20 Z","fill":"#9a9790","at":"hand"},{"d":"M -14 -32 L 14 -32 L 14 -10 L -14 -10 Z","fill":"#5b86c4","at":"hand"},{"d":"M 10 20 Q 30 44 26 80 L 16 80 Q 18 48 2 28 Z","fill":"#c9463d","at":"hand"}]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
