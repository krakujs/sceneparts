import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Person with crutches: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "short", "hairColour": "brown", "top": "tee", "topColour": "#f2b8a0", "legs": "trousers", "legsColour": "#3c4a5c", "shoeStyle": "shoes", "shoes": "#3a2a22", "hold": "crutch", "itemColour": "#8a5a2b", "eyes": "open", "mouth": "flat", "extra": [{"map": ["wwww", "wwww", "wwww", "wwww"], "at": [2, 6], "ref": "legs"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
