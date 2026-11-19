import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Pilot: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bun", "hairColour": "brown", "skin": "tan", "top": "uniform", "topColour": "#1f2f5a", "inner": "#f5f1e8", "neck": "tie", "neckColour": "#1f2f5a", "badge": "#f5c542", "hat": "peaked", "hatColour": "#1f2f5a", "glasses": "shades", "legs": "trousers", "legsColour": "#1f2f5a", "shoeStyle": "shoes", "shoes": "#1a1a1a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
