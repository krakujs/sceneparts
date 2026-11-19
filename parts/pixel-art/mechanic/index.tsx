import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Mechanic: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "brown", "hat": "cap", "hatColour": "o", "hair": "short", "hairColour": "black", "beard": "stubble", "top": "overalls", "topColour": "b", "hold": "wrench", "itemColour": "g"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
