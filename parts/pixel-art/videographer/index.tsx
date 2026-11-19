import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Videographer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hat": "cap", "hatColour": "#2a2f3a", "top": "tee", "topColour": "#3d6b8c", "over": "vest", "overColour": "#2a2a2a", "hair": "short", "hairColour": "brown", "skin": "medium", "legs": "trousers", "legsColour": "#3a3f4a", "extra": [{"map": ["kkkkkkkk", "kddddkkk", "kddcdkkk", "kkkkkkkk"], "at": [-2, 1], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
