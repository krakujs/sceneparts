import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Taxi driver: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "brown", "hat": "cap", "hatColour": "k", "hair": "curly", "hairColour": "black", "top": "jacket", "topColour": "d", "legs": "trousers", "legsColour": "k", "extra": [{"map": ["kkkk", "kyyk", "kkkk"], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
