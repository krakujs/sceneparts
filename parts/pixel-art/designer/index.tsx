import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Designer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "fair", "hair": "bob", "hairColour": "blonde", "hat": "beret", "hatColour": "#c0392b", "top": "shirt", "topColour": "#2b2b2b", "legs": "skirt", "legsColour": "#3a3a3a", "shoeStyle": "boots", "shoes": "#1a1a1a", "hold": "tablet", "itemColour": "#333333"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
