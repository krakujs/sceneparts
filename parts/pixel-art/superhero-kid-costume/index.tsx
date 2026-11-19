import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Superhero kid costume: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "child", "top": "suit", "topColour": "e", "legs": "trousers", "legsColour": "f", "shoeStyle": "sneakers", "shoes": "k", "back": "cape", "backColour": "p", "arms": "up", "hair": "spiky", "hairColour": "black", "skin": "tan", "extra": [{"map": ["kkkkkkkk", "kkkkkkkk"], "at": [1, 4], "ref": "head"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
