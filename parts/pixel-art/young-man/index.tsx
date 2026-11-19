import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Young man: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "black", "top": "tee", "topColour": "#4a9be0", "legs": "trousers", "legsColour": "#2b4a7a", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "eyes": "open", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
