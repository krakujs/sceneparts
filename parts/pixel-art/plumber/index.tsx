import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Plumber: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "light", "hat": "cap", "hatColour": "k", "hair": "short", "hairColour": "brown", "top": "shirt", "topColour": "o", "legs": "trousers", "legsColour": "d", "hold": "wrench", "itemColour": "g", "extra": [{"map": ["rrrr", "..k.", "..k.", "..k."], "at": [7, 3], "ref": "torso", "back": true}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
