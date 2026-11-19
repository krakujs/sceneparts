import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Toddler: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "toddler", "hair": "short", "hairColour": "brown", "top": "tee", "topColour": "#f2b8a0", "legs": "shorts", "legsColour": "#4f7bd1", "shoeStyle": "sneakers", "blush": true, "eyes": "happy", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
