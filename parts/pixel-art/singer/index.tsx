import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Singer: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"hair": "long", "hairColour": "black", "skin": "tan", "blush": true, "top": "dress", "topColour": "#7a4bb5", "legs": "none", "shoeStyle": "shoes", "shoes": "#1b1b2e", "hold": "mic", "itemColour": "#5a6170", "extra": [{"map": ["y...y", "..w..", ".y.y.", "w...y"], "at": [0, 2], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
