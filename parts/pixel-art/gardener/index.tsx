import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Gardener: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "curly", "hairColour": "black", "skin": "brown", "top": "tee", "topColour": "#7bbf6a", "over": "apron", "overColour": "#8a6a4a", "legs": "trousers", "legsColour": "#3a4a3a", "hold": "rake", "shoeStyle": "boots", "shoes": "#2a1d17"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
