import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Bartender: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "medium", "hair": "ponytail", "hairColour": "red", "top": "shirt", "topColour": "w", "over": "vest", "overColour": "n", "legs": "trousers", "legsColour": "k", "extra": [{"map": ["kkkk", "gggk", "gggk", "kkkk"], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
