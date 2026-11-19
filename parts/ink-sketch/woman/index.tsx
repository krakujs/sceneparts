import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Woman: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bob", "hairColour": "black", "top": "dress", "topColour": "#9b59b6", "legs": "none", "skin": "brown", "shoeStyle": "shoes", "shoes": "#7a2e2e", "eyes": "open", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
