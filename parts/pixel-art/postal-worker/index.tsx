import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Postal worker: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "light", "hat": "cap", "hatColour": "#2b4c8c", "hair": "buzz", "hairColour": "brown", "top": "shirt", "topColour": "#2b4c8c", "legs": "trousers", "legsColour": "d", "hold": "envelope", "itemColour": "w", "extra": [{"map": ["kkkkkk", "kuuuuk", "kuuuuk", "kkkkkk"], "at": [7, 4], "ref": "torso", "back": true}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
