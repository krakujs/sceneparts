import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Teen girl: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "teen", "hair": "ponytail", "hairColour": "brown", "top": "jacket", "topColour": "#2f5d50", "inner": "#f5f1e8", "legs": "trousers", "legsColour": "#3a6ea5", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "eyes": "open", "mouth": "smile", "blush": true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
