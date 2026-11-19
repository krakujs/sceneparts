import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Baby: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "toddler", "pose": "sit", "hair": "short", "hairColour": "#c8925a", "top": "tee", "topColour": "#bfe6ff", "legs": "none", "shoeStyle": "bare", "blush": true, "eyes": "happy", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
