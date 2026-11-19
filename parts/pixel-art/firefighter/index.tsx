import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Firefighter: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "fair", "hair": "short", "hat": "firehelmet", "hatColour": "#d2403f", "top": "jacket", "topColour": "#c9874f", "over": "hivis", "overColour": "y", "legs": "trousers", "legsColour": "#c9874f", "shoeStyle": "boots", "shoes": "#1a1a1a", "extra": [{"map": ["kkkkkk", "kdddddk", "kkkkkk"], "at": [2, 0], "ref": "hand"}], "inner": "#c9874f"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
