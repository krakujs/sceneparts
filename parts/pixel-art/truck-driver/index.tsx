import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Truck driver: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "fair", "hat": "cap", "hatColour": "k", "hair": "bob", "hairColour": "brown", "top": "shirt", "topColour": "r", "legs": "trousers", "legsColour": "b"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
