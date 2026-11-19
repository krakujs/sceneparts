import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Courier: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {
  "build": "adult",
  "skin": "light",
  "hat": "cap",
  "hatColour": "#2f5d50",
  "hair": "ponytail",
  "hairColour": "brown",
  "top": "shirt",
  "topColour": "#2f5d50",
  "legs": "trousers",
  "legsColour": "d",
  "hold": "parcel",
  "itemColour": "#c9965a"
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
