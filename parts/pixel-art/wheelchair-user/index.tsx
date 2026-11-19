import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Wheelchair user: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"seat": "wheelchair", "pose": "sit", "hair": "short", "hairColour": "black", "top": "tee", "topColour": "#2e8b57", "legs": "trousers", "legsColour": "#3c4a5c", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "eyes": "happy", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
