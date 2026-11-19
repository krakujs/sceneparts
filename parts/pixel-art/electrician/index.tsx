import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Electrician: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "tan", "hat": "hardhat", "hatColour": "y", "hair": "ponytail", "hairColour": "black", "top": "shirt", "topColour": "e", "belt": true, "legs": "trousers", "legsColour": "d", "hold": "tablet", "itemColour": "k", "extra": [{"map": ["rrrr", "r..r", "rrrr"], "at": [7, 3], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
