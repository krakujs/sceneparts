import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// DJ: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "buzz", "hairColour": "black", "skin": "dark", "hat": "headset", "hatColour": "#1b1b2e", "top": "tee", "topColour": "#2f5fb8", "legs": "trousers", "legsColour": "#1b1b2e", "shoeStyle": "sneakers", "shoes": "#f5f1e8", "extra": [{"map": ["kkkkkkkkkkkkkk", "kdddddkkdddddk", "kdcccdkkdcccdk", "kdddddkkdddddk", "kkkkkkkkkkkkkk"], "at": [-2, 6], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
