import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Grandmother: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bun", "hairColour": "grey", "top": "dress", "topColour": "#6f8fb5", "neck": "scarf", "neckColour": "#b35c7a", "legs": "none", "shoeStyle": "shoes", "shoes": "#3a2a22", "hold": "ball", "itemColour": "#d2403f", "extra": [{"map": ["...k", "..k.", ".k..", "k..."], "at": [0, -2], "ref": "hand"}], "eyes": "happy", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
