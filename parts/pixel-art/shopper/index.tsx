import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Shopper: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"top": "shirt", "topColour": "p", "legs": "trousers", "legsColour": "b", "hold": "bag", "itemColour": "e", "hair": "bob", "hairColour": "auburn", "skin": "tan"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
