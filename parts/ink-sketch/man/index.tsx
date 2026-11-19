import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Man: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "brown", "beard": "stubble", "top": "shirt", "topColour": "#7fb8e6", "legs": "trousers", "legsColour": "#3c4a5c", "shoeStyle": "shoes", "shoes": "#3a2a22", "belt": true, "eyes": "open", "mouth": "smile", "skin": "medium"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
