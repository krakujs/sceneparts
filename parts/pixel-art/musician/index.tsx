import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Musician: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "curly", "hairColour": "black", "skin": "brown", "top": "shirt", "topColour": "#2f5fb8", "legs": "trousers", "legsColour": "#5a6170", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "extra": [{"map": ["....ggg....y", "yyyyyyyyyyyy", "....yyyyy.yy", "...........y"], "at": [1, -1], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
