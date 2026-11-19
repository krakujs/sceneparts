import React from "react";
import type { PartProps } from "@sceneparts/core";
import Person from "../person/index";

// Data scientist: a pixel-art/person preset. The look below is fixed by default; every person param still works
// (anim, flip, vx, build, colours...) and can override it.
const LOOK = {"skin": "brown", "hair": "curly", "hairColour": "black", "glasses": "glasses", "top": "shirt", "topColour": "#7fb2d8", "inner": "#f5f1e8", "legs": "trousers", "legsColour": "#3a4150", "hold": "tablet", "itemColour": "#2a2a2a", "extra": [{"map": ["....nn", "..nnnn", "nnnnnn"], "at": [2, 1], "ref": "torso"}]};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Person {...LOOK} {...p} />;
}
