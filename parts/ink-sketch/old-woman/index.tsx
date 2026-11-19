import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Old woman: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "elder", "hair": "bun", "hairColour": "grey", "glasses": "glasses", "top": "sweater", "topColour": "#c08a9a", "legs": "skirt", "legsColour": "#4a3f6b", "shoeStyle": "shoes", "shoes": "#3a2a22", "hold": "bag", "itemColour": "#7a4a2b", "eyes": "open", "mouth": "smile", "skin": "medium"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
