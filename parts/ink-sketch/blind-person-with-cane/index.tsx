import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Blind person with cane: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "black", "glasses": "shades", "top": "shirt", "topColour": "#d4a373", "legs": "trousers", "legsColour": "#3c4a5c", "shoeStyle": "shoes", "shoes": "#3a2a22", "hold": "whitecane", "itemColour": "red", "eyes": "open", "mouth": "smile", "skin": "brown"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
