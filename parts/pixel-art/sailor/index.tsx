import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Sailor: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "brown", "skin": "fair", "top": "shirt", "topColour": "#f5f1e8", "neck": "bowtie", "neckColour": "#1f2f5a", "hat": "cap", "hatColour": "#1f2f5a", "legs": "trousers", "legsColour": "#1f2f5a", "shoeStyle": "boots", "shoes": "#2a1d17", "extra": [{"map": ["xxx", "xux", "xxx"], "at": [8, 7], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
