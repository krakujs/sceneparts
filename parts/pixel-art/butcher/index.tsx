import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Butcher: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "brown", "hair": "short", "hairColour": "black", "hat": "cap", "hatColour": "w", "top": "shirt", "topColour": "w", "over": "apron", "overColour": "w", "legs": "trousers", "legsColour": "d", "extra": [{"map": ["..........", "..........", "..........", "rrrrrrrrrr", "..........", "rrrrrrrrrr", "..........", "rrrrrrrrrr", "..........", "rrrrrrrrrr", ".........."], "ref": "torso"}, {"map": ["kkkkkk", "kggggk", "kkkkkk", "..kuk."], "ref": "hand"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
