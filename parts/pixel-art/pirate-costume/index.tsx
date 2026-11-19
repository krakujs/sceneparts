import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Pirate costume: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat": "pirate", "hatColour": "k", "glasses": "eyepatch", "top": "shirt", "topColour": "w", "legs": "trousers", "legsColour": "k", "shoeStyle": "boots", "shoes": "#3a2a22", "beard": "moustache", "hair": "none", "hold": "sword", "itemColour": "g", "skin": "medium", "extra": [{"map": ["kkkkkkkkkk"], "at": [0, 1], "ref": "torso"}, {"map": ["kkkkkkkkkk"], "at": [0, 3], "ref": "torso"}, {"map": ["kkkkkkkkkk"], "at": [0, 5], "ref": "torso"}, {"map": ["kkkkkkkkkk"], "at": [0, 7], "ref": "torso"}, {"map": ["kkkkkkkkkk"], "at": [0, 9], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
