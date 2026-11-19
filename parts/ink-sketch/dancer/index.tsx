import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Dancer: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "ponytail", "hairColour": "brown", "skin": "fair", "top": "hoodie", "topColour": "#f08a3c", "legs": "trousers", "legsColour": "#5a6170", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "arms": "up"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
