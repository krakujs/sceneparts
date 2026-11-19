import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Software developer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "dark", "hair": "spiky", "hairColour": "brown", "top": "hoodie", "topColour": "#3a3d44", "hat": "headset", "hatColour": "#2a2d33", "legs": "trousers", "legsColour": "#2a2f3a", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "hold": "laptop", "itemColour": "#c0c6ce"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
