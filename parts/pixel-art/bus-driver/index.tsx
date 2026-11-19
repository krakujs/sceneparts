import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Bus driver: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "tan", "hat": "peaked", "hatColour": "n", "hair": "short", "hairColour": "black", "top": "shirt", "topColour": "w", "neck": "tie", "neckColour": "n", "legs": "trousers", "legsColour": "n"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
