import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Flight attendant: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bun", "hairColour": "black", "skin": "light", "top": "dress", "topColour": "#22304f", "neck": "scarf", "neckColour": "#d2403f", "hat": "cap", "hatColour": "#22304f", "legs": "none", "shoeStyle": "shoes", "shoes": "#1a1a1a"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
