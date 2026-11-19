import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// News anchor: an ink-sketch/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "bob", "hairColour": "brown", "skin": "light", "top": "suit", "topColour": "#23305e", "inner": "#f5f1e8", "neck": "pearls", "hold": "clipboard", "legs": "trousers", "legsColour": "#23305e", "shoeStyle": "shoes", "shoes": "#1b1b2e"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
