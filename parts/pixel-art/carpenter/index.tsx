import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Carpenter: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "medium", "hat": "bandana", "hatColour": "r", "hair": "ponytail", "hairColour": "brown", "top": "tee", "topColour": "x", "belt": true, "legs": "trousers", "legsColour": "d", "hold": "hammer", "itemColour": "g"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
