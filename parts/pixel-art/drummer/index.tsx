import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Drummer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "mohawk", "hairColour": "#ef8fb4", "skin": "medium", "top": "tank", "topColour": "#d2403f", "legs": "trousers", "legsColour": "#3a3f4a", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "extra": [{"map": ["w", "w", "w", "u"], "at": [0, -4], "ref": "hand"}, {"map": ["rrrrrrrr", "wwwwwwww", "rrrrrrrr", "kkkkkkkk"], "at": [-8, -2], "ref": "feet"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
