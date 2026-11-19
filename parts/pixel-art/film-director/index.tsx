import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Film director: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "none", "beard": "moustache", "skin": "tan", "hat": "cap", "hatColour": "#5a6170", "top": "jacket", "topColour": "#c9874f", "inner": "#f5f1e8", "legs": "trousers", "legsColour": "#3a3f4a", "shoeStyle": "boots", "shoes": "#3a2a22", "extra": [{"map": ["kkk.....", "kwkkkk..", "kwwwkkkk", "kwwwwwwk", "kwwwkkkk", "kwkkkk..", "kkk....."], "at": [0, -3], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
