import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Backpacker: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"back": "backpack", "backColour": "u", "hat": "cap", "hatColour": "e", "top": "tee", "topColour": "o", "legs": "trousers", "legsColour": "#4a5a3a", "shoeStyle": "boots", "shoes": "#3a2a22", "hair": "ponytail", "hairColour": "auburn", "skin": "medium"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
