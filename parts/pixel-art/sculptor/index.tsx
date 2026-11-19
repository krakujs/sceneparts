import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Sculptor: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "buzz", "hairColour": "grey", "skin": "dark", "beard": "stubble", "top": "tee", "topColour": "#a8b0bd", "over": "apron", "overColour": "#5a6170", "legs": "trousers", "legsColour": "#3a3f4a", "shoeStyle": "boots", "shoes": "#2a2220", "extra": [{"map": ["g", "g", "g", "u", "u"], "at": [0, -3], "ref": "hand"}, {"map": ["..ssss..", "xxxxxxxx", "xxxxxxxx", "xxxxxxxx"], "at": [-8, -1], "ref": "feet"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
