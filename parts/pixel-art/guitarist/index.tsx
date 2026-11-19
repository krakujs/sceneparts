import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Guitarist: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "spiky", "hairColour": "black", "skin": "fair", "top": "jacket", "topColour": "#3a3a3a", "inner": "#c9874f", "hold": "guitar", "legs": "trousers", "legsColour": "#1b1b2e", "shoeStyle": "boots", "shoes": "#1b1b2e"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
