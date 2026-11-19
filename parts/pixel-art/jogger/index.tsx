import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Jogger: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top": "tank", "topColour": "c", "legs": "shorts", "legsColour": "k", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "hair": "ponytail", "hairColour": "brown", "skin": "fair", "extra": [{"map": ["mmmmmmmm"], "at": [1, 3], "ref": "head"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
