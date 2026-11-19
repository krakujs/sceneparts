import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Schoolgirl: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "child", "hair": "pigtails", "hairColour": "black", "top": "dress", "topColour": "#23305e", "inner": "#f5f1e8", "neck": "bowtie", "neckColour": "#d2403f", "back": "backpack", "backColour": "#e0609a", "shoeStyle": "shoes", "shoes": "#3a2a22", "eyes": "happy", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
