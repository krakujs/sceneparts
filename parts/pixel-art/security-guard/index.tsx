import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Security guard: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "light", "hair": "buzz", "hairColour": "brown", "hat": "cap", "hatColour": "#1a1b1f", "top": "uniform", "topColour": "#1a1b1f", "legs": "trousers", "legsColour": "#1a1b1f", "shoes": "#111111", "belt": true, "hold": "torch", "itemColour": "#2a2a2a", "extra": [{"map": ["kkkk", "kggk", "kkkk"], "at": [7, 3], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
