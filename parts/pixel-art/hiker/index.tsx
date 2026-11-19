import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Hiker: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat": "sunhat", "hatColour": "x", "back": "backpack", "backColour": "f", "hold": "staff", "itemColour": "u", "top": "shirt", "topColour": "e", "legs": "trousers", "legsColour": "u", "shoeStyle": "boots", "shoes": "#5a3a22", "hair": "short", "hairColour": "brown", "skin": "tan"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
