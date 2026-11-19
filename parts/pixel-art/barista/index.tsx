import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Barista: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "fair", "hair": "bob", "hairColour": "brown", "eyes": "happy", "blush": true, "top": "shirt", "topColour": "w", "over": "apron", "overColour": "k", "legs": "trousers", "legsColour": "d", "hold": "cup", "itemColour": "w"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
