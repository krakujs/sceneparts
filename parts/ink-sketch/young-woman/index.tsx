import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Young woman: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "long", "hairColour": "brown", "top": "tank", "topColour": "#e8a0bf", "legs": "skirt", "legsColour": "#3b3b5c", "neck": "necklace", "neckColour": "#e0b040", "shoeStyle": "boots", "shoes": "#3a2a22", "hold": "bag", "itemColour": "#7a4a2b", "eyes": "open", "mouth": "smile", "skin": "light"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
