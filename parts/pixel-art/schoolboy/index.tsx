import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Schoolboy: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "child", "hair": "short", "hairColour": "brown", "top": "shirt", "topColour": "#f5f1e8", "neck": "tie", "neckColour": "#23305e", "legs": "shorts", "legsColour": "#23305e", "back": "backpack", "backColour": "#2e7d4f", "shoeStyle": "shoes", "shoes": "#3a2a22", "eyes": "happy", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
