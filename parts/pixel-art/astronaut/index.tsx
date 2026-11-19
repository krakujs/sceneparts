import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Astronaut: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "none", "skin": "medium", "top": "jacket", "topColour": "#f5f1e8", "legs": "trousers", "legsColour": "#f5f1e8", "shoeStyle": "boots", "shoes": "#9a9a9a", "hat": "spacehelmet", "hatColour": "#f5f1e8", "extra": [{"map": ["kkkkk", "kcgyk", "kgrgk", "kkkkk"], "at": [3, 2], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
