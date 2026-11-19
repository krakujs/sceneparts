import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Man: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "brown", "top": "shirt", "topColour": "#7fb8e6", "legs": "trousers", "legsColour": "#3c4a5c", "shoeStyle": "shoes", "shoes": "#3a2a22", "eyes": "open", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
