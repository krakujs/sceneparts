import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Delivery rider: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"build": "adult", "skin": "tan", "hat": "helmet", "hatColour": "r", "top": "jacket", "topColour": "d", "legs": "trousers", "legsColour": "k", "extra": [{"map": ["kkkkkkkk", "koooooook", "koooooook", "kooowwook", "koooooook", "koooooook", "kkkkkkkkk"], "at": [-6, -2], "ref": "torso", "back": true}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
