import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Train conductor: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "fair", "hat": "peaked", "hatColour": "n", "hair": "bun", "hairColour": "brown", "top": "jacket", "topColour": "n", "inner": "w", "neck": "whistle", "neckColour": "g", "legs": "trousers", "legsColour": "n"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
