import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Soldier: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "brown", "hair": "buzz", "hairColour": "black", "hat": "helmet", "hatColour": "#5a6b3a", "top": "uniform", "topColour": "#5a6b3a", "legs": "trousers", "legsColour": "#4a5a30", "shoeStyle": "boots", "shoes": "#2a2220", "back": "backpack", "backColour": "#6b5a3a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
