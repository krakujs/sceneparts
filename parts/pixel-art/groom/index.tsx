import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Groom: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top": "suit", "topColour": "n", "inner": "w", "neck": "bowtie", "neckColour": "k", "legs": "trousers", "legsColour": "n", "shoeStyle": "shoes", "shoes": "k", "hair": "short", "hairColour": "black", "skin": "tan", "extra": [{"map": ["mm", "em"], "at": [2, 2], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
