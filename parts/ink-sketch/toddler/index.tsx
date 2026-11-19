import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Toddler: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "toddler", "hair": "curly", "hairColour": "brown", "top": "tee", "topColour": "#f0cf5a", "legs": "shorts", "legsColour": "#4f7bd1", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "hold": "ball", "itemColour": "#d2403f", "blush": true, "eyes": "happy", "mouth": "smile", "skin": "tan"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
